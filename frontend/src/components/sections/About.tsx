import { motion } from 'framer-motion';
import { Terminal, Cpu, Globe, Zap, Server } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../utils/animations';

const About = () => {
    return (
        <section id="about" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">About Me</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                        variants={fadeInUp}
                    >
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl transform rotate-3 opacity-20 group-hover:rotate-2 transition-transform duration-300"></div>
                            <div className="relative bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
                                <Terminal className="w-12 h-12 text-blue-500 mb-6" />
                                <p className="text-lg leading-relaxed mb-6 text-slate-700 dark:text-slate-300">
                                    Software Developer focused on building <strong>secure and scalable backend systems</strong>, with exposure to <strong>cybersecurity simulation</strong> and <strong>system-level design</strong>. Experienced in translating real-world security workflows into interactive, decision-driven applications using strong system design, backend engineering, and data-driven evaluation principles.
                                </p>
                                <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                                    I build scalable <strong>REST APIs</strong> and event-driven microservices with <strong>FastAPI, PostgreSQL, Kafka/RabbitMQ, Docker, and Kubernetes</strong>, delivering reliable, production-grade systems that power national-scale workflows.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        {[
                            { icon: Cpu, title: "Backend Engineering", desc: "FastAPI & Django APIs", color: "text-blue-500" },
                            { icon: Globe, title: "Distributed Systems", desc: "Kafka & RabbitMQ", color: "text-indigo-500" },
                            { icon: Zap, title: "Performance", desc: "PostgreSQL Optimization", color: "text-yellow-500" },
                            { icon: Server, title: "Security", desc: "Cybersecurity Workflows", color: "text-emerald-500" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all hover:-translate-y-1"
                            >
                                <item.icon className={`w-8 h-8 ${item.color} mb-3`} />
                                <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
