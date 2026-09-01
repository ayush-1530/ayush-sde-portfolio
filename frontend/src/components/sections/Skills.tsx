import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, bounceIn } from '../../utils/animations';
import { portfolioData } from '../../data/portfolio';

import {
    Cloud,
    Database,
    Monitor,
    Code
} from 'lucide-react';

const Skills = () => {
    // Removed useInView hook in favor of direct whileInView props

    const skillCategories = portfolioData.skillCategories;

    return (
        <section id="skills" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Technical Arsenal</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        A comprehensive set of tools and technologies I use to build, secure, and scale backend systems.
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
                >
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            variants={bounceIn}
                            whileHover={{
                                scale: 1.05,
                                y: -10,
                                transition: { type: "spring", stiffness: 300, damping: 15 }
                            }}
                            className={`bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 border-t-4 ${category.color} hover:shadow-2xl transition-all duration-300 cursor-pointer`}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <motion.div
                                    className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl"
                                    animate={{
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    whileHover={{
                                        rotate: 360,
                                        scale: 1.1
                                    }}
                                >
                                    {category.icon}
                                </motion.div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{category.title}</h3>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {category.skills.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
