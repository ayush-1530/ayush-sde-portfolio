import { motion } from 'framer-motion';
import { Github, ExternalLink, Folder } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleUp } from '../../utils/animations';
import { portfolioData } from '../../data/portfolio';

const Projects = () => {
    // Removed useInView hook

    const projects = portfolioData.projects;

    return (
        <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Featured Projects</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">Showcasing my work in backend engineering and data-driven systems.</p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={scaleUp}
                            className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-slate-100 dark:border-slate-800 hover:-translate-y-2"
                        >
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <motion.div
                                        className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 text-blue-600 dark:text-blue-400"
                                        whileHover={{
                                            rotate: [0, -10, 10, -10, 0],
                                            scale: 1.1
                                        }}
                                        transition={{
                                            duration: 0.5
                                        }}
                                    >
                                        <Folder className="w-6 h-6" />
                                    </motion.div>
                                    <div className="flex gap-4">
                                        <a href={project.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                            <Github className="w-5 h-5" />
                                        </a>
                                        {project.demo && (
                                            <a href={project.demo} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-slate-600 dark:text-slate-400 mb-8 h-20 overflow-hidden text-ellipsis leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
                                    {project.tech.map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
