import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAskRgf } from './context';

// Vertical "Ask RGF" tab fixed to the middle of the right browser edge, on every page.
const RED = '#C8102E'; // white text on this red is 5.9:1 (WCAG AA)
const RED_HOVER = '#A30D25';
const TAB_WIDTH = 34;
const TAB_HEIGHT = 104;

export default function AskRgfButton() {
  const { openAskRgf, isOpen } = useAskRgf();
  return (
    <Pressable
      onPress={openAskRgf}
      accessibilityRole="button"
      accessibilityLabel="Ask RGF, open the AI assistant"
      accessibilityState={{ expanded: isOpen }}
      accessibilityHasPopup="dialog"
      style={({ hovered, pressed, focused }) => [
        styles.tab,
        (hovered || pressed) && styles.tabHover,
        focused && styles.tabFocused,
      ]}
    >
      <View style={styles.label}>
        <Text style={styles.text}>Ask RGF</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tab: {
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    right: 0,
    top: '50%',
    marginTop: -TAB_HEIGHT / 2,
    width: TAB_WIDTH,
    height: TAB_HEIGHT,
    zIndex: 1000,
    backgroundColor: RED,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: -2, height: 2 },
    elevation: 8,
  },
  tabHover: {
    backgroundColor: RED_HOVER,
  },
  tabFocused: {
    outlineWidth: 2,
    outlineStyle: 'solid',
    outlineColor: '#FFFFFF',
    outlineOffset: -4,
  },
  // The label is laid out horizontally, centred on the tab, then rotated to read bottom-to-top.
  label: {
    position: 'absolute',
    width: TAB_HEIGHT,
    height: TAB_WIDTH,
    left: (TAB_WIDTH - TAB_HEIGHT) / 2,
    top: (TAB_HEIGHT - TAB_WIDTH) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-90deg' }],
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.4,
  },
});
