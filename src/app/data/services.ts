export interface ServiceItem {
  title: string;
  slug: string;
  short: string;
  details: string;
  tags: string[];
  headline: string;
  overview: string;
  benefits: string[];
  process: { step: string; title: string; description: string }[];
  deliverables: string[];
  idealFor: string[];
}

export const servicesData: ServiceItem[] = [
  {
    title: 'SaaS Development',
    slug: 'saas-development',
    short: 'Scalable cloud-based software solutions with seamless integration.',
    details:
      'We design and build secure SaaS platforms with multi-tenant architecture, robust APIs, and scalable infrastructure to support rapid growth.',
    tags: ['Custom Dev', 'Cloud', 'API', 'Multi-tenant', 'Security', 'Scalability'],
    headline: 'Build cloud products that scale with your business',
    overview:
      'From MVP to enterprise-ready platforms, we create SaaS products with clean architecture, subscription-ready billing flows, and infrastructure that grows with your user base.',
    benefits: [
      'Multi-tenant architecture designed for growth',
      'Secure APIs and role-based access control',
      'Cloud-native deployment and monitoring',
      'Faster product iteration with modular design',
    ],
    process: [
      { step: '01', title: 'Discovery', description: 'Map product goals, users, and success metrics.' },
      { step: '02', title: 'Architecture', description: 'Define data models, APIs, and tenant strategy.' },
      { step: '03', title: 'Build & Launch', description: 'Ship core features, then scale with feedback.' },
    ],
    deliverables: ['Product roadmap', 'SaaS web app', 'Admin console', 'API documentation', 'Deployment setup'],
    idealFor: ['Startups launching a product', 'Teams modernizing legacy tools', 'Businesses productizing internal software'],
  },
  {
    title: 'CRM Solutions',
    slug: 'crm-solutions',
    short: 'Powerful customer relationship management to streamline operations.',
    details:
      'Our CRM solutions improve sales workflows, customer support, and analytics while integrating with your existing systems.',
    tags: ['Sales', 'Support', 'Analytics', 'Lead Management', 'Automation', 'Integrations'],
    headline: 'Turn leads into lasting customer relationships',
    overview:
      'We implement and customize CRM systems that connect sales, support, and marketing so your team always has the right context at the right time.',
    benefits: [
      'Centralized customer and lead data',
      'Automated follow-ups and pipelines',
      'Better forecasting with live analytics',
      'Integrations with email, WhatsApp, and tools you already use',
    ],
    process: [
      { step: '01', title: 'Audit', description: 'Review current sales and support workflows.' },
      { step: '02', title: 'Configure', description: 'Set pipelines, fields, roles, and automations.' },
      { step: '03', title: 'Adopt', description: 'Train teams and refine based on real usage.' },
    ],
    deliverables: ['CRM setup', 'Pipeline design', 'Automation rules', 'Team training', 'Reporting dashboards'],
    idealFor: ['Sales-led teams', 'Growing support operations', 'Businesses with scattered customer data'],
  },
  {
    title: 'ERP (Enterprise Resource Planning)',
    slug: 'erp-enterprise-resource-planning',
    short: 'Integrated ERP systems to unify finance, operations, HR, and inventory.',
    details:
      'We implement ERP solutions that centralize business processes, improve visibility, and help leadership make faster, data-backed decisions.',
    tags: ['Finance', 'Operations', 'Inventory', 'HR', 'Procurement', 'Reporting'],
    headline: 'Unify operations into one connected system',
    overview:
      'Our ERP implementations connect finance, inventory, procurement, and HR so leadership gets one source of truth across the business.',
    benefits: [
      'Reduced manual reconciliation work',
      'Real-time visibility across departments',
      'Standardized processes and approvals',
      'Better inventory and cost control',
    ],
    process: [
      { step: '01', title: 'Process Mapping', description: 'Document workflows and pain points.' },
      { step: '02', title: 'Implementation', description: 'Configure modules, roles, and integrations.' },
      { step: '03', title: 'Go-Live Support', description: 'Migrate data, train users, and stabilize.' },
    ],
    deliverables: ['ERP configuration', 'Module rollouts', 'Data migration', 'Role-based access', 'Management reports'],
    idealFor: ['Growing enterprises', 'Multi-location businesses', 'Teams replacing spreadsheets'],
  },
  {
    title: 'Mobile Applications',
    slug: 'mobile-applications',
    short: 'Native and cross-platform apps delivering exceptional experiences.',
    details:
      'From idea to launch, we create performance-focused mobile apps with intuitive UX and business-aligned functionality.',
    tags: ['iOS', 'Android', 'React Native', 'Flutter', 'UI/UX', 'App Store Optimization'],
    headline: 'Ship mobile apps users love to open daily',
    overview:
      'We design and develop iOS and Android apps that feel fast, intuitive, and aligned with your business goals—from first wireframe to store launch.',
    benefits: [
      'Native or cross-platform delivery',
      'Clean UX focused on retention',
      'Secure backend integrations',
      'Store-ready builds and release support',
    ],
    process: [
      { step: '01', title: 'UX Design', description: 'Define flows, screens, and interaction patterns.' },
      { step: '02', title: 'Development', description: 'Build app features with API and auth layers.' },
      { step: '03', title: 'Launch', description: 'Test, publish, and iterate after release.' },
    ],
    deliverables: ['App UI/UX', 'iOS/Android builds', 'Backend APIs', 'QA reports', 'Store listing assets'],
    idealFor: ['Consumer startups', 'Service businesses', 'Enterprises needing field apps'],
  },
  {
    title: 'AI & Machine Learning',
    slug: 'ai-machine-learning',
    short: 'Intelligent automation transforming data into actionable insights.',
    details:
      'We help teams automate repetitive work, predict trends, and use AI-driven decision support in real business environments.',
    tags: ['Automation', 'Predictive', 'NLP', 'Computer Vision', 'ML Models', 'Data Pipelines'],
    headline: 'Put AI to work on real business outcomes',
    overview:
      'We build practical AI solutions—chat assistants, prediction models, and automation workflows—that plug into your existing systems and save time.',
    benefits: [
      'Automate repetitive operational tasks',
      'Extract insights from documents and data',
      'Improve decisions with predictive signals',
      'Deploy models with monitoring and guardrails',
    ],
    process: [
      { step: '01', title: 'Use-Case Fit', description: 'Identify high-ROI AI opportunities.' },
      { step: '02', title: 'Prototype', description: 'Build and validate a working pilot.' },
      { step: '03', title: 'Productionize', description: 'Integrate, monitor, and improve over time.' },
    ],
    deliverables: ['AI strategy brief', 'Working prototype', 'Production integration', 'Evaluation metrics', 'Ops playbook'],
    idealFor: ['Ops-heavy businesses', 'Product teams adding AI features', 'Companies with unused data'],
  },
  {
    title: 'Graphic Design',
    slug: 'graphic-design',
    short: 'Creative visual solutions bringing your brand identity to life.',
    details:
      'Our design team crafts compelling brand assets and visual systems that communicate clearly across print and digital.',
    tags: ['Branding', 'UI/UX', 'Print', 'Logo Design', 'Packaging', 'Style Guides'],
    headline: 'Create a visual identity that stands out',
    overview:
      'From logos to full brand systems, we design visuals that feel consistent, premium, and ready for every channel your audience sees.',
    benefits: [
      'Stronger brand recognition',
      'Consistent multi-channel assets',
      'Clear visual storytelling',
      'Ready-to-use design systems',
    ],
    process: [
      { step: '01', title: 'Brand Brief', description: 'Capture positioning, audience, and tone.' },
      { step: '02', title: 'Concepting', description: 'Explore directions and refine the winner.' },
      { step: '03', title: 'Delivery', description: 'Hand over final files and usage guidelines.' },
    ],
    deliverables: ['Logo suite', 'Brand guidelines', 'Marketing creatives', 'Print-ready files', 'Social templates'],
    idealFor: ['New brands', 'Rebrands', 'Campaign launches'],
  },
  {
    title: 'Website Design',
    slug: 'website-design',
    short: 'Modern responsive designs that captivate and convert visitors.',
    details:
      'We design conversion-oriented websites with clean information architecture, strong messaging, and user-first interfaces.',
    tags: ['Responsive', 'UX', 'Conversion', 'Wireframing', 'Prototyping', 'A/B Testing'],
    headline: 'Design websites that convert curiosity into action',
    overview:
      'We craft responsive website experiences with clear hierarchy, persuasive messaging, and interfaces that guide visitors toward contact and purchase.',
    benefits: [
      'Higher engagement and conversion rates',
      'Mobile-first responsive layouts',
      'Clear messaging architecture',
      'Design systems ready for development',
    ],
    process: [
      { step: '01', title: 'Structure', description: 'Define sitemap, user journeys, and wireframes.' },
      { step: '02', title: 'Visual Design', description: 'Create high-fidelity page designs.' },
      { step: '03', title: 'Handoff', description: 'Prepare assets and specs for build.' },
    ],
    deliverables: ['Sitemap', 'Wireframes', 'UI designs', 'Prototype', 'Design handoff kit'],
    idealFor: ['Brand websites', 'Landing pages', 'Product marketing sites'],
  },
  {
    title: 'Web Development',
    slug: 'web-development',
    short: 'High-performance applications using cutting-edge technologies.',
    details:
      'We build fast, maintainable web applications with modern frontend and backend stacks tailored to your business workflows.',
    tags: ['React', 'Node.js', 'Full-stack', 'Next.js', 'Express', 'Database Design'],
    headline: 'Develop fast, reliable web applications',
    overview:
      'Our full-stack team builds performant websites and web apps with clean code, secure backends, and architectures that are easy to maintain.',
    benefits: [
      'Fast load times and strong SEO foundations',
      'Secure APIs and authentication',
      'Scalable frontend and backend structure',
      'Maintainable code for long-term growth',
    ],
    process: [
      { step: '01', title: 'Plan', description: 'Define scope, stack, and technical milestones.' },
      { step: '02', title: 'Develop', description: 'Build UI, APIs, and integrations in sprints.' },
      { step: '03', title: 'Deploy', description: 'Launch, monitor, and support post-release.' },
    ],
    deliverables: ['Web application', 'Admin panels', 'API layer', 'CI/CD setup', 'Documentation'],
    idealFor: ['Businesses needing custom portals', 'Product teams', 'Companies replatforming old sites'],
  },
  {
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    short: 'Data-driven strategies maximizing ROI and digital footprint.',
    details:
      'Our marketing team executes measurable campaigns across SEO, paid media, and conversion funnels to drive growth.',
    tags: ['SEO', 'PPC', 'Analytics', 'Funnel Strategy', 'Remarketing', 'Conversion Optimization'],
    headline: 'Grow demand with campaigns that measure up',
    overview:
      'We plan and run digital marketing programs across SEO, paid ads, and conversion funnels with clear reporting and continuous optimization.',
    benefits: [
      'Qualified traffic growth',
      'Improved ROAS on paid spend',
      'Funnel clarity from click to conversion',
      'Transparent reporting and iteration',
    ],
    process: [
      { step: '01', title: 'Strategy', description: 'Set goals, channels, and audience targeting.' },
      { step: '02', title: 'Execution', description: 'Launch campaigns and creative tests.' },
      { step: '03', title: 'Optimize', description: 'Improve performance with weekly insights.' },
    ],
    deliverables: ['Marketing plan', 'Campaign setup', 'Creative variants', 'Analytics dashboards', 'Monthly reports'],
    idealFor: ['Brands seeking lead growth', 'E-commerce teams', 'Service businesses expanding online'],
  },
  {
    title: 'Social Media Marketing',
    slug: 'social-media-marketing',
    short: 'Engaging campaigns that build communities and amplify reach.',
    details:
      'We craft content strategies and social campaigns that increase engagement and brand visibility on priority channels.',
    tags: ['Content', 'Engagement', 'Growth', 'Community Building', 'Paid Social', 'Influencer Campaigns'],
    headline: 'Build presence where your audience already spends time',
    overview:
      'We manage content calendars, community engagement, and paid social campaigns that grow followers and turn attention into inquiries.',
    benefits: [
      'Consistent brand presence',
      'Higher engagement and reach',
      'Community-led trust building',
      'Paid social that supports organic growth',
    ],
    process: [
      { step: '01', title: 'Positioning', description: 'Define voice, pillars, and channel mix.' },
      { step: '02', title: 'Content Engine', description: 'Produce and publish scheduled content.' },
      { step: '03', title: 'Growth Loops', description: 'Engage, boost winners, and refine.' },
    ],
    deliverables: ['Content calendar', 'Creative posts', 'Community management', 'Paid social setup', 'Performance reports'],
    idealFor: ['Consumer brands', 'Local businesses', 'Founders building personal brands'],
  },
  {
    title: 'Audio Video Editing',
    slug: 'audio-video-editing',
    short: 'Professional editing transforming footage into compelling stories.',
    details:
      'From ad creatives to long-form brand stories, we edit for clarity, emotion, and platform-specific impact.',
    tags: ['Production', 'Post', 'Color', 'Sound Design', 'Motion Edit', 'Platform Formatting'],
    headline: 'Turn raw footage into stories that hold attention',
    overview:
      'Our editors shape interviews, ads, reels, and long-form video with pacing, color, sound, and formats tailored to each platform.',
    benefits: [
      'Faster content turnaround',
      'Platform-ready aspect ratios',
      'Polished color and audio finishing',
      'Stronger storytelling and retention',
    ],
    process: [
      { step: '01', title: 'Ingest', description: 'Organize footage and define cut goals.' },
      { step: '02', title: 'Edit', description: 'Assemble story, pacing, and transitions.' },
      { step: '03', title: 'Finish', description: 'Color, sound, captions, and export.' },
    ],
    deliverables: ['Edited masters', 'Social cuts', 'Captions', 'Sound mix', 'Thumbnail frames'],
    idealFor: ['Brands producing ads', 'Creators and agencies', 'Corporate communications teams'],
  },
  {
    title: 'Motion Graphics & VFX',
    slug: 'motion-graphics',
    short: 'Eye-catching visual effects that elevate your content.',
    details:
      'We produce dynamic motion graphics and visual effects for ads, presentations, explainers, and branded video campaigns.',
    tags: ['Animation', 'Compositing', '3D', 'Title Design', 'VFX Pipeline', 'Storyboarding'],
    headline: 'Add motion and visual impact to every frame',
    overview:
      'We create motion graphics, title sequences, and VFX treatments that make product demos, ads, and explainers feel premium and memorable.',
    benefits: [
      'Higher production value without full reshoots',
      'Clear visual explanation of complex ideas',
      'Brand-consistent motion language',
      'Reusable templates for future campaigns',
    ],
    process: [
      { step: '01', title: 'Storyboard', description: 'Plan scenes, timing, and visual style.' },
      { step: '02', title: 'Animate', description: 'Build motion, compositing, and effects.' },
      { step: '03', title: 'Composite', description: 'Polish, render, and deliver final cuts.' },
    ],
    deliverables: ['Motion sequences', 'Title packages', 'VFX shots', 'Explainer animations', 'Editable project files'],
    idealFor: ['Ad campaigns', 'Product launches', 'Presentation and explainer videos'],
  },
  {
    title: 'Animation',
    slug: 'animation',
    short: '2D and 3D animation bringing ideas to life with storytelling.',
    details:
      'Our animation team creates character-driven and product-focused stories that simplify complex ideas and engage audiences.',
    tags: ['2D', '3D', 'Character', 'Explainer Videos', 'Rigging', 'Scene Composition'],
    headline: 'Explain, entertain, and persuade through animation',
    overview:
      'We produce 2D and 3D animation for explainers, product stories, and brand films that make complex ideas easy and memorable.',
    benefits: [
      'Simplify complex products and services',
      'Create memorable brand characters',
      'Engage audiences across social and web',
      'Scale storytelling without live production costs',
    ],
    process: [
      { step: '01', title: 'Script & Style', description: 'Lock narrative and visual direction.' },
      { step: '02', title: 'Animate', description: 'Produce scenes, characters, and timing.' },
      { step: '03', title: 'Deliver', description: 'Sound design, finals, and cutdowns.' },
    ],
    deliverables: ['Script', 'Style frames', 'Full animation', 'Social cutdowns', 'Source files'],
    idealFor: ['SaaS explainers', 'Education content', 'Brand storytelling campaigns'],
  },
  {
    title: 'Brand Advertisement & Luxury Promotion Shoots',
    slug: 'brand-advertisement-luxury-promotion-shoots',
    short: 'Premium brand campaigns and luxury promotion shoots for advertising and high-end marketing.',
    details:
      'We plan and execute brand advertisement and luxury promotion shoots—from creative direction and set design through production and finishing—so your campaigns feel elevated, consistent, and ready for every channel.',
    tags: ['Brand Campaigns', 'Luxury Visuals', 'Commercial Production', 'Art Direction', 'Styling', 'Multi-channel Delivery'],
    headline: 'Produce premium campaigns that feel unmistakably luxury',
    overview:
      'From concept and casting to set, shoot, and finishing, we deliver luxury brand advertisement and promotion assets ready for print, digital, and social.',
    benefits: [
      'Elevated brand perception',
      'End-to-end creative and production control',
      'Assets tailored for every channel',
      'Consistent luxury visual language',
    ],
    process: [
      { step: '01', title: 'Creative Direction', description: 'Define concept, mood, and shot list.' },
      { step: '02', title: 'Production', description: 'Execute styling, set, and shoot days.' },
      { step: '03', title: 'Finishing', description: 'Retouch, grade, and package campaign assets.' },
    ],
    deliverables: ['Creative concept', 'Shoot production', 'Hero imagery', 'Campaign cutdowns', 'Retouched finals'],
    idealFor: ['Luxury brands', 'Premium product launches', 'High-end advertising campaigns'],
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesData.find((item) => item.slug === slug);
}

export function getRelatedServices(slug: string, limit = 3): ServiceItem[] {
  return servicesData.filter((item) => item.slug !== slug).slice(0, limit);
}
