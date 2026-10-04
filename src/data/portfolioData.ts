export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  description: string;
  fullDescription: string;
  features: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
  status: string;
  badge?: string;
  imageType: 'academy' | 'ai' | 'pay' | 'simonas' | 'edugate' | 'nutrilook';
  links: {
    live?: string;
    demo?: string;
    github?: string;
  };
}

export const PROJECTS: Project[] = [
  {
    id: "nutrilook",
    title: "NutriLook",
    subtitle: "AI Food Nutrition & Diet Target Tracker",
    category: "HealthTech & AI",
    tags: ["Web", "AI Vision", "HealthTech", "Diet"],
    description: "Aplikasi cerdas untuk menganalisa nutrisi makanan, kalori, protein, lemak, dan karbohidrat secara real-time via foto.",
    fullDescription: "NutriLook adalah aplikasi cerdas berbasis Next.js dan AI Vision untuk menganalisis kandungan gizi makanan secara instan melalui foto piring atau unggah galeri. Membantu pengguna menghitung kecukupan kalori harian, rasio makronutrisi (protein, lemak, karbohidrat), mencatat riwayat makan harian, serta menetapkan target penurunan maupun penambahan berat badan idaman.",
    features: [
      "Pindai & Analisa Makanan otomatis dari foto kamera atau galeri",
      "Deteksi nutrisi instan: Kalori (kcal), Protein, Lemak, dan Karbohidrat",
      "Targeting kalori harian dinamis & pelacak berat badan idaman",
      "Riwayat makan harian terintegrasi kalender dan ringkasan nutrisi",
      "Koleksi preset menu siap uji: Dada Ayam Salad, Rendang, Salmon Brokoli, Avocado Toast"
    ],
    metrics: [
      { label: "Detection Speed", value: "<1.5s" },
      { label: "Accuracy Rating", value: "96.4%" },
      { label: "Active Scans", value: "25,000+" }
    ],
    accentColor: "#10b981",
    status: "Live",
    badge: "Live on Vercel",
    imageType: "nutrilook",
    links: {
      live: "https://nutri-look.vercel.app",
      demo: "https://nutri-look.vercel.app",
      github: "https://github.com/SunshineZone/NutriLook"
    }
  },
  {
    id: "zalternations-academy",
    title: "Zalternations Academy",
    subtitle: "Online learning platform for future skills",
    category: "EdTech",
    tags: ["Web", "LMS", "Education"],
    description: "Online learning platform for future skills with interactive modules, progress tracking, and gamified achievements.",
    fullDescription: "Zalternations Academy is a modern full-stack learning platform engineered to teach digital skills—including web development, AI engineering, and product design. Features structured curricula, interactive quizzes, video streaming with adaptive bitrate, and automated milestone certificates.",
    features: [
      "Modular video course player with bookmarking & note-taking",
      "Interactive coding exercises and instant automated feedback",
      "Student discussion forum & mentor Q&A channels",
      "Gamified badges, streaks, and verifiable graduation certificates",
      "Comprehensive teacher and administrator analytics dashboard"
    ],
    metrics: [
      { label: "Active Students", value: "35,000+" },
      { label: "Course Completion", value: "88%" },
      { label: "Uptime", value: "99.98%" }
    ],
    accentColor: "#3b82f6",
    status: "Production",
    badge: "Popular",
    imageType: "academy",
    links: {
      live: "https://zalternations.online/academy",
      demo: "#",
      github: "https://github.com/didik/zalternations-academy"
    }
  },
  {
    id: "zalternations-ai",
    title: "Zalternations AI",
    subtitle: "AI-based assessment for major & career mapping",
    category: "Artificial Intelligence",
    tags: ["Web", "AI", "Assessment"],
    description: "AI-powered psychological and aptitude assessment engine that guides students toward optimal career pathways.",
    fullDescription: "Zalternations AI utilizes deep psychometric testing algorithms combined with fine-tuned LLM agents to evaluate cognitive aptitudes, personality traits, and problem-solving preferences, generating tailored 12-page career and university major roadmaps.",
    features: [
      "Dynamic adaptive question generation based on user confidence",
      "Holistic scoring across Holland RIASEC & Big Five frameworks",
      "Personalized career roadmaps with required skills & market trends",
      "PDF career report generation with instant download",
      "Integration with university admissions and scholarship portals"
    ],
    metrics: [
      { label: "Assessments Taken", value: "65,000+" },
      { label: "Accuracy Rating", value: "94.6%" },
      { label: "Partner Schools", value: "42" }
    ],
    accentColor: "#06b6d4",
    status: "Live",
    badge: "AI Powered",
    imageType: "ai",
    links: {
      live: "https://zalternations.online/ai",
      demo: "#",
      github: "https://github.com/didik/zalternations-ai"
    }
  },
  {
    id: "zalternations-pay",
    title: "Zalternations Pay",
    subtitle: "Student admission system with multi-bank payment",
    category: "FinTech & Education",
    tags: ["Web", "Payment", "Education"],
    description: "Frictionless multi-channel educational payment and student enrollment portal with instant automated reconciliation.",
    fullDescription: "An institutional financial platform designed to handle peak-load school registration and tuition payments. Integrates seamlessly with multi-bank virtual accounts, national QRIS, e-wallets, and credit cards with zero downtime and real-time financial auditing.",
    features: [
      "Direct API integration with major banks (BCA, Mandiri, BNI, BRI)",
      "Instant QRIS dynamic generation and real-time webhook callback",
      "Automated invoice dispatch via WhatsApp and Email notification",
      "Granular role-based access for bursars, treasurers, and auditors",
      "Comprehensive daily export to Excel, CSV, and accounting systems"
    ],
    metrics: [
      { label: "Transaction Vol", value: "$4.2M+" },
      { label: "Processing Speed", value: "<1.2s" },
      { label: "Reconciliation", value: "100%" }
    ],
    accentColor: "#f59e0b",
    status: "Production",
    badge: "Enterprise",
    imageType: "pay",
    links: {
      live: "https://zalternations.online/pay",
      demo: "#",
      github: "https://github.com/didik/zalternations-pay"
    }
  },
  {
    id: "simonas",
    title: "SIMONAS",
    subtitle: "Internal reporting system for dormitory management",
    category: "Management Dashboard",
    tags: ["Web", "Dashboard", "Management"],
    description: "Enterprise management system for campus dormitories, student tracking, room allocation, and incident response.",
    fullDescription: "SIMONAS (Sistem Informasi Manajemen Asrama) is an end-to-end boarding house and residential campus management suite. It simplifies resident administration, room inspection protocols, curfew sign-in/outs, permission requests, and internal facility ticketing.",
    features: [
      "Visual room allocation floor map with occupancy heatmaps",
      "Mobile curfew check-in scanner with geofenced QR codes",
      "Maintenance request dispatch with technician assignment & tracking",
      "Student merit & disciplinary point tracking system",
      "Automated emergency roll-call broadcasts and parent notifications"
    ],
    metrics: [
      { label: "Residents Managed", value: "12,000+" },
      { label: "Dorm Units", value: "18 Buildings" },
      { label: "Incident Resolution", value: "99.1%" }
    ],
    accentColor: "#10b981",
    status: "Production",
    badge: "Operational",
    imageType: "simonas",
    links: {
      live: "https://zalternations.online/simonas",
      demo: "#",
      github: "https://github.com/didik/simonas"
    }
  }
];

export const SKILLS_DATA = [
  {
    category: "Frontend Development",
    icon: "code",
    skills: ["Next.js (App Router)", "React 18 / 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js / WebGL", "Canvas API"]
  },
  {
    category: "Backend & Systems",
    icon: "server",
    skills: ["Node.js / Express", "NestJS", "REST & GraphQL APIs", "PostgreSQL / Prisma", "Redis Cache", "Docker / Linux"]
  },
  {
    category: "AI & Innovation",
    icon: "cpu",
    skills: ["LLM Prompt Engineering", "LangChain / AI SDK", "RAG Architectures", "OpenAI / Claude APIs", "Vector Databases", "Model Fine-tuning"]
  },
  {
    category: "Product & Architecture",
    icon: "layers",
    skills: ["System Architecture", "Payment Gateways", "LMS Platforms", "UI/UX Prototyping", "Performance Optimization", "SEO & Web Vitals"]
  }
];

export const STATS = [
  { label: "Products Built", value: "10+", icon: "rocket", color: "from-amber-400 to-orange-500" },
  { label: "Users Impacted", value: "100K+", icon: "users", color: "from-blue-400 to-indigo-600" },
  { label: "Years Experience", value: "8+", icon: "zap", color: "from-yellow-400 to-amber-500" },
  { label: "Happy Clients", value: "50+", icon: "trophy", color: "from-emerald-400 to-teal-600" }
];

export const SERVICES = [
  {
    title: "Web App Engineering",
    icon: "globe",
    description: "Production-ready, highly interactive web applications built with Next.js, React, and modern microservice architectures.",
    points: ["Scalable Next.js 14/15 codebases", "SEO and Web Vitals perfection", "Rich animations and 3D interactions"]
  },
  {
    title: "AI Integration & Agents",
    icon: "bot",
    description: "Custom AI pipelines, psychometric assessment tools, automated workflows, and intelligent copilots.",
    points: ["Automated agent pipelines", "Knowledge base RAG systems", "Cognitive evaluation engines"]
  },
  {
    title: "EdTech & LMS Systems",
    icon: "book",
    description: "End-to-end digital campus and learning platforms with admission pipelines, tuition gateways, and grading portals.",
    points: ["Curriculum & quiz builders", "Automated student certification", "Real-time student progress tracking"]
  },
  {
    title: "FinTech & Payment Gateways",
    icon: "credit-card",
    description: "Bank-grade transaction integration with virtual accounts, QRIS, automated webhooks, and ledger reconciliation.",
    points: ["Multi-bank virtual account flows", "Zero-failure webhook handlers", "Comprehensive financial auditing"]
  }
];
