import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { portfolioData } from '../../data/portfolio';

const Experience = () => {
    // Removed useInView hook

    const experiences = portfolioData.experiences;

    return (
        <section id="experience" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Professional Experience</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}
                    className="relative border-l-4 border-blue-500/30 dark:border-blue-500/20 ml-3 space-y-12"
                >
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="relative pl-8"
                        >
                            {/* Timeline Dot */}
                            <motion.div
                                className="absolute -left-[11px] top-0 w-6 h-6 bg-blue-600 rounded-full border-4 border-white dark:border-slate-900 shadow-sm"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: 360
                                }}
                                transition={{
                                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                                    rotate: { duration: 10, repeat: Infinity, ease: "linear" }
                                }}
                            ></motion.div>

                            <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-2">
                                            <motion.div
                                                animate={{
                                                    rotate: [0, 10, -10, 0]
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                <Briefcase className="w-6 h-6 text-blue-500" />
                                            </motion.div>
                                            {exp.role}
                                        </h3>
                                        <h4 className="text-lg text-blue-600 dark:text-blue-400 font-medium">{exp.company}</h4>
                                    </div>
                                    <div className="text-slate-500 dark:text-slate-400 text-sm font-medium flex items-center gap-2 mt-2 sm:mt-0 bg-white dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                                        <Calendar className="w-4 h-4" />
                                        {exp.period}
                                    </div>
                                </div>

                                <ul className="space-y-3">
                                    {exp.description.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 leading-relaxed">
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
