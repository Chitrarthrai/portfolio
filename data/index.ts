export const navItems = [
  { name: "Projects", link: "#projects" },
  { name: "Stack", link: "#experience" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
];

export const metrics = [
  {
    id: 1,
    label: "PROJECT SCALE",
    value: "40",
    unit: "+",
    suffix: "Microservices",
    description: "Architected and deployed across distributed clusters with high availability.",
    color: "#cbacf9",
    badge: "PRODUCTION READY",
    icon: "verified",
    tags: [],
    delay: "0.1s",
  },
  {
    id: 2,
    label: "CAMERA FRAME PROCESSING",
    value: "40",
    unit: "%",
    suffix: "Latency Reduction",
    description: "High-performance Kotlin Native ONNX integration for edge-based computer vision.",
    color: "#a4c9ff",
    badge: "VERIFIED",
    icon: "speed",
    tags: ["ONNX", "Kotlin"],
    delay: "0.2s",
  },
  {
    id: 3,
    label: "DATABASE PERFORMANCE",
    value: "60",
    unit: "%",
    suffix: "Query Optimization",
    description: "MongoDB Aggregation Pipelines for 2M+ record payroll and analytics.",
    color: "#dfda71",
    badge: "VERIFIED",
    icon: "database",
    tags: ["MongoDB", "Azure"],
    delay: "0.3s",
  },
  {
    id: 4,
    label: "REAL-TIME WEBSOCKET",
    value: "<100",
    unit: "ms",
    suffix: "Sync Speed",
    description: "Real-time financial sync via Supabase WebSockets across all platforms.",
    color: "#FBBF24",
    badge: "PRODUCTION READY",
    icon: "bolt",
    tags: ["Supabase"],
    delay: "0.4s",
  },
];

export const personalInfo = {
  name: "Chitrarth Rai",
  email: "chitrarthrai10@gmail.com",
  phone: "+91 7357084507",
  linkedin: "https://linkedin.com/in/chitrarth-rai-38a40917b",
  github: "https://github.com/Chitrarthrai",
  resumeUrl:
    "https://github.com/Chitrarthrai/Chitrarthrai/blob/main/Chitrarth_Rai_Resume.pdf",
  profileSummary:
    "Graduate of IIIT Bhubaneswar in Electronics & Telecommunication. Full-stack developer specializing in the MERN ecosystem and Next.js, with expertise in building scalable HR tech, digital shelf analytics, and financial dashboards. Architected, analyzed, and contributed to over 40+ distinct software projects and microservices.",
};

export const gridItems = [
  {
    id: 1,
    title:
      "I build scalable, data-driven apps — from camera pipelines to analytics dashboards",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "Open to remote & cross-timezone collaboration",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Full-stack engineer with a passion for performance & security",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },
  {
    id: 5,
    title: "Currently building enterprise apps at Neophyte AI for Reliance",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Want to collaborate on a project?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const skills = {
  languagesFrameworks: [
    "TypeScript",
    "Python",
    "C++",
    "Kotlin",
    "JavaScript",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "React Native",
  ],
  databasesInfrastructure: [
    "MongoDB",
    "PostgreSQL",
    "Firebase",
    "SQL",
    "REST APIs",
    "JSON-RPC",
    "Azure Blob Storage",
    "Azure Functions",
  ],
  toolsPractices: [
    "Git/GitHub",
    "Android NDK/SDK",
    "OpenCV",
    "OCR",
    "OpenAI API",
    "System Design",
    "VAPT Hardening",
    "SSL Pinning",
    "CI/CD",
    "Docker",
  ],
};

export const projects = [
  {
    id: 1,
    title: "FinanceTask",
    des: "Cross-platform financial tracker with real-time sync via Supabase WebSockets, Gemini AI for task extraction, and Kotlin SMS scraping for automated expense logging.",
    img: "/p1_preview.png",
    iconLists: ["/re.svg", "/ts.svg", "/next.svg", "/tail.svg"],
    link: "https://github.com/Chitrarthrai/FinanceTask",
    category: "Personal",
    technologies: [
      "React Native",
      "TypeScript",
      "Supabase",
      "Gemini API",
      "Recharts",
    ],
  },
  {
    id: 2,
    title: "FedEx Document Pipeline",
    des: "Automated document analysis pipeline using Tesseract OCR and OpenCV, reducing invoice processing time by 90% with multi-threaded batch processing.",
    img: "/p2.svg",
    iconLists: ["/re.svg", "/ts.svg", "/tail.svg"],
    link: "https://github.com/Chitrarthrai/FedEx-Document-Pipeline",
    category: "Personal",
    technologies: [
      "Python",
      "OpenCV",
      "Tesseract OCR",
      "OpenAI API",
    ],
  },
  {
    id: 3,
    title: "Neo Disha — Native App",
    des: "High-performance camera pipeline with custom Kotlin Native Module and ONNX Runtime, achieving 40% frame processing latency reduction for Reliance field operations.",
    img: "/p3_preview.png",
    iconLists: ["/re.svg", "/ts.svg", "/tail.svg", "/fm.svg"],
    link: "https://github.com/Chitrarthrai/neodisha_native",
    category: "Reliance",
    technologies: [
      "React Native",
      "Kotlin",
      "C++",
      "ONNX Runtime",
      "Firebase",
    ],
  },
  {
    id: 4,
    title: "Disha — Dashboard & Analytics",
    des: "Digital shelf-analytics dashboard ingesting anomaly data from Azure Blob Storage in real-time, optimizing query latency by 60% for 2M+ records.",
    img: "/p4_preview.png",
    iconLists: ["/re.svg", "/next.svg", "/tail.svg", "/ts.svg"],
    link: "https://github.com/Chitrarthrai/neo_QA",
    category: "Reliance",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Azure Blob Storage",
      "Recharts",
    ],
  },
  {
    id: 5,
    title: "CheckIt — Price Comparison",
    des: "Cross-platform mobile app comparing prices across 7 quick commerce platforms with fuzzy search, local SQLite caching, and real-time Firebase sync.",
    img: "/p1.svg",
    iconLists: ["/re.svg", "/ts.svg", "/fm.svg"],
    link: "https://github.com/Chitrarthrai/CheckIt",
    category: "Personal",
    technologies: [
      "React Native",
      "Expo",
      "SQLite",
      "Firebase",
      "Fuzzy Search",
    ],
  },
  {
    id: 6,
    title: "Argo CD MCP Server",
    des: "AI-powered MCP server enabling LLM agents to perform zero-shot operations on Kubernetes clusters via structured JSON-RPC schemas.",
    img: "/p2.svg",
    iconLists: ["/ts.svg", "/next.svg", "/tail.svg"],
    link: "https://github.com/Chitrarthrai/argo-mcp-server",
    category: "Open Source",
    technologies: [
      "TypeScript",
      "Express.js",
      "MCP",
      "JSON-RPC",
      "Kubernetes",
    ],
  },
];

export const workExperience = [
  {
    id: 1,
    company: "Neophyte AI",
    role: "Software Engineer",
    duration: "Feb 2025 – Present",
    location: "Navi Mumbai, India",
    highlights: [
      {
        subProject: "Neo Disha (Mobile)",
        details:
          "Designed a high-performance camera pipeline using React Native and a custom Kotlin Native Module. Optimized CPU-intensive image processing for 12MP sensor arrays, reducing latency by 40%. Conducted VAPT audits with SSL pinning and ProGuard obfuscation.",
      },
      {
        subProject: "NeoQCR (Web & Android)",
        details:
          "Modernized legacy Android builds, created unified KPI dashboards, and refactored 2-step auth with AES-256 and RSA encryption. Performed VAPT audits with rate limiting and input validation.",
      },
      {
        subProject: "Disha (Web Dashboard)",
        details:
          "Built shelf-analytics dashboard ingesting data from MongoDB and Azure Blob Storage with real-time KPI tracking, improving operational visibility by 35%.",
      },
      {
        subProject: "HRMS Platform",
        details:
          "Architected HR system with geolocation and facial-recognition attendance. MongoDB Aggregation Pipelines for payroll processing, reducing time by 50%.",
      },
      {
        subProject: "Interactive UI & Components",
        details:
          "Integrated Three.js for 3D product showcases and built reusable React component library to standardize analytics dashboards across initiatives.",
      },
    ],
  },
];

export const education = [
  {
    id: 1,
    institution: "IIIT Bhubaneswar",
    degree: "B.Tech in Electronics & Telecommunication Engineering",
    duration: "2021 – 2025",
    location: "Bhubaneswar, India",
  },
  {
    id: 2,
    institution: "Central Academy",
    degree: "Senior Secondary (Class XII)",
    duration: "2018 – 2020",
    location: "Jodhpur, India",
  },
  {
    id: 3,
    institution: "Central Academy",
    degree: "Secondary School (Class X)",
    duration: "2016 – 2018",
    location: "Jodhpur, India",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/Chitrarthrai",
  },
  {
    id: 2,
    img: "/link.svg",
    link: "https://linkedin.com/in/chitrarth-rai-38a40917b",
  },
];