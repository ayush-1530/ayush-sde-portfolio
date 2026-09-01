import { Github, Linkedin, Heart } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-devops-dark py-8 text-center text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                    <div className="text-sm">
                        &copy; {new Date().getFullYear()} {portfolioData.header.name}. All rights reserved.
                    </div>

                    <div className="flex space-x-6">
                        <a
                            href={portfolioData.header.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href={portfolioData.header.links.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <span>Made with</span>
                        <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                        <span>using React & FastAPI</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
