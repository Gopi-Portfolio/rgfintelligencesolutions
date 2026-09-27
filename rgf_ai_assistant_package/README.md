# Ask RGF — AI Assistant Implementation Package

This package is the single source of truth for building the **Ask RGF** website assistant for RGF Intelligence Solutions.

## Use this package

1. Give `MASTER_DEVELOPMENT_PROMPT.md` and this entire folder to ChatGPT, Claude, or GitHub Copilot in the existing website repository.
2. Ask the coding assistant to inspect the current framework and implement the prompt without replacing the existing website.
3. Review and approve every statement in `knowledge/` before production. Delete or revise anything RGF does not want to claim publicly.
4. Set the OpenAI key only in Firebase Functions/Google Cloud Secret Manager. Never put it in browser code or a public environment variable.
5. Run every test in `tests/acceptance_test_cases.md` before release.

## Included files

- `MASTER_DEVELOPMENT_PROMPT.md` — paste-ready development prompt.
- `knowledge/` — approved-source drafts for retrieval (RAG/file search).
- `policies/` — system instructions, allowed scope, prohibited topics, privacy, and response rules.
- `tests/acceptance_test_cases.md` — functional, security, refusal, and quality tests.
- `OPENAI_PRODUCTION_INTEGRATION.md` — secure Firebase + OpenAI deployment guide.
- `CONTENT_REVIEW_CHECKLIST.md` — owner approval checklist before publishing.

## Non-negotiable behavior

The assistant is not a general-purpose chatbot. It answers only from approved RGF material. It must refuse unrelated questions and requests for ownership, partner, employee, personal, financial, security, or other internal information. When a request cannot be answered, it offers a clickable **Tell us your business problem** link to `/contact`.

