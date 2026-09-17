import React from 'react';
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

const navItems = ['Solutions', 'Industries', 'How We Work', 'Insights', 'About', 'Contact'];
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
    bg: require('./assets/rgf-tile-r.png'),
  },
  {
    letter: 'G',
    eyebrow: 'GENERATE',
    title: 'VALUE',
    desc: 'Turn possibility into results. We design and implement solutions that deliver measurable outcomes.',
    bg: require('./assets/rgf-tile-g.png'),
  },
  {
    letter: 'F',
    eyebrow: 'FORGE',
    title: 'THE FUTURE',
    desc: 'We create scalable systems designed for how your organization needs to operate tomorrow.',
    bg: require('./assets/rgf-tile-f.png'),
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
  ['Solutions', 'Industries'],
  ['How We Work', 'Insights'],
  ['Insights'],
  ['About', 'Contact'],
];

function Btn({ label, variant = 'solid', onDark = false, style }) {
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

function Section({ bg, children, style, photo, image, scrim }) {
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
      <View style={styles.shell}>{children}</View>
    </View>
  );
}

function Eyebrow({ children, onDark = false }) {
  return <Text style={[styles.eyebrow, onDark && { color: '#8CB4E0' }]}>{children}</Text>;
}

function ApproachTile({ bg }) {
  return (
    <View style={styles.approachTile}>
      <Image source={bg} style={StyleSheet.absoluteFill} resizeMode="cover" />
      <LinearGradient colors={[NAVY, 'rgba(4,16,31,0)']} style={styles.tileEdgeTop} />
      <LinearGradient colors={['rgba(4,16,31,0)', NAVY]} style={styles.tileEdgeBottom} />
      <LinearGradient
        colors={[NAVY, 'rgba(4,16,31,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.tileEdgeLeft}
      />
      <LinearGradient
        colors={['rgba(4,16,31,0)', NAVY]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.tileEdgeRight}
      />
    </View>
  );
}

export default function App() {
  const { width } = useWindowDimensions();
  const isMobile = width < 860;

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: NAVY }} />;
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
        >
          <View style={styles.topbar}>
            <Logo markStyle={styles.headerMark} nameStyle={styles.headerLogoName} taglineStyle={styles.hidden} showTagline={false} />

            {!isMobile && (
              <View style={styles.navWrap}>
                {navItems.map((item) => (
                  <Text key={item} style={styles.navItem}>
                    {item}
                  </Text>
                ))}
              </View>
            )}

            <Btn label="TELL US YOUR BUSINESS PROBLEM →" onDark style={styles.headerBtn} />
          </View>

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

        <Section bg="#050B14">
          <View style={[styles.footerTop, isMobile && styles.footerTopMobile]}>
            <Logo
              markStyle={styles.footerMark}
              nameStyle={styles.footerLogoName}
              taglineStyle={styles.footerLogoTagline}
            />

            {!isMobile && (
              <View style={styles.footerColumns}>
                {footerColumns.map((col, i) => (
                  <View key={i} style={styles.footerColumn}>
                    {col.map((item) => (
                      <Text key={item} style={styles.footerLink}>
                        {item}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            )}

            <View style={styles.connectWrap}>
              <Text style={styles.connectLabel}>Let’s Stay Connected</Text>
              <View style={styles.linkedinBadge}>
                <Text style={styles.linkedinBadgeText}>in</Text>
              </View>
            </View>
          </View>

          <View style={styles.footerRule} />

          <View style={[styles.footerBottom, isMobile && styles.footerBottomMobile]}>
            <Text style={styles.footerText}>© 2024 RGF Intelligence Solutions. All rights reserved.</Text>
            <Text style={styles.footerText}>Privacy  |  Terms  |  Sitemap</Text>
          </View>
        </Section>
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
    paddingBottom: 30,
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
  navWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
  },
  navItem: {
    color: '#D6DEE8',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
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
  pressed: {
    opacity: 0.85,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.4,
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
    aspectRatio: 0.85,
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#0B1E3D',
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
  footerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 24,
    paddingBottom: 28,
  },
  footerTopMobile: {
    flexDirection: 'column',
  },
  footerMark: {
    width: 104,
    height: 33,
  },
  footerLogoName: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1.4,
    marginTop: 3,
  },
  footerLogoTagline: {
    color: '#7C8798',
    fontSize: 9,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  footerColumns: {
    flexDirection: 'row',
    gap: 36,
  },
  footerColumn: {
    gap: 10,
  },
  footerLink: {
    color: '#B7C0CE',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  connectWrap: {
    alignItems: 'flex-start',
  },
  connectLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    marginBottom: 10,
  },
  linkedinBadge: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkedinBadgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Inter_800ExtraBold',
  },
  footerRule: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 20,
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
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
});
