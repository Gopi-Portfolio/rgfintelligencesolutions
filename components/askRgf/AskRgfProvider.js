import React, { useRef, useState } from 'react';
import { askRgf, createSessionId } from '../../services/askRgfService';
import AskRgfButton from './AskRgfButton';
import AskRgfPanel from './AskRgfPanel';
import { CONTACT_CTA, MAX_QUESTION_CHARS, QUICK_QUESTIONS } from './constants';
import { AskRgfContext } from './context';

// Conversation state lives here (memory only — never localStorage or analytics) so it survives
// page navigation and closing the panel, and is cleared by "New conversation".

const MAX_HISTORY = 6;
const MAX_HISTORY_CHARS = 1200;

const GREETING =
  'Hello — I’m Ask RGF. I can help you understand RGF Intelligence Solutions’ services, solutions, industries, engagement process, and approach to business value. What would you like to know?';
const ERROR_TEXT = {
  timeout: 'Ask RGF is taking longer than expected. Please try again, or use Tell us your business problem to contact RGF.',
  rate_limited: 'You’ve sent several questions in a short time. Please wait a moment and try again.',
  default: 'Ask RGF is temporarily unavailable. Please try again, or use Tell us your business problem to contact RGF.',
};

// Frontend allowlist: only the exact approved CTA is ever rendered, whatever the server sends.
function allowedCta(cta) {
  return cta && cta.href === CONTACT_CTA.href && cta.label === CONTACT_CTA.label ? CONTACT_CTA : null;
}

function allowedSuggestions(list) {
  if (!Array.isArray(list)) return [];
  return list.filter((item) => typeof item === 'string' && item.length > 0 && item.length <= 120).slice(0, 3);
}

function toHistory(messages) {
  return messages
    .filter((message) => !message.greeting && !message.error)
    .slice(-MAX_HISTORY)
    .map((message) => ({ role: message.role, content: message.text.slice(0, MAX_HISTORY_CHARS) }));
}

const greeting = () => ({ id: 'greeting', role: 'assistant', greeting: true, text: GREETING, cta: CONTACT_CTA, suggestions: QUICK_QUESTIONS });

export function AskRgfProvider({ children, onNavigate }) {
  const [isOpen, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => [greeting()]);
  const [pending, setPending] = useState(false);
  const pendingRef = useRef(false);
  const abortRef = useRef(null);
  const sessionIdRef = useRef(createSessionId());
  const nextId = useRef(1);

  const append = (message) => setMessages((list) => [...list, { id: `m${nextId.current++}`, ...message }]);

  const request = async (question, context) => {
    pendingRef.current = true;
    setPending(true);
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const reply = await askRgf({
        message: question,
        sessionId: sessionIdRef.current,
        history: toHistory(context),
        signal: controller.signal,
      });
      append({ role: 'assistant', text: reply.message, cta: allowedCta(reply.cta), suggestions: allowedSuggestions(reply.suggestedQuestions) });
    } catch (error) {
      if (controller.signal.aborted) return; // conversation was reset
      append({
        role: 'assistant',
        error: true,
        text: error.kind === 'rate_limited' ? ERROR_TEXT.rate_limited : ERROR_TEXT[error.kind] || ERROR_TEXT.default,
        cta: CONTACT_CTA,
        retry: { question, context },
      });
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
        pendingRef.current = false;
        setPending(false);
      }
    }
  };

  const send = (text) => {
    const question = String(text || '').trim().slice(0, MAX_QUESTION_CHARS);
    if (!question || pendingRef.current) return false;
    const context = messages;
    append({ role: 'user', text: question });
    request(question, context);
    return true;
  };

  const retry = (message) => {
    if (pendingRef.current || !message.retry) return;
    setMessages((list) => list.filter((item) => item.id !== message.id));
    request(message.retry.question, message.retry.context);
  };

  const reset = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    pendingRef.current = false;
    setPending(false);
    sessionIdRef.current = createSessionId();
    setMessages([greeting()]);
  };

  const goToContact = () => {
    setOpen(false);
    onNavigate('contact');
  };

  const value = { isOpen, openAskRgf: () => setOpen(true) };

  return (
    <AskRgfContext.Provider value={value}>
      {children}
      <AskRgfButton />
      <AskRgfPanel
        visible={isOpen}
        messages={messages}
        pending={pending}
        onSend={send}
        onRetry={retry}
        onReset={reset}
        onClose={() => setOpen(false)}
        onContact={goToContact}
      />
    </AskRgfContext.Provider>
  );
}
