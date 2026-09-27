# OpenAI Production Integration — Firebase Architecture

## Final architecture

The existing website hosts the chat interface. The browser sends a visitor’s message to a Firebase Function. The Function applies validation and scope controls, uses OpenAI’s Responses API with file search over the approved RGF vector store, validates the structured response, and returns only safe JSON to the widget.

## 1. Repository preparation

1. Open the existing website repository.
2. Confirm the active Firebase project and Hosting target.
3. Confirm whether Functions uses JavaScript or TypeScript and its supported Node runtime.
4. Install the current official OpenAI SDK inside the `functions` package, not the website/browser package:

```bash
cd functions
npm install openai
```

5. Keep the existing Hosting `public` directory and SPA rewrite unless repository inspection shows a different established setup.

## 2. Secrets

Create the API key in the OpenAI project intended for production. Store it as a Firebase/Google Cloud server secret. A typical Firebase CLI flow is:

```bash
firebase login
firebase use <your-firebase-project-id>
firebase functions:secrets:set OPENAI_API_KEY
firebase functions:secrets:set OPENAI_VECTOR_STORE_ID
```

Confirm the exact secret declaration syntax required by the Functions generation and SDK already used in the repository. Bind both secrets to the deployed function. Never prefix the key with a browser-exposed convention such as `VITE_`, `NEXT_PUBLIC_`, or `REACT_APP_`.

## 3. Knowledge base

1. Business owner reviews and approves the files in `knowledge/`.
2. An internal ingestion script uploads the approved files through the OpenAI API.
3. The script creates or updates one vector store for production.
4. Store its ID as `OPENAI_VECTOR_STORE_ID` in server secrets/configuration.
5. On updates, remove obsolete files so conflicting versions are not searchable.

The ingestion script must run from a trusted developer/admin environment, never from the public website.

## 4. Server request flow

1. Require POST JSON.
2. Validate origin, App Check token where used, content type, request schema, size, and rate limit.
3. Run a deterministic classifier/check for clearly restricted or off-topic requests. Immediately return the approved refusal for clear violations.
4. For potentially allowed requests, call the Responses API with:
   - authoritative instructions from `policies/system_instructions.md`;
   - file search restricted to the production RGF vector store;
   - no web-search or open-ended tools;
   - structured JSON output;
   - `store: false` for public chat unless retention is separately approved.
5. Reject unsupported answers when retrieval is empty or weak.
6. Validate JSON and scan for restricted content, secrets, unexpected links, or claims outside approved sources.
7. Return the allowlisted response shape to the browser.

## 5. Minimum production controls

- Strict CORS/origin allowlist.
- Firebase App Check where compatible.
- Per-IP and per-session rate limiting.
- Maximum message, history, request, and response sizes.
- Timeouts and bounded retries.
- Only recent conversation messages; no unlimited history.
- No raw message bodies in logs.
- Separate development and production OpenAI projects/keys/vector stores.
- OpenAI project usage limits and spend alerts.
- Key rotation and immediate revocation procedure.
- Dependency and model-version review before upgrades.
- Privacy notice and no sensitive-data solicitation.

## 6. Deployment

Use the commands that match the repository’s actual build setup. The coding assistant must inspect `package.json`; do not assume a `build` script exists.

Typical pattern:

```bash
# Run the repository's real frontend build command first, if it has one.
firebase deploy --only functions,hosting
```

Deploying Hosting alone does not deploy the chat backend. Deploying Functions alone does not publish frontend widget changes.

## 7. Verification after deployment

1. Confirm the default Firebase URL and both custom-domain forms behave as intended.
2. Test HTTP-to-HTTPS redirect and TLS certificate status.
3. Test the `/contact` route by direct navigation and refresh.
4. Inspect browser developer tools to confirm no API key or secret is exposed.
5. Run all acceptance tests from production.
6. Check logs for request IDs, status, latency, usage, and refusal category only—not message content.
7. Confirm rate limits and OpenAI spend alerts.

## 8. Recommended initial operating policy

- Keep answers short and use only approved RGF documents.
- Do not save public chat transcripts by default.
- Review unanswered questions to improve the knowledge base only through privacy-safe aggregate categories.
- Require approval and regression tests before changing business content or scope.

