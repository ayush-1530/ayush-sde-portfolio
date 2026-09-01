import { motion } from 'framer-motion';
import { TerminalHeader } from '../components/TerminalHeader';
import { Calendar, ChevronRight } from 'lucide-react';

export const Experience = () => {
    const experiences = [
        {
            role: 'DevOps Engineer',
            company: 'Tech Company', // User didn't specify company name, using generic or placeholder
            period: '2023 - Present', // 1 year experience implied
            description: 'Managing cloud infrastructure, automating deployments, and ensuring high availability.',
            achievements: [
                'Designed and implemented CI/CD pipelines using Jenkins and GitHub Actions, reducing deployment time by 40%.',
                'Managed containerized applications using Docker and Kubernetes on AWS EKS.',
                'Provisioned and managed cloud infrastructure using Terraform and Ansible.',
                'Implemented monitoring and logging solutions using Prometheus, Grafana, and ELK Stack.',
                'Collaborated with development teams to bridge the gap between code and deployment.'
            ],
            technologies: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'Python']
        }
    ];

    return (
        <div className="min-h-screen bg-bg-page">
            <TerminalHeader
                command="cat experience.log"
                description="Loading professional timeline..."
            />

            <section className="py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative pl-8 border-l-2 border-neutral-700 hover:border-primary-500 transition-colors duration-300"
                            >
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-bg-page border-2 border-primary-500" />

                                <div className="bg-bg-elevated border border-neutral-700 rounded-lg p-6 hover:shadow-glow transition-all duration-300 group">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                        <div>
                                            <h3 className="text-2xl font-mono font-bold text-primary-500 group-hover:text-accent-500 transition-colors">
                                                {exp.role}
                                            </h3>
                                            <div className="text-lg text-neutral-300 font-medium">
                                                {exp.company}
                                            </div>
                                        </div>
                                        <div className="flex items-center text-neutral-400 font-mono text-sm mt-2 md:mt-0">
                                            <Calendar size={16} className="mr-2" />
                                            {exp.period}
                                        </div>
                                    </div>

                                    <p className="text-neutral-400 mb-6 leading-relaxed">
                                        {exp.description}
                                    </p>

                                    <div className="space-y-3 mb-6">
                                        {exp.achievements.map((achievement, i) => (
                                            <div key={i} className="flex items-start">
                                                <ChevronRight size={16} className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
                                                <span className="text-neutral-300">{achievement}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {exp.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 text-xs font-mono rounded bg-bg-surface text-primary-500 border border-primary-500/30"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
