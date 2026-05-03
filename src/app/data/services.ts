export interface ServiceItem {
  title: string;
  slug: string;
  short: string;
  details: string;
  tags: string[];
}

export const servicesData: ServiceItem[] = [
  {
    title: 'SaaS Development',
    slug: 'saas-development',
    short: 'Scalable cloud-based software solutions with seamless integration.',
    details:
      'We design and build secure SaaS platforms with multi-tenant architecture, robust APIs, and scalable infrastructure to support rapid growth.',
    tags: ['Custom Dev', 'Cloud', 'API', 'Multi-tenant', 'Security', 'Scalability'],
  },
  {
    title: 'CRM Solutions',
    slug: 'crm-solutions',
    short: 'Powerful customer relationship management to streamline operations.',
    details:
      'Our CRM solutions improve sales workflows, customer support, and analytics while integrating with your existing systems.',
    tags: ['Sales', 'Support', 'Analytics', 'Lead Management', 'Automation', 'Integrations'],
  },
  {
    title: 'ERP (Enterprise Resource Planning)',
    slug: 'erp-enterprise-resource-planning',
    short: 'Integrated ERP systems to unify finance, operations, HR, and inventory.',
    details:
      'We implement ERP solutions that centralize business processes, improve visibility, and help leadership make faster, data-backed decisions.',
    tags: ['Finance', 'Operations', 'Inventory', 'HR', 'Procurement', 'Reporting'],
  },
  {
    title: 'Mobile Applications',
    slug: 'mobile-applications',
    short: 'Native and cross-platform apps delivering exceptional experiences.',
    details:
      'From idea to launch, we create performance-focused mobile apps with intuitive UX and business-aligned functionality.',
    tags: ['iOS', 'Android', 'React Native', 'Flutter', 'UI/UX', 'App Store Optimization'],
  },
  {
    title: 'AI & Machine Learning',
    slug: 'ai-machine-learning',
    short: 'Intelligent automation transforming data into actionable insights.',
    details:
      'We help teams automate repetitive work, predict trends, and use AI-driven decision support in real business environments.',
    tags: ['Automation', 'Predictive', 'NLP', 'Computer Vision', 'ML Models', 'Data Pipelines'],
  },
  {
    title: 'Graphic Design',
    slug: 'graphic-design',
    short: 'Creative visual solutions bringing your brand identity to life.',
    details:
      'Our design team crafts compelling brand assets and visual systems that communicate clearly across print and digital.',
    tags: ['Branding', 'UI/UX', 'Print', 'Logo Design', 'Packaging', 'Style Guides'],
  },
  {
    title: 'Website Design',
    slug: 'website-design',
    short: 'Modern responsive designs that captivate and convert visitors.',
    details:
      'We design conversion-oriented websites with clean information architecture, strong messaging, and user-first interfaces.',
    tags: ['Responsive', 'UX', 'Conversion', 'Wireframing', 'Prototyping', 'A/B Testing'],
  },
  {
    title: 'Web Development',
    slug: 'web-development',
    short: 'High-performance applications using cutting-edge technologies.',
    details:
      'We build fast, maintainable web applications with modern frontend and backend stacks tailored to your business workflows.',
    tags: ['React', 'Node.js', 'Full-stack', 'Next.js', 'Express', 'Database Design'],
  },
  {
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    short: 'Data-driven strategies maximizing ROI and digital footprint.',
    details:
      'Our marketing team executes measurable campaigns across SEO, paid media, and conversion funnels to drive growth.',
    tags: ['SEO', 'PPC', 'Analytics', 'Funnel Strategy', 'Remarketing', 'Conversion Optimization'],
  },
  {
    title: 'Social Media Marketing',
    slug: 'social-media-marketing',
    short: 'Engaging campaigns that build communities and amplify reach.',
    details:
      'We craft content strategies and social campaigns that increase engagement and brand visibility on priority channels.',
    tags: ['Content', 'Engagement', 'Growth', 'Community Building', 'Paid Social', 'Influencer Campaigns'],
  },
  {
    title: 'Audio Video Editing',
    slug: 'audio-video-editing',
    short: 'Professional editing transforming footage into compelling stories.',
    details:
      'From ad creatives to long-form brand stories, we edit for clarity, emotion, and platform-specific impact.',
    tags: ['Production', 'Post', 'Color', 'Sound Design', 'Motion Edit', 'Platform Formatting'],
  },
  {
    title: 'Motion Graphics & VFX',
    slug: 'motion-graphics',
    short: 'Eye-catching visual effects that elevate your content.',
    details:
      'We produce dynamic motion graphics and visual effects for ads, presentations, explainers, and branded video campaigns.',
    tags: ['Animation', 'Compositing', '3D', 'Title Design', 'VFX Pipeline', 'Storyboarding'],
  },
  {
    title: 'Animation',
    slug: 'animation',
    short: '2D and 3D animation bringing ideas to life with storytelling.',
    details:
      'Our animation team creates character-driven and product-focused stories that simplify complex ideas and engage audiences.',
    tags: ['2D', '3D', 'Character', 'Explainer Videos', 'Rigging', 'Scene Composition'],
  },
  {
    title: 'Brand Advertisement & Luxury Promotion Shoots',
    slug: 'brand-advertisement-luxury-promotion-shoots',
    short: 'Premium brand campaigns and luxury promotion shoots for advertising and high-end marketing.',
    details:
      'We plan and execute brand advertisement and luxury promotion shoots—from creative direction and set design through production and finishing—so your campaigns feel elevated, consistent, and ready for every channel.',
    tags: ['Brand Campaigns', 'Luxury Visuals', 'Commercial Production', 'Art Direction', 'Styling', 'Multi-channel Delivery'],
  },
];
