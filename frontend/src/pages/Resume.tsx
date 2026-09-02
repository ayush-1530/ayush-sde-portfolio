import { portfolioData } from '../data/portfolio';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Download } from 'lucide-react';
import { useEffect } from 'react';

const Resume = () => {

    // Set page title for PDF filename
    useEffect(() => {
        document.title = "Ayush_Negi_Resume";
        return () => {
            document.title = "Ayush Negi Portfolio";
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 print:p-0 print:bg-white">
            {/* Print Button - Hidden when printing */}
            <div className="max-w-[210mm] mx-auto mb-6 flex justify-end print:hidden px-4">
                <a
                    href="/Ayush_resume.pdf"
                    download="Ayush_resume.pdf"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                    <Download className="w-4 h-4" />
                    Download PDF
                </a>
            </div>

            {/* A4 Page Container */}
            <div className="max-w-[210mm] mx-auto bg-white shadow-xl print:shadow-none print:w-full min-h-[297mm] p-[15mm] md:p-[20mm] text-slate-900">

                {/* Header */}
                <header className="text-center border-b-2 border-slate-800 pb-6 mb-6">
                    <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">{portfolioData.header.name}</h1>
                    <h2 className="text-xl font-medium text-slate-700 uppercase tracking-wide mb-4">{portfolioData.header.title}</h2>

                    <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600">
                        {portfolioData.header.email && (
                            <a href={`mailto:${portfolioData.header.email}`} className="flex items-center gap-1 hover:text-blue-600">
                                <Mail className="w-3 h-3" /> {portfolioData.header.email}
                            </a>
                        )}
                        {portfolioData.header.phone && (
                            <div className="flex items-center gap-1">
                                <Phone className="w-3 h-3" /> {portfolioData.header.phone}
                            </div>
                        )}
                        {portfolioData.header.location && (
                            <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {portfolioData.header.location}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600 mt-2">
                        <a href={portfolioData.header.links.linkedin} className="flex items-center gap-1 hover:text-blue-600">
                            <Linkedin className="w-3 h-3" /> LinkedIn
                        </a>
                        <a href={portfolioData.header.links.github} className="flex items-center gap-1 hover:text-blue-600">
                            <Github className="w-3 h-3" /> GitHub
                        </a>
                        <a href={portfolioData.header.links.portfolio} className="flex items-center gap-1 hover:text-blue-600">
                            <Globe className="w-3 h-3" /> Portfolio
                        </a>
                    </div>
                </header>

                {/* Education */}
                <section className="mb-6">
                    <h3 className="text-lg font-bold uppercase border-b border-slate-300 mb-4 pb-1">Education</h3>
                    <div className="space-y-4">
                        {portfolioData.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-baseline">
                                <div>
                                    {edu.degree && <h4 className="font-bold text-slate-900">{edu.degree}</h4>}
                                    {edu.institution && <p className="text-slate-700">{edu.institution}</p>}
                                    {edu.result && <p className="text-slate-500 text-sm">{edu.result}</p>}
                                </div>
                                <div className="text-right text-sm">
                                    <span className="font-semibold block">{edu.year}</span>
                                    {edu.location && <span className="text-slate-500">{edu.location}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Professional Experience */}
                <section className="mb-6">
                    <h3 className="text-lg font-bold uppercase border-b border-slate-300 mb-4 pb-1">Professional Experience</h3>
                    <div className="space-y-6">
                        {portfolioData.experiences.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-2">
                                    <div>
                                        <h4 className="font-bold text-slate-900">{exp.role}</h4>
                                        <p className="text-slate-700 font-medium">{exp.company}</p>
                                    </div>
                                    <span className="text-sm font-semibold whitespace-nowrap">{exp.period}</span>
                                </div>
                                <ul className="list-disc list-outside ml-4 text-sm text-slate-700 space-y-1">
                                    {exp.description.map((desc, i) => (
                                        <li key={i}>{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects */}
                <section className="mb-6">
                    <div className="space-y-4">
                        {portfolioData.projects.map((project, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-bold text-slate-900">{project.title}</h4>
                                    <div className="flex gap-2 text-xs">
                                        {/* Tech stack could go here if needed, or inline */}
                                    </div>
                                </div>
                                <p className="text-sm text-slate-700 mb-1">{project.description}</p>
                                <p className="text-xs text-slate-500 font-mono">
                                    Tech: {project.tech.join(" • ")}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills */}
                <section className="mb-6">
                    <h3 className="text-lg font-bold uppercase border-b border-slate-300 mb-4 pb-1">Skills</h3>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                        {portfolioData.skillCategories.map((cat, index) => (
                            <div key={index} className="flex">
                                <span className="font-bold w-48 shrink-0">{cat.title}:</span>
                                <span className="text-slate-700">{cat.skills.join(", ")}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Achievements & Languages - Two columns */}
                <div className="grid grid-cols-2 gap-8">
                    {/* Achievements */}
                    <section>
                        <h3 className="text-lg font-bold uppercase border-b border-slate-300 mb-4 pb-1">Achievements</h3>
                        <ul className="list-disc list-outside ml-4 text-sm text-slate-700 space-y-1">
                            {portfolioData.achievements.map((ach, i) => (
                                <li key={i}>
                                    {ach.title}
                                    {ach.description && <p className="text-xs text-slate-500">{ach.description}</p>}
                                    {ach.url && (
                                        <a href={ach.url} target="_blank" rel="noopener noreferrer" className="text-primary-500 underline text-xs">
                                            Read more
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Languages */}
                    <section>
                        <h3 className="text-lg font-bold uppercase border-b border-slate-300 mb-4 pb-1">Languages</h3>
                        <ul className="list-disc list-outside ml-4 text-sm text-slate-700 space-y-1">
                            {portfolioData.languages.map((lang, i) => (
                                <li key={i}><span className="font-semibold">{lang.name}:</span> {lang.level}</li>
                            ))}
                        </ul>
                    </section>
                </div>

            </div>
        </div>
    );
};

export default Resume;
