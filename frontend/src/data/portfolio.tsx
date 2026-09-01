import {
    Cloud,
    Code2,
    Database,
    Layers,
    GitBranch,
    FlaskConical,
    Server,
    GitPullRequest
} from 'lucide-react';

export const portfolioData = {
    header: {
        name: "Ayush Negi",
        title: "Software Developer Engineer",
        phone: "9899505862",
        email: "ayushnegiuk@gmail.com",
        location: "New Delhi, India",
        links: {
            linkedin: "https://www.linkedin.com/in/ayush-negi-15oct/",
            github: "https://github.com/ayush-1530",
            portfolio: "" // Placeholder: add Ayush's portfolio/domain URL here later
        }
    },
    education: [
        {
            degree: "B.Tech Computer Science",
            institution: "Dr. A. P. J. Abdul Kalam Technical University",
            year: "June 2025",
            location: "Uttar Pradesh, India",
            result: "First Division"
        },
        {
            degree: "High School",
            institution: "Hansraj Smarak Senior Secondary School",
            year: "July 2021",
            location: "New Delhi, India",
            result: "First Division"
        }
    ],
    experiences: [
        {
            company: "Zindagi Technologies",
            role: "Software Developer",
            period: "Apr 2025 - Present",
            description: [
                "Architected scalable REST APIs using FastAPI with object-oriented design principles across distributed, multi-tiered systems handling national-scale cybersecurity workflows.",
                "Reduced API latency 30–40% via PostgreSQL redesign; built event-driven microservices with Kafka/RabbitMQ, cutting inter-service latency 35%.",
                "Owned CI/CD (GitLab) and Kubernetes with Helm deployments and cluster monitoring.",
                "Conducted code reviews, enforced Agile/Scrum practices, and mentored junior developers/interns; collaborated with product and security teams to ensure regulatory compliance."
            ]
        },
        {
            company: "National Informatics Centre – Govt. of India",
            role: "Software Developer Trainee",
            period: "Feb 2025 - Mar 2025",
            description: [
                "Architected scalable REST APIs using FastAPI with object-oriented design principles across distributed, multi-tiered systems handling national-scale cybersecurity workflows.",
                "Reduced API latency 30–40% via PostgreSQL redesign; built event-driven microservices with Kafka/RabbitMQ, cutting inter-service latency 35%.",
                "Owned CI/CD (GitLab) and Kubernetes with Helm deployments and cluster monitoring.",
                "Conducted code reviews, enforced Agile/Scrum practices, and mentored junior developers/interns; collaborated with product and security teams to ensure regulatory compliance."
            ]
        },
        {
            company: "DRDO – Ministry of Defence, Govt. of India",
            role: "Software Developer Intern",
            period: "Jul 2024 - Aug 2024",
            description: [
                "Architected scalable REST APIs using FastAPI with object-oriented design principles across distributed, multi-tiered systems handling national-scale cybersecurity workflows.",
                "Reduced API latency 30–40% via PostgreSQL redesign; built event-driven microservices with Kafka/RabbitMQ, cutting inter-service latency 35%.",
                "Owned CI/CD (GitLab) and Kubernetes with Helm deployments and cluster monitoring.",
                "Conducted code reviews, enforced Agile/Scrum practices, and mentored junior developers/interns; collaborated with product and security teams to ensure regulatory compliance."
            ]
        }
    ],
    projects: [
        {
            title: "Sarathi Portal",
            description: "Built REST APIs for a govt. portal with MongoDB storage & Redis caching for high-performance data integration.",
            tech: ["Django", "MongoDB", "Redis"],
            github: "https://github.com/ayush-1530/Sarathi-Portal",
            demo: ""
        },
        {
            title: "Atomic Clock Drift Simulation",
            description: "Applied ANNs to model and correct cesium-133 clock drift with synthetic noise, achieving ~99.99% accuracy.",
            tech: ["Python", "ANN", "NumPy"],
            github: "https://github.com/ayush-1530/Atomic-Clock",
            demo: ""
        }
    ],
    skillCategories: [
        {
            title: "Object-Oriented & API Design",
            icon: <Code2 className="w-6 h-6 text-blue-500" />,
            skills: ["FastAPI", "Django", "Pydantic", "RESTful APIs", "Microservices Architecture"],
            color: "border-blue-500"
        },
        {
            title: "Distributed Systems & Messaging",
            icon: <Layers className="w-6 h-6 text-indigo-500" />,
            skills: ["Apache Kafka", "RabbitMQ", "Event-Driven Architecture"],
            color: "border-indigo-500"
        },
        {
            title: "Relational Databases",
            icon: <Database className="w-6 h-6 text-yellow-500" />,
            skills: ["PostgreSQL", "MySQL", "Oracle"],
            color: "border-yellow-500"
        },
        {
            title: "NoSQL Databases & Caching",
            icon: <Server className="w-6 h-6 text-emerald-500" />,
            skills: ["MongoDB", "Redis", "InfluxDB", "Apache Cassandra"],
            color: "border-emerald-500"
        },
        {
            title: "Cloud & Infrastructure",
            icon: <Cloud className="w-6 h-6 text-cyan-500" />,
            skills: ["OpenStack", "Microsoft Azure", "Amazon AWS", "MinIO", "Docker", "Kubernetes", "Linux", "Rancher/Headlamp"],
            color: "border-cyan-500"
        },
        {
            title: "CI/CD & DevOps",
            icon: <GitBranch className="w-6 h-6 text-purple-500" />,
            skills: ["GitLab CI/CD", "Git", "Prometheus", "Grafana"],
            color: "border-purple-500"
        },
        {
            title: "Testing & Documentation",
            icon: <FlaskConical className="w-6 h-6 text-rose-500" />,
            skills: ["PyTest", "Postman", "Swagger/OpenAPI", "Automated & Functional Testing"],
            color: "border-rose-500"
        },
        {
            title: "Methodologies",
            icon: <GitPullRequest className="w-6 h-6 text-orange-500" />,
            skills: ["Agile", "Scrum", "Kanban", "Code Review", "PR Management"],
            color: "border-orange-500"
        }
    ],
    certifications: [
        {
            name: "Cybersecurity Essentials",
            issuer: "Cisco Networking Academy",
            issued: "Jun 2024",
            url: "https://www.credly.com/badges/12e265d0-28fb-4e44-a70e-4a7bbda97a33/public_url"
        },
        {
            name: "Data Science Master Course",
            issuer: "Coding Blocks",
            issued: "Nov 2023",
            url: "https://online.codingblocks.com/app/certificates/CBOL-290945-f90eca52"
        }
    ],
    achievements: [
        {
            title: "NCX 2025 (National Cyber Exercise)",
            description: "Invited as developer representative of Zindagi Technologies at India's premier national-level cyber defense simulation."
        },
        {
            title: "Research Publication",
            description: "Published an academic paper on Blockchain Technology.",
            url: "https://ijirt.org/publishedpaper/IJIRT173688_PAPER.pdf"
        }
    ],
    languages: [
        { name: "English", level: "Professional Proficiency" },
        { name: "Hindi", level: "Native Proficiency" }
    ]
};
