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

function Btn({ label, variant = 'solid', onDark = false, style, onPress }) {
  const outline = variant === 'outline';
  return (
    <Pressable
      style={({ pressed }) => [
        styles.btn,
        outline
          ? { borderWidth: 1.5, borderColor: onDark ? '#FFFFFF' : BLUE, backgroundColor: 'transparent' }
          : { backgroundColor: BLUE },
        pressed && styles.pressed,
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.btnText, outline && { color: onDark ? '#FFFFFF' : BLUE }]}>{label}</Text>
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
      {image && <Image source={image} style={StyleSheet.absoluteFill} resizeMode="cover" />}
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
            const page = item === 'Who We Are' ? 'who' : 'home';
            return (
              <Pressable key={item} onPress={() => item === 'Who We Are' && onNavigate('who')}>
                <Text style={[styles.navItem, compact && styles.navItemCompact, activePage === page && item === 'Who We Are' && styles.navItemActive]}>
                  {item}
                </Text>
              </Pressable>
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
            {footerColumns.map((item) => (
              <Pressable key={item} onPress={() => item === 'About' && onNavigate('who')}>
                <Text style={styles.footerLink}>{item}</Text>
              </Pressable>
            ))}
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

function WhoWeArePage({ isMobile, onNavigate }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.page}>
        <Section
          bg={NAVY}
          image={require('./assets/who-we-are/who-hero-crop.png')}
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
            <Image source={require('./assets/who-we-are/who-story-crop.png')} style={[styles.whoStoryImage, isMobile && styles.whoStoryImageMobile]} resizeMode="cover" />
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
            <Image source={require('./assets/who-we-are/who-team-crop.png')} style={[styles.whoTeamImage, isMobile && styles.whoTeamImageMobile]} resizeMode="cover" />
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
                <Btn label="TELL US YOUR BUSINESS PROBLEM →" />
                <Btn label="EXPLORE OUR SOLUTIONS" variant="outline" onDark />
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
            {!isMobile && <Text style={styles.linkText}>VIEW ALL SOLUTIONS →</Text>}
          </View>

          <View style={[styles.solutionsGrid, isMobile && styles.solutionsGridMobile]}>
            {solutions.map((item) => (
              <View key={item.title} style={styles.solutionCard}>
                <Image source={item.bg} style={styles.solutionImage} resizeMode="cover" />
                <Text style={styles.solutionTitle}>{item.title}</Text>
                <Text style={styles.solutionDesc}>{item.desc}</Text>
                <Text style={styles.linkText}>LEARN MORE →</Text>
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
            {!isMobile && <Text style={styles.linkText}>EXPLORE INDUSTRIES →</Text>}
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
  navItemCompact: {
    fontSize: 9,
  },
  btn: {
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignSelf: 'flex-start',
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
