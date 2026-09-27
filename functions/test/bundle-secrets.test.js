// SEC-07: the exported web bundle (and source maps) must not contain OpenAI secrets or the system prompt.
// Scans ../dist by default; point ASK_RGF_BUNDLE_DIR at another `expo export -p web` output to check it.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const bundleDir = path.resolve(process.env.ASK_RGF_BUNDLE_DIR || path.join(__dirname, '../../dist'));

function listFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(full);
    return /\.(js|map|html|json)$/.test(entry.name) ? [full] : [];
  });
}

const FORBIDDEN = [
  /\bsk-(proj-)?[A-Za-z0-9_-]{20,}/, // OpenAI key
  /\bvs_[A-Za-z0-9]{16,}/, // vector store ID
  /OPENAI_API_KEY|OPENAI_VECTOR_STORE_ID/,
  /Authoritative System Instructions/,
  /Source discipline/,
  /Runtime rules \(server\)/,
  /api\.openai\.com/,
];

test('web bundle contains no OpenAI secrets or system instructions', { skip: !fs.existsSync(bundleDir) && `no bundle at ${bundleDir}` }, () => {
  const files = listFiles(bundleDir);
  assert.ok(files.length > 0, 'bundle directory is empty');
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    for (const pattern of FORBIDDEN) {
      assert.equal(pattern.test(content), false, `${path.relative(bundleDir, file)} matches ${pattern}`);
    }
  }
});
