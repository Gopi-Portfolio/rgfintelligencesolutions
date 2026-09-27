#!/usr/bin/env node
// Admin-only: sync the approved Ask RGF knowledge files into one OpenAI vector store.
// Run from a trusted machine. Never deployed as an endpoint (functions/scripts is excluded from deploys).
//
//   cd functions
//   OPENAI_API_KEY=sk-... node scripts/ingest-knowledge.js [--dry-run]
//   OPENAI_API_KEY=sk-... OPENAI_VECTOR_STORE_ID=vs_... node scripts/ingest-knowledge.js
//
// Behaviour:
//   - Unchanged files (same SHA-256) are left alone.
//   - New/changed files are uploaded first; old versions are removed only after every upload succeeds.
//   - Files no longer in the approved list are removed, so conflicting versions never stay searchable.
//   - On any upload failure, this run's new uploads are rolled back and the store is left as it was.

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
const { toFile } = require('openai');

const PACKAGE_DIR = path.resolve(__dirname, '../../rgf_ai_assistant_package');
const STORE_NAME = process.env.ASK_RGF_VECTOR_STORE_NAME || 'ask-rgf-approved-knowledge';

// maintenance.md is internal process documentation; system_instructions.md is sent as instructions
// and must never be retrievable as quotable text.
const APPROVED_FILES = [
  { dir: 'knowledge', name: 'company_overview.md', kind: 'knowledge' },
  { dir: 'knowledge', name: 'services_and_solutions.md', kind: 'knowledge' },
  { dir: 'knowledge', name: 'industries_and_use_cases.md', kind: 'knowledge' },
  { dir: 'knowledge', name: 'engagement_and_value.md', kind: 'knowledge' },
  { dir: 'knowledge', name: 'faqs.md', kind: 'knowledge' },
  { dir: 'policies', name: 'allowed_topics.md', kind: 'policy' },
  { dir: 'policies', name: 'prohibited_topics_privacy.md', kind: 'policy' },
  { dir: 'policies', name: 'response_and_cta_rules.md', kind: 'policy' },
];

const dryRun = process.argv.includes('--dry-run');

function loadLocalFiles() {
  return APPROVED_FILES.map((file) => {
    const fullPath = path.join(PACKAGE_DIR, file.dir, file.name);
    const content = fs.readFileSync(fullPath);
    if (!content.length) throw new Error(`${file.name} is empty`);
    return { ...file, content, sha256: crypto.createHash('sha256').update(content).digest('hex') };
  });
}

async function listAll(iterable) {
  const items = [];
  for await (const item of iterable) items.push(item);
  return items;
}

async function resolveStore(client) {
  if (process.env.OPENAI_VECTOR_STORE_ID) {
    return client.vectorStores.retrieve(process.env.OPENAI_VECTOR_STORE_ID);
  }
  const stores = await listAll(client.vectorStores.list({ limit: 100 }));
  const matches = stores.filter((store) => store.name === STORE_NAME);
  if (matches.length > 1) {
    throw new Error(`Multiple vector stores named "${STORE_NAME}". Set OPENAI_VECTOR_STORE_ID to choose one.`);
  }
  if (matches.length === 1) return matches[0];
  if (dryRun) return null;
  return client.vectorStores.create({ name: STORE_NAME, metadata: { app: 'ask-rgf' } });
}

async function main() {
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is not set in this shell.');
  const client = new OpenAI();
  const localFiles = loadLocalFiles();

  const store = await resolveStore(client);
  const remote = store ? await listAll(client.vectorStores.files.list(store.id, { limit: 100 })) : [];
  const remoteBySource = new Map();
  for (const file of remote) {
    const source = file.attributes?.source;
    if (!remoteBySource.has(source)) remoteBySource.set(source, []);
    remoteBySource.get(source).push(file);
  }

  const toUpload = localFiles.filter((file) => {
    const existing = remoteBySource.get(file.name) || [];
    return !(existing.length === 1 && existing[0].attributes?.sha256 === file.sha256 && existing[0].status === 'completed');
  });
  const keepIds = new Set(
    localFiles
      .filter((file) => !toUpload.includes(file))
      .map((file) => remoteBySource.get(file.name)[0].id)
  );
  const toRemove = remote.filter((file) => !keepIds.has(file.id));

  console.log(`Vector store: ${store ? store.id : '(would create)'} "${STORE_NAME}"`);
  console.log(`Unchanged: ${localFiles.length - toUpload.length}  Upload: ${toUpload.length}  Remove: ${toRemove.length}`);
  if (dryRun) {
    toUpload.forEach((file) => console.log(`  + ${file.name}`));
    toRemove.forEach((file) => console.log(`  - ${file.attributes?.source || file.id}`));
    console.log('Dry run: no changes made.');
    return;
  }

  const uploaded = [];
  try {
    for (const file of toUpload) {
      const created = await client.files.create({
        file: await toFile(file.content, file.name, { type: 'text/markdown' }),
        purpose: 'assistants',
      });
      uploaded.push(created.id);
      const attached = await client.vectorStores.files.createAndPoll(store.id, {
        file_id: created.id,
        attributes: { source: file.name, sha256: file.sha256, kind: file.kind },
      });
      if (attached.status !== 'completed') {
        throw new Error(`${file.name} indexing ended with status "${attached.status}"`);
      }
      console.log(`  + ${file.name}`);
    }
  } catch (error) {
    console.error(`Upload failed (${error.message}). Rolling back ${uploaded.length} new file(s); existing store unchanged.`);
    for (const fileId of uploaded) {
      await client.vectorStores.files.delete(fileId, { vector_store_id: store.id }).catch(() => {});
      await client.files.delete(fileId).catch(() => {});
    }
    process.exitCode = 1;
    return;
  }

  for (const file of toRemove) {
    await client.vectorStores.files.delete(file.id, { vector_store_id: store.id });
    await client.files.delete(file.id).catch(() => {});
    console.log(`  - ${file.attributes?.source || file.id} (old version)`);
  }

  console.log('\nKnowledge sync complete.');
  console.log(`Store the ID as a server secret (paste it when prompted):\n  firebase functions:secrets:set OPENAI_VECTOR_STORE_ID\n  -> ${store.id}`);
}

main().catch((error) => {
  console.error(`Ingestion failed: ${error.message}`);
  process.exitCode = 1;
});
