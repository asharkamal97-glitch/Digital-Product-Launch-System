export interface ProductStat {
  id: string;
  label: string;
  count: string;
  highlight: string;
  description: string;
  iconName: string;
}

export interface DriveFolderItem {
  id: string;
  folderName: string;
  title: string;
  badge: string;
  description: string;
  fileCount: string;
  estimatedValue: string;
  highlights: string[];
  keyDeliverables: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'General' | 'Content' | 'Traffic' | 'Access' | 'Licensing';
}

export interface SiteConfig {
  meta: {
    siteName: string;
    tagline: string;
    title: string;
    description: string;
    ogImage: string;
    supportEmail: string;
  };
  links: {
    checkoutUrl: string;
    googleDrivePreviewUrl: string;
    instantAccessUrl: string;
    discordCommunityUrl?: string;
    supportEmail: string;
  };
  pricing: {
    regularPrice: number;
    salePrice: number;
    currencySymbol: string;
    currencyCode: string;
    billingType: string;
    guaranteeText: string;
    accessType: string;
  };
  ctas: {
    heroPrimary: string;
    heroSecondary: string;
    navbarCta: string;
    floatingCta: string;
    midSectionCta: string;
    finalCta: string;
    finalSubtext: string;
  };
  productCounts: {
    aiAgentsAndAutomations: string;
    coursesAndMasterclasses: string;
    readyToPostReels: string;
    readyMadeDigitalProducts: string;
    ebooksAndPlaybooks: string;
    landingPageTemplates: string;
    promptBlueprints: string;
  };
  productLibrary: ProductStat[];
  driveStructure: DriveFolderItem[];
  faqs: FaqItem[];
  legal: {
    privacyPolicy: string;
    termsOfService: string;
    refundPolicy: string;
    licenseUsageRights: string;
    earningsDisclaimer: string;
  };
}

export const siteConfig: SiteConfig = {
  meta: {
    siteName: "Digital Product Launch System",
    tagline: "The complete education, asset library & organic distribution blueprint",
    title: "Digital Product Launch System — Learn, Build, Market & Sell",
    description: "Learn how digital products work — then use ready-made resources, high-retention content, AI automation agents, and organic traffic frameworks to launch your digital product business.",
    ogImage: "/images/og-preview.png",
    supportEmail: "support@launchsystem.io",
  },
  links: {
    checkoutUrl: "https://whop.com/checkout/digital-product-launch-system", // Update with your actual Whop/Stripe/Gumroad checkout link
    googleDrivePreviewUrl: "https://drive.google.com/drive/folders/launch-system-hub", // Update with your actual master Drive link
    instantAccessUrl: "#checkout",
    supportEmail: "support@launchsystem.io",
  },
  pricing: {
    regularPrice: 297,
    salePrice: 47,
    currencySymbol: "$",
    currencyCode: "USD",
    billingType: "One-Time Payment • Lifetime Access",
    guaranteeText: "Transparent Licensing & Verified Direct Google Drive Access",
    accessType: "Instant Access Delivered Directly to Your Email & Google Drive",
  },
  ctas: {
    heroPrimary: "GET THE COMPLETE SYSTEM",
    heroSecondary: "SEE WHAT'S INSIDE",
    navbarCta: "GET ACCESS NOW",
    floatingCta: "GET INSTANT ACCESS",
    midSectionCta: "UNLOCK THE COMPLETE SYSTEM",
    finalCta: "GET ACCESS NOW",
    finalSubtext: "Learn the process. Use the resources. Build your page. Start creating.",
  },
  productCounts: {
    aiAgentsAndAutomations: "15,000+",
    coursesAndMasterclasses: "1,000+",
    readyToPostReels: "10,000+",
    readyMadeDigitalProducts: "500+",
    ebooksAndPlaybooks: "300+",
    landingPageTemplates: "50+",
    promptBlueprints: "5,000+",
  },
  productLibrary: [
    {
      id: "ai-agents",
      label: "AI Agents & Automation Templates",
      count: "15,000+",
      highlight: "Custom GPTs, n8n, Make & Prompt Blueprints",
      description: "Pre-configured automation workflows, Claude & ChatGPT agent prompts, and task-automation systems designed to create content, research niches, write sales pages, and manage customer inquiries.",
      iconName: "Bot",
    },
    {
      id: "video-courses",
      label: "In-Depth Masterclasses & Courses",
      count: "1,000+",
      highlight: "Skill-based, step-by-step video training",
      description: "Comprehensive video modules covering digital marketing, offer creation, high-conversion landing page design, organic social algorithms, email marketing, and copywriting.",
      iconName: "GraduationCap",
    },
    {
      id: "viral-reels",
      label: "Ready-to-Post High-Retention Reels",
      count: "10,000+",
      highlight: "Faceless, luxury, tech & lifestyle video vaults",
      description: "High-definition 9:16 short-form video clips paired with proven hook frameworks, trending captions, and editable templates to jumpstart your organic social channels without filming yourself.",
      iconName: "Film",
    },
    {
      id: "ready-products",
      label: "Ready-Made Digital Products & Planners",
      count: "500+",
      highlight: "Fully editable Canva & Notion templates",
      description: "Commercial-ready digital planners, notion workspace hubs, tracker spreadsheets, and customizable workbooks you can rebrand and adapt for your own audience.",
      iconName: "PackageCheck",
    },
    {
      id: "ebook-pack",
      label: "Ebook, Guide & Playbook Library",
      count: "300+",
      highlight: "Master PDF & DOCX action guides",
      description: "Curated guides on modern monetization, organic lead generation, sales psychology, productivity frameworks, and niche research blueprints.",
      iconName: "BookOpen",
    }
  ],
  driveStructure: [
    {
      id: "00",
      folderName: "00_START_HERE",
      title: "Master Onboarding & Roadmap",
      badge: "Step 1 • Orientation",
      description: "The official master orientation video, system roadmap PDF, setup checklist, and folder navigation guide so you know exactly where to begin.",
      fileCount: "12 Curated Assets",
      estimatedValue: "$197 Value",
      highlights: [
        "Welcome & System Orientation Video",
        "The 7-Day Fast-Track Execution Roadmap",
        "Notion Master Resource Dashboard",
        "Commercial Licensing & Rights Guidelines PDF"
      ],
      keyDeliverables: ["Orientation Video", "Interactive Notion Hub", "Step-by-Step PDF Guide"]
    },
    {
      id: "01",
      folderName: "01_LEARN_THE_BUSINESS",
      title: "Digital Product Economics & Strategy",
      badge: "Step 2 • Foundation",
      description: "Learn how digital products actually work: unit economics, choosing a validated niche, crafting irresistible offers, and avoiding beginner traps.",
      fileCount: "45 Video Lessons + Worksheets",
      estimatedValue: "$497 Value",
      highlights: [
        "Digital Product Economics & Pricing Models",
        "Niche Selection Matrix (High Demand vs Low Friction)",
        "The Psychology of High-Converting Digital Offers",
        "Product Validation Without Spending Ad Dollars"
      ],
      keyDeliverables: ["Full Video Strategy Course", "Niche Matrix Sheet", "Pricing Calculator"]
    },
    {
      id: "02",
      folderName: "02_BUILD_YOUR_PAGE",
      title: "High-Conversion Page Architecture",
      badge: "Step 3 • Infrastructure",
      description: "Complete landing page copywriting frameworks, wireframes, and plug-and-play templates for Stan Store, Whop, Gumroad, Beacons, and custom sites.",
      fileCount: "50+ Page Templates & Swipe Files",
      estimatedValue: "$350 Value",
      highlights: [
        "High-Converting Sales Page Blueprint",
        "Stan Store / Whop / Gumroad Setup Guides",
        "Hero Section Headline & Hook Formulae",
        "Frictionless Checkout Optimization Checklist"
      ],
      keyDeliverables: ["HTML/Tailwind Code Templates", "Figma Wireframes", "Copywriting Swipe File"]
    },
    {
      id: "03",
      folderName: "03_READY_MADE_PRODUCTS",
      title: "Ready-Made Customizable Assets",
      badge: "Step 4 • Assets",
      description: "Commercial-ready planners, Notion workspaces, Canva templates, and digital toolkits you can rebrand and adapt for your niche.",
      fileCount: "500+ Editable Projects",
      estimatedValue: "$997 Value",
      highlights: [
        "Canva Pro Editable Planners & Workbooks",
        "Notion Productivity & Life OS Systems",
        "Financial & Budget Tracker Sheets",
        "Complete Commercial Customization License"
      ],
      keyDeliverables: ["Canva Template Links", "Notion Duplicate Templates", "Source Files"]
    },
    {
      id: "04",
      folderName: "04_CONTENT_LIBRARY",
      title: "10K+ Short-Form Content Vault",
      badge: "Step 5 • Attention",
      description: "Massive library of 4K/HD faceless reels, luxury, aesthetic, tech, and productivity clips paired with 1,000+ viral hooks and caption scripts.",
      fileCount: "10,000+ Video Clips & Scripts",
      estimatedValue: "$850 Value",
      highlights: [
        "10,000+ HD/4K 9:16 Short Form Clips",
        "1,000+ Viral Hook & Retention Frameworks",
        "Plug-and-Play Caption Scripts with CTA Triggers",
        "Trending Audio & Audio Sync Playbook"
      ],
      keyDeliverables: ["Direct Cloud Video Links", "Hook Swipe File", "30-Day Content Calendar"]
    },
    {
      id: "05",
      folderName: "05_AI_RESOURCES",
      title: "15K+ AI Agents & Automation Stack",
      badge: "Step 6 • Scale",
      description: "Custom GPT instructions, Claude prompt systems, Midjourney image prompts, and Make/n8n automation blueprints to 10x your output.",
      fileCount: "15,000+ Prompts & Agent Workflows",
      estimatedValue: "$650 Value",
      highlights: [
        "Custom GPT Persona Builders (Copywriter, Researcher, Designer)",
        "5,000+ High-Conversion Copywriting Prompts",
        "Automation Blueprints for Social Scheduling",
        "AI Image Generation Master Prompt Book"
      ],
      keyDeliverables: ["JSON Agent Configurations", "Prompt Database", "Workflow Blueprints"]
    },
    {
      id: "06",
      folderName: "06_COURSES",
      title: "Skill Masterclasses & Video Vault",
      badge: "Step 7 • Mastery",
      description: "Over 1,000 video training modules covering graphic design, copywriting, funnel building, audience growth, and business systems.",
      fileCount: "1,000+ High-Res Video Lectures",
      estimatedValue: "$1,200 Value",
      highlights: [
        "Mastering Organic Social Algorithms (IG, TikTok, X, YouTube)",
        "Direct-Response Copywriting Masterclass",
        "Email Marketing & Automated Lead Nurturing",
        "Advanced Offer Stacking & Upsells"
      ],
      keyDeliverables: ["Streamable Video Modules", "Audio MP3 Versions", "Summary Cheat Sheets"]
    },
    {
      id: "07",
      folderName: "07_TRAFFIC",
      title: "Free Organic Traffic Playbooks",
      badge: "Step 8 • Distribution",
      description: "Proven zero-ad-spend distribution frameworks using short-form algorithmic reach, community building, and AI-assisted content distribution.",
      fileCount: "35 Step-by-Step Playbooks",
      estimatedValue: "$450 Value",
      highlights: [
        "The 0 to 10K Organic Followers Roadmap",
        "Algorithmic Watch-Time & Save-Trigger Frameworks",
        "Comment-to-DM Lead Magnet Automation",
        "Collaborations & Cross-Niche Distribution"
      ],
      keyDeliverables: ["Distribution Playbooks", "DM Automation Scripts", "Growth Checklists"]
    },
    {
      id: "08",
      folderName: "08_MARKETING",
      title: "Conversion, Checkout & Email Systems",
      badge: "Step 9 • Monetization",
      description: "The complete pipeline to turn attention into buyers: email welcome sequences, checkout bump setups, and customer retention systems.",
      fileCount: "60+ Marketing Assets & Sequences",
      estimatedValue: "$390 Value",
      highlights: [
        "7-Part Automated Email Nurture Sequence",
        "Cart Abandonment & Re-Engagement Swipes",
        "Order Bump & Upsell Psychological Triggers",
        "Customer Onboarding & Delivery Templates"
      ],
      keyDeliverables: ["Email Sequence Templates", "Upsell Swipes", "Checkout Blueprints"]
    }
  ],
  faqs: [
    {
      question: "Is this just another raw bundle of random files?",
      answer: "No. The Digital Product Launch System is fundamentally an educational strategy and execution system. While you receive over 15,000+ AI resources, 10,000+ reels, 1,000+ courses, and hundreds of ready-made products, the core value is the structured 7-stage learning journey and 'Launch Hub' that teaches you step-by-step how to validate, rebrand, build your page, attract organic traffic, and sell.",
      category: "General"
    },
    {
      question: "Do I need prior experience or technical skills to start?",
      answer: "No prior technical experience is required. We designed this specifically for beginners. We walk you through simple tools (Canva, Notion, Stan Store, Whop, Gumroad) with complete step-by-step video guidance and pre-made templates so you never have to start from a blank screen.",
      category: "General"
    },
    {
      question: "How do I receive access to the system after purchasing?",
      answer: "Immediately upon completing checkout, you will receive an instant confirmation email containing your direct access credentials to the private Google Drive 'Launch Hub' and Notion Dashboard. You will have lifetime access, including all future updates.",
      category: "Access"
    },
    {
      question: "Can I sell the ready-made products as my own?",
      answer: "Yes. The ready-made products, planners, and templates include commercial rights that permit you to customize, rebrand, edit, and sell them directly to your end customers. (You may not resell the master system or raw drive access itself as a whole bundle). Full license details are documented inside Folder 00.",
      category: "Licensing"
    },
    {
      question: "Do I need to spend money on paid ads to get traffic?",
      answer: "No. The traffic section is focused entirely on organic, zero-ad-spend distribution methods. You'll learn how to leverage short-form video algorithms (Reels, TikTok, Shorts), keyword SEO, and AI-assisted content workflows to attract targeted organic viewers without ad budgets.",
      category: "Traffic"
    },
    {
      question: "Does this guarantee specific income or sales results?",
      answer: "No. We believe in 100% honesty and transparency. We provide the complete education, resources, templates, and organic strategy, but your results depend entirely on your effort, market niche, consistency, execution, and product presentation. We do not make false promises or fabricated revenue guarantees.",
      category: "General"
    },
    {
      question: "What format are the files provided in?",
      answer: "Files are organized in cloud-optimized formats: Canva template links, Notion workspace duplication links, MP4 1080p/4K vertical video reels, PDF action guides, TXT/JSON AI prompt blueprints, and standard spreadsheet templates (.xlsx/.csv).",
      category: "Content"
    },
    {
      question: "What if I have questions or need support?",
      answer: "We offer dedicated customer support via email at support@launchsystem.io. Our team is available to assist you with access, folder navigation, or technical questions.",
      category: "Access"
    }
  ],
  legal: {
    privacyPolicy: `DIGITAL PRODUCT LAUNCH SYSTEM — PRIVACY POLICY
Last Updated: September 2026

1. INFORMATION WE COLLECT
When you purchase or interact with Digital Product Launch System ("we", "our", "us"), we may collect personal information such as your name, email address, billing address, and transaction details processed securely via our third-party payment processors (e.g., Whop, Stripe, Gumroad). We do not store raw credit card numbers on our servers.

2. HOW WE USE YOUR INFORMATION
We use your information exclusively to:
- Deliver your digital product access links, credentials, and updates via email.
- Provide customer support and respond to technical inquiries.
- Send critical product updates, system additions, and essential transaction notices.
- Maintain compliance with legal and accounting requirements.

3. DATA PROTECTION & SHARING
We respect your privacy and will never sell, rent, or trade your personal data to third parties. Data is only shared with trusted service providers necessary for delivering our digital services (e.g., payment gateways, cloud hosting, email delivery).

4. YOUR RIGHTS
Depending on your location (such as under GDPR or CCPA), you have the right to access, rectify, or request deletion of your personal information. Contact us at support@launchsystem.io to exercise these rights.`,
    
    termsOfService: `DIGITAL PRODUCT LAUNCH SYSTEM — TERMS OF SERVICE
Last Updated: September 2026

1. ACCEPTANCE OF TERMS
By accessing or purchasing the Digital Product Launch System ("System", "Product"), you agree to be bound by these Terms of Service. If you do not agree, please do not purchase or use this service.

2. INTELLECTUAL PROPERTY & PERMITTED USE
- The educational curriculum, strategic frameworks, and system layout are proprietary.
- Ready-made templates, planners, and design files in designated folders carry commercial usage licenses allowing you to customize, rebrand, and sell final derivative works to end consumers.
- You are strictly prohibited from reselling, redistributing, or sharing the master Google Drive link, system folders, or the system in its entirety as a wholesale bundle or file dump.

3. ACCESS & UPDATES
Purchasers receive perpetual personal access to the Launch Hub and included resource folders. We reserve the right to update, enhance, or reorganize folder contents to maintain high quality and current best practices.

4. USER CONDUCT
You agree not to use our materials for unlawful, fraudulent, defamatory, or deceptive marketing practices.`,

    refundPolicy: `DIGITAL PRODUCT LAUNCH SYSTEM — REFUND & SATISFACTION POLICY
Last Updated: September 2026

DIGITAL PRODUCTS POLICY:
Because the Digital Product Launch System provides immediate, irrevocable, and full digital access to downloadable master assets, 15K+ AI agents, 10K+ video files, 1,000+ courses, and proprietary strategy blueprints via Google Drive upon checkout completion:

1. ALL SALES ARE FINAL once the digital link has been generated and delivered, except in cases of verified duplicate billing or technical non-delivery.
2. ACCESS GUARANTEE: If you experience any technical difficulties accessing your Google Drive folders or files, our priority support team guarantees to resolve access within 24 hours of notification at support@launchsystem.io.
3. FAIRNESS COMMITMENT: We provide extensive transparent previews, interactive folder manifests, and clear curriculum breakdowns before you buy to ensure the system is the right fit for your goals.`,

    licenseUsageRights: `DIGITAL PRODUCT LAUNCH SYSTEM — COMMERCIAL LICENSE & USAGE RIGHTS
Last Updated: September 2026

PERMITTED USES:
✓ Customize, edit, rebrand, and adapt designated ready-made digital products (Canva templates, Notion setups, planners, ebooks) for your target audience.
✓ Sell derivative products created using the templates directly to end customers under your own brand name.
✓ Use the short-form video reels, hooks, and caption frameworks to grow your personal or business social media channels.
✓ Implement the AI prompt blueprints, automations, and landing page frameworks for your personal or commercial client projects.

PROHIBITED USES:
✗ You may NOT resell or publicly share the master Google Drive link or download credentials.
✗ You may NOT bundle the entirety of the Digital Product Launch System and sell it as a competing "Launch System" or raw mega bundle.
✗ You may NOT claim copyright over unmodified raw master video files or training course masterclasses.`,

    earningsDisclaimer: `DIGITAL PRODUCT LAUNCH SYSTEM — EARNINGS & RESULTS DISCLAIMER
Last Updated: September 2026

IMPORTANT TRANSPARENCY NOTICE:
The Digital Product Launch System provides educational materials, digital templates, software configurations, and marketing strategies.

1. NO INCOME GUARANTEES: We do not guarantee that you will achieve any specific financial results, income, traffic volume, or sales by using this system. Any success depends entirely on your own effort, market conditions, execution speed, offer presentation, audience targeting, and individual skills.
2. NO FAKE PROOF: We do not use fabricated revenue screenshots, fake testimonials, or false scarcity timers. Any examples shown are for educational and structural illustration of digital product business mechanics.
3. BUSINESS RISK: Operating a digital business involves continuous learning, adaptation, and consistent work. Always conduct your own due diligence before starting any commercial venture.`
  }
};
