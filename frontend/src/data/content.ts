// Original portfolio content, shared by all presentation components.

export const projects = [
  {
    index: "01",
    title: "MR Review Agent",
    subtitle: "Multi-Agent AI Pull Request Reviewer",
    year: "2025",
    category: "AGENTIC AI / LLM / RAG",
    description:
      "An orchestrator sends a code diff to specialised security, logic and performance agents; a critic agent synthesises one review and posts it to GitHub.",
    problem:
      "Manual review misses security and performance issues, and single-prompt LLM reviews lack repository context.",
    approach:
      "Indexed the repo into ChromaDB for RAG, ran agents concurrently (agent-stage latency cut ~58%, ~32s to ~13.5s, verified with per-agent timing), and fixed a silent RAG retrieval bug. Now refactoring orchestration to LangGraph.",
    outcome:
      "An end-to-end agentic pipeline that posts consolidated, context-aware reviews to pull requests.",
    tech: [
      "Multi-Agent LLM",
      "RAG",
      "LangGraph",
      "ChromaDB",
      "FastAPI",
      "Python",
    ],
    github: "https://github.com/ayush-1530/MR-Review-Agent",
  },
  {
    index: "02",
    title: "Production RAG Chatbot",
    subtitle: "Agentic-AI · Evaluated with RAGAS",
    year: "2025",
    category: "RAG / EVALUATION",
    description:
      "A production Retrieval-Augmented Generation chatbot, instrumented with RAGAS to measure faithfulness, answer relevance and context precision/recall.",
    problem:
      "Informal spot-checks cannot show whether retrieval and chunking choices actually improve answers.",
    approach:
      "Instrumented the pipeline with RAGAS metrics to compare retrieval and chunking strategies quantitatively.",
    outcome: "Evidence-based tuning of the RAG pipeline instead of guesswork.",
    tech: ["RAG", "RAGAS", "LLMs", "Python"],
    github: "https://github.com/ayush-1530/Agentic-AI",
  },
  {
    index: "03",
    title: "Heart Disease Prediction",
    subtitle: "Flask Web App · ML Risk Model",
    year: "2024",
    category: "MACHINE LEARNING / HEALTHCARE",
    description:
      "A Flask web app and ML model that predicts heart disease from patient inputs, with a printable report to track condition over time.",
    problem:
      "Cardiovascular diseases cause 32% of global deaths (WHO, 2019); early risk screening matters.",
    approach:
      "Trained and compared Logistic Regression, SVM, Decision Tree, Random Forest and KNN, with data work in NumPy, Pandas and Matplotlib.",
    outcome:
      "A usable web tool that turns clinical inputs into a risk prediction.",
    tech: ["Python", "Flask", "scikit-learn", "Pandas", "JavaScript"],
    github: "https://github.com/ayush-1530/Heart-Disease-Predicton-",
  },
  {
    index: "04",
    title: "TalentScout Chatbot",
    subtitle: "LLM Hiring Assistant",
    year: "2025",
    category: "CONVERSATIONAL AI / LLM",
    description:
      "A conversational hiring assistant built for the PG-AGI assignment that screens candidates through a guided chat.",
    problem:
      "First-round screening is repetitive and needs consistent, structured question flows.",
    approach:
      "Designed an LLM-prompted conversation that collects candidate details and tailors technical questions to their stack.",
    outcome: "Automated first-round screening conversations.",
    tech: ["Python", "LLMs", "Prompt Engineering"],
    github: "https://github.com/ayush-1530/talentscout-chatbot",
  },
  {
    index: "05",
    title: "Real-Time Surveillance Vision",
    subtitle: "Computer Vision System · DRDO",
    year: "2024",
    category: "COMPUTER VISION / DEEP LEARNING",
    description:
      "A real-time computer vision surveillance system using CNNs, OpenCV, LLMs and object detection in PyTorch.",
    problem:
      "Surveillance feeds need automated, real-time detection with low latency.",
    approach:
      "Built the full pipeline: preprocessing, model inference and performance optimisation.",
    outcome:
      "Delivered during a software internship at DRDO, Ministry of Defence (source not public).",
    tech: ["PyTorch", "CNNs", "OpenCV", "Object Detection"],
  },
  {
    index: "06",
    title: "Atomic Clock Drift",
    subtitle: "Neural Network Time Correction",
    year: "2024",
    category: "DEEP LEARNING / PHYSICS",
    description:
      "An ANN that models and corrects cesium-133 clock drift with synthetic noise, reaching ~99.99% accuracy on simulated data.",
    problem:
      "Cesium-133 oscillators drift systematically; noise modelling is essential for precision.",
    approach:
      "Trained ANNs on synthetic drift data with controlled noise injection and applied correction from the predictions.",
    outcome: "~99.99% correction accuracy on simulated drift datasets.",
    tech: ["Python", "ANN", "NumPy"],
    github: "https://github.com/ayush-1530/Atomic-Clock",
  },
];

export const experiences = [
  {
    company: "Zindagi Technologies",
    logo: "/images/organisations/zindagi.png",
    affiliation: "",
    role: "Software Developer",
    period: "Apr 2025 — Present",
    type: "FULL TIME",
    description: "Government of India's National Cyber Range Platform",
    points: [
      "Architected scalable REST APIs using FastAPI with OOP across distributed, multi-tiered systems handling national-scale cybersecurity workflows",
      "Reduced API latency 30–40% via PostgreSQL redesign; built event-driven microservices with Kafka/RabbitMQ, cutting inter-service latency 35%",
      "Owned CI/CD using GitLab and Kubernetes with Helm deployments and cluster monitoring",
      "Conducted code reviews, enforced Agile/Scrum, mentored 5+ interns; collaborated with product and security teams on regulatory compliance",
    ],
    tags: ["FastAPI", "Kafka", "Kubernetes", "PostgreSQL", "GitLab CI/CD"],
    active: true,
  },
  {
    company: "National Informatics Centre (NIC)",
    logo: "/images/organisations/nic.svg",
    affiliation: "Government of India",
    role: "Software Developer Trainee",
    period: "Feb 2025 — Mar 2025",
    type: "GOVERNMENT · GOI",
    description: "Government of India digital infrastructure",
    points: [
      "Modernized a legacy government database using Django & RESTful APIs, cutting query response times 60%",
      "Optimized data retrieval with MongoDB and Redis caching; automated backup and recovery",
    ],
    tags: ["Django", "MongoDB", "Redis", "REST APIs"],
    active: false,
  },
  {
    company: "Defence Research and Development Organisation (DRDO)",
    logo: "/images/organisations/drdo.png",
    affiliation: "Ministry of Defence, Government of India",
    role: "Software Developer Intern",
    period: "Jul 2024 — Aug 2024",
    type: "DEFENCE · MOD",
    description: "Ministry of Defence, Government of India",
    points: [
      "Built a real-time computer vision surveillance system using CNNs, OpenCV, LLMs and object detection in PyTorch — preprocessing, model inference and performance optimisation",
      "Atomic Clock Drift Simulation: trained an ANN to predict and correct cesium-133 drift, ~99.99% accuracy on simulated data",
    ],
    tags: ["PyTorch", "OpenCV", "CNNs", "Python"],
    active: false,
  },
];

export const principles = [
  {
    num: "I",
    title: "Systems over features",
    body: "Good software is not a collection of features — it is a coherent system. Every architectural decision shapes how reliably the whole works under pressure.",
  },
  {
    num: "II",
    title: "Latency is a product decision",
    body: "Performance is not an afterthought. Reducing API latency 35–40% through database redesign changes the experience for users at national scale.",
  },
  {
    num: "III",
    title: "Security by design",
    body: "In cybersecurity infrastructure, correctness is not enough. Systems must be designed with threat models in mind — compliance, access control, and audit trails are not features to add later.",
  },
  {
    num: "IV",
    title: "Code is communication",
    body: "Code reviews, documentation, and API contracts are acts of communication with future engineers. Clarity in code is a form of engineering respect.",
  },
];

export const education = [
  {
    institution: "B.Tech Computer Science Engineering",
    type: "INDERPRASTHA ENGINEERING COLLEGE · AKTU",
    period: "2021 – 2025",
    detail: "First Division",
    note: "Foundation in algorithms, distributed systems, and software engineering principles",
  },
  {
    institution: "Hansraj Smarak Senior Secondary",
    type: "SECONDARY EDUCATION",
    period: "July 2021",
    detail: "Science Stream",
    note: "Mathematics, Physics, Computer Science",
  },
];

export const certifications = [
  {
    title: "Intelligent by Design: Build an AI Agent",
    issuer: "IBM SkillsBuild",
    issued: "AI Agents",
    badge: "IBM",
    link: "https://www.linkedin.com/in/ayush-negi-15oct/",
    domain: "ARTIFICIAL INTELLIGENCE",
  },
  {
    title: "Cybersecurity Essentials",
    issuer: "Cisco Networking Academy",
    issued: "June 2024",
    badge: "CISCO",
    link: "https://www.credly.com/badges/12e265d0-28fb-4e44-a70e-4a7bbda97a33/public_url",
    domain: "SECURITY",
  },
  {
    title: "Data Science Master Course",
    issuer: "Coding Blocks",
    issued: "November 2023",
    badge: "CB",
    link: "https://online.codingblocks.com/app/certificates/CBOL-290945-f90eca52",
    domain: "DATA SCIENCE",
  },
];

export const programmingLanguages = ["Python", "Java", "JavaScript", "SQL", "C", "HTML", "CSS"];

export const layers = [
  {
    layer: "AI & MACHINE LEARNING",
    depth: "L0 — INTELLIGENCE",
    techs: [
      "RAG",
      "Multi-Agent Systems",
      "LangGraph",
      "LLMs",
      "RAGAS Evaluation",
      "Deep Learning",
      "CNNs",
      "ANNs",
      "Computer Vision",
      "OpenCV",
      "PyTorch",
    ],
    color: "#194cbe",
  },
  {
    layer: "LANGUAGES",
    depth: "L1 — FOUNDATION",
    techs: programmingLanguages,
    color: "#194cbe",
  },
  {
    layer: "BACKEND & API DESIGN",
    depth: "L2 — INTERFACE",
    techs: [
      "FastAPI",
      "Flask",
      "Django",
      "Pydantic",
      "RESTful APIs",
      "Microservices",
      "Concurrency",
    ],
    color: "#194cbe",
  },
  {
    layer: "DISTRIBUTED SYSTEMS",
    depth: "L3 — TRANSPORT",
    techs: ["Apache Kafka", "RabbitMQ", "Event-Driven Architecture"],
    color: "#194cbe",
  },
  {
    layer: "DATABASES & CACHING",
    depth: "L4 — PERSISTENCE",
    techs: ["PostgreSQL", "Oracle", "MongoDB", "Redis", "InfluxDB"],
    color: "#194cbe",
  },
  {
    layer: "CLOUD & DEVOPS",
    depth: "L5 — PLATFORM",
    techs: [
      "OpenStack",
      "AWS",
      "MinIO",
      "Docker",
      "Kubernetes",
      "Helm",
      "Linux",
      "GitLab CI/CD",
      "Git",
      "Prometheus",
      "Grafana",
    ],
    color: "#194cbe",
  },
  {
    layer: "TESTING & PRACTICES",
    depth: "L6 — PROCESS",
    techs: [
      "PyTest",
      "Postman",
      "Swagger/OpenAPI",
      "Agile",
      "Scrum",
      "Code Review",
    ],
    color: "#194cbe",
  },
  {
    layer: "TOOLS",
    depth: "L7 — WORKBENCH",
    techs: ["VS Code", "PyCharm", "Jupyter Notebook", "K9s"],
    color: "#194cbe",
  },
];
