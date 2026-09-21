import React, { useState } from 'react';
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
} from './icons';

const NAVY = '#04101F';
const BLUE = '#0B7DFC';
const BLUE_LIGHT = '#4FA6FF';
const RGF_ACCENT = '#A6D5FF';
const TEXT_DARK = '#0B1424';
const TEXT_GREY = '#5B6472';
const BORDER = '#E3E7EE';

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
  'About',
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

function Btn({ label, variant = 'solid', onDark = false, style, onPress }) {
  const outline = variant === 'outline';
  return (
    <Pressable
      style={({ hovered, pressed }) => [
        styles.btn,
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
        style,
      ]}
      onPress={onPress}
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
          {label}
        </Text>
      )}
    </Pressable>
  );
}

function Logo({ markStyle, nameStyle, taglineStyle, showTagline = true }) {
  return (
    <View>
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

function Section({ bg, children, style, shellStyle, photo, image, scrim }) {
  return (
    <View style={[styles.section, { backgroundColor: bg }, style]}>
      {image && <Image source={image} style={[StyleSheet.absoluteFillObject, styles.sectionBackgroundImage]} resizeMode="stretch" />}
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
      <View style={[styles.shell, shellStyle]}>{children}</View>
    </View>
  );
}

function Eyebrow({ children, onDark = false }) {
  return <Text style={[styles.eyebrow, onDark && { color: '#8CB4E0' }]}>{children}</Text>;
}

function ApproachTile({ bg }) {
  return (
    <View style={styles.approachTile}>
      <Image source={bg} style={styles.approachTileImage} resizeMode="contain" />
    </View>
  );
}

function SiteHeader({ isMobile, onNavigate, activePage = 'home' }) {
  const { width } = useWindowDimensions();
  const compact = !isMobile && width < 900;

  return (
    <View style={[styles.topbar, compact && styles.topbarCompact]}>
      <Pressable onPress={() => onNavigate('home')}>
        <Logo
          markStyle={[styles.headerMark, compact && styles.headerMarkCompact]}
          nameStyle={[styles.headerLogoName, compact && styles.headerLogoNameCompact]}
          taglineStyle={styles.hidden}
          showTagline={false}
        />
      </Pressable>

      {!isMobile && (
        <View style={[styles.navWrap, compact && styles.navWrapCompact]}>
          {navItems.map((item) => {
            const page = item === 'Who We Are' ? 'who' : item === 'Solutions' ? 'solution' : 'home';
            const isWhoLink = item === 'Who We Are';
            const isSolutionLink = item === 'Solutions';
            return (
              <LinkText
                key={item}
                onPress={() => {
                  if (isWhoLink || isSolutionLink) onNavigate(page);
                  else onNavigate('home');
                }}
                style={[
                  styles.navItem,
                  compact && styles.navItemCompact,
                  activePage === page && (isWhoLink || isSolutionLink) && styles.navItemActive,
                ]}
                hoverStyle={styles.navItemHover}
                activeStyle={styles.navItemPressed}
              >
                {item}
              </LinkText>
            );
          })}
        </View>
      )}

      {!isMobile && <Btn label="TELL US YOUR BUSINESS PROBLEM →" onDark style={[styles.headerBtn, compact && styles.headerBtnCompact]} />}
    </View>
  );
}

function SiteFooter({ isMobile, onNavigate }) {
  return (
    <Section bg="#031426" style={styles.footerSection} shellStyle={styles.footerShell}>
      <View style={[styles.footerTop, isMobile && styles.footerTopMobile]}>
        <Pressable onPress={() => onNavigate('home')}>
          <Logo markStyle={styles.footerMark} nameStyle={styles.footerLogoName} taglineStyle={styles.footerLogoTagline} />
        </Pressable>

        {!isMobile && (
          <View style={styles.footerColumns}>
            {footerColumns.map((item) => {
              const isWhoLink = item === 'About';
              const isSolutionLink = item === 'Solutions';
              const targetPage = isWhoLink ? 'who' : isSolutionLink ? 'solution' : 'home';
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
        )}

        <View style={styles.connectWrap}>
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
        <Text style={styles.footerText}>© 2026 RGF Intelligence Solutions. All rights reserved.</Text>
        <Text style={styles.footerText}>Privacy  |  Terms  |  Sitemap</Text>
      </View>
    </Section>
  );
}

function SolutionPage({ isMobile, onNavigate }) {
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
      <ScrollView contentContainerStyle={styles.page}>
        <Section
          bg={NAVY}
          image={require('./assets/our solution.png')}
          scrim={['rgba(4,16,31,0.94)', 'rgba(4,16,31,0.72)', 'rgba(4,16,31,0.94)']}
          style={styles.solutionHero}
          shellStyle={styles.headerShell}
        >
          <SiteHeader isMobile={isMobile} onNavigate={onNavigate} activePage="solution" />
          <View style={[styles.solutionHeroRow, isMobile && styles.solutionHeroRowMobile]}>
            <View style={styles.solutionHeroCopy}>
              <Eyebrow onDark>OUR SOLUTIONS</Eyebrow>
              <Text style={styles.solutionHeroTitle}>Intelligence That{isMobile ? '\n' : ' '}<Text style={styles.solutionHeroTitleAccent}>Solves Real Business Problems.</Text></Text>
              <Text style={styles.solutionHeroText}>
                The right solution can do more than improve efficiency. It can transform how you operate, compete, and grow. We combine human expertise with AI, automation, data, software, and strategy to deliver practical solutions that create measurable value.
              </Text>
              <View style={[styles.solutionHeroButtons, isMobile && styles.solutionHeroButtonsMobile]}>
                <Btn label="TELL US YOUR BUSINESS PROBLEM →" onPress={() => onNavigate('home')} />
                <Btn label="SCHEDULE A CONSULTATION" variant="outline" onDark onPress={() => onNavigate('home')} />
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
          <View style={[styles.solutionTrustRow, isMobile && styles.solutionTrustRowMobile]}>
            {[
              { Icon: UsersIcon, title: 'Business-First', text: 'Approach' },
              { Icon: GearIcon, title: 'Technology', text: 'Agnostic' },
              { Icon: BarChartIcon, title: 'Measurable', text: 'Outcomes' },
              { Icon: ShieldIcon, title: 'Trusted', text: 'Partner' },
            ].map((item, index) => (
              <View key={item.title} style={[styles.solutionTrustItem, index > 0 && !isMobile && styles.solutionTrustDivider]}>
                <item.Icon size={30} color={BLUE} />
                <View><Text style={styles.solutionTrustTitle}>{item.title}</Text><Text style={styles.solutionTrustText}>{item.text}</Text></View>
              </View>
            ))}
          </View>
        </Section>

        <Section bg="#FFFFFF" shellStyle={styles.solutionShell}>
          <View style={styles.solutionSectionHeading}>
            <View style={styles.solutionIntroCopy}>
              <Eyebrow>OUR SOLUTIONS</Eyebrow>
              <Text style={styles.sectionTitleDark}>Smarter Solutions for a Stronger Tomorrow.</Text>
              <Text style={styles.solutionIntroText}>From AI and automation to data, software, and business transformation, our solutions are designed to help you solve today’s challenges and unlock new opportunities for growth.</Text>
            </View>
            {!isMobile && <LinkText style={styles.linkText} hoverStyle={styles.linkTextHover} activeStyle={styles.linkTextPressed} onPress={() => onNavigate('home')}>DISCUSS YOUR NEEDS →</LinkText>}
          </View>
          <View style={[styles.solutionGrid, isMobile && styles.solutionGridMobile]}>
            {solutionCards.map((item) => (
              <View key={item.title} style={styles.solutionVisualCard}>
                <Image source={item.bg} style={styles.solutionVisualImage} resizeMode="cover" />
                <View style={styles.solutionVisualBody}>
                  <Text style={styles.solutionBoxTitle}>{item.title}</Text>
                  <Text style={styles.solutionVisualSubtitle}>{item.subtitle}</Text>
                  {item.bullets.map((bullet) => <Text key={bullet} style={styles.solutionBullet}>•  {bullet}</Text>)}
                  <LinkText style={[styles.linkText, styles.solutionLearnMore]} hoverStyle={styles.linkTextHover} activeStyle={styles.linkTextPressed}>LEARN MORE →</LinkText>
                </View>
              </View>
            ))}
            <View style={styles.solutionNeedCard}>
              <Text style={styles.solutionNeedTitle}>Not Sure What{ '\n'}Solution You Need?</Text>
              <Text style={styles.solutionNeedText}>That’s okay. You don’t need to know the technology. Just tell us what’s not working, and we’ll help identify the right solution.</Text>
              <Btn label="TELL US YOUR BUSINESS PROBLEM →" onPress={() => onNavigate('home')} />
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
            {!isMobile && <LinkText style={styles.linkText} hoverStyle={styles.linkTextHover} activeStyle={styles.linkTextPressed} onPress={() => onNavigate('home')}>LEARN MORE ABOUT{ '\n'}HOW WE WORK →</LinkText>}
          </View>
          <View style={[styles.solutionApproachRow, isMobile && styles.solutionApproachRowMobile]}>
            {approachSteps.map((step, index) => (
              <View key={step.number} style={[styles.solutionApproachItem, index > 0 && !isMobile && styles.solutionApproachDivider]}>
                <Text style={styles.solutionStepNumber}>{step.number}</Text>
                <Text style={styles.solutionStepTitle}>{step.title}</Text>
                <Text style={styles.solutionStepText}>{step.text}</Text>
                {index < approachSteps.length - 1 && !isMobile && <Text style={styles.solutionStepArrow}>→</Text>}
              </View>
            ))}
          </View>
        </Section>

        <Section bg={NAVY} shellStyle={styles.solutionClosingShell}>
          <View style={[styles.solutionClosingRow, isMobile && styles.solutionClosingRowMobile]}>
            <View style={styles.solutionClosingCopy}>
              <Eyebrow onDark>READY TO FIND THE RIGHT SOLUTION?</Eyebrow>
              <Text style={styles.sectionTitleLight}>Let’s Solve Your Business Problem.</Text>
              <Text style={styles.sectionSubtitleLight}>Whether you need AI, automation, better data, connected systems or a complete transformation, we’ll help you determine the best path forward.</Text>
            </View>
            <View style={styles.solutionClosingAction}>
              <Btn label="TELL US YOUR BUSINESS PROBLEM →" onPress={() => onNavigate('home')} />
              <Text style={styles.solutionClosingNote}>Confidential  •  No Obligation  •  Real Solutions</Text>
            </View>
          </View>
        </Section>

        <SiteFooter isMobile={isMobile} onNavigate={onNavigate} />
      </ScrollView>
    </SafeAreaView>
  );
}

function WhoWeArePage({ isMobile, onNavigate }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.page}>
        <Section
          bg={NAVY}
          image={require('./assets/bg2.png')}
          scrim={['rgba(4,16,31,0.8)', 'rgba(4,16,31,0.38)', 'rgba(4,16,31,0.65)']}
          style={styles.whoHero}
          shellStyle={styles.whoShell}
        >
          <SiteHeader isMobile={isMobile} onNavigate={onNavigate} activePage="who" />
          <View style={[styles.whoHeroRow, isMobile && styles.whoHeroRowMobile]}>
            <View style={styles.whoHeroCopy}>
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
            <View style={styles.whoWhyCopy}>
              <Eyebrow onDark>WHY CHOOSE RGF</Eyebrow>
              <Text style={[styles.sectionTitleLight, styles.whoSectionTitleLight]}>More Than Technology.{"\n"}A True Partner.</Text>
              <Text style={styles.sectionSubtitleLight}>
                We don’t just provide solutions. We work alongside your team to understand your goals,
                challenges, and unique needs. Our approach combines strategy, technology, and hands-on support
                to ensure you get measurable results.
              </Text>
            </View>
            <View style={[styles.whoFeatureGrid, isMobile && styles.whoFeatureGridMobile]}>
              {[
                [BuildingIcon, 'Industry & Business Expertise', 'Real-world experience across multiple industries and business sizes.'],
                [GearIcon, 'Advanced Technology', 'AI, automation, data, and modern software solutions.'],
                [UsersIcon, 'Collaborative Approach', 'Your goals. Our team. One path forward.'],
                [TrendIcon, 'Measurable Results', 'Greater efficiency, lower costs, and long-term growth.'],
              ].map(([Icon, title, text]) => (
                <View key={title} style={styles.whoFeature}>
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
              <Btn label="MEET OUR TEAM →" />
            </View>
            <Image source={require('./assets/img2.jpg')} style={[styles.whoTeamImage, isMobile && styles.whoTeamImageMobile]} resizeMode="cover" />
          </View>
          <View style={[styles.whoStatsRow, isMobile && styles.whoStatsRowMobile]}>
            {[
              ['100%', 'Client-Focused'],
              ['50+', 'Technologies & Tools'],
              ['Multiple', 'Industries'],
              ['Scalable', 'for Any Business Size'],
            ].map(([value, label]) => (
              <View key={label} style={styles.whoStat}>
                <Text style={styles.whoStatValue}>{value}</Text>
                <Text style={styles.whoStatLabel}>{label}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section bg={NAVY} image={require('./assets/who-we-are/who-cta-crop.png')} scrim={['rgba(4,16,31,0.7)', 'rgba(4,16,31,0.35)', 'rgba(4,16,31,0.72)']} style={styles.whoCtaSection} shellStyle={styles.whoShell}>
          <View style={[styles.whoCtaRow, isMobile && styles.whoCtaRowMobile]}>
            <View style={styles.whoCtaCopy}>
              <Eyebrow onDark>LET’S BUILD WHAT’S NEXT</Eyebrow>
              <Text style={[styles.sectionTitleLight, styles.whoSectionTitleLight]}>Ready to Turn Your Business{"\n"}Challenges Into Real Solutions?</Text>
              <Text style={styles.sectionSubtitleLight}>Partner with RGF Intelligence Solutions and discover how intelligent technology can help you work smarter, grow faster, and achieve more.</Text>
              <Btn label="TELL US YOUR BUSINESS PROBLEM →" />
            </View>
          </View>
        </Section>

        <SiteFooter isMobile={isMobile} onNavigate={onNavigate} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  const { width } = useWindowDimensions();
  const isMobile = width < 700;
  const [page, setPage] = useState('home');

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
    return <WhoWeArePage isMobile={isMobile} onNavigate={setPage} />;
  }

  if (page === 'solution') {
    return <SolutionPage isMobile={isMobile} onNavigate={setPage} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.page}>
        <Section
          bg={NAVY}
          image={require('./assets/bgimg.png')}
          scrim={['rgba(4,16,31,0.5)', 'rgba(4,16,31,0.25)', 'rgba(4,16,31,0.5)']}
          style={styles.heroSection}
          shellStyle={styles.headerShell}
        >
          <SiteHeader isMobile={isMobile} onNavigate={setPage} />

          <View style={[styles.heroRow, isMobile && styles.heroRowMobile]}>
            <View style={styles.heroTextWrap}>
              <Text style={styles.heroKicker}>INTELLIGENCE. EXECUTION. REAL RESULTS.</Text>
              <Text style={styles.heroTitle}>
                <Text style={{ color: BLUE_LIGHT }}>
                  <Text style={styles.heroInitial}>R</Text>eimagine
                </Text>{' '}
                with AI.{'\n'}
                <Text style={{ color: BLUE_LIGHT }}>
                  <Text style={[styles.heroInitial, styles.heroInitialG]}>G</Text>enerate
                </Text>{' '}
                Value.{'\n'}
                <Text style={{ color: BLUE_LIGHT }}>
                  <Text style={styles.heroInitial}>F</Text>orge
                </Text>{' '}
                <Text style={{ color: '#FFFFFF' }}>the Future.</Text>
              </Text>
              <Text style={styles.heroText}>
                We help forward-thinking businesses solve complex problems using AI, automation,
                data and intelligent technology — turning ideas into measurable results.
              </Text>

              <View style={styles.buttonRow}>
                <Btn label="TELL US YOUR BUSINESS PROBLEM →" onPress={() => setPage('home')} />
                <Btn label="EXPLORE OUR SOLUTIONS" variant="outline" onDark onPress={() => setPage('solution')} />
              </View>

              <Text style={styles.heroLinkRow}>
                {heroLinks.map((item, i) => (
                  <Text key={item}>
                    {item}
                    {i < heroLinks.length - 1 ? '   |   ' : ''}
                  </Text>
                ))}
              </Text>
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

          <View style={[styles.challengeRow, isMobile && styles.challengeRowMobile]}>
            {challenges.map((item, index) => (
              <View
                key={item.title}
                style={[styles.challengeItem, index > 0 && !isMobile && styles.challengeDivider]}
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
            <View style={styles.approachCopy}>
              <Eyebrow onDark>THE RGF APPROACH</Eyebrow>
              <Text style={styles.sectionTitleLight}>From Today’s Challenges to Tomorrow’s Opportunities</Text>
              <Text style={styles.sectionSubtitleLight}>
                We combine business expertise with AI and technology to solve real problems and create
                measurable value.
              </Text>
              <Btn label="OUR APPROACH →" variant="outline" onDark />
            </View>

            <View style={[styles.approachRow, isMobile && styles.approachRowMobile]}>
              {approachSteps.map((step, index) => (
                <View
                  key={step.letter}
                  style={[styles.approachItem, index > 0 && !isMobile && styles.approachDivider]}
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
            <View>
              <Eyebrow>OUR SOLUTIONS</Eyebrow>
              <Text style={styles.sectionTitleDark}>Intelligence That Works for Your Business</Text>
            </View>
            {!isMobile && (
              <LinkText style={styles.linkText} hoverStyle={styles.linkTextHover} activeStyle={styles.linkTextPressed} onPress={() => setPage('solution')}>
                VIEW ALL SOLUTIONS →
              </LinkText>
            )}
          </View>

          <View style={[styles.solutionsGrid, isMobile && styles.solutionsGridMobile]}>
            {solutions.map((item) => (
              <View key={item.title} style={styles.solutionCard}>
                <Image source={item.bg} style={styles.solutionImage} resizeMode="cover" />
                <Text style={styles.solutionTitle}>{item.title}</Text>
                <Text style={styles.solutionDesc}>{item.desc}</Text>
                <LinkText style={styles.linkText} hoverStyle={styles.linkTextHover} activeStyle={styles.linkTextPressed} onPress={() => setPage('solution')}>
                  LEARN MORE →
                </LinkText>
              </View>
            ))}
          </View>
        </Section>

        <Section bg={NAVY} photo={TELLUS_PHOTO}>
          <View style={[styles.tellUsRow, isMobile && styles.tellUsRowMobile]}>
            <View style={styles.tellUsCopy}>
              <Eyebrow onDark>TELL US YOUR BUSINESS PROBLEM</Eyebrow>
              <Text style={styles.sectionTitleLight}>
                You Don’t Need to Know the Technology. <Text style={{ color: BLUE_LIGHT }}>Start Here.</Text>
              </Text>
              <Text style={styles.sectionSubtitleLight}>
                Describe what’s not working, and our AI will help analyze your challenge and recommend next steps.
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Describe your biggest business challenge..."
                placeholderTextColor="#8A94A6"
              />
              <Btn label="ANALYZE MY BUSINESS PROBLEM →" style={{ marginTop: 14, marginBottom: 20 }} />

              <View style={styles.trustRowWrap}>
                {trustPoints.map((item) => (
                  <View key={item.label} style={styles.trustRow}>
                    <item.Icon size={16} color="#B7C0CE" />
                    <Text style={styles.trustText}>{item.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            {!isMobile && (
              <View style={styles.tellUsCard}>
                <Text style={styles.tellUsCardTitle}>Turn Questions Into Opportunities</Text>
                <View style={styles.tellUsCardRule} />
                {checklist.map((item) => (
                  <View key={item} style={styles.checkRow}>
                    <CheckIcon size={15} color={BLUE_LIGHT} />
                    <Text style={styles.checkText}>{item}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </Section>

        <Section bg="#FFFFFF">
          <View style={styles.solutionsHeader}>
            <View>
              <Eyebrow>INDUSTRIES WE SERVE</Eyebrow>
              <Text style={styles.sectionTitleDark}>Real-World Solutions. Measurable Results.</Text>
            </View>
            {!isMobile && (
              <LinkText style={styles.linkText} hoverStyle={styles.linkTextHover} activeStyle={styles.linkTextPressed} onPress={() => setPage('solution')}>
                EXPLORE INDUSTRIES →
              </LinkText>
            )}
          </View>

          <View style={[styles.industriesRow, isMobile && styles.industriesRowMobile]}>
            {industries.map((item, index) => (
              <View
                key={item.label}
                style={[styles.industryItem, index > 0 && !isMobile && styles.challengeDivider]}
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
                <View key={item.label} style={[styles.statItem, index > 0 && !isMobile && styles.approachDivider]}>
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

        <Section bg={NAVY} photo={CTA_PHOTO}>
          <View style={[styles.ctaRow, isMobile && styles.ctaRowMobile]}>
            <View style={styles.ctaCopy}>
              <Text style={styles.ctaTitle}>Your Business Has the Problem.</Text>
              <Text style={[styles.ctaTitle, { color: BLUE_LIGHT }]}>Let’s Build the Solution.</Text>
              <Text style={styles.ctaText}>Human Expertise + AI + Automation + Technology = Real Results.</Text>
              <Btn label="TELL US YOUR BUSINESS PROBLEM →" style={{ marginTop: 18 }} />
            </View>

            {!isMobile && (
              <Logo markStyle={styles.ctaMark} nameStyle={styles.ctaLogoName} taglineStyle={styles.ctaLogoTagline} />
            )}
          </View>
        </Section>

        <SiteFooter isMobile={isMobile} onNavigate={setPage} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 18,
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
  navWrapCompact: {
    gap: 10,
  },
  navItem: {
    color: '#D6DEE8',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  navItemHover: {
    color: BLUE_LIGHT,
  },
  navItemPressed: {
    color: '#A6D5FF',
  },
  navItemCompact: {
    fontSize: 9,
  },
  btn: {
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 12,
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
    color: '#B7C0CE',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 2,
    marginBottom: 14,
  },
  heroTitle: {
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
    color: BLUE,
    fontSize: 12,
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: 1.6,
    marginBottom: 10,
  },
  sectionTitleDark: {
    color: TEXT_DARK,
    fontSize: 32,
    lineHeight: 38,
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: -0.6,
    marginBottom: 8,
    maxWidth: 640,
  },
  sectionTitleLight: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 37,
    fontFamily: 'Inter_800ExtraBold',
    letterSpacing: -0.6,
    marginBottom: 12,
    maxWidth: 420,
  },
  whoSectionTitleDark: {
    fontSize: 27,
    lineHeight: 30,
    fontFamily: 'Georgia',
    letterSpacing: 0,
  },
  whoSectionTitleLight: {
    fontSize: 27,
    lineHeight: 30,
    fontFamily: 'Georgia',
    letterSpacing: 0,
  },
  sectionSubtitle: {
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
  challengeRowMobile: {
    flexDirection: 'column',
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
  approachRowMobile: {
    flexDirection: 'column',
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
  },
  tellUsRowMobile: {
    flexDirection: 'column',
  },
  tellUsCopy: {
    flex: 1.3,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 22,
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
  industriesRowMobile: {
    flexDirection: 'column',
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
  ctaTitle: {
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
    alignItems: 'center',
    gap: 22,
    flex: 1,
    justifyContent: 'center',
  },
  footerLink: {
    color: '#B7C0CE',
    fontSize: 10,
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
    alignItems: 'flex-start',
  },
  footerText: {
    color: '#7C8798',
    fontSize: 9,
    fontFamily: 'Inter_400Regular',
  },
  navItemActive: {
    color: BLUE_LIGHT,
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
  solutionTrustRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 18,
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
  solutionGridMobile: {
    flexDirection: 'column',
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
    padding: 14,
    minHeight: 236,
  },
  solutionVisualSubtitle: {
    color: '#54708E',
    fontSize: 12,
    lineHeight: 17,
    fontFamily: 'Georgia',
    marginBottom: 8,
  },
  solutionBullet: {
    color: '#3D5C7C',
    fontSize: 11,
    lineHeight: 17,
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
  solutionNeedTitle: {
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
  solutionApproachShell: {
    paddingHorizontal: 38,
    paddingVertical: 34,
  },
  solutionApproachRow: {
    flexDirection: 'row',
    marginTop: 22,
  },
  solutionApproachRowMobile: {
    flexDirection: 'column',
    gap: 20,
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
    alignItems: 'flex-start',
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
    color: '#FFFFFF',
    fontSize: 38,
    lineHeight: 42,
    fontFamily: 'Georgia',
  },
  whoHeroTitleAccent: {
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
  whoFeatureGridMobile: {
    flexDirection: 'column',
    width: '100%',
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
  whoStatsRowMobile: {
    flexDirection: 'column',
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
});
