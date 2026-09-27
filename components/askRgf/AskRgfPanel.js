import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { CONTACT_CTA, MAX_QUESTION_CHARS } from './constants';

const SLIDE_MS = 260;
const useNativeDriver = Platform.OS !== 'web';

// The panel slides in horizontally from the right browser edge, where the Ask RGF tab sits.
// react-native-web's Modal supplies role="dialog", aria-modal, the focus trap, Escape-to-close
// (via onRequestClose) and focus restoration to the Ask RGF button on close.

const NAVY = '#04101F';
const BLUE = '#0B7DFC';
const TEXT_DARK = '#0B1424';
const TEXT_GREY = '#5B6472';
const BORDER = '#E3E7EE';
const PRIVACY_NOTICE =
  'Ask RGF provides general information about RGF services. Please do not enter confidential, personal, or sensitive information.';

function ContactCta({ onContact }) {
  // On the web this renders a real <a href="/contact"> (works with middle-click / screen readers);
  // a normal click is handled in-app so the conversation is kept.
  const webLink = Platform.OS === 'web' ? { href: CONTACT_CTA.href } : {};
  return (
    <Text
      {...webLink}
      accessibilityRole="link"
      onPress={(event) => {
        if (event?.metaKey || event?.ctrlKey || event?.shiftKey) return;
        event?.preventDefault?.();
        onContact();
      }}
      style={styles.cta}
    >
      {CONTACT_CTA.label} →
    </Text>
  );
}

function Message({ message, isLast, pending, onSend, onRetry, onContact }) {
  const isUser = message.role === 'user';
  return (
    <View style={[styles.messageRow, isUser && styles.messageRowUser]}>
      <Text style={[styles.messageAuthor, isUser && styles.messageAuthorUser]}>{isUser ? 'You' : 'Ask RGF · AI assistant'}</Text>
      <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAssistant, message.error && styles.bubbleError]}>
        <Text style={[styles.messageText, isUser && styles.messageTextUser]} selectable>
          {message.text}
        </Text>
        {message.error && message.retry && (
          <Pressable
            onPress={() => onRetry(message)}
            disabled={pending}
            accessibilityRole="button"
            accessibilityLabel="Retry your last question"
            style={({ hovered, pressed }) => [styles.retry, (hovered || pressed) && styles.retryHover, pending && styles.disabled]}
          >
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        )}
        {!isUser && message.cta && <ContactCta onContact={onContact} />}
      </View>
      {!isUser && isLast && !pending && message.suggestions?.length > 0 && (
        <View style={styles.suggestions}>
          {message.suggestions.map((question) => (
            <Pressable
              key={question}
              onPress={() => onSend(question)}
              accessibilityRole="button"
              style={({ hovered, pressed }) => [styles.chip, (hovered || pressed) && styles.chipHover]}
            >
              <Text style={styles.chipText}>{question}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

export default function AskRgfPanel({ visible, messages, pending, onSend, onRetry, onReset, onClose, onContact }) {
  const { width, height } = useWindowDimensions();
  const sheet = width < 700;
  const [draft, setDraft] = useState('');
  // Keep the Modal mounted until the slide-out animation has finished.
  const [mounted, setMounted] = useState(visible);
  const slide = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) setMounted(true);
    const animation = Animated.timing(slide, {
      toValue: visible ? 1 : 0,
      duration: SLIDE_MS,
      easing: visible ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
      useNativeDriver,
    });
    animation.start(({ finished }) => {
      if (finished && !visible) setMounted(false);
    });
    return () => animation.stop();
  }, [visible, slide]);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!visible) return undefined;
    const timer = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
    return () => clearTimeout(timer);
  }, [visible, messages.length, pending]);

  useEffect(() => {
    if (!visible || sheet) return undefined;
    const timer = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(timer);
  }, [visible, sheet]);

  const submit = () => {
    if (onSend(draft)) setDraft('');
  };

  const panelWidth = sheet ? width : Math.min(400, width - 48);
  const panelHeight = sheet ? height : Math.min(560, height - 48);
  const panelSize = { right: 0, top: (height - panelHeight) / 2, width: panelWidth, height: panelHeight };
  const panelMotion = {
    transform: [{ translateX: slide.interpolate({ inputRange: [0, 1], outputRange: [panelWidth + 24, 0] }) }],
  };

  const submitProps = Platform.OS === 'web' ? { blurOnSubmit: false } : { submitBehavior: 'submit' };

  return (
    <Modal visible={mounted} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: slide }]}>
          <Pressable
            style={[StyleSheet.absoluteFill, sheet ? styles.backdropSheet : styles.backdropDesktop]}
            onPress={onClose}
            accessible={false}
            tabIndex={-1}
          />
        </Animated.View>
        <Animated.View
          style={[styles.panel, sheet ? styles.panelSheet : styles.panelDesktop, panelSize, panelMotion]}
          accessibilityLabel="Ask RGF"
          accessibilityLabelledBy="ask-rgf-title"
        >
          <View style={styles.header}>
            <View style={styles.headerCopy}>
              <Text nativeID="ask-rgf-title" accessibilityRole="header" style={styles.title}>
                Ask RGF
              </Text>
              <Text style={styles.subtitle}>AI assistant · automated answers</Text>
            </View>
            <Pressable
              onPress={onReset}
              accessibilityRole="button"
              accessibilityLabel="Start a new conversation"
              style={({ hovered, pressed }) => [styles.headerButton, (hovered || pressed) && styles.headerButtonHover]}
            >
              <Text style={styles.headerButtonText}>New conversation</Text>
            </Pressable>
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close Ask RGF"
              hitSlop={8}
              style={({ hovered, pressed }) => [styles.closeButton, (hovered || pressed) && styles.headerButtonHover]}
            >
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          <ScrollView
            ref={scrollRef}
            style={styles.messages}
            contentContainerStyle={styles.messagesContent}
            accessibilityLiveRegion="polite"
            accessibilityLabel="Ask RGF conversation"
          >
            {messages.map((message, index) => (
              <Message
                key={message.id}
                message={message}
                isLast={index === messages.length - 1}
                pending={pending}
                onSend={onSend}
                onRetry={onRetry}
                onContact={onContact}
              />
            ))}
            {pending && (
              <View style={styles.typing} accessibilityRole="progressbar" accessibilityLabel="Ask RGF is answering">
                <ActivityIndicator size="small" color={BLUE} />
                <Text style={styles.typingText}>Ask RGF is answering…</Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.inputRow}>
              <TextInput
                ref={inputRef}
                value={draft}
                onChangeText={setDraft}
                onSubmitEditing={submit}
                {...submitProps}
                maxLength={MAX_QUESTION_CHARS}
                placeholder="Ask about RGF’s services…"
                placeholderTextColor="#8A93A1"
                accessibilityLabel="Your question for Ask RGF"
                returnKeyType="send"
                autoComplete="off"
                autoCorrect={false}
                style={styles.input}
              />
              <Pressable
                onPress={submit}
                disabled={pending || !draft.trim()}
                accessibilityRole="button"
                accessibilityLabel="Send question"
                accessibilityState={{ disabled: pending || !draft.trim(), busy: pending }}
                style={({ hovered, pressed }) => [
                  styles.send,
                  hovered && styles.sendHover,
                  pressed && styles.sendPressed,
                  (pending || !draft.trim()) && styles.disabled,
                ]}
              >
                <Text style={styles.sendText}>Send</Text>
              </Pressable>
            </View>
            <Text style={styles.privacy}>{PRIVACY_NOTICE}</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  backdropDesktop: {
    backgroundColor: 'rgba(4,16,31,0.18)',
  },
  backdropSheet: {
    backgroundColor: 'rgba(4,16,31,0.55)',
  },
  panel: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.28,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  panelDesktop: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: BORDER,
  },
  panelSheet: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: NAVY,
  },
  headerCopy: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'Inter_700Bold',
  },
  subtitle: {
    color: '#B8C4D4',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  headerButton: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  headerButtonHover: {
    backgroundColor: 'rgba(79,166,255,0.18)',
  },
  headerButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
  },
  messages: {
    flex: 1,
    backgroundColor: '#F5F8FC',
  },
  messagesContent: {
    padding: 14,
    gap: 14,
  },
  messageRow: {
    alignItems: 'flex-start',
  },
  messageRowUser: {
    alignItems: 'flex-end',
  },
  messageAuthor: {
    color: TEXT_GREY,
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
  },
  messageAuthorUser: {
    textAlign: 'right',
  },
  bubble: {
    maxWidth: '92%',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  bubbleAssistant: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: BORDER,
  },
  bubbleUser: {
    backgroundColor: BLUE,
  },
  bubbleError: {
    borderColor: '#F2B8B5',
    backgroundColor: '#FFF6F5',
  },
  messageText: {
    color: TEXT_DARK,
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'Inter_400Regular',
  },
  messageTextUser: {
    color: '#FFFFFF',
  },
  cta: {
    color: '#075EC4',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    textDecorationLine: 'underline',
  },
  retry: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#075EC4',
  },
  retryHover: {
    backgroundColor: '#EAF3FF',
  },
  retryText: {
    color: '#075EC4',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  suggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  chip: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#B9D7FB',
    backgroundColor: '#FFFFFF',
  },
  chipHover: {
    backgroundColor: '#EAF3FF',
    borderColor: BLUE,
  },
  chipText: {
    color: '#075EC4',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  typing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typingText: {
    color: TEXT_GREY,
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
    gap: 8,
    backgroundColor: '#FFFFFF',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    minWidth: 0,
    borderWidth: 1,
    borderColor: '#C9D2DE',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: TEXT_DARK,
    fontFamily: 'Inter_400Regular',
  },
  send: {
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: BLUE,
  },
  sendHover: {
    backgroundColor: '#0869D6',
  },
  sendPressed: {
    opacity: 0.85,
  },
  sendText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
  disabled: {
    opacity: 0.5,
  },
  privacy: {
    color: TEXT_GREY,
    fontSize: 11,
    lineHeight: 16,
    fontFamily: 'Inter_400Regular',
  },
});
