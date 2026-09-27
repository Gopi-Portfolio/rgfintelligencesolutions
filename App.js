import React, { useEffect, useRef, useState } from 'react';
import {
  StatusBar,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
  Linking,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import {
  GearIcon,
  LinkIcon,
  BarChartIcon,
  DatabaseIcon,
  TrendIcon,
  BulbIcon,
  HouseIcon,
  TruckIcon,
  BuildingIcon,
  UsersIcon,
  StoreIcon,
  LockIcon,
  ShieldIcon,
  ClockIcon,
  CheckIcon,
  LinkedInIcon,
  YouTubeIcon,
} from './icons';
import { submitContactForm } from './services/emailService';
import { AskRgfProvider } from './components/askRgf/AskRgfProvider';

// Web only: spread headings across lines evenly so a single word never wraps onto its own line.
const BALANCED_TEXT = Platform.OS === 'web' ? { textWrap: 'balance' } : {};
const NAVY = '#04101F';
const BLUE = '#0B7DFC';
const BLUE_LIGHT = '#4FA6FF';
const RGF_ACCENT = '#A6D5FF';
const TEXT_DARK = '#0B1424';
const TEXT_GREY = '#5B6472';
const BORDER = '#E3E7EE';
const STACKED_FLEX_ITEM = { flexGrow: 0, flexShrink: 0, flexBasis: 'auto' };
const STACKED_CONTENT = { ...STACKED_FLEX_ITEM, width: '100%', maxWidth: '100%', alignSelf: 'center' };
// Narrow-viewport grids: items wrap into as many columns as their minWidth allows.
// Closing call-to-action sections are centered on phones and tablets.
const CENTER_BLOCK = { alignItems: 'center' };
const CENTER_TEXT = { textAlign: 'center', alignSelf: 'center' };
const CENTER_SELF = { alignSelf: 'center' };
const STACKED_GRID = { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'stretch', columnGap: 20, rowGap: 24 };
const gridItem = (minWidth, flexBasis = '40%') => ({ flexGrow: 1, flexShrink: 1, flexBasis, minWidth, width: 'auto', maxWidth: '100%' });
// Drops the desktop column-divider indent so stacked items line up with the section heading.
const FLUSH_ITEM = { paddingLeft: 0, paddingRight: 0, borderLeftWidth: 0, borderRightWidth: 0 };
const GRID_ITEM_HALF = gridItem(140);            // 2 columns on phone and tablet
const GRID_ITEM_WIDE = gridItem(280);            // 1 column on phone, 2 on tablet
const GRID_ITEM_THIRD = gridItem(140, '28%');    // 2 columns on phone, 3 on tablet
const GRID_ITEM_THIRD_WIDE = gridItem(200, '28%'); // 1 column on phone, 3 on tablet

const APPROACH_PHOTO = ['#060B13', '#101B28'];
const TELLUS_PHOTO = ['#0A121C', '#182634'];
const CTA_PHOTO = ['#111D30', '#0A1424', '#060B13'];

const navItems = ['Solutions', 'Industries', 'How We Work', 'Insights', 'Who We Are', 'Contact'];
const heroLinks = ['AI & Automation', 'Data & Analytics', 'Intelligent Systems', 'Business Transformation'];
const heroWords = ['IDEAS', 'SOLUTIONS', 'PEOPLE', 'A BRIGHTER', 'TOMORROW'];

const challenges = [
  { Icon: GearIcon, title: 'Manual Work', desc: 'Repetitive tasks consume valuable time and resources.' },
  { Icon: LinkIcon, title: 'Disconnected Systems', desc: 'Your technology works, but it doesn’t work together.' },
  { Icon: BarChartIcon, title: 'Lost Opportunities', desc: 'Leads and customers fall through the gaps.' },
  { Icon: DatabaseIcon, title: 'Data Without Answers', desc: 'Information everywhere, but insight nowhere.' },
  { Icon: TrendIcon, title: 'Processes That Don’t Scale', desc: 'Growth creates complexity and overhead.' },
  { Icon: BulbIcon, title: 'Technology Without Strategy', desc: 'Investing in tools without clear business value.' },
];

const approachSteps = [
  {
    letter: 'R',
    eyebrow: 'REIMAGINE',
    title: 'WITH AI',
    desc: 'See what’s possible. We identify opportunities and rethink how work gets done.',
    bg: require('./assets/1.admin.png'),
  },
  {
    letter: 'G',
    eyebrow: 'GENERATE',
    title: 'VALUE',
    desc: 'Turn possibility into results. We design and implement solutions that deliver measurable outcomes.',
    bg: require('./assets/2.arch.png'),
  },
  {
    letter: 'F',
    eyebrow: 'FORGE',
    title: 'THE FUTURE',
    desc: 'We create scalable systems designed for how your organization needs to operate tomorrow.',
    bg: require('./assets/3.sales.png'),
  },
];

const solutions = [
  {
    title: 'AI & Intelligent Systems',
    desc: 'AI agents, copilots, document intelligence, voice AI, knowledge systems',
    bg: require('./assets/01-ai-intelligence.png'),
  },
  {
    title: 'Intelligent Automation',
    desc: 'Workflows, CRM, sales, finance, operations, communications',
    bg: require('./assets/02-engineering-gears.png'),
  },
  {
    title: 'Data & Analytics',
    desc: 'Dashboards, reporting, predictive analytics, AI insights',
    bg: require('./assets/03-data-analytics.png'),
  },
  {
    title: 'Software & Integration',
    desc: 'Custom applications, APIs, CRM/ERP, cloud solutions, system integration',
    bg: require('./assets/04-cloud-transformation.png'),
  },
  {
    title: 'Business Transformation',
    desc: 'Process redesign, AI readiness, technology strategy, implementation',
    bg: require('./assets/05-business-advisory.png'),
  },
];

const trustPoints = [
  { Icon: LockIcon, label: 'Confidential' },
  { Icon: ShieldIcon, label: 'No obligation' },
  { Icon: ClockIcon, label: 'Real solutions' },
];

const checklist = ['AI-powered analysis', 'Tailored recommendations', 'Expert consultation', 'Clear next steps'];

const industries = [
  { Icon: HouseIcon, label: 'Construction & Home Services' },
  { Icon: TruckIcon, label: 'Transportation & Logistics' },
  { Icon: BuildingIcon, label: 'Property Management & Real Estate' },
  { Icon: UsersIcon, label: 'Professional Services' },
  { Icon: StoreIcon, label: 'Retail & Franchises' },
  { Icon: GearIcon, label: 'and More Industries' },
];

const stats = [
  { value: '50%', label: 'Reduction in Processing Time' },
  { value: '3x', label: 'Faster Response Time' },
  { value: '35%', label: 'Improvement in Lead Conversion' },
  { value: '1000+', label: 'Hours Recovered for Clients' },
];

const footerColumns = [
  'Solutions',
  'Industries',
  'How We Work',
  'Insights',
  'Who We Are',
  'Contact',
];

function LinkText({ children, style, hoverStyle, activeStyle, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [pressed && activeStyle]}>
      {({ hovered, pressed }) => (
        <Text style={[style, hovered && hoverStyle, pressed && activeStyle]}>{children}</Text>
      )}
    </Pressable>
  );
}

function Btn({ label, variant = 'solid', onDark = false, style, onPress, disabled = false }) {
  const { width } = useWindowDimensions();
  const outline = variant === 'outline';
  return (
    <Pressable
      style={({ hovered, pressed }) => [
        styles.btn,
        width < 900 && styles.btnNarrow,
        outline
          ? {
              borderWidth: 1.5,
              borderColor: onDark ? '#FFFFFF' : BLUE,
              backgroundColor: 'transparent',
            }
          : { backgroundColor: BLUE },
        hovered && !outline && styles.btnHoverSolid,
        hovered && outline && styles.btnHoverOutline,
        pressed && styles.pressed,
        disabled && styles.btnDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {({ hovered, pressed }) => (
        <Text
          style={[
            styles.btnText,
            outline && { color: onDark ? '#FFFFFF' : BLUE },
            hovered && !outline && styles.btnTextHoverSolid,
            hovered && outline && styles.btnTextHoverOutline,
            pressed && styles.btnTextPressed,
          ]}
        >
          {label.replace(/\s+→/, '\u00A0\u00A0→')}
        </Text>
      )}
    </Pressable>
  );
}

function Logo({ markStyle, nameStyle, taglineStyle, showTagline = true, centered = false }) {
  return (
    <View style={centered && CENTER_BLOCK}>
      <Image source={require('./assets/RGF-logo-mark.png')} style={markStyle} resizeMode="contain" />
      <Text style={nameStyle}>
        INTELLIGENCE <Text style={{ color: BLUE_LIGHT }}>SOLUTIONS</Text>
      </Text>
      {showTagline && (
        <Text style={taglineStyle}>
          <Text style={{ color: BLUE_LIGHT }}>Reimagine</Text> with AI.{' '}
          <Text style={{ color: BLUE_LIGHT }}>Generate</Text> Value.{' '}
          <Text style={{ color: BLUE_LIGHT }}>Forge</Text> the Future.
        </Text>
      )}
    </View>
  );
}

// In-page anchors: `anchor(name)` marks a Section, `anchor(name, parent)` marks a nested view
// (native falls back to the parent Section's offset). Pages scroll to `target` once mounted.
function useAnchors(target) {
  const scrollRef = useRef(null);
  const offsets = useRef({});
  const parents = useRef({});

  const scrollToAnchor = (name, animated = true) => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.getElementById(`anchor-${name}`)?.scrollIntoView({ behavior: animated ? 'smooth' : 'auto', block: 'start' });
      return;
    }
    const y = offsets.current[name] ?? offsets.current[parents.current[name]];
    if (y != null) scrollRef.current?.scrollTo({ y, animated });
  };

  useEffect(() => {
    if (!target) return undefined;
    const timer = setTimeout(() => scrollToAnchor(target, false), 100);
    return () => clearTimeout(timer);
  }, [target]);

  const anchor = (name, parent) => {
    if (parent) {
      parents.current[name] = parent;
      return { nativeID: `anchor-${name}` };
    }
    return { nativeID: `anchor-${name}`, onLayout: (event) => { offsets.current[name] = event.nativeEvent.layout.y; } };
  };

  return { scrollRef, anchor, scrollToAnchor };
}

function Section({ bg, children, style, shellStyle, photo, image, imageStyle, scrim, nativeID, onLayout }) {
  const { width } = useWindowDimensions();
  const responsiveShellStyle = width < 700 ? styles.shellPhone : width < 900 ? styles.shellTablet : null;

  return (
    <View nativeID={nativeID} onLayout={onLayout} style={[styles.section, { backgroundColor: bg }, style]}>
      {image && <Image source={image} style={[StyleSheet.absoluteFillObject, styles.sectionBackgroundImage, imageStyle]} resizeMode="cover" />}
      {photo && (
        <LinearGradient colors={photo} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
      )}
      {scrim && (
        <LinearGradient
          colors={scrim}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      )}
      <View style={[styles.shell, shellStyle, responsiveShellStyle]}>{children}</View>
    </View>
  );
}

function Eyebrow({ children, onDark = false, style }) {
  return <Text style={[styles.eyebrow, onDark && { color: '#8CB4E0' }, style]}>{children}</Text>;
}

function ApproachTile({ bg }) {
  return (
    <View style={styles.approachTile}>
      <Image source={bg} style={styles.approachTileImage} resizeMode="contain" />
    </View>
  );
}

const NAV_PAGES = {
  Home: 'home',
  Solutions: 'solution',
  Industries: 'industries',
  'How We Work': 'how',
  Insights: 'insights',
  'Who We Are': 'who',
  Contact: 'contact',
};

function SiteHeader({ onNavigate, activePage = 'home' }) {
  const { width } = useWindowDimensions();
  const collapsed = width < 900;
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleNavItems = activePage === 'home' ? navItems : ['Home', ...navItems];
  const isActive = (item) => item !== 'Home' && activePage === NAV_PAGES[item];
  const go = (item) => {
    setMenuOpen(false);
    onNavigate(NAV_PAGES[item]);
  };

  return (
    <View style={[styles.topbarWrap, collapsed && styles.topbarCompact]}>
      <View style={styles.topbar}>
        <Pressable onPress={() => go('Home')}>
          <Logo
            markStyle={[styles.headerMark, collapsed && styles.headerMarkCompact]}
            nameStyle={[styles.headerLogoName, collapsed && styles.headerLogoNameCompact]}
            taglineStyle={styles.hidden}
            showTagline={false}
          />
        </Pressable>

        {collapsed ? (
          <Pressable
            onPress={() => setMenuOpen((open) => !open)}
            accessibilityRole="button"
            accessibilityLabel={menuOpen ? 'Close menu' : 'Open menu'}
            accessibilityState={{ expanded: menuOpen }}
            hitSlop={8}
            style={({ hovered, pressed }) => [styles.menuButton, (hovered || menuOpen) && styles.menuButtonActive, pressed && styles.pressed]}
          >
            <View style={[styles.menuBar, menuOpen && styles.menuBarTopOpen]} />
            <View style={[styles.menuBar, menuOpen && styles.hidden]} />
            <View style={[styles.menuBar, menuOpen && styles.menuBarBottomOpen]} />
          </Pressable>
        ) : (
          <View style={styles.navWrap}>
            {visibleNavItems.map((item) => (
              <LinkText
                key={item}
                onPress={() => go(item)}
                style={[styles.navItem, isActive(item) && styles.navItemActive]}
                hoverStyle={styles.navItemHover}
                activeStyle={styles.navItemPressed}
              >
                {item}
              </LinkText>
            ))}
          </View>
        )}
      </View>

      {collapsed && menuOpen && (
        <View style={styles.mobileMenu}>
          {visibleNavItems.map((item, index) => (
            <Pressable
              key={item}
              onPress={() => go(item)}
              accessibilityRole="link"
              style={({ hovered, pressed }) => [
                styles.mobileMenuItem,
                index > 0 && styles.mobileMenuDivider,
                (hovered || pressed) && styles.mobileMenuItemHover,
              ]}
            >
              <Text style={[styles.mobileMenuText, isActive(item) && styles.navItemActive]}>{item}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

function SiteFooter({ isMobile, onNavigate, showHomeLink = false }) {
  return (
    <Section bg="#031426" style={styles.footerSection} shellStyle={styles.footerShell}>
      <View style={[styles.footerTop, isMobile && styles.footerTopMobile]}>
        <Pressable onPress={() => onNavigate('home')} style={isMobile && styles.footerLogoMobile}>
          <Logo markStyle={styles.footerMark} nameStyle={[styles.footerLogoName, isMobile && CENTER_TEXT]} taglineStyle={[styles.footerLogoTagline, isMobile && CENTER_TEXT]} centered={isMobile} />
        </Pressable>

        <View style={[styles.footerColumns, isMobile && styles.footerColumnsMobile]}>
            {(showHomeLink ? ['Home', ...footerColumns] : footerColumns).map((item) => {
              const isWhoLink = item === 'Who We Are';
              const isSolutionLink = item === 'Solutions';
              const isIndustriesLink = item === 'Industries';
              const isContactLink = item === 'Contact';
              const isInsightsLink = item === 'Insights';
              const isHowLink = item === 'How We Work';
              const targetPage = isWhoLink ? 'who' : isSolutionLink ? 'solution' : isIndustriesLink ? 'industries' : isContactLink ? 'contact' : isInsightsLink ? 'insights' : isHowLink ? 'how' : 'home';
              return (
                <LinkText
                  key={item}
                  onPress={() => {
                    onNavigate(targetPage);
                  }}
                  style={styles.footerLink}
                  hoverStyle={styles.footerLinkHover}
                  activeStyle={styles.footerLinkPressed}
                >
                  {item}
                </LinkText>
              );
            })}
        </View>

        <View style={[styles.connectWrap, isMobile && styles.connectWrapMobile]}>
          <View style={styles.socialRow}>
            <View style={styles.linkedinBadge}>
              <Text style={styles.linkedinBadgeText}>in</Text>
            </View>
            <View style={styles.youtubeBadge}>
              <Text style={styles.youtubeBadgeText}>▶</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footerRule} />
      <View style={[styles.footerBottom, isMobile && styles.footerBottomMobile]}>
        <Text style={[styles.footerText, isMobile && styles.footerTextMobile]}>© 2026 RGF Intelligence Solutions. All rights reserved.</Text>
        <Text style={[styles.footerText, isMobile && styles.footerTextMobile]}>Privacy  |  Terms  |  Sitemap</Text>
      </View>
    </Section>
  );
}

function SolutionPage({ isMobile, isPhone, onNavigate, section }) {
  const { scrollRef, anchor, scrollToAnchor } = useAnchors(section);
  const solutionCards = [
    {
      title: 'AI & Intelligent Systems',
      subtitle: 'Put intelligence to work across your organization.',
      bullets: ['AI agents, copilots & assistants', 'Generative AI solutions', 'Document intelligence', 'Voice & conversational AI', 'Enterprise knowledge systems', 'Custom AI applications'],
      bg: require('./assets/01-ai-intelligence.png'),
    },
    {
      title: 'Intelligent Automation',
      subtitle: 'Turn repetitive work into intelligent workflows.',
      bullets: ['Workflow automation', 'Sales & CRM automation', 'Customer service automation', 'Finance & billing automation', 'Operations automation', 'Approvals & notifications'],
      bg: require('./assets/02-engineering-gears.png'),
    },
    {
      title: 'Data & Analytics',
      subtitle: 'Turn information into decisions.',
      bullets: ['Executive dashboards', 'Business intelligence', 'Power BI & reporting', 'Predictive analytics', 'Data integration & modernization', 'AI-powered insights'],
      bg: require('./assets/03-data-analytics.png'),
    },
    {
      title: 'Software & Integration',
      subtitle: 'Make your technology work together.',
      bullets: ['Custom software development', 'System & API integration', 'CRM & ERP integration', 'Cloud solutions', 'Customer & employee portals', 'Legacy system modernization'],
      bg: require('./assets/04-cloud-transformation.png'),
    },
    {
      title: 'Business Transformation',
      subtitle: 'Redesign how your organization works.',
      bullets: ['Business process optimization', 'AI readiness & strategy', 'Digital transformation', 'Technology assessments & roadmaps', 'Workflow redesign', 'Implementation & change management'],
      bg: require('./assets/05-business-advisory.png'),
    },
  ];

  const approachSteps = [
    { number: '01', title: 'Understand', text: 'Your business, goals, challenges and opportunities.' },
    { number: '02', title: 'Design', text: 'The right combination of technology and strategy.' },
    { number: '03', title: 'Implement', text: 'A solution tailored to your environment.' },
    { number: '04', title: 'Deliver Value', text: 'Measure results and continuously improve.' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView ref={scrollRef} contentContainerStyle={styles.page}>
        <Section
          bg={NAVY}
          image={require('./assets/solution.png')}
          scrim={['rgba(4,16,31,0.68)', 'rgba(4,16,31,0.38)', 'rgba(4,16,31,0.72)']}
          style={styles.solutionHero}
          shellStyle={styles.headerShell}
        >
          <SiteHeader onNavigate={onNavigate} activePage="solution" />
          <View style={[styles.solutionHeroRow, isMobile && styles.solutionHeroRowMobile]}>
            <View style={[styles.solutionHeroCopy, isMobile && STACKED_CONTENT]}>
              <Eyebrow onDark>OUR SOLUTIONS</Eyebrow>
              <Text style={styles.solutionHeroTitle}>Intelligence That{isMobile ? '\n' : ' '}<Text style={styles.solutionHeroTitleAccent}>Solves Real Business Problems.</Text></Text>
              <Text style={styles.solutionHeroText}>
                The right solution can do more than improve efficiency. It can transform how you operate, compete, and grow. We combine human expertise with AI, automation, data, software, and strategy to deliver practical solutions that create measurable value.
              </Text>
              <View style={[styles.solutionHeroButtons, isMobile && styles.solutionHeroButtonsMobile]}>
                <Btn label="TELL US YOUR BUSINESS PROBLEM →" onPress={() => onNavigate('contact', 'form')} />
                <Btn label="SCHEDULE A CONSULTATION" variant="outline" onDark onPress={() => onNavigate('contact', 'form')} />
              </View>
            </View>
            {!isMobile && (
              <View style={styles.solutionHeroQuote}>
                <Text style={styles.solutionHeroQuoteText}>IDEAS{ '\n' }SOLUTIONS{ '\n' }PEOPLE{ '\n'}A BRIGHTER{ '\n'}TOMORROW</Text>
                <View style={styles.heroWordsRule} />
                <Text style={styles.solutionHeroQuoteAccent}>“Real solutions{ '\n'}start with real{ '\n'}business problems.”</Text>
              </View>
            )}
          </View>
        </Section>

        <Section bg="#F0F7FE" shellStyle={styles.solutionTrustShell}>
          <View style={[styles.solutionTrustRow, isMobile && STACKED_GRID]}>
            {[
              { Icon: UsersIcon, title: 'Business-First', text: 'Approach' },
              { Icon: GearIcon, title: 'Technology', text: 'Agnostic' },
              { Icon: BarChartIcon, title: 'Measurable', text: 'Outcomes' },
              { Icon: ShieldIcon, title: 'Trusted', text: 'Partner' },
            ].map((item, index) => (
              <View key={item.title} style={[styles.solutionTrustItem, isMobile && GRID_ITEM_HALF, isMobile && styles.solutionTrustItemMobile, index > 0 && !isMobile && styles.solutionTrustDivider]}>
                <item.Icon size={30} color={BLUE} />
                <View><Text style={styles.solutionTrustTitle}>{item.title}</Text><Text style={styles.solutionTrustText}>{item.text}</Text></View>
              </View>
            ))}
          </View>
        </Section>

        <Section bg="#FFFFFF" shellStyle={styles.solutionShell} {...anchor('solutions')}>
          <View style={styles.solutionSectionHeading}>
            <View style={styles.solutionIntroCopy}>
              <Eyebrow>OUR SOLUTIONS</Eyebrow>
              <Text style={styles.sectionTitleDark}>Smarter Solutions for a Stronger Tomorrow.</Text>
              <Text style={styles.solutionIntroText}>From AI and automation to data, software, and business transformation, our solutions are designed to help you solve today’s challenges and unlock new opportunities for growth.</Text>
            </View>
            {!isMobile && <LinkText style={styles.linkText} hoverStyle={styles.linkTextHover} activeStyle={styles.linkTextPressed} onPress={() => onNavigate('contact', 'form')}>DISCUSS YOUR NEEDS →</LinkText>}
          </View>
          <View style={[styles.solutionGrid, isMobile && STACKED_GRID]}>
            {solutionCards.map((item) => (
              <View key={item.title} style={[styles.solutionVisualCard, isMobile && GRID_ITEM_WIDE]}>
                <Image source={item.bg} style={styles.solutionVisualImage} resizeMode="cover" />
                <View style={[styles.solutionVisualBody, isMobile && styles.solutionVisualBodyMobile]}>
                  <Text style={styles.solutionBoxTitle}>{item.title}</Text>
                  <Text style={styles.solutionVisualSubtitle}>{item.subtitle}</Text>
                  {item.bullets.map((bullet) => <Text key={bullet} style={styles.solutionBullet}>•  {bullet}</Text>)}
                </View>
              </View>
            ))}
            <View style={[styles.solutionNeedCard, isMobile && GRID_ITEM_WIDE, isMobile && styles.solutionNeedCardMobile]}>
              <Text style={styles.solutionNeedTitle}>Not Sure What{ '\n'}Solution You Need?</Text>
              <Text style={styles.solutionNeedText}>That’s okay. You don’t need to know the technology. Just tell us what’s not working, and we’ll help identify the right solution.</Text>
              <Btn label="TELL US YOUR BUSINESS PROBLEM →" onPress={() => onNavigate('contact', 'form')} />
            </View>
          </View>
        </Section>

        <Section bg="#F0F7FE" shellStyle={styles.solutionApproachShell}>
          <View style={styles.solutionSectionHeading}>
            <View style={styles.solutionIntroCopy}>
              <Eyebrow>OUR APPROACH TO SOLUTIONS</Eyebrow>
              <Text style={styles.sectionTitleDark}>The Right Solution. The Right Way.</Text>
              <Text style={styles.solutionIntroText}>We don’t believe in one-size-fits-all solutions. We take the time to understand your business, identify the real problem, and design a solution that fits your goals, people, and systems.</Text>
            </View>
          </View>
          <View style={[styles.solutionApproachRow, isMobile && STACKED_GRID]}>
            {approachSteps.map((step, index) => (
              <View key={step.number} style={[styles.solutionApproachItem, isMobile && GRID_ITEM_HALF, index > 0 && !isMobile && styles.solutionApproachDivider]}>
                <Text style={styles.solutionStepNumber}>{step.number}</Text>
                <Text style={styles.solutionStepTitle}>{step.title}</Text>
                <Text style={[styles.solutionStepText, isMobile && styles.solutionStepTextMobile]}>{step.text}</Text>
                {index < approachSteps.length - 1 && !isMobile && <Text style={styles.solutionStepArrow}>→</Text>}
              </View>
            ))}
          </View>
        </Section>

        <Section bg={NAVY} shellStyle={styles.solutionClosingShell}>
          <View style={[styles.solutionClosingRow, isMobile && styles.solutionClosingRowMobile]}>
            <View style={[styles.solutionClosingCopy, isMobile && STACKED_FLEX_ITEM, isMobile && CENTER_BLOCK]}>
              <Eyebrow onDark style={isMobile && CENTER_TEXT}>READY TO FIND THE RIGHT SOLUTION?</Eyebrow>
              <Text style={[styles.sectionTitleLight, isMobile && CENTER_TEXT]}>Let’s Solve Your Business Problem.</Text>
              <Text style={[styles.sectionSubtitleLight, isMobile && CENTER_TEXT]}>Whether you need AI, automation, better data, connected systems or a complete transformation, we’ll help you determine the best path forward.</Text>
            </View>
            <View style={[styles.solutionClosingAction, isMobile && CENTER_SELF, isMobile && CENTER_BLOCK]}>
              <Btn label="TELL US YOUR BUSINESS PROBLEM →" onPress={() => onNavigate('contact', 'form')} style={isMobile && CENTER_SELF} />
              <Text style={[styles.solutionClosingNote, isMobile && CENTER_TEXT]}>Confidential  •  No Obligation  •  Real Solutions</Text>
            </View>
          </View>
        </Section>

        <SiteFooter isMobile={isMobile} onNavigate={onNavigate} showHomeLink />
      </ScrollView>
    </SafeAreaView>
  );
}

function isValidEmail(value) {
  const email = value.trim();
  if (!email || email.length > 254) return false;
  if (email.indexOf('@') === -1 || email.indexOf('@') !== email.lastIndexOf('@')) return false;
  const [localPart, domainPart] = email.split('@');
  if (!localPart || !domainPart || localPart.length > 64 || domainPart.length > 255) return false;
  if (domainPart.startsWith('.') || domainPart.endsWith('.') || domainPart.includes('..')) return false;
  if (!domainPart.includes('.') || domainPart.split('.').some((segment) => segment.length < 2 || segment.length > 63)) return false;
  return /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(localPart) && /^[A-Za-z0-9.-]+$/.test(domainPart.replace(/\./g, ''));
}

function InquiryForm({
  title = 'Tell Us About Your Business',
  buttonLabel = 'SEND MESSAGE  →',
  includeCompany = true,
  includeIndustry = true,
  includePhone = true,
  source = 'contact',
  compact = false,
  stacked = false,
  anchorProps,
}) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    industry: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }));


  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);

    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)})-${digits.slice(3)}`;
    return `(${digits.slice(0, 3)})-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const isValidPhone = (value) => value.replace(/\D/g, '').length === 10;

  const handleSubmit = async () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'message'];
    if (includeCompany) requiredFields.push('company');
    if (includeIndustry) requiredFields.push('industry');
    if (includePhone) requiredFields.push('phone');

    const missing = requiredFields.filter((field) => !String(form[field] || '').trim());
    if (missing.length > 0) {
      const labels = missing.map((field) => {
        if (field === 'firstName') return 'First Name';
        if (field === 'lastName') return 'Last Name';
        if (field === 'email') return 'Email';
        if (field === 'message') return 'Message';
        if (field === 'company') return 'Company';
        if (field === 'industry') return 'Industry';
        if (field === 'phone') return 'Phone';
        return field;
      });
      setStatus(`Please complete the required field(s): ${labels.join(', ')}.`);
      return;
    }

    if (!isValidEmail(form.email)) {
      setStatus('Email: invalid format. Please enter a valid email address, such as name@example.com.');
      return;
    }

    if (includePhone && !isValidPhone(form.phone)) {
      setStatus('Phone: 10 digits required. Please enter a valid number, for example: (310)-754-5644.');
      return;
    }

    setSubmitting(true);
    setStatus('');

    const payload = {
      source,
      subject: title,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      company: form.company.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      industry: form.industry.trim(),
      message: form.message.trim(),
    };

    const result = await submitContactForm(payload);

    setSubmitting(false);

    if (result.ok) {
      setForm({
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        phone: '',
        industry: '',
        message: '',
      });
      setStatus('Thank you. Your message has been submitted successfully.');
      return;
    }

    setStatus(result.error || 'There was a problem sending your inquiry. Please try again.');
  };

  return (
    <View {...anchorProps} style={[styles.contactForm, (compact || stacked) && styles.contactFormStacked, stacked && styles.contactFormFull]}>
      <Text style={[styles.eyebrow, styles.formEyebrow]}>SEND US A MESSAGE</Text>
      <Text style={styles.contactFormTitle}>{title}</Text>
      <View style={[styles.contactFormGrid, (compact || stacked) && styles.contactFormGridMobile]}>
        <TextInput
          style={[styles.contactInputHalf, (compact || stacked) && STACKED_FLEX_ITEM]}
          placeholder="First Name *"
          placeholderTextColor="#344A72"
          value={form.firstName}
          onChangeText={(value) => updateField('firstName', value)}
        />
        <TextInput
          style={[styles.contactInputHalf, (compact || stacked) && STACKED_FLEX_ITEM]}
          placeholder="Last Name *"
          placeholderTextColor="#344A72"
          value={form.lastName}
          onChangeText={(value) => updateField('lastName', value)}
        />
      </View>
      {includeCompany && (
        <TextInput
          style={styles.contactInput}
          placeholder="Company Name *"
          placeholderTextColor="#344A72"
          value={form.company}
          onChangeText={(value) => updateField('company', value)}
        />
      )}
      <View style={[styles.contactFormGrid, (compact || stacked) && styles.contactFormGridMobile]}>
        <TextInput
          style={[styles.contactInputHalf, (compact || stacked) && STACKED_FLEX_ITEM]}
          placeholder="Email *"
          placeholderTextColor="#344A72"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(value) => updateField('email', value)}
          autoCapitalize="none"
        />
        {includePhone && (
          <TextInput
            style={[styles.contactInputHalf, (compact || stacked) && STACKED_FLEX_ITEM]}
            placeholder="Phone Number *"
            placeholderTextColor="#344A72"
            keyboardType="number-pad"
            value={form.phone}
            onChangeText={(value) => updateField('phone', formatPhone(value))}
            maxLength={14}
          />
        )}
      </View>
      {includeIndustry && (
        <TextInput
          style={styles.contactInput}
          placeholder="Industry *"
          placeholderTextColor="#344A72"
          value={form.industry}
          onChangeText={(value) => updateField('industry', value)}
        />
      )}
      <TextInput
        style={[styles.contactInput, styles.contactMessageInput]}
        placeholder={source === 'business-problem' ? 'Describe your biggest business challenge...\nWhat is not working today and what outcome are you trying to achieve?' : 'How Can We Help? *\nTell us about your business, challenges, or goals...'}
        placeholderTextColor="#344A72"
        multiline
        value={form.message}
        onChangeText={(value) => updateField('message', value)}
      />
      <Btn label={buttonLabel} style={styles.contactSendButton} onPress={handleSubmit} disabled={submitting} />
      {status ? (
        <Text
          style={[
            styles.formStatus,
            (status.toLowerCase().includes('please complete') ||
              status.toLowerCase().startsWith('email:') ||
              status.toLowerCase().startsWith('phone:')) && styles.formStatusError,
            status.toLowerCase().includes('thank you') && styles.formStatusSuccess,
          ]}
        >
          {status}
        </Text>
      ) : null}
      <Text style={styles.contactFormNote}>🔒  Your information is confidential. We will never share your details.</Text>
    </View>
  );
}

function ContactPage({ isMobile, isPhone, onNavigate, section }) {
  const { scrollRef, anchor, scrollToAnchor } = useAnchors(section);
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView ref={scrollRef} contentContainerStyle={styles.page}>
        <Section
          bg={NAVY}
          image={require('./assets/contactus.png')}
          scrim={['rgba(4,16,31,0.82)', 'rgba(4,16,31,0.1)', 'rgba(4,16,31,0.28)']}
          style={styles.contactHero}
          shellStyle={styles.headerShell}
        >
          <SiteHeader onNavigate={onNavigate} activePage="contact" />
          <View style={[styles.contactHeroRow, isMobile && styles.contactHeroRowMobile]}>
            <View style={[styles.contactHeroCopy, isMobile && STACKED_CONTENT]}>
              <Eyebrow onDark>CONTACT US</Eyebrow>
              <Text style={styles.contactHeroTitle}>Let’s Start the</Text>
              <Text style={styles.contactHeroAccent}>Conversation.</Text>
              <Text style={styles.contactHeroText}>
                Tell us about your business challenges, goals, or ideas. Our team will get back to you quickly to discuss how RGF Intelligence Solutions can help.
              </Text>
              <View style={[styles.contactPromiseRow, isMobile && styles.contactPromiseRowMobile]}>
                {[
                  { Icon: UsersIcon, title: 'Real People', text: 'Real Conversations' },
                  { Icon: BulbIcon, title: 'Practical Solutions', text: 'Tailored to You' },
                  { Icon: BarChartIcon, title: 'A Partner', text: 'For What’s Next' },
                ].map(({ Icon, title, text }, index) => (
                  <View key={title} style={[styles.contactPromise, index > 0 && !isMobile && styles.contactPromiseDivider]}>
                    <Icon size={32} color={BLUE_LIGHT} />
                    <View><Text style={styles.contactPromiseTitle}>{title}</Text><Text style={styles.contactPromiseText}>{text}</Text></View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </Section>

        <Section bg="#FFFFFF" shellStyle={styles.contactShell}>
          <View {...anchor('connect')} style={[styles.contactContentRow, isMobile && styles.contactContentRowMobile]}>
            <View style={[styles.contactIntro, isMobile && STACKED_CONTENT]}>
              <Eyebrow>GET IN TOUCH</Eyebrow>
              <Text style={styles.sectionTitleDark}>Multiple Ways to Connect.</Text>
              <Text style={styles.contactBodyText}>Choose the option that works best for you. We’re here to help.</Text>
              <View style={[styles.contactCardGrid, isMobile && STACKED_GRID]}>
                {[
                  { Icon: ClockIcon, title: 'Phone', links: [
                    { value: '+1 214-620-0483', url: 'tel:+12146200483' },
                    { value: '+1 214-531-7929', url: 'tel:+12145317929' },
                    { value: '+1 214-631-9325', url: 'tel:+12146319325' },
                  ], text: 'Mon – Fri\n9:00 AM – 6:00 PM CST' },
                  { Icon: LinkIcon, title: 'Email', links: [{ value: 'info@rgfintelligencesolutions.com', url: 'mailto:info@rgfintelligencesolutions.com' }], text: 'We typically respond\nwithin 1 business day.' },
                  { Icon: HouseIcon, title: 'Let’s Meet', value: 'Virtual or In Person', text: 'We’re happy to schedule\na call or meeting at your convenience.' },
                  { Icon: UsersIcon, title: 'Follow Us', socials: [
                    { Icon: LinkedInIcon, label: 'LinkedIn' },
                    { Icon: YouTubeIcon, label: 'YouTube' },
                  ], text: 'Stay connected for the latest\ninsights and updates.' },
                ].map(({ Icon, title, value, links, socials, text }) => (
                  <View key={title} style={[styles.contactInfoCard, isMobile && GRID_ITEM_WIDE]}>
                    <View style={styles.contactInfoIcon}><Icon size={24} color="#FFFFFF" /></View>
                    <Text style={styles.contactInfoTitle}>{title}</Text>
                    {links ? links.map((link) => (
                      <LinkText key={link.url} style={styles.contactInfoValue} hoverStyle={styles.linkTextHover} activeStyle={styles.linkTextPressed} onPress={() => Linking.openURL(link.url)}>{link.value}</LinkText>
                    )) : socials ? (
                      <View style={styles.contactSocialRow}>
                        {socials.map(({ Icon: SocialIcon, label }) => (
                          <View key={label} style={styles.contactSocialItem}>
                            <SocialIcon size={20} />
                            <Text style={styles.contactInfoValue}>{label}</Text>
                          </View>
                        ))}
                      </View>
                    ) : (
                      <Text style={styles.contactInfoValue}>{value}</Text>
                    )}
                    <Text style={styles.contactInfoText}>{text}</Text>
                  </View>
                ))}
              </View>
            </View>

            <InquiryForm source="contact" includePhone stacked={isMobile} anchorProps={anchor('form', 'connect')} />
          </View>
        </Section>

        <Section bg="#F0F7FE" shellStyle={styles.contactLocationShell}>
          <View style={[styles.contactLocationRow, isMobile && styles.contactLocationRowMobile]}>
            <View style={[styles.contactLocationCopy, isMobile && styles.contactLocationCopyMobile, isMobile && STACKED_FLEX_ITEM]}>
              <Eyebrow>OUR LOCATION</Eyebrow>
              <Text style={styles.sectionTitleDark}>Based in Frisco, TX{ '\n' }Serving Businesses{ '\n' }Everywhere.</Text>
              <Text style={styles.contactBodyText}>We work with clients across the U.S. and globally, with a strong focus on the Dallas–Fort Worth area and beyond.</Text>
              <Btn label="SCHEDULE A CALL  →" onPress={() => scrollToAnchor('form')} />
            </View>
            <View style={[styles.contactMap, isMobile && styles.contactMapMobile, isMobile && STACKED_FLEX_ITEM]}>
              <Image source={require('./assets/dallas.png')} style={styles.contactMapImage} resizeMode="contain" />
              <Text style={styles.contactMapLabel}>UNITED STATES</Text>
              <View style={styles.contactMapLine} />
              <View style={styles.contactMapPin}><Text style={styles.contactMapPinText}>Frisco, TX</Text></View>
            </View>
            <View style={[styles.contactLocationPoints, isMobile && styles.contactLocationPointsMobile, isMobile && STACKED_FLEX_ITEM]}>
              {[
                ['Local Expertise', 'Global Reach'],
                ['Onsite or Virtual Meetings', 'Your Preference'],
                ['Responsive Communication', 'We’re Here When You Need Us'],
                ['Long-Term Partnership', 'Built On Trust'],
              ].map(([title, text], index) => <View key={title} style={styles.contactLocationPoint}><Text style={styles.contactLocationPointIcon}>{['◎', '♧', '◷', '◇'][index]}</Text><View><Text style={styles.contactLocationPointTitle}>{title}</Text><Text style={styles.contactLocationPointText}>{text}</Text></View></View>)}
            </View>
          </View>
        </Section>

        <Section bg={NAVY} image={require('./assets/bgimg.png')} scrim={['rgba(4,16,31,0.72)', 'rgba(4,16,31,0.42)', 'rgba(4,16,31,0.68)']} shellStyle={styles.contactClosingShell}>
          <View style={[styles.contactClosingRow, isMobile && styles.contactClosingRowMobile]}>
            <View style={isMobile && CENTER_BLOCK}>
              <Eyebrow onDark style={isMobile && CENTER_TEXT}>READY TO TAKE THE NEXT STEP?</Eyebrow>
              <Text style={[styles.sectionTitleLight, isMobile && CENTER_TEXT]}>Turn Your Business Challenges{isMobile ? ' ' : '\n'}Into Real Solutions.</Text>
              <Text style={[styles.contactClosingText, isMobile && CENTER_TEXT]}>Whether you’re exploring ideas or ready to get started, we’d love to hear from you.</Text>
            </View>
            <Btn label="TELL US YOUR BUSINESS PROBLEM  →" onPress={() => scrollToAnchor('form')} style={isMobile && CENTER_SELF} />
          </View>
        </Section>

        <SiteFooter isMobile={isMobile} onNavigate={onNavigate} showHomeLink />
      </ScrollView>
    </SafeAreaView>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async () => {
    if (!isValidEmail(email)) {
      setStatus('Email: invalid format. Please enter a valid email address, such as name@example.com.');
      return;
    }
    setSubmitting(true);
    setStatus('');
    const result = await submitContactForm({
      source: 'newsletter',
      subject: 'Newsletter Subscription',
      email: email.trim(),
      message: 'Please subscribe this email address to RGF insights.',
    });
    setSubmitting(false);
    if (result.ok) {
      setEmail('');
      setStatus('Thank you. You are subscribed to RGF insights.');
    } else {
      setStatus('We could not complete your subscription right now. Please try again later.');
    }
  };

  return (
    <>
      <View style={styles.insightsSubscribeForm}>
        <TextInput
          style={styles.insightsSubscribeInput}
          placeholder="Enter your email address"
          placeholderTextColor="#6D7890"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={handleSubscribe}
        />
        <Btn label="SUBSCRIBE  →" onPress={handleSubscribe} disabled={submitting} />
      </View>
      {status ? (
        <Text style={[styles.formStatus, status.startsWith('Thank you') ? styles.formStatusSuccess : styles.formStatusError]}>{status}</Text>
      ) : null}
    </>
  );
}

function InsightsPage({ isMobile, isPhone, onNavigate, section }) {
  const { scrollRef, anchor, scrollToAnchor } = useAnchors(section);
  const featured = [
    { tag: 'TREND', title: 'The Practical Impact of AI\nfor Growing Businesses', text: 'How small and mid-sized companies are using AI and automation to save time, reduce costs, and compete at a higher level.', image: require('./assets/01-ai-intelligence.png') },
    { tag: 'GUIDE', title: 'A Step-by-Step Guide to\nProcess Automation', text: 'A practical framework to identify, prioritize, and automate the right processes in your business.', image: require('./assets/1.admin.png') },
    { tag: 'CASE STUDY', title: 'From Manual to Modern:\nA Real-World Transformation', text: 'How a mid-market company streamlined operations, integrated systems, and achieved measurable results.', image: require('./assets/05-business-advisory.png') },
  ];
  const topics = [
    [BulbIcon, 'AI & Automation'], [BarChartIcon, 'Data & Analytics'], [TrendIcon, 'Business Strategy'],
    [LinkIcon, 'Technology & Integration'], [GearIcon, 'Operational Excellence'], [BuildingIcon, 'Industry Perspectives'], [StoreIcon, 'Customer Success'],
  ];
  const latest = [
    ['5 Ways Automation Helps You Scale Without Adding Overhead', 'Sep 12, 2026', require('./assets/2.arch.png')],
    ['Turning Data into Decisions: A Practical Guide for Business Leaders', 'Sep 5, 2026', require('./assets/03-data-analytics.png')],
    ['Why Integration Matters: Breaking Down Silos for Real Growth', 'Aug 28, 2026', require('./assets/04-cloud-transformation.png')],
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView ref={scrollRef} contentContainerStyle={styles.page}>
        <Section
          bg={NAVY}
          image={require('./assets/insightsbg.png')}
          scrim={['rgba(4,16,31,0.86)', 'rgba(4,16,31,0.42)', 'rgba(4,16,31,0.7)']}
          style={styles.insightsHero}
          shellStyle={styles.headerShell}
        >
          <SiteHeader onNavigate={onNavigate} activePage="insights" />
          <View style={[styles.insightsHeroRow, isMobile && styles.insightsHeroRowMobile]}>
            <View style={[styles.insightsHeroCopy, isMobile && STACKED_CONTENT]}>
              <Eyebrow onDark>INSIGHTS</Eyebrow>
              <Text style={styles.insightsHeroTitle}>Real Ideas.</Text>
              <Text style={styles.insightsHeroAccent}>Real Impact.</Text>
              <Text style={styles.insightsHeroText}>Practical insights, proven strategies, and real-world examples to help you solve today’s challenges and prepare for tomorrow.</Text>
              <Btn label="EXPLORE INSIGHTS  →" onPress={() => scrollToAnchor('featured')} />
            </View>
            {!isMobile && <View style={styles.insightsHeroAside}><Text style={styles.insightsHeroAsideText}>TRENDS{ '\n' }IDEAS{ '\n' }GUIDES{ '\n' }CASE STUDIES{ '\n' }EXPERT PERSPECTIVES</Text><View style={styles.heroWordsRule} /><Text style={styles.insightsHeroQuote}>“Knowledge{ '\n' }turns challenges{ '\n' }into opportunities.”</Text></View>}
          </View>
        </Section>

        <Section bg="#F0F7FE" shellStyle={styles.insightsTopicStripShell}>
          <View style={[styles.insightsTopicStrip, isMobile && STACKED_GRID]}>
            {[[BarChartIcon, 'Industry Trends', "What's shaping tomorrow"], [DatabaseIcon, 'Practical Guides', 'Actionable strategies'], [UsersIcon, 'Expert Perspectives', 'Real-world experience'], [BulbIcon, 'Customer Success', 'Ideas in action']].map(([Icon, title, text]) => (
              <View key={title} style={[styles.insightsTopicFeature, isMobile && GRID_ITEM_HALF, isMobile && FLUSH_ITEM]}><Icon size={32} color={BLUE} /><View><Text style={styles.insightsTopicTitle}>{title}</Text><Text style={styles.insightsTopicText}>{text}</Text></View></View>
            ))}
          </View>
        </Section>

        <Section bg="#FFFFFF" shellStyle={styles.insightsShell} {...anchor('featured')}>
          <View style={[styles.insightsHeading, isMobile && styles.insightsHeadingMobile]}><View><Eyebrow>FEATURED INSIGHTS</Eyebrow><Text style={styles.insightsSectionTitle}>Ideas and Knowledge to Move Your Business Forward.</Text></View>{!isMobile && <LinkText style={styles.linkText} hoverStyle={styles.linkTextHover} activeStyle={styles.linkTextPressed} onPress={() => scrollToAnchor('latest')}>VIEW ALL INSIGHTS  →</LinkText>}</View>
          <View style={[styles.insightsFeaturedGrid, isMobile && styles.insightsFeaturedGridMobile]}>
            {featured.map((item) => <View key={item.title} style={[styles.insightCard, isMobile && STACKED_FLEX_ITEM]}><View style={styles.insightCardImageWrap}><Image source={item.image} style={styles.insightCardImage} resizeMode="cover" /><Text style={styles.insightCardTag}>{item.tag}</Text></View><View style={styles.insightCardBody}><Text style={styles.insightCardTitle}>{item.title}</Text><Text style={styles.insightCardText}>{item.text}</Text></View></View>)}
          </View>

          <Eyebrow>BROWSE INSIGHTS BY TOPIC</Eyebrow>
          <View style={[styles.insightsTopicGrid, isMobile && styles.insightsTopicGridMobile]}>
            {topics.map(([Icon, title]) => <View key={title} style={styles.insightsTopicCard}><Image source={require('./assets/03-data-analytics.png')} style={styles.insightsTopicCardImage} resizeMode="cover" /><Icon size={22} color={BLUE} /><Text style={styles.insightsTopicCardTitle}>{title}</Text></View>)}
          </View>

          <View {...anchor('latest', 'featured')} style={[styles.insightsLatestRow, isMobile && styles.insightsLatestRowMobile]}>
            <View style={[styles.insightsLatest, isMobile && STACKED_CONTENT]}><Eyebrow>LATEST INSIGHTS</Eyebrow>{latest.map(([title, date, image]) => <View key={title} style={styles.insightsLatestItem}><Image source={image} style={styles.insightsLatestImage} resizeMode="cover" /><View style={styles.insightsLatestCopy}><Text style={styles.insightsLatestTitle}>{title}</Text><Text style={styles.insightsLatestDate}>{date}</Text></View><Text style={styles.insightsLatestArrow}>→</Text></View>)}</View>
            <View style={[styles.insightsSubscribe, isMobile && STACKED_CONTENT]}><Eyebrow>STAY INFORMED</Eyebrow><Text style={styles.insightsSubscribeTitle}>Insights Delivered{ '\n' }to Your Inbox.</Text><Text style={styles.insightsSubscribeText}>Get the latest articles, guides, and industry perspectives — no spam, just valuable insights.</Text><NewsletterForm /></View>
          </View>
        </Section>

        <Section bg={NAVY} image={require('./assets/bgimg.png')} scrim={['rgba(4,16,31,0.82)', 'rgba(4,16,31,0.42)', 'rgba(4,16,31,0.75)']} shellStyle={styles.insightsClosingShell}>
          <View style={[styles.insightsClosingRow, isMobile && styles.insightsClosingRowMobile]}><View style={[styles.insightsClosingCopy, isMobile && STACKED_CONTENT, isMobile && CENTER_BLOCK]}><Eyebrow onDark style={isMobile && CENTER_TEXT}>TURN INSIGHTS INTO ACTION</Eyebrow><Text style={[styles.sectionTitleLight, isMobile && CENTER_TEXT]}>Let’s Solve Your Business Problem.</Text><Text style={[styles.insightsClosingText, isMobile && CENTER_TEXT]}>Talk with our team to explore how these insights can create real results for your organization.</Text></View><Btn label="SCHEDULE A CONSULTATION  →" onPress={() => onNavigate('contact', 'form')} style={isMobile && CENTER_SELF} /></View>
        </Section>
        <SiteFooter isMobile={isMobile} onNavigate={onNavigate} showHomeLink />
      </ScrollView>
    </SafeAreaView>
  );
}

// whyit.png is 2073x758 and its only focal point (the four-circle graphic) spans 58%–82% of the
// width. Scale the image to the panel height and slide it so that graphic ends 16px from the
// panel's right edge, leaving the left side free for the STRATEGY → RESULTS labels.
const WHY_IMAGE_RATIO = 2073 / 758;
const WHY_FOCUS_RIGHT = 0.82;

function whyImageFrame({ width, height }) {
  const imageWidth = height * WHY_IMAGE_RATIO;
  const left = Math.min(0, Math.max(width - imageWidth, width - 16 - WHY_FOCUS_RIGHT * imageWidth));
  return { left, width: imageWidth, height };
}

function HowWeWorkPage({ isMobile, isPhone, onNavigate, section }) {
  const { scrollRef, anchor, scrollToAnchor } = useAnchors(section);
  const [whyPanel, setWhyPanel] = useState(null);
  const steps = [
    { number: '01', Icon: BulbIcon, title: 'Discover', subtitle: 'Understand Your Business', text: 'We learn about your organization, goals, challenges, people, processes and existing technology.', image: require('./assets/1.admin.png') },
    { number: '02', Icon: BarChartIcon, title: 'Diagnose', subtitle: 'Identify Opportunities', text: 'We analyze your operations, data and systems to find root causes, inefficiencies, bottlenecks and high-value opportunities.', image: require('./assets/03-data-analytics.png') },
    { number: '03', Icon: BulbIcon, title: 'Design', subtitle: 'Create the Right Solution', text: 'We design a tailored solution that aligns with your goals, people, processes and technology environment.', image: require('./assets/2.arch.png') },
    { number: '04', Icon: GearIcon, title: 'Build', subtitle: 'Develop & Configure', text: 'We develop, configure, and integrate the solution using the right technologies, tools and best practices.', image: require('./assets/3.sales.png') },
    { number: '05', Icon: TrendIcon, title: 'Implement', subtitle: 'Deploy & Enable', text: 'We deploy the solution, test thoroughly, provide training and ensure smooth adoption across your organization.', image: require('./assets/05-business-advisory.png') },
    { number: '06', Icon: BarChartIcon, title: 'Optimize', subtitle: 'Measure & Grow', text: 'We monitor performance, refine as needed and help you scale results with continuous improvement.', image: require('./assets/04-cloud-transformation.png') },
  ];
  const principles = [['Collaborative', 'We listen and work as an extension of your team.'], ['Practical', 'Real-world solutions, not just theory.'], ['Results-Focused', 'We measure what matters.'], ['Long-Term', 'Ongoing support to help you grow.']];
  const outcomes = [['Higher Efficiency', 'Eliminate manual work and reduce costs.', ClockIcon], ['Better Decision-Making', 'Turn data into actionable insights.', BarChartIcon], ['Improved Customer Experience', 'Faster, more consistent service.', UsersIcon], ['Stronger Operations', 'Connected systems and streamlined workflows.', GearIcon], ['Measurable Growth', 'Real results that scale with your business.', TrendIcon]];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView ref={scrollRef} contentContainerStyle={styles.page}>
        <Section bg={NAVY} image={require('./assets/howweworkbg.png')} scrim={['rgba(4,16,31,0.76)', 'rgba(4,16,31,0.2)', 'rgba(4,16,31,0.48)']} style={styles.howHero} shellStyle={styles.headerShell}>
          <SiteHeader onNavigate={onNavigate} activePage="how" />
          <View style={[styles.howHeroRow, isMobile && styles.howHeroRowMobile]}>
            <View style={[styles.howHeroCopy, isMobile && STACKED_CONTENT]}>
              <Eyebrow onDark>HOW WE WORK</Eyebrow>
              <Text style={styles.howHeroTitle}>A Clear Process.</Text>
              <Text style={styles.howHeroAccent}>Real Results.</Text>
              <Text style={styles.howHeroText}>We take a business-first approach, combining strategy, technology, and real-world execution to solve your most important challenges and create lasting results.</Text>
              <View style={[styles.howHeroButtons, isMobile && styles.howHeroButtonsMobile]}><Btn label="SCHEDULE A CONSULTATION  →" onPress={() => onNavigate('contact', 'form')} /><Btn label="EXPLORE OUR APPROACH" variant="outline" onDark onPress={() => scrollToAnchor('process')} /></View>
              <View style={[styles.howHeroTrust, isMobile && styles.howHeroTrustMobile]}>{[[UsersIcon, 'People', 'Focused'], [GearIcon, 'Technology', 'Enabled'], [BarChartIcon, 'Results', 'Driven']].map(([Icon, title, text]) => <View key={title} style={[styles.howHeroTrustItem, isMobile && styles.howHeroTrustItemMobile]}><Icon size={28} color={BLUE_LIGHT} /><View><Text style={styles.howHeroTrustTitle}>{title}</Text><Text style={styles.howHeroTrustText}>{text}</Text></View></View>)}</View>
            </View>
            {!isMobile && <View style={styles.howHeroAside}><Text style={styles.howHeroAsideText}>STRATEGY{ '\n' }PEOPLE{ '\n' }TECHNOLOGY{ '\n' }EXECUTION{ '\n' }RESULTS</Text><View style={styles.heroWordsRule} /><Text style={styles.howHeroQuote}>Turning business{ '\n' }problems into{ '\n' }real solutions.</Text></View>}
          </View>
        </Section>

        <Section bg="#FFFFFF" shellStyle={styles.howShell} {...anchor('process')}>
          <View style={[styles.howHeading, isMobile && styles.howHeadingMobile]}><View><Eyebrow>OUR PROCESS</Eyebrow><Text style={styles.howSectionTitle}>From Challenge to Opportunity.</Text><Text style={styles.howIntroText}>We follow a proven, step-by-step approach designed to understand your business, design the right solution, and deliver measurable results.</Text></View>{!isMobile && <LinkText style={styles.linkText} hoverStyle={styles.linkTextHover} activeStyle={styles.linkTextPressed} onPress={() => scrollToAnchor('partnership')}>OUR APPROACH  →</LinkText>}</View>
          <View style={[styles.howStepsGrid, isMobile && STACKED_GRID]}>{steps.map(({ number, Icon, title, subtitle, text, image }) => <View key={number} style={[styles.howStep, isMobile && GRID_ITEM_WIDE]}><View style={styles.howStepImageWrap}><Image source={image} style={styles.howStepImage} resizeMode="cover" /><Text style={styles.howStepNumber}>{number}</Text><View style={styles.howStepIcon}><Icon size={20} color={BLUE} /></View></View><View style={styles.howStepTitleRow}><View style={styles.howStepTitleCopy}><Text style={styles.howStepTitle}>{title}</Text><Text style={styles.howStepSubtitle}>{subtitle}</Text></View><Text style={styles.howStepArrow}>→</Text></View><Text style={styles.howStepText}>{text}</Text></View>)}</View>
        </Section>

        <Section bg="#F0F7FE" shellStyle={styles.howPartnershipShell} {...anchor('partnership')}><View style={[styles.howPartnershipRow, isMobile && styles.howPartnershipRowMobile]}><View style={[styles.howPartnershipCopy, isMobile && STACKED_FLEX_ITEM]}><Eyebrow>PARTNERSHIP APPROACH</Eyebrow><Text style={styles.howSectionTitle}>More Than a Vendor — A True Partner.</Text><Text style={styles.howIntroText}>We work alongside your team, combining our expertise with your industry knowledge to deliver practical solutions that create real, measurable value.</Text></View><View style={[styles.howPrinciples, isMobile && STACKED_FLEX_ITEM, isMobile && STACKED_GRID, isMobile && styles.howPrinciplesMobile]}>{principles.map(([title, text], index) => <View key={title} style={[styles.howPrinciple, isMobile && GRID_ITEM_HALF, index > 0 && !isMobile && styles.howPrincipleDivider]}><UsersIcon size={30} color={BLUE} /><Text style={styles.howPrincipleTitle}>{title}</Text><Text style={styles.howPrincipleText}>{text}</Text></View>)}</View></View></Section>

        <Section bg="#FFFFFF" shellStyle={styles.howOutcomeShell}><View style={[styles.howOutcomeRow, isMobile && styles.howOutcomeRowMobile]}><View style={[styles.howWhy, isMobile && STACKED_FLEX_ITEM, isMobile && styles.howWhyMobile]}><Eyebrow onDark>WHY IT WORKS</Eyebrow><Text style={[styles.howSectionTitle, styles.howWhyTitle]}>Business First.{ '\n' }Technology Second.{ '\n'}<Text style={{ color: BLUE_LIGHT }}>Results Always.</Text></Text><Text style={[styles.howIntroText, styles.howWhyText]}>We start with your business problem, not a predefined technology. This ensures the right solution, greater adoption and measurable outcomes.</Text><Btn label="SEE REAL-WORLD EXAMPLES  →" onPress={() => onNavigate('insights', 'featured')} /></View><View style={[styles.howOutcomeImage, isMobile && STACKED_FLEX_ITEM]} onLayout={(event) => setWhyPanel(event.nativeEvent.layout)}>{whyPanel && <Image source={require('./assets/whyit.png')} style={[styles.howOutcomePhoto, whyImageFrame(whyPanel)]} resizeMode="cover" />}<View style={styles.howOutcomeOverlay} /><Text style={[styles.howOutcomePath, isPhone && styles.howOutcomePathPhone]}>STRATEGY{ '\n' }  SOLUTION{ '\n' }    EXECUTION{ '\n' }      RESULTS</Text></View><View style={[styles.howOutcomeList, isMobile && STACKED_FLEX_ITEM, isMobile && styles.howOutcomeListMobile]}><Eyebrow>TYPICAL OUTCOMES</Eyebrow>{outcomes.map(([title, text, Icon]) => <View key={title} style={styles.howOutcomeItem}><Icon size={26} color={BLUE} /><View style={styles.howOutcomeCopy}><Text style={styles.howOutcomeTitle}>{title}</Text><Text style={styles.howOutcomeText}>{text}</Text></View></View>)}</View></View></Section>

        <Section bg={NAVY} image={require('./assets/bgimg.png')} scrim={['rgba(4,16,31,0.82)', 'rgba(4,16,31,0.42)', 'rgba(4,16,31,0.75)']} shellStyle={styles.howClosingShell}><View style={[styles.howClosingRow, isMobile && styles.howClosingRowMobile]}><View style={[styles.howClosingCopy, isMobile && STACKED_CONTENT, isMobile && CENTER_BLOCK]}><Eyebrow onDark style={isMobile && CENTER_TEXT}>READY TO GET STARTED?</Eyebrow><Text style={[styles.sectionTitleLight, isMobile && CENTER_TEXT]}>Let’s Solve Your Business Problem.</Text><Text style={[styles.howClosingText, isMobile && CENTER_TEXT]}>Tell us about your challenges and we’ll help you identify the right next step.</Text></View><Btn label="TELL US YOUR BUSINESS PROBLEM  →" onPress={() => onNavigate('contact', 'form')} style={isMobile && CENTER_SELF} /></View></Section>
        <SiteFooter isMobile={isMobile} onNavigate={onNavigate} showHomeLink />
      </ScrollView>
    </SafeAreaView>
  );
}

function IndustriesPage({ isMobile, isPhone, onNavigate, section }) {
  const { scrollRef, anchor, scrollToAnchor } = useAnchors(section);
  const industries = [
    { Icon: HouseIcon, title: 'Healthcare & Provider Organizations', text: 'Secure workflows, operational visibility, patient experience improvements, and digital modernization for healthcare teams.', points: ['Patient operations support', 'Workflow automation', 'Secure digital transformation'] },
    { Icon: BuildingIcon, title: 'Financial Services & Fintech', text: 'Operational efficiency, transaction workflows, compliance support, and digital enablement for finance-focused organizations.', points: ['Operations modernization', 'Process automation', 'Scalable financial workflows'] },
    { Icon: ShieldIcon, title: 'Insurance & Risk Management', text: 'Policy, claims, and service workflows designed to improve speed, accuracy, and customer experience.', points: ['Claims process improvement', 'Customer service enablement', 'Operational analytics'] },
    { Icon: StoreIcon, title: 'Commercial & Business Services', text: 'Back-office productivity, customer experience, CRM support, and practical digital systems for growing businesses.', points: ['CRM & service workflows', 'Business operations support', 'Growth-focused automation'] },
    { Icon: GearIcon, title: 'ERP, CRM & Business Systems', text: 'Architecture, integration, and optimization for enterprise platforms that keep teams connected and operating efficiently.', points: ['ERP strategy & support', 'CRM modernization', 'System integration design'] },
    { Icon: TruckIcon, title: 'Cloud & Digital Transformation', text: 'Migration planning, cloud architecture, platform modernization, and secure execution across business-critical systems.', points: ['Cloud strategy', 'Modern architecture', 'Migration support & governance'] },
    { Icon: UsersIcon, title: 'Professional Services', text: 'Client delivery, resource planning, document management, and modernization of business operations.', points: ['Service delivery excellence', 'Operational visibility', 'AI-enabled productivity'] },
    { Icon: BuildingIcon, title: 'Manufacturing & Industrial Operations', text: 'Production visibility, operational efficiency, process improvement, and connected systems for modern manufacturing environments.', points: ['Production workflow support', 'Operational analytics', 'Process automation'] },
    { Icon: BuildingIcon, title: 'Construction, Real Estate & Property Operations', text: 'Workforce coordination, service workflows, portfolio reporting, and operational consistency across locations.', points: ['Field operations', 'Portfolio analytics', 'Maintenance & tenant experience'] },
    { Icon: StoreIcon, title: 'Retail, Franchises & Consumer Businesses', text: 'Sales enablement, customer engagement, operating insights, and digital experience improvements.', points: ['Store operations support', 'Customer experience design', 'Digital transformation planning'] },
    { Icon: HouseIcon, title: 'Transportation & Logistics', text: 'Fleet visibility, dispatch optimization, route efficiency, and data-backed operational decision making.', points: ['Operations visibility', 'Routing & scheduling', 'Inventory and delivery insights'] },
    { Icon: GearIcon, title: 'Other Industries & Growth Businesses', text: 'Tailored strategy, architecture, development, and transformation support for organizations with unique operating demands.', points: ['Custom digital strategy', 'Industry-specific automation', 'Operational modernization'] },
  ];

  const capabilities = [
    ['Business Strategy', 'We help leaders clarify objectives, improve operations, and align technology investments with long-term business goals across regulated and growth-focused environments.'],
    ['Cloud & Infrastructure', 'From cloud migration planning to platform modernization, we support secure, scalable, and resilient environments that business teams can rely on.'],
    ['Architecture & Governance', 'We design systems and standards that support reliability, integration, security, and long-term maintainability, including ERP and cloud ecosystems.'],
    ['AI & Automation', 'We build AI-assisted workflows, intelligent automation, and practical business solutions that reduce friction and increase throughput across departments.'],
    ['Application Development', 'We design and implement custom tools, client portals, automations, and digital experiences tailored to your business, industry, and operational realities.'],
    ['Data & Analytics', 'We turn operational data into dashboards, reporting, and decision-ready insights that improve visibility, performance, and business accountability.'],
    ['Domain-Specific Enablement', 'From healthcare and insurance workflows to financial operations and commercial services, we adapt strategy and solutions to each market’s demands and constraints.'],
  ];

  const process = [
    ['Discover', 'We understand your industry, your operations, and your business objectives.'],
    ['Design', 'We define the right strategy, architecture, and technology approach for your environment.'],
    ['Deliver', 'We implement practical solutions and support adoption so results can be measured and scaled.'],
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView ref={scrollRef} contentContainerStyle={styles.page}>
        <Section
          bg={NAVY}
          image={require('./assets/industriesbg.png')}
          scrim={['rgba(4,16,31,0.76)', 'rgba(4,16,31,0.2)', 'rgba(4,16,31,0.48)']}
          style={styles.solutionHero}
          shellStyle={styles.headerShell}
        >
          <SiteHeader onNavigate={onNavigate} activePage="industries" />
          <View style={[styles.solutionHeroRow, isMobile && styles.solutionHeroRowMobile]}>
            <View style={[styles.solutionHeroCopy, isMobile && STACKED_CONTENT]}>
              <Eyebrow onDark>INDUSTRIES</Eyebrow>
              <Text style={styles.solutionHeroTitle}>Flexible Solutions for the Industries You Serve.</Text>
              <Text style={styles.solutionHeroText}>
                We support organizations across healthcare, financial services, insurance, commercial businesses, ERP-driven companies, and cloud-focused transformation programs. From strategy and architecture to development, migration, and operational enablement, we help businesses modernize with confidence and deliver measurable results.
              </Text>
              <View style={[styles.solutionHeroButtons, isMobile && styles.solutionHeroButtonsMobile]}>
                <Btn label="TELL US YOUR BUSINESS PROBLEM →" onPress={() => onNavigate('contact', 'form')} />
                <Btn label="SCHEDULE A CONSULTATION" variant="outline" onDark onPress={() => onNavigate('contact', 'form')} />
              </View>
            </View>
            {!isMobile && (
              <View style={styles.solutionHeroQuote}>
                <Text style={styles.solutionHeroQuoteText}>STRATEGY{ '\n' }CLOUD{ '\n' }ARCHITECTURE{ '\n' }DEVELOPMENT{ '\n' }RESULTS</Text>
                <View style={styles.heroWordsRule} />
                <Text style={styles.solutionHeroQuoteAccent}>“Technology should support how your business actually works.”</Text>
              </View>
            )}
          </View>
        </Section>

        <Section bg="#F0F7FE" shellStyle={styles.solutionTrustShell}>
          <View style={[styles.solutionTrustRow, isMobile && STACKED_GRID]}>
            {[
              { Icon: GearIcon, title: 'Business & Industry', text: 'Context' },
              { Icon: BuildingIcon, title: 'Cloud', text: 'Support' },
              { Icon: BarChartIcon, title: 'Data &', text: 'Insights' },
              { Icon: ShieldIcon, title: 'Trusted', text: 'Execution' },
            ].map((item, index) => (
              <View key={item.title} style={[styles.solutionTrustItem, isMobile && GRID_ITEM_HALF, isMobile && styles.solutionTrustItemMobile, index > 0 && !isMobile && styles.solutionTrustDivider]}>
                <item.Icon size={30} color={BLUE} />
                <View><Text style={styles.solutionTrustTitle}>{item.title}</Text><Text style={styles.solutionTrustText}>{item.text}</Text></View>
              </View>
            ))}
          </View>
        </Section>

        <Section bg="#FFFFFF" shellStyle={styles.solutionShell}>
          <View style={styles.solutionSectionHeading}>
            <View style={styles.solutionIntroCopy}>
              <Eyebrow>INDUSTRY FOCUS</Eyebrow>
              <Text style={styles.sectionTitleDark}>Built for the Real Demands of Modern Operations.</Text>
              <Text style={styles.solutionIntroText}>We work with organizations that need practical support across strategy, process improvement, systems, cloud, and digital execution. The challenges may differ by industry, but the need for clarity, scalability, and measurable value is consistent.</Text>
            </View>
          </View>
          <View style={[styles.solutionGrid, isMobile && STACKED_GRID]}>
            {industries.map((item) => (
              <View key={item.title} style={[styles.solutionVisualCard, isMobile && GRID_ITEM_WIDE]}>
                <View style={styles.industryCardTop}><item.Icon size={28} color={BLUE} /><Text style={styles.industryCardTitle}>{item.title}</Text></View>
                <View style={[styles.solutionVisualBody, isMobile && styles.solutionVisualBodyMobile]}>
                  <Text style={styles.solutionVisualSubtitle}>{item.text}</Text>
                  {item.points.map((point) => <Text key={point} style={styles.solutionBullet}>•  {point}</Text>)}
                </View>
              </View>
            ))}
          </View>
        </Section>

        <Section bg="#F0F7FE" shellStyle={styles.solutionApproachShell}>
          <View style={styles.solutionSectionHeading}>
            <View style={styles.solutionIntroCopy}>
              <Eyebrow>WHAT WE DELIVER</Eyebrow>
              <Text style={styles.sectionTitleDark}>Support for Strategy, Systems, and Growth.</Text>
              <Text style={styles.solutionIntroText}>Our work is designed to help your business improve how it operates — with the right mix of technology, process, governance, and execution support.</Text>
            </View>
          </View>
          <View style={[styles.industryCapabilityGrid, isMobile && styles.industryCapabilityGridMobile]}>
            {capabilities.map(([title, text]) => (
              <View key={title} style={[styles.industryCapabilityItem, isMobile && styles.industryCapabilityItemMobile, isMobile && STACKED_FLEX_ITEM]}>
                <Text style={styles.industryCapabilityTitle}>{title}</Text>
                <Text style={styles.industryCapabilityText}>{text}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section bg="#FFFFFF" shellStyle={styles.solutionApproachShell}>
          <View style={styles.solutionSectionHeading}>
            <View style={styles.solutionIntroCopy}>
              <Eyebrow>OUR APPROACH</Eyebrow>
              <Text style={styles.sectionTitleDark}>A Practical Path From Challenge to Value.</Text>
            </View>
          </View>
          <View style={[styles.solutionApproachRow, isMobile && STACKED_GRID]}>
            {process.map((step, index) => (
              <View key={step[0]} style={[styles.solutionApproachItem, isMobile && GRID_ITEM_THIRD_WIDE, index > 0 && !isMobile && styles.solutionApproachDivider]}>
                <Text style={styles.solutionStepNumber}>{String(index + 1).padStart(2, '0')}</Text>
                <Text style={styles.solutionStepTitle}>{step[0]}</Text>
                <Text style={[styles.solutionStepText, isMobile && styles.solutionStepTextMobile]}>{step[1]}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section bg={NAVY} image={require('./assets/bgimg.png')} scrim={['rgba(4,16,31,0.82)', 'rgba(4,16,31,0.42)', 'rgba(4,16,31,0.75)']} shellStyle={styles.howClosingShell}>
          <View style={[styles.howClosingRow, isMobile && styles.howClosingRowMobile]}>
            <View style={[styles.howClosingCopy, isMobile && STACKED_CONTENT, isMobile && CENTER_BLOCK]}>
              <Eyebrow onDark style={isMobile && CENTER_TEXT}>READY TO BUILD FOR YOUR INDUSTRY?</Eyebrow>
              <Text style={[styles.sectionTitleLight, isMobile && CENTER_TEXT]}>Let’s Solve Your Business Problem.</Text>
              <Text style={[styles.howClosingText, isMobile && CENTER_TEXT]}>Tell us where your operations are challenged and we’ll help identify the right strategy, technology, and delivery path for your business.</Text>
            </View>
            <Btn label="TELL US YOUR BUSINESS PROBLEM  →" onPress={() => onNavigate('contact', 'form')} style={isMobile && CENTER_SELF} />
          </View>
        </Section>

        <SiteFooter isMobile={isMobile} onNavigate={onNavigate} showHomeLink />
      </ScrollView>
    </SafeAreaView>
  );
}

function WhoWeArePage({ isMobile, isPhone, onNavigate, section }) {
  const { scrollRef, anchor, scrollToAnchor } = useAnchors(section);
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView ref={scrollRef} contentContainerStyle={styles.page}>
        <Section
          bg={NAVY}
          image={require('./assets/bg2.png')}
          scrim={['rgba(4,16,31,0.58)', 'rgba(4,16,31,0.2)', 'rgba(4,16,31,0.5)']}
          style={styles.whoHero}
          shellStyle={styles.whoShell}
        >
          <SiteHeader onNavigate={onNavigate} activePage="who" />
          <View style={[styles.whoHeroRow, isMobile && styles.whoHeroRowMobile]}>
            <View style={[styles.whoHeroCopy, isMobile && STACKED_CONTENT]}>
              <Eyebrow onDark>ABOUT RGF</Eyebrow>
              <Text style={styles.whoHeroTitle}>Who We Are</Text>
              <Text style={styles.whoHeroTitleAccent}>And Why We Exist.</Text>
              <Text style={styles.whoHeroText}>
                RGF Intelligence Solutions is a technology and AI consulting partner committed to helping
                businesses solve real problems, improve efficiency, and unlock new opportunities through
                intelligent solutions.
              </Text>
              <Btn label="VIEW OUR SOLUTIONS →" onPress={() => onNavigate('solution')} style={{ marginTop: 16 }} />
            </View>
            {!isMobile && (
              <View style={styles.whoHeroQuote}>
                <Text style={styles.whoHeroQuoteText}>Better Systems.{"\n"}Smarter Decisions.{"\n"}Greater Impact.</Text>
                <View style={styles.heroWordsRule} />
              </View>
            )}
          </View>
        </Section>

        <Section bg="#FFFFFF" shellStyle={styles.whoShell}>
          <View style={[styles.whoStoryRow, isMobile && styles.whoStoryRowMobile]}>
            <View style={[styles.whoStoryCopy, isMobile && styles.whoStoryCopyMobile]}>
              <Eyebrow>OUR STORY</Eyebrow>
              <Text style={[styles.sectionTitleDark, styles.whoSectionTitleDark]}>Built on Experience.{"\n"}Driven by Innovation.</Text>
              <Text style={styles.whoBodyText}>
                RGF was founded with a simple belief: technology should make business easier, not harder.
                With years of experience in business operations, data, and technology, we saw an opportunity
                to help organizations cut through the complexity and get real results.
              </Text>
              <Text style={styles.whoBodyText}>
                Today, we bring together industry knowledge, AI, automation, and a people-first approach to
                deliver practical solutions that create lasting value.
              </Text>
            </View>
            <Image source={require('./assets/img1.jpg')} style={[styles.whoStoryImage, isMobile && styles.whoStoryImageMobile]} resizeMode="cover" />
            <View style={[styles.whoPrinciples, isMobile && styles.whoPrinciplesMobile]}>
              <View style={styles.whoPrincipleRow}>
                <TrendIcon size={30} color={BLUE} />
                <View style={styles.whoPrincipleCopy}>
                  <Text style={styles.whoPrincipleTitle}>Our Mission</Text>
                  <Text style={styles.whoPrincipleText}>To help businesses work smarter, move faster, and achieve more with intelligent technology.</Text>
                </View>
              </View>
              <View style={styles.whoPrincipleRule} />
              <View style={styles.whoPrincipleRow}>
                <BulbIcon size={30} color={BLUE} />
                <View style={styles.whoPrincipleCopy}>
                  <Text style={styles.whoPrincipleTitle}>Our Vision</Text>
                  <Text style={styles.whoPrincipleText}>To be the most trusted partner for AI-driven business transformation across every industry.</Text>
                </View>
              </View>
              <View style={styles.whoPrincipleRule} />
              <View style={styles.whoPrincipleRow}>
                <UsersIcon size={30} color={BLUE} />
                <View style={styles.whoPrincipleCopy}>
                  <Text style={styles.whoPrincipleTitle}>Our Values</Text>
                  <Text style={styles.whoPrincipleText}>Integrity  |  Innovation  |  Partnership  |  Excellence  |  Results</Text>
                </View>
              </View>
            </View>
          </View>
        </Section>

        <Section bg={NAVY} shellStyle={styles.whoShell}>
          <View style={[styles.whoWhyRow, isMobile && styles.whoWhyRowMobile]}>
            <View style={[styles.whoWhyCopy, isMobile && STACKED_FLEX_ITEM]}>
              <Eyebrow onDark>WHY CHOOSE RGF</Eyebrow>
              <Text style={[styles.sectionTitleLight, styles.whoSectionTitleLight]}>More Than Technology.{"\n"}A True Partner.</Text>
              <Text style={styles.sectionSubtitleLight}>
                We don’t just provide solutions. We work alongside your team to understand your goals,
                challenges, and unique needs. Our approach combines strategy, technology, and hands-on support
                to ensure you get measurable results.
              </Text>
            </View>
            <View style={[styles.whoFeatureGrid, isMobile && STACKED_FLEX_ITEM, isMobile && STACKED_GRID]}>
              {[
                [BuildingIcon, 'Industry & Business Expertise', 'Real-world experience across multiple industries and business sizes.'],
                [GearIcon, 'Advanced Technology', 'AI, automation, data, and modern software solutions.'],
                [UsersIcon, 'Collaborative Approach', 'Your goals. Our team. One path forward.'],
                [TrendIcon, 'Measurable Results', 'Greater efficiency, lower costs, and long-term growth.'],
              ].map(([Icon, title, text]) => (
                <View key={title} style={[styles.whoFeature, isMobile && GRID_ITEM_WIDE]}>
                  <Icon size={32} color={BLUE_LIGHT} />
                  <Text style={styles.whoFeatureTitle}>{title}</Text>
                  <Text style={styles.whoFeatureText}>{text}</Text>
                </View>
              ))}
            </View>
          </View>
        </Section>

        <Section bg="#FFFFFF" shellStyle={styles.whoShell}>
          <View style={[styles.whoTeamRow, isMobile && styles.whoTeamRowMobile]}>
            <View style={[styles.whoTeamCopy, isMobile && styles.whoTeamCopyMobile]}>
              <Eyebrow>OUR TEAM</Eyebrow>
              <Text style={[styles.sectionTitleDark, styles.whoSectionTitleDark]}>Experienced People.{"\n"}Real-World Solutions.</Text>
              <Text style={styles.whoBodyText}>
                Our team brings together experts in business strategy, AI, data, and technology with deep
                industry experience and a passion for solving problems.
              </Text>
              <Btn label="MEET OUR TEAM →" onPress={() => onNavigate('contact', 'form')} />
            </View>
            <Image source={require('./assets/img2.jpg')} style={[styles.whoTeamImage, isMobile && styles.whoTeamImageMobile]} resizeMode="cover" />
          </View>
          <View style={[styles.whoStatsRow, isMobile && STACKED_GRID]}>
            {[
              ['100%', 'Client-Focused'],
              ['50+', 'Technologies & Tools'],
              ['Multiple', 'Industries'],
              ['Scalable', 'for Any Business Size'],
            ].map(([value, label]) => (
              <View key={label} style={[styles.whoStat, isMobile && GRID_ITEM_HALF, isMobile && FLUSH_ITEM]}>
                <Text style={styles.whoStatValue}>{value}</Text>
                <Text style={styles.whoStatLabel}>{label}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section bg={NAVY} image={require('./assets/who-we-are/who-cta-crop.png')} scrim={['rgba(4,16,31,0.7)', 'rgba(4,16,31,0.35)', 'rgba(4,16,31,0.72)']} style={styles.whoCtaSection} shellStyle={styles.whoShell}>
          <View style={[styles.whoCtaRow, isMobile && styles.whoCtaRowMobile]}>
            <View style={[styles.whoCtaCopy, isMobile && CENTER_BLOCK, isMobile && CENTER_SELF]}>
              <Eyebrow onDark style={isMobile && CENTER_TEXT}>LET’S BUILD WHAT’S NEXT</Eyebrow>
              <Text style={[styles.sectionTitleLight, styles.whoSectionTitleLight, isMobile && CENTER_TEXT]}>Ready to Turn Your Business{isMobile ? ' ' : '\n'}Challenges Into Real Solutions?</Text>
              <Text style={[styles.sectionSubtitleLight, isMobile && CENTER_TEXT]}>Partner with RGF Intelligence Solutions and discover how intelligent technology can help you work smarter, grow faster, and achieve more.</Text>
              <Btn label="TELL US YOUR BUSINESS PROBLEM →" onPress={() => onNavigate('contact', 'form')} style={isMobile && CENTER_SELF} />
            </View>
          </View>
        </Section>

        <SiteFooter isMobile={isMobile} onNavigate={onNavigate} showHomeLink />
      </ScrollView>
    </SafeAreaView>
  );
}

// Web URL for each page, so links such as /contact work on direct load and refresh
// (firebase.json rewrites every path to index.html) and the browser back button works.
const PAGE_PATHS = {
  home: '/',
  solution: '/solutions',
  industries: '/industries',
  how: '/how-we-work',
  insights: '/insights',
  who: '/who-we-are',
  contact: '/contact',
};
const isWeb = Platform.OS === 'web' && typeof window !== 'undefined';

function pageFromLocation() {
  if (!isWeb) return 'home';
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  return Object.keys(PAGE_PATHS).find((page) => PAGE_PATHS[page] === path) || 'home';
}

export default function App() {
  const [route, setRoute] = useState(() => ({ page: pageFromLocation(), section: null, key: 0 }));
  // A new key remounts the page, so every navigation starts at the top (or at `section`).
  const navigate = (nextPage, section = null) => {
    if (isWeb && window.location.pathname !== PAGE_PATHS[nextPage]) {
      window.history.pushState(null, '', PAGE_PATHS[nextPage] || '/');
    }
    setRoute((current) => ({ page: nextPage, section, key: current.key + 1 }));
  };

  useEffect(() => {
    if (!isWeb) return undefined;
    const onPopState = () => setRoute((current) => ({ page: pageFromLocation(), section: null, key: current.key + 1 }));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return (
    <AskRgfProvider onNavigate={navigate}>
      <SitePages route={route} navigate={navigate} />
    </AskRgfProvider>
  );
}

function SitePages({ route, navigate }) {
  const { width } = useWindowDimensions();
  const isPhone = width < 700;
  const isMobile = width < 900;
  // "Reimagine with AI." needs ~410px at full size; shrink the hero headline on narrower phones so it stays on one line.
  const heroScale = Math.min(1, (width - 32) / 410);
  const heroFit = heroScale < 1 ? {
    title: { fontSize: 40 * heroScale, lineHeight: 47 * heroScale },
    initial: { fontSize: 54 * heroScale, lineHeight: 56 * heroScale },
  } : {};
  const { page } = route;

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: NAVY }} />;
  }

  if (page === 'who') {
    return <WhoWeArePage key={route.key} isMobile={isMobile} isPhone={isPhone} onNavigate={navigate} section={route.section} />;
  }

  if (page === 'solution') {
    return <SolutionPage key={route.key} isMobile={isMobile} isPhone={isPhone} onNavigate={navigate} section={route.section} />;
  }

  if (page === 'industries') {
    return <IndustriesPage key={route.key} isMobile={isMobile} isPhone={isPhone} onNavigate={navigate} section={route.section} />;
  }

  if (page === 'contact') {
    return <ContactPage key={route.key} isMobile={isMobile} isPhone={isPhone} onNavigate={navigate} section={route.section} />;
  }

  if (page === 'insights') {
    return <InsightsPage key={route.key} isMobile={isMobile} isPhone={isPhone} onNavigate={navigate} section={route.section} />;
  }

  if (page === 'how') {
    return <HowWeWorkPage key={route.key} isMobile={isMobile} isPhone={isPhone} onNavigate={navigate} section={route.section} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView key={route.key} contentContainerStyle={styles.page}>
        <Section
          bg={NAVY}
          image={require('./assets/bgimg.png')}
          scrim={['rgba(4,16,31,0.5)', 'rgba(4,16,31,0.25)', 'rgba(4,16,31,0.5)']}
          style={styles.heroSection}
          shellStyle={styles.headerShell}
        >
          <SiteHeader onNavigate={navigate} />

          <View style={[styles.heroRow, isMobile && styles.heroRowMobile]}>
            <View style={[styles.heroTextWrap, isMobile && STACKED_CONTENT]}>
              <Text style={styles.heroKicker}>INTELLIGENCE. EXECUTION. REAL RESULTS.</Text>
              <Text style={[styles.heroTitle, heroFit.title]}>
                <Text style={{ color: BLUE_LIGHT }}>
                  <Text style={[styles.heroInitial, heroFit.initial]}>R</Text>eimagine
                </Text>{' '}
                with AI.{'\n'}
                <Text style={{ color: BLUE_LIGHT }}>
                  <Text style={[styles.heroInitial, styles.heroInitialG, heroFit.initial]}>G</Text>enerate
                </Text>{' '}
                Value.{'\n'}
                <Text style={{ color: BLUE_LIGHT }}>
                  <Text style={[styles.heroInitial, heroFit.initial]}>F</Text>orge
                </Text>{' '}
                <Text style={{ color: '#FFFFFF' }}>the Future.</Text>
              </Text>
              <Text style={styles.heroText}>
                We help forward-thinking businesses solve complex problems using AI, automation,
                data and intelligent technology — turning ideas into measurable results.
              </Text>

              <View style={styles.buttonRow}>
                <Btn label="EXPLORE OUR SOLUTIONS" variant="outline" onDark onPress={() => navigate('solution')} />
              </View>

              <View style={styles.heroLinkWrap}>
                {heroLinks.map((item, i) => (
                  <View key={item} style={styles.heroLinkItem}>
                    <LinkText style={styles.heroLinkRow} hoverStyle={styles.navItemHover} activeStyle={styles.navItemPressed} onPress={() => navigate('solution', 'solutions')}>
                      {item}
                    </LinkText>
                    {i < heroLinks.length - 1 && <Text style={[styles.heroLinkRow, styles.heroLinkSep]}>|</Text>}
                  </View>
                ))}
              </View>
            </View>

            {!isMobile && (
              <View style={styles.heroRightCol}>
                <View style={styles.heroWordsCol}>
                  {heroWords.map((word) => (
                    <Text key={word} style={styles.heroWord}>
                      {word}
                    </Text>
                  ))}
                </View>
                <View style={styles.heroWordsRule} />
                <Text style={styles.heroQuote}>
                  “The future belongs to companies that turn intelligence into action.”
                </Text>
              </View>
            )}
          </View>
        </Section>

        <Section bg="#FFFFFF">
          <Eyebrow>THE CHALLENGE</Eyebrow>
          <Text style={styles.sectionTitleDark}>What’s Holding Your Business Back?</Text>
          <Text style={styles.sectionSubtitle}>Common challenges we help solve every day.</Text>

          <View style={[styles.challengeRow, isMobile && STACKED_GRID]}>
            {challenges.map((item, index) => (
              <View
                key={item.title}
                style={[styles.challengeItem, isMobile && GRID_ITEM_WIDE, isMobile && FLUSH_ITEM, index > 0 && !isMobile && styles.challengeDivider]}
              >
                <item.Icon size={34} color={BLUE} />
                <Text style={styles.challengeTitle}>{item.title}</Text>
                <Text style={styles.challengeDesc}>{item.desc}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section bg={NAVY} photo={APPROACH_PHOTO}>
          <View style={[styles.approachHeader, isMobile && styles.approachHeaderMobile]}>
            <View style={[styles.approachCopy, isMobile && STACKED_CONTENT]}>
              <Eyebrow onDark>THE RGF APPROACH</Eyebrow>
              <Text style={styles.sectionTitleLight}>From Today’s Challenges to Tomorrow’s Opportunities</Text>
              <Text style={styles.sectionSubtitleLight}>
                We combine business expertise with AI and technology to solve real problems and create
                measurable value.
              </Text>
              <Btn label="OUR APPROACH →" variant="outline" onDark onPress={() => navigate('how')} />
            </View>

            <View style={[styles.approachRow, isMobile && STACKED_FLEX_ITEM, isMobile && STACKED_GRID]}>
              {approachSteps.map((step, index) => (
                <View
                  key={step.letter}
                  style={[styles.approachItem, isMobile && GRID_ITEM_THIRD_WIDE, isMobile && FLUSH_ITEM, index > 0 && !isMobile && styles.approachDivider]}
                >
                  <ApproachTile bg={step.bg} />
                  <Text style={styles.approachEyebrow}>{step.eyebrow}</Text>
                  <Text style={styles.approachTitle}>{step.title}</Text>
                  <Text style={styles.approachDesc}>{step.desc}</Text>
                </View>
              ))}
            </View>
          </View>
        </Section>

        <Section bg="#FFFFFF">
          <View style={styles.solutionsHeader}>
            <View style={styles.solutionsHeaderCopy}>
              <Eyebrow>OUR SOLUTIONS</Eyebrow>
              <Text style={styles.sectionTitleDark}>Intelligence That Works for Your Business</Text>
            </View>
            {!isMobile && (
              <LinkText style={styles.linkText} hoverStyle={styles.linkTextHover} activeStyle={styles.linkTextPressed} onPress={() => navigate('solution')}>
                VIEW ALL SOLUTIONS →
              </LinkText>
            )}
          </View>

          <View style={[styles.solutionsGrid, isMobile && styles.solutionsGridMobile]}>
            {solutions.map((item) => (
              <View key={item.title} style={[styles.solutionCard, isMobile && styles.solutionCardMobile, isMobile && STACKED_FLEX_ITEM]}>
                <Image source={item.bg} style={styles.solutionImage} resizeMode="cover" />
                <Text style={styles.solutionTitle}>{item.title}</Text>
                <Text style={styles.solutionDesc}>{item.desc}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section bg={NAVY} image={require('./assets/mount.png')}>
          <View style={[styles.tellUsRow, isMobile && styles.tellUsRowMobile]}>
            <View style={[styles.tellUsCopy, isMobile && styles.tellUsCopyMobile]}>
              <Eyebrow onDark>TELL US YOUR BUSINESS PROBLEM</Eyebrow>
              <Text style={styles.sectionTitleLight}>
                You Don’t Need to Know the Technology. <Text style={{ color: BLUE_LIGHT }}>Start Here.</Text>
              </Text>
              <Text style={styles.sectionSubtitleLight}>
                Describe what’s not working, and our AI will help analyze your challenge and recommend next steps.
              </Text>
              <InquiryForm
                title="Tell Us About Your Business Problem"
                buttonLabel="ANALYZE MY BUSINESS PROBLEM →"
                includeCompany={false}
                includeIndustry={false}
                includePhone={false}
                source="business-problem"
                compact
                stacked={isMobile}
              />

              <View style={styles.trustRowWrap}>
                {trustPoints.map((item) => (
                  <View key={item.label} style={styles.trustRow}>
                    <item.Icon size={16} color="#B7C0CE" />
                    <Text style={styles.trustText}>{item.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={[styles.ctaCopy, isMobile && styles.ctaCopyMobile]}>
              <Text style={styles.ctaTitle}>Your Business Has the Problem.</Text>
              <Text style={[styles.ctaTitle, { color: BLUE_LIGHT }]}>Let’s Build the Solution.</Text>
              <Text style={styles.ctaText}>Human Expertise + AI + Automation + Technology = Real Results.</Text>
            </View>
          </View>
        </Section>

        <Section bg="#FFFFFF">
          <View style={styles.solutionsHeader}>
            <View style={styles.solutionsHeaderCopy}>
              <Eyebrow>INDUSTRIES WE SERVE</Eyebrow>
              <Text style={styles.sectionTitleDark}>Real-World Solutions. Measurable Results.</Text>
            </View>
            {!isMobile && (
              <LinkText style={styles.linkText} hoverStyle={styles.linkTextHover} activeStyle={styles.linkTextPressed} onPress={() => navigate('industries')}>
                EXPLORE INDUSTRIES →
              </LinkText>
            )}
          </View>

          <View style={[styles.industriesRow, isMobile && STACKED_GRID]}>
            {industries.map((item, index) => (
              <View
                key={item.label}
                style={[styles.industryItem, isMobile && GRID_ITEM_THIRD, isMobile && FLUSH_ITEM, index > 0 && !isMobile && styles.challengeDivider]}
              >
                <item.Icon size={34} color={BLUE} />
                <Text style={styles.industryLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section bg={NAVY}>
          <Eyebrow onDark>RESULTS THAT MATTER</Eyebrow>
          <View style={[styles.resultsRow, isMobile && styles.resultsRowMobile]}>
            <View style={[styles.statsGrid, isMobile && styles.statsGridMobile]}>
              {stats.map((item, index) => (
                <View key={item.label} style={[styles.statItem, isMobile && FLUSH_ITEM, index > 0 && !isMobile && styles.approachDivider]}>
                  <Text style={styles.statValue}>{item.value}</Text>
                  <Text style={styles.statLabel}>{item.label}</Text>
                </View>
              ))}
            </View>

            {!isMobile && (
              <View style={styles.testimonial}>
                <Text style={styles.testimonialQuote}>
                  “RGF helped us automate processes that were holding back our growth. The results were
                  immediate.”
                </Text>
                <Text style={styles.testimonialAuthor}>— Client, Texas</Text>
                <View style={styles.dotsRow}>
                  <Text style={styles.pagerArrow}>‹</Text>
                  <View style={styles.dot} />
                  <View style={[styles.dot, styles.dotActive]} />
                  <View style={styles.dot} />
                  <Text style={styles.pagerArrow}>›</Text>
                </View>
              </View>
            )}
          </View>
        </Section>

        <SiteFooter isMobile={isMobile} onNavigate={navigate} />
      </ScrollView>
    </SafeAreaView>
  );
}

const headerFontStyles = new Set([
  'headerLogoName',
  'headerLogoNameCompact',
  'navItem',
  'mobileMenuText',
  'headerBtnCompactText',
]);

const increaseContentFontSizes = (styleMap) => Object.fromEntries(
  Object.entries(styleMap).map(([name, style]) => {
    const normalizedStyle = style.fontFamily === 'Georgia'
      ? { ...style, fontFamily: 'Inter_400Regular' }
      : style;

    return [
      name,
      !headerFontStyles.has(name) && typeof normalizedStyle.fontSize === 'number'
        ? { ...normalizedStyle, fontSize: normalizedStyle.fontSize + 2 }
        : normalizedStyle,
    ];
  })
);

const styles = StyleSheet.create(increaseContentFontSizes({
  safeArea: {
    flex: 1,
    backgroundColor: NAVY,
  },
  page: {
    backgroundColor: '#FFFFFF',
  },
  section: {
    width: '100%',
  },
  sectionBackgroundImage: {
    width: '100%',
    height: '100%',
  },
  shell: {
    width: '100%',
    maxWidth: 1280,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  shellTablet: {
    paddingHorizontal: 24,
  },
  shellPhone: {
    paddingHorizontal: 16,
  },
  whoShell: {
    paddingHorizontal: 38,
    paddingVertical: 18,
  },
  headerShell: {
    paddingHorizontal: 38,
    paddingVertical: 18,
  },
  hidden: {
    display: 'none',
  },
  heroSection: {
    overflow: 'hidden',
  },
  topbarWrap: {
    paddingBottom: 18,
    zIndex: 10,
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
  },
  menuButtonActive: {
    backgroundColor: 'rgba(79,166,255,0.14)',
    borderColor: BLUE_LIGHT,
  },
  menuBar: {
    width: 22,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#FFFFFF',
  },
  menuBarTopOpen: {
    transform: [{ translateY: 7 }, { rotate: '45deg' }],
  },
  menuBarBottomOpen: {
    transform: [{ translateY: -7 }, { rotate: '-45deg' }],
  },
  mobileMenu: {
    marginTop: 14,
    borderRadius: 8,
    backgroundColor: 'rgba(4,16,31,0.96)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  mobileMenuItem: {
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  mobileMenuDivider: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  mobileMenuItemHover: {
    backgroundColor: 'rgba(79,166,255,0.12)',
  },
  mobileMenuText: {
    color: '#D6DEE8',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  headerMark: {
    width: 104,
    height: 33,
  },
  headerLogoName: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1.4,
    marginTop: 3,
  },
  topbarCompact: {
    paddingBottom: 12,
  },
  headerMarkCompact: {
    width: 82,
    height: 26,
  },
  headerLogoNameCompact: {
    fontSize: 8,
    letterSpacing: 0.8,
  },
  navWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
  },
  navItem: {
    color: '#D6DEE8',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  navItemHover: {
    color: BLUE_LIGHT,
  },
  navItemPressed: {
    color: '#A6D5FF',
  },
  btn: {
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignSelf: 'flex-start',
  },
  btnNarrow: {
    alignSelf: 'flex-start',
  },
  btnHoverSolid: {
    backgroundColor: '#2E8CFF',
  },
  btnHoverOutline: {
    borderColor: BLUE_LIGHT,
    backgroundColor: 'rgba(79,166,255,0.12)',
  },
  btnTextHoverSolid: {
    color: '#EAF4FF',
  },
  btnTextHoverOutline: {
    color: BLUE_LIGHT,
  },
  btnTextPressed: {
    opacity: 0.9,
  },
  headerBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  headerBtnCompact: {
    paddingHorizontal: 7,
    paddingVertical: 7,
  },
  pressed: {
    opacity: 0.85,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.4,
  },
  headerBtnCompactText: {
    fontSize: 8,
    letterSpacing: 0,
  },
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 24,
  },
  heroRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  heroTextWrap: {
    flex: 1,
    maxWidth: 520,
  },
  heroKicker: {
    ...BALANCED_TEXT,
    color: '#B7C0CE',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 2,
    marginBottom: 14,
  },
  heroTitle: {
    ...BALANCED_TEXT,
    color: '#FFFFFF',
    fontSize: 40,
    lineHeight: 47,
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: -1,
    marginBottom: 16,
  },
  heroInitial: {
    color: RGF_ACCENT,
    fontSize: 54,
    lineHeight: 56,
    fontFamily: 'Inter_800ExtraBold',
  },
  heroInitialG: {
    transform: [{ translateX: -2 }],
  },
  heroText: {
    color: '#B7C0CE',
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 22,
    fontFamily: 'Inter_400Regular',
    maxWidth: 480,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  heroLinkWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 6,
  },
  heroLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroLinkSep: {
    marginHorizontal: 12,
  },
  heroLinkRow: {
    color: '#8A94A6',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  heroRightCol: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    maxWidth: 200,
  },
  heroWordsCol: {
    alignItems: 'flex-end',
    gap: 8,
  },
  heroWord: {
    color: '#B7C0CE',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1.4,
    textAlign: 'right',
  },
  heroWordsRule: {
    width: 30,
    height: 2,
    backgroundColor: BLUE,
    marginTop: 14,
    marginBottom: 18,
  },
  heroQuote: {
    color: '#E7ECF3',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    fontStyle: 'italic',
    textAlign: 'right',
    maxWidth: 220,
  },
  eyebrow: {
    ...BALANCED_TEXT,
    color: BLUE,
    fontSize: 12,
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: 1.6,
    marginBottom: 10,
  },
  sectionTitleDark: {
    ...BALANCED_TEXT,
    color: TEXT_DARK,
    fontSize: 32,
    lineHeight: 38,
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: -0.6,
    marginBottom: 8,
    maxWidth: 640,
  },
  sectionTitleLight: {
    ...BALANCED_TEXT,
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 37,
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: -0.6,
    marginBottom: 12,
    maxWidth: 420,
  },
  whoSectionTitleDark: {
    ...BALANCED_TEXT,
    fontSize: 27,
    lineHeight: 30,
    fontFamily: 'Georgia',
    letterSpacing: 0,
  },
  whoSectionTitleLight: {
    ...BALANCED_TEXT,
    fontSize: 27,
    lineHeight: 30,
    fontFamily: 'Georgia',
    letterSpacing: 0,
  },
  sectionSubtitle: {
    ...BALANCED_TEXT,
    color: TEXT_GREY,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    marginBottom: 32,
  },
  sectionSubtitleLight: {
    color: '#9AA7B8',
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
    marginBottom: 22,
    maxWidth: 420,
  },
  challengeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  challengeItem: {
    flex: 1,
    minWidth: 140,
    paddingLeft: 20,
  },
  challengeDivider: {
    borderLeftWidth: 1,
    borderLeftColor: BORDER,
  },
  challengeTitle: {
    color: TEXT_DARK,
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    marginTop: 14,
    marginBottom: 8,
  },
  challengeDesc: {
    color: TEXT_GREY,
    fontSize: 13,
    lineHeight: 19,
    fontFamily: 'Inter_400Regular',
  },
  approachHeader: {
    flexDirection: 'row',
    gap: 40,
  },
  approachHeaderMobile: {
    flexDirection: 'column',
  },
  approachCopy: {
    flex: 1,
    maxWidth: 340,
    justifyContent: 'center',
  },
  approachRow: {
    flex: 1.6,
    flexDirection: 'row',
    gap: 20,
  },
  approachItem: {
    flex: 1,
    paddingLeft: 20,
  },
  approachDivider: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.12)',
  },
  approachTile: {
    width: '100%',
    aspectRatio: 1.18,
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#0B1E3D',
  },
  approachTileImage: {
    width: '100%',
    height: '100%',
  },
  tileEdgeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '35%',
  },
  tileEdgeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '35%',
  },
  tileEdgeLeft: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '22%',
  },
  tileEdgeRight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: '22%',
  },
  approachEyebrow: {
    color: BLUE_LIGHT,
    fontSize: 13,
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: 1,
  },
  approachTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: 1,
    marginBottom: 10,
  },
  approachDesc: {
    color: '#9AA7B8',
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
  },
  solutionsHeaderCopy: {
    flexShrink: 1,
  },
  solutionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 32,
    gap: 20,
  },
  linkText: {
    color: BLUE,
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
  },
  linkTextHover: {
    color: '#2E8CFF',
  },
  linkTextPressed: {
    color: '#75B8FF',
  },
  solutionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
  },
  solutionsGridMobile: {
    flexDirection: 'column',
  },
  solutionCard: {
    width: '18.4%',
    minWidth: 200,
    flexGrow: 1,
  },
  solutionCardMobile: {
    width: '100%',
    minWidth: 0,
    flexGrow: 0,
  },
  solutionImage: {
    width: '100%',
    height: 110,
    borderRadius: 12,
    marginBottom: 14,
  },
  solutionTitle: {
    color: TEXT_DARK,
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  solutionDesc: {
    color: TEXT_GREY,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Inter_400Regular',
    marginBottom: 12,
  },
  tellUsRow: {
    flexDirection: 'row',
    gap: 32,
    alignItems: 'center',
  },
  tellUsRowMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  tellUsCopy: {
    flex: 1.3,
  },
  tellUsCopyMobile: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    width: '100%',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: TEXT_DARK,
    maxWidth: 480,
  },
  trustRowWrap: {
    marginTop: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 22,
    rowGap: 10,
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  trustText: {
    color: '#B7C0CE',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  tellUsCard: {
    flex: 1,
    backgroundColor: 'rgba(6,14,26,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    padding: 24,
    alignSelf: 'flex-start',
    maxWidth: 300,
  },
  tellUsCardTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    lineHeight: 23,
    fontFamily: 'Inter_800ExtraBold',
    marginBottom: 14,
  },
  tellUsCardRule: {
    width: 30,
    height: 2,
    backgroundColor: BLUE,
    marginBottom: 16,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  checkText: {
    color: '#D6DEE8',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  industriesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  industryItem: {
    flex: 1,
    minWidth: 130,
    paddingLeft: 20,
  },
  industryLabel: {
    color: TEXT_DARK,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Inter_700Bold',
    marginTop: 14,
    maxWidth: 130,
  },
  resultsRow: {
    flexDirection: 'row',
    gap: 32,
    marginTop: 22,
  },
  resultsRowMobile: {
    flexDirection: 'column',
  },
  statsGrid: {
    flex: 1.6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  statsGridMobile: {
    flex: 'none',
  },
  statItem: {
    flex: 1,
    minWidth: 130,
    paddingLeft: 20,
  },
  statValue: {
    color: BLUE_LIGHT,
    fontSize: 38,
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: -1,
  },
  statLabel: {
    color: '#C7CFDA',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 6,
  },
  testimonial: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.14)',
    paddingLeft: 28,
    justifyContent: 'center',
  },
  testimonialQuote: {
    color: '#E7ECF3',
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  testimonialAuthor: {
    color: '#8A94A6',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 14,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pagerArrow: {
    color: '#8A94A6',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  dotActive: {
    backgroundColor: BLUE_LIGHT,
    width: 16,
  },
  ctaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 24,
  },
  ctaRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  ctaCopy: {
    flex: 1.3,
  },
  ctaCopyMobile: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    width: '100%',
  },
  ctaTitle: {
    ...BALANCED_TEXT,
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 34,
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: -0.6,
  },
  ctaText: {
    color: '#B7C0CE',
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
    marginTop: 12,
    maxWidth: 440,
  },
  ctaMark: {
    width: 130,
    height: 41,
  },
  ctaLogoName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 2,
    marginTop: 6,
  },
  ctaLogoTagline: {
    color: '#9AA7B8',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  footerSection: {
    backgroundColor: '#031426',
  },
  footerShell: {
    paddingHorizontal: 38,
    paddingVertical: 18,
  },
  footerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 24,
    paddingBottom: 18,
  },
  footerTopMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  footerLogoMobile: {
    alignSelf: 'center',
  },
  footerMark: {
    width: 84,
    height: 27,
  },
  footerLogoName: {
    color: '#FFFFFF',
    fontSize: 9,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1.4,
    marginTop: 3,
  },
  footerLogoTagline: {
    color: '#7C8798',
    fontSize: 8,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  footerColumns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 22,
    flex: 1,
    justifyContent: 'center',
  },
  footerColumnsMobile: {
    width: '100%',
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLink: {
    color: '#B7C0CE',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  footerLinkHover: {
    color: BLUE_LIGHT,
  },
  footerLinkPressed: {
    color: '#A6D5FF',
  },
  connectWrap: {
    alignItems: 'flex-end',
  },
  connectWrapMobile: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  linkedinBadge: {
    width: 18,
    height: 18,
    borderRadius: 6,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkedinBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Inter_800ExtraBold',
  },
  youtubeBadge: {
    width: 18,
    height: 18,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  youtubeBadgeText: {
    color: '#031426',
    fontSize: 8,
    marginLeft: 1,
  },
  footerRule: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 12,
  },
  footerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  footerBottomMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  footerTextMobile: {
    width: '100%',
    textAlign: 'center',
  },
  footerText: {
    color: '#7C8798',
    fontSize: 9,
    fontFamily: 'Inter_400Regular',
  },
  navItemActive: {
    color: BLUE_LIGHT,
  },
  contactHero: {
    minHeight: 390,
    overflow: 'hidden',
  },
  contactHeroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 320,
    gap: 24,
  },
  contactHeroRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  contactHeroCopy: {
    maxWidth: 520,
  },
  contactHeroTitle: {
    ...BALANCED_TEXT,
    color: '#FFFFFF',
    fontSize: 48,
    lineHeight: 52,
    fontFamily: 'Georgia',
    marginTop: 12,
  },
  contactHeroAccent: {
    ...BALANCED_TEXT,
    color: BLUE_LIGHT,
    fontSize: 48,
    lineHeight: 52,
    fontFamily: 'Georgia',
    marginBottom: 16,
  },
  contactHeroText: {
    color: '#D3DDEB',
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
    maxWidth: 600,
  },
  contactPromiseRow: {
    flexDirection: 'row',
    marginTop: 28,
    gap: 0,
  },
  contactPromiseRowMobile: {
    flexDirection: 'column',
    gap: 16,
  },
  contactPromise: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingRight: 18,
    marginRight: 18,
  },
  contactPromiseDivider: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(79,166,255,0.65)',
    paddingLeft: 18,
  },
  contactPromiseTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Georgia',
  },
  contactPromiseText: {
    color: '#D3DDEB',
    fontSize: 11,
    lineHeight: 16,
    fontFamily: 'Georgia',
  },
  contactShell: {
    paddingHorizontal: 44,
    paddingVertical: 22,
  },
  contactContentRow: {
    flexDirection: 'row',
    gap: 28,
    alignItems: 'flex-start',
  },
  contactContentRowMobile: {
    flexDirection: 'column',
  },
  contactIntro: {
    flex: 1.15,
    maxWidth: 560,
  },
  contactBodyText: {
    color: TEXT_GREY,
    fontSize: 15,
    lineHeight: 23,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
    maxWidth: 500,
  },
  contactCardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 18,
  },
  contactInfoCard: {
    width: '48%',
    minHeight: 145,
    backgroundColor: '#F0F7FE',
    padding: 14,
  },
  contactInfoIcon: {
    width: 44,
    height: 44,
    borderRadius: 24,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  contactInfoTitle: {
    color: TEXT_DARK,
    fontSize: 18,
    fontFamily: 'Georgia',
  },
  contactInfoValue: {
    color: '#122D69',
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'Georgia',
  },
  contactSocialRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginVertical: 2,
  },
  contactSocialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  contactInfoText: {
    color: '#304B7C',
    fontSize: 12,
    lineHeight: 17,
    fontFamily: 'Georgia',
  },
  contactFormGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  contactFormGridMobile: {
    flexDirection: 'column',
    gap: 0,
  },
  contactInputHalf: {
    flex: 1,
    minWidth: 0, // web inputs have an intrinsic min width that otherwise overflows the row
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B5D5FA',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: TEXT_DARK,
    marginBottom: 10,
  },
  contactForm: {
    flex: 1,
    maxWidth: 480,
    backgroundColor: '#F0F7FE',
    padding: 24,
  },
  contactFormFull: {
    maxWidth: '100%',
  },
  contactFormStacked: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    width: '100%',
    alignSelf: 'center',
  },
  contactFormTitle: {
    ...BALANCED_TEXT,
    color: '#122D69',
    fontSize: 27,
    lineHeight: 31,
    fontFamily: 'Georgia',
    marginBottom: 12,
  },
  formEyebrow: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  contactInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B5D5FA',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: TEXT_DARK,
    marginBottom: 10,
  },
  contactMessageInput: {
    minHeight: 92,
    textAlignVertical: 'top',
  },
  contactSendButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactFormNote: {
    color: '#304B7C',
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    marginTop: 10,
    textAlign: 'center',
  },
  formStatus: {
    color: '#122D69',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 10,
    marginBottom: 4,
  },
  formStatusError: {
    color: '#C0392B',
  },
  formStatusSuccess: {
    color: '#0F7A45',
  },
  contactLocationShell: {
    paddingHorizontal: 44,
    paddingVertical: 26,
  },
  contactLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  contactLocationRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  contactLocationCopy: {
    flex: 1,
    maxWidth: 330,
  },
  contactLocationCopyMobile: {
    width: '100%',
    maxWidth: 560,
  },
  contactMap: {
    flex: 1.2,
    minHeight: 190,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    overflow: 'hidden',
  },
  contactMapMobile: {
    width: '100%',
  },
  contactMapImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  contactMapLabel: {
    color: '#163F6D',
    fontSize: 34,
    fontFamily: 'Georgia',
    letterSpacing: 3,
    textShadowColor: 'rgba(255,255,255,0.85)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    zIndex: 2,
  },
  contactMapLine: {
    width: '70%',
    height: 1,
    backgroundColor: '#67A9EF',
    marginVertical: 18,
  },
  contactMapPin: {
    backgroundColor: BLUE,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 4,
  },
  contactMapPinText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },
  contactLocationPoints: {
    flex: 0.9,
    gap: 15,
  },
  contactLocationPointsMobile: {
    width: '100%',
  },
  contactLocationPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  contactLocationPointIcon: {
    color: BLUE,
    fontSize: 30,
    width: 34,
    textAlign: 'center',
  },
  contactLocationPointTitle: {
    color: '#122D69',
    fontSize: 13,
    fontFamily: 'Georgia',
  },
  contactLocationPointText: {
    color: '#304B7C',
    fontSize: 11,
    fontFamily: 'Georgia',
  },
  contactClosingShell: {
    paddingHorizontal: 44,
    paddingVertical: 30,
  },
  contactClosingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 40,
  },
  contactClosingRowMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  contactClosingText: {
    color: '#B7C0CE',
    fontSize: 15,
    lineHeight: 23,
    fontFamily: 'Inter_400Regular',
    maxWidth: 470,
  },
  insightsHero: {
    minHeight: 390,
    overflow: 'hidden',
  },
  insightsHeroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 320,
  },
  insightsHeroRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  insightsHeroCopy: {
    maxWidth: 560,
  },
  insightsHeroTitle: {
    ...BALANCED_TEXT,
    color: '#FFFFFF',
    fontSize: 48,
    lineHeight: 51,
    fontFamily: 'Georgia',
    marginTop: 12,
  },
  insightsHeroAccent: {
    ...BALANCED_TEXT,
    color: BLUE_LIGHT,
    fontSize: 48,
    lineHeight: 51,
    fontFamily: 'Georgia',
    marginBottom: 14,
  },
  insightsHeroText: {
    color: '#D3DDEB',
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Inter_400Regular',
    maxWidth: 500,
    marginBottom: 18,
  },
  insightsHeroAside: {
    width: 190,
    alignItems: 'flex-end',
  },
  insightsHeroAsideText: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 21,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'right',
  },
  insightsHeroQuote: {
    color: '#D3DDEB',
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    textAlign: 'right',
    marginTop: 16,
  },
  insightsTopicStripShell: {
    paddingHorizontal: 38,
    paddingVertical: 17,
  },
  insightsTopicStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
  },
  insightsTopicFeature: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: '#AFCDF0',
  },
  insightsTopicTitle: {
    color: '#122D69',
    fontSize: 14,
    fontFamily: 'Georgia',
  },
  insightsTopicText: {
    color: '#304B7C',
    fontSize: 11,
    fontFamily: 'Georgia',
    marginTop: 2,
  },
  insightsShell: {
    paddingHorizontal: 38,
    paddingVertical: 28,
  },
  insightsHeading: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 20,
    marginBottom: 18,
  },
  insightsHeadingMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  insightsSectionTitle: {
    ...BALANCED_TEXT,
    color: '#122D69',
    fontSize: 29,
    lineHeight: 34,
    fontFamily: 'Georgia',
    marginTop: 6,
  },
  insightsFeaturedGrid: {
    flexDirection: 'row',
    gap: 18,
    marginBottom: 28,
  },
  insightsFeaturedGridMobile: {
    flexDirection: 'column',
  },
  insightCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D7E4F2',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  insightCardImageWrap: {
    height: 145,
    position: 'relative',
    backgroundColor: '#0A2442',
  },
  insightCardImage: {
    width: '100%',
    height: '100%',
  },
  insightCardTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    color: '#FFFFFF',
    backgroundColor: BLUE,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
  },
  insightCardBody: {
    padding: 13,
    minHeight: 150,
  },
  insightCardTitle: {
    color: '#122D69',
    fontSize: 19,
    lineHeight: 22,
    fontFamily: 'Georgia',
  },
  insightCardText: {
    color: '#304B7C',
    fontSize: 12,
    lineHeight: 17,
    fontFamily: 'Georgia',
    marginTop: 6,
  },
  insightReadMore: {
    color: BLUE,
    fontSize: 12,
    fontFamily: 'Georgia',
    marginTop: 10,
  },
  insightsTopicGrid: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
    marginBottom: 28,
  },
  insightsTopicGridMobile: {
    flexWrap: 'wrap',
  },
  insightsTopicCard: {
    flex: 1,
    minWidth: 100,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D7E4F2',
    borderRadius: 4,
    paddingBottom: 11,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  insightsTopicCardImage: {
    width: '100%',
    height: 64,
    marginBottom: 8,
  },
  insightsTopicCardTitle: {
    color: '#122D69',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Georgia',
    textAlign: 'center',
    marginTop: 5,
  },
  insightsLatestRow: {
    flexDirection: 'row',
    gap: 28,
    alignItems: 'flex-start',
  },
  insightsLatestRowMobile: {
    flexDirection: 'column',
  },
  insightsLatest: {
    flex: 1,
  },
  insightsLatestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#D7E4F2',
  },
  insightsLatestImage: {
    width: 72,
    height: 45,
    borderRadius: 3,
  },
  insightsLatestCopy: {
    flex: 1,
  },
  insightsLatestTitle: {
    color: '#122D69',
    fontSize: 13,
    fontFamily: 'Georgia',
  },
  insightsLatestDate: {
    color: '#6D7890',
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    marginTop: 3,
  },
  insightsLatestArrow: {
    color: BLUE,
    fontSize: 22,
  },
  insightsSubscribe: {
    flex: 1,
    backgroundColor: '#F0F7FE',
    padding: 19,
    minHeight: 190,
  },
  insightsSubscribeTitle: {
    ...BALANCED_TEXT,
    color: '#122D69',
    fontSize: 26,
    lineHeight: 29,
    fontFamily: 'Georgia',
    marginTop: 5,
  },
  insightsSubscribeText: {
    color: '#304B7C',
    fontSize: 12,
    lineHeight: 17,
    fontFamily: 'Georgia',
    marginTop: 5,
    maxWidth: 360,
  },
  insightsSubscribeForm: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 14,
  },
  insightsSubscribeInput: {
    flex: 1,
    minWidth: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B5D5FA',
    paddingHorizontal: 10,
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: TEXT_DARK,
  },
  insightsClosingShell: {
    paddingHorizontal: 38,
    paddingVertical: 28,
  },
  insightsClosingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 24,
  },
  insightsClosingRowMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  insightsClosingText: {
    color: '#B7C0CE',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
    marginTop: 5,
  },
  insightsClosingCopy: {
    flex: 1,
    minWidth: 0,
  },
  howHero: {
    minHeight: 430,
    overflow: 'hidden',
  },
  howHeroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 355,
  },
  howHeroRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  howHeroCopy: {
    maxWidth: 570,
  },
  howHeroTitle: {
    ...BALANCED_TEXT,
    color: '#FFFFFF',
    fontSize: 45,
    lineHeight: 49,
    fontFamily: 'Georgia',
    marginTop: 12,
  },
  howHeroAccent: {
    ...BALANCED_TEXT,
    color: BLUE_LIGHT,
    fontSize: 45,
    lineHeight: 49,
    fontFamily: 'Georgia',
    marginBottom: 12,
  },
  howHeroText: {
    color: '#D3DDEB',
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'Inter_400Regular',
    maxWidth: 520,
    marginBottom: 17,
  },
  howHeroButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  howHeroButtonsMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  howHeroTrust: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 0,
  },
  howHeroTrustMobile: {
    flexDirection: 'column',
    gap: 12,
  },
  howHeroTrustItemMobile: {
    paddingHorizontal: 0,
    borderRightWidth: 0,
  },
  howHeroTrustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingHorizontal: 18,
    borderRightWidth: 1,
    borderRightColor: 'rgba(79,166,255,0.55)',
  },
  howHeroTrustTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Georgia',
  },
  howHeroTrustText: {
    color: '#D3DDEB',
    fontSize: 11,
    fontFamily: 'Georgia',
    marginTop: 2,
  },
  howHeroAside: {
    width: 160,
    alignItems: 'flex-end',
  },
  howHeroAsideText: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'Inter_700Bold',
    textAlign: 'right',
  },
  howHeroQuote: {
    color: '#D3DDEB',
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Georgia',
    textAlign: 'right',
    marginTop: 14,
  },
  howShell: {
    paddingHorizontal: 38,
    paddingVertical: 30,
  },
  howHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 20,
    marginBottom: 22,
  },
  howHeadingMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  howSectionTitle: {
    ...BALANCED_TEXT,
    color: '#122D69',
    fontSize: 30,
    lineHeight: 34,
    fontFamily: 'Georgia',
    marginTop: 6,
  },
  howIntroText: {
    color: '#304B7C',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Georgia',
    marginTop: 6,
    maxWidth: 800,
  },
  howStepsGrid: {
    flexDirection: 'row',
    gap: 14,
  },
  howStep: {
    flex: 1,
    minWidth: 0,
  },
  howStepImageWrap: {
    height: 112,
    position: 'relative',
    overflow: 'visible',
  },
  howStepImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  howStepNumber: {
    position: 'absolute',
    top: -11,
    left: -6,
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: BLUE,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },
  howStepIcon: {
    position: 'absolute',
    bottom: -12,
    left: 10,
    width: 34,
    height: 34,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  howStepTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 18,
  },
  howStepTitle: {
    color: '#122D69',
    fontSize: 18,
    fontFamily: 'Georgia',
  },
  howStepSubtitle: {
    color: '#163F6D',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Georgia',
    marginTop: 2,
  },
  howStepTitleCopy: {
    flexShrink: 1,
  },
  howStepArrow: {
    color: BLUE,
    fontSize: 22,
    marginLeft: 6,
  },
  howStepText: {
    color: '#304B7C',
    fontSize: 12,
    lineHeight: 17,
    fontFamily: 'Georgia',
    marginTop: 9,
  },
  howPartnershipShell: {
    paddingHorizontal: 38,
    paddingVertical: 24,
  },
  howPartnershipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
  },
  howPartnershipRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  howPartnershipCopy: {
    flex: 1.2,
  },
  howPrinciples: {
    flex: 2,
    flexDirection: 'row',
  },
  howPrinciplesMobile: {
    width: '100%',
    marginTop: 24,
  },
  howPrinciple: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  howPrincipleDivider: {
    borderLeftWidth: 1,
    borderLeftColor: '#BFD8F1',
  },
  howPrincipleTitle: {
    color: '#122D69',
    fontSize: 15,
    fontFamily: 'Georgia',
    marginTop: 6,
  },
  howPrincipleText: {
    color: '#304B7C',
    fontSize: 11,
    lineHeight: 16,
    fontFamily: 'Georgia',
    textAlign: 'center',
    marginTop: 3,
  },
  howOutcomeShell: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  howOutcomeRow: {
    flexDirection: 'row',
    minHeight: 285,
  },
  howOutcomeRowMobile: {
    flexDirection: 'column',
  },
  howWhy: {
    flex: 1.1,
    backgroundColor: NAVY,
    paddingHorizontal: 38,
    paddingVertical: 28,
  },
  howOutcomeImage: {
    flex: 1.1,
    minHeight: 285,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#071C2E',
  },
  howWhyMobile: {
    paddingHorizontal: 24,
  },
  howWhyTitle: {
    color: '#FFFFFF',
  },
  howWhyText: {
    color: '#B7C0CE',
    marginBottom: 16,
  },
  howOutcomePhoto: {
    position: 'absolute',
    top: 0,
  },
  howOutcomePathPhone: {
    left: 18,
    fontSize: 12,
    lineHeight: 28,
  },
  howOutcomeListMobile: {
    paddingHorizontal: 0,
  },
  howOutcomeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(4,16,31,0.28)',
  },
  howOutcomePath: {
    position: 'absolute',
    left: 28,
    bottom: 25,
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 35,
    fontFamily: 'Inter_700Bold',
  },
  howOutcomeList: {
    flex: 0.95,
    paddingHorizontal: 28,
    paddingVertical: 27,
  },
  howOutcomeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },
  howOutcomeTitle: {
    color: '#122D69',
    fontSize: 13,
    fontFamily: 'Georgia',
  },
  howOutcomeText: {
    color: '#304B7C',
    fontSize: 11,
    fontFamily: 'Georgia',
    marginTop: 2,
  },
  howOutcomeCopy: {
    flex: 1,
    minWidth: 0,
  },
  howClosingShell: {
    paddingHorizontal: 38,
    paddingVertical: 28,
  },
  howClosingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 24,
  },
  howClosingCopy: {
    flex: 1,
    minWidth: 0,
  },
  howClosingRowMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  howClosingText: {
    color: '#B7C0CE',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  solutionHero: {
    minHeight: 430,
    overflow: 'hidden',
  },
  solutionHeroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 355,
    gap: 24,
  },
  solutionHeroRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  solutionHeroCopy: {
    maxWidth: 720,
  },
  solutionHeroTitle: {
    ...BALANCED_TEXT,
    color: '#FFFFFF',
    fontSize: 43,
    lineHeight: 47,
    fontFamily: 'Georgia',
    marginBottom: 14,
  },
  solutionHeroTitleAccent: {
    color: BLUE_LIGHT,
  },
  solutionHeroText: {
    color: '#D3DDEB',
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'Inter_400Regular',
    maxWidth: 650,
    marginBottom: 18,
  },
  solutionHeroButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  solutionHeroButtonsMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  solutionHeroQuote: {
    width: 170,
    alignItems: 'flex-start',
  },
  solutionHeroQuoteText: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 19,
    fontFamily: 'Georgia',
    textAlign: 'right',
    width: '100%',
  },
  solutionHeroQuoteAccent: {
    color: '#D3DDEB',
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
    textAlign: 'right',
    width: '100%',
    marginTop: 16,
  },
  solutionShell: {
    paddingHorizontal: 38,
    paddingVertical: 34,
  },
  solutionTrustShell: {
    paddingHorizontal: 38,
    paddingVertical: 18,
  },
  solutionTrustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  solutionTrustItemMobile: {
    justifyContent: 'flex-start',
  },
  solutionTrustItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    minHeight: 42,
  },
  solutionTrustDivider: {
    borderLeftWidth: 1,
    borderLeftColor: '#BFD8F1',
  },
  solutionTrustTitle: {
    color: TEXT_DARK,
    fontSize: 13,
    fontFamily: 'Georgia',
  },
  solutionTrustText: {
    color: TEXT_DARK,
    fontSize: 13,
    fontFamily: 'Georgia',
  },
  solutionSectionHeading: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 22,
    marginBottom: 20,
  },
  solutionIntroCopy: {
    flex: 1,
  },
  solutionIntroText: {
    color: TEXT_GREY,
    fontSize: 13,
    lineHeight: 19,
    fontFamily: 'Inter_400Regular',
    marginTop: 8,
    maxWidth: 820,
  },
  solutionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
  },
  solutionVisualCard: {
    width: '31%',
    minWidth: 250,
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E0EAF4',
    overflow: 'hidden',
    shadowColor: '#0B1424',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  solutionVisualImage: {
    width: '100%',
    height: 116,
  },
  solutionVisualBody: {
    padding: 12,
    minHeight: 180,
  },
  solutionVisualBodyMobile: {
    minHeight: 0,
    paddingBottom: 18,
  },
  solutionVisualSubtitle: {
    color: '#54708E',
    fontSize: 12,
    lineHeight: 17,
    fontFamily: 'Georgia',
    marginBottom: 6,
  },
  solutionBullet: {
    color: '#3D5C7C',
    fontSize: 11,
    lineHeight: 15,
    fontFamily: 'Georgia',
  },
  solutionLearnMore: {
    marginTop: 12,
    fontSize: 11,
  },
  solutionNeedCard: {
    width: '31%',
    minWidth: 250,
    flexGrow: 1,
    minHeight: 352,
    justifyContent: 'center',
    backgroundColor: NAVY,
    borderRadius: 6,
    padding: 22,
    overflow: 'hidden',
  },
  solutionNeedCardMobile: {
    width: '100%',
    minWidth: 0,
  },
  solutionNeedTitle: {
    ...BALANCED_TEXT,
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 28,
    fontFamily: 'Georgia',
    marginBottom: 12,
  },
  solutionNeedText: {
    color: '#D3DDEB',
    fontSize: 13,
    lineHeight: 19,
    fontFamily: 'Georgia',
    marginBottom: 18,
  },
  solutionBoxTitle: {
    color: TEXT_DARK,
    fontSize: 17,
    lineHeight: 21,
    fontFamily: 'Georgia',
    marginBottom: 6,
  },
  industryCardTop: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5EDF7',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  industryCardTitle: {
    color: TEXT_DARK,
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'Georgia',
    flex: 1,
  },
  industryCapabilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
    marginTop: 10,
  },
  industryCapabilityGridMobile: {
    flexDirection: 'column',
  },
  industryCapabilityItem: {
    width: '31%',
    minWidth: 220,
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DCE7F3',
    padding: 16,
  },
  industryCapabilityItemMobile: {
    width: '100%',
    minWidth: 0,
  },
  industryCapabilityTitle: {
    color: TEXT_DARK,
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
  },
  industryCapabilityText: {
    color: TEXT_GREY,
    fontSize: 13,
    lineHeight: 19,
    fontFamily: 'Inter_400Regular',
  },
  solutionApproachShell: {
    paddingHorizontal: 38,
    paddingVertical: 34,
  },
  solutionApproachRow: {
    flexDirection: 'row',
    marginTop: 22,
  },
  solutionApproachItem: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 6,
  },
  solutionApproachDivider: {
    borderLeftWidth: 1,
    borderLeftColor: '#C8DDF2',
    paddingLeft: 22,
  },
  solutionStepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: BLUE,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingTop: 7,
    fontSize: 11,
    fontFamily: 'Inter_800ExtraBold',
    marginBottom: 10,
  },
  solutionStepTitle: {
    color: TEXT_DARK,
    fontSize: 16,
    fontFamily: 'Georgia',
    marginBottom: 5,
  },
  solutionStepTextMobile: {
    maxWidth: '100%',
  },
  solutionStepText: {
    color: '#54708E',
    fontSize: 12,
    lineHeight: 17,
    fontFamily: 'Georgia',
    maxWidth: 170,
  },
  solutionStepArrow: {
    position: 'absolute',
    right: 14,
    top: 34,
    color: BLUE,
    fontSize: 22,
  },
  solutionClosingShell: {
    paddingHorizontal: 38,
    paddingVertical: 34,
  },
  solutionClosingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24,
  },
  solutionClosingRowMobile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  solutionClosingCopy: {
    flex: 1,
  },
  solutionClosingAction: {
    alignItems: 'flex-end',
  },
  solutionClosingNote: {
    color: '#B7C0CE',
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    marginTop: 10,
  },
  whoHero: {
    minHeight: 245,
    overflow: 'hidden',
  },
  whoCtaSection: {
    overflow: 'hidden',
  },
  whoHeroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 220,
    gap: 24,
  },
  whoHeroRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  whoHeroCopy: {
    maxWidth: 620,
  },
  whoHeroTitle: {
    ...BALANCED_TEXT,
    color: '#FFFFFF',
    fontSize: 38,
    lineHeight: 42,
    fontFamily: 'Georgia',
  },
  whoHeroTitleAccent: {
    ...BALANCED_TEXT,
    color: BLUE,
    fontSize: 38,
    lineHeight: 42,
    fontFamily: 'Georgia',
    marginBottom: 18,
  },
  whoHeroText: {
    color: '#D6DEE8',
    fontSize: 14,
    lineHeight: 19,
    fontFamily: 'Inter_400Regular',
    maxWidth: 560,
  },
  whoHeroQuote: {
    width: 180,
    alignItems: 'flex-start',
  },
  whoHeroQuoteText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 23,
    fontFamily: 'Georgia',
    fontStyle: 'italic',
  },
  whoStoryRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 18,
  },
  whoStoryRowMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  whoStoryCopy: {
    width: '31%',
    minWidth: 0,
    justifyContent: 'flex-start',
  },
  whoStoryCopyMobile: {
    width: '100%',
  },
  whoBodyText: {
    color: TEXT_GREY,
    fontSize: 12,
    lineHeight: 17,
    fontFamily: 'Georgia',
    marginBottom: 14,
  },
  whoStoryImage: {
    width: '31%',
    minWidth: 0,
    height: 238,
    borderRadius: 8,
  },
  whoStoryImageMobile: {
    width: '100%',
  },
  whoPrinciples: {
    width: '34%',
    minWidth: 0,
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
    padding: 18,
    justifyContent: 'center',
  },
  whoPrinciplesMobile: {
    width: '100%',
  },
  whoPrincipleRow: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  whoPrincipleCopy: {
    flex: 1,
  },
  whoPrincipleTitle: {
    color: TEXT_DARK,
    fontSize: 16,
    fontFamily: 'Georgia',
    marginBottom: 4,
  },
  whoPrincipleText: {
    color: TEXT_GREY,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Georgia',
  },
  whoPrincipleRule: {
    height: 1,
    backgroundColor: '#C9E4FA',
    marginVertical: 14,
  },
  whoWhyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  whoWhyRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  whoWhyCopy: {
    flex: 0.9,
  },
  whoFeatureGrid: {
    flex: 1.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
  },
  whoFeature: {
    flex: 1,
    minWidth: 130,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.16)',
    paddingLeft: 16,
  },
  whoFeatureTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 19,
    fontFamily: 'Georgia',
    marginTop: 12,
    marginBottom: 6,
  },
  whoFeatureText: {
    color: '#AAB8C8',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Georgia',
  },
  whoTeamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 34,
  },
  whoTeamRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  whoTeamCopy: {
    width: '31%',
    minWidth: 0,
  },
  whoTeamCopyMobile: {
    width: '100%',
  },
  whoTeamImage: {
    width: '66%',
    minWidth: 0,
    height: 210,
    borderRadius: 8,
  },
  whoTeamImageMobile: {
    width: '100%',
  },
  whoStatsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: BORDER,
    marginTop: 34,
    paddingTop: 24,
    gap: 20,
  },
  whoStat: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: BORDER,
    paddingRight: 18,
  },
  whoStatValue: {
    color: BLUE,
    fontSize: 24,
    fontFamily: 'Georgia',
  },
  whoStatLabel: {
    color: TEXT_GREY,
    fontSize: 12,
    fontFamily: 'Georgia',
    marginTop: 4,
  },
  whoCtaRow: {
    minHeight: 260,
    justifyContent: 'center',
  },
  whoCtaRowMobile: {
    minHeight: 320,
  },
  whoCtaCopy: {
    maxWidth: 650,
  },
}));
