import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Download, ChevronDown, Terminal, Cloud, Server, Shield, Globe } from 'lucide-react';
import { Link } from 'react-scroll';
import Button from '../ui/Button';

const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900 pt-16">

            {/* Animated Gradient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-500/10 blur-3xl rounded-full mix-blend-screen animate-float" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-3xl rounded-full mix-blend-screen animate-pulse-slow" />
                <div className="absolute bottom-0 left-20 w-[600px] h-[600px] bg-purple-500/10 blur-3xl rounded-full mix-blend-screen" />
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>

            {/* Floating Icons Background */}
            <motion.div style={{ y: y1 }} className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-20 left-[10%]"
                    animate={{
                        rotate: 360,
                        y: [0, -20, 0]
                    }}
                    transition={{
                        rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                        y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                >
                    <Cloud className="h-16 w-16 text-blue-500/20" />
                </motion.div>

                <motion.div
                    className="absolute top-40 right-[15%]"
                    animate={{
                        rotate: -360,
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                        scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                >
                    <Server className="h-24 w-24 text-indigo-500/20" />
                </motion.div>

                <motion.div
                    className="absolute bottom-32 left-[20%]"
                    animate={{
                        rotate: [0, 15, -15, 0],
                        y: [0, -15, 0]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Shield className="h-12 w-12 text-emerald-500/20" />
                </motion.div>

                <motion.div
                    className="absolute top-1/2 right-[5%]"
                    animate={{
                        rotate: 360,
                        y: [0, -25, 0]
                    }}
                    transition={{
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                    }}
                >
                    <Globe className="h-20 w-20 text-blue-400/20" />
                </motion.div>

                <motion.div
                    className="absolute bottom-20 right-[25%]"
                    animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Terminal className="h-14 w-14 text-slate-500/20" />
                </motion.div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.15,
                                delayChildren: 0.2
                            }
                        }
                    }}
                >
                    <motion.h1
                        variants={{
                            hidden: { opacity: 0, scale: 0.8, y: 50 },
                            visible: {
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                transition: {
                                    duration: 1,
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 10
                                }
                            }
                        }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
                    >
                        Ayush Negi
                        <motion.span
                            className="block text-3xl md:text-4xl mt-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text font-extrabold"
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            Software Developer Engineer
                        </motion.span>
                    </motion.h1>

                    <motion.div
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } }}
                        className="text-xl md:text-2xl text-slate-300 mb-10 h-16 font-light"
                    >
                        <TypeAnimation
                            sequence={[
                                'Building Secure & Scalable Backend Systems.',
                                2000,
                                'Designing Event-Driven Microservices.',
                                2000,
                                'Architecting REST APIs with FastAPI.',
                                2000,
                                'Engineering National-Scale Workflows.',
                                2000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                            cursor={true}
                        />
                    </motion.div>

                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                        className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                    >
                        <a href="/resume" target="_blank" className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2 group">
                            <Download className="w-5 h-5 group-hover:animate-bounce" />
                            <span>Download Resume</span>
                        </a>

                        <Link to="contact" smooth={true} offset={-70}>
                            <button className="px-8 py-3 rounded-full border-2 border-blue-500 text-blue-400 font-semibold hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2">
                                Contact Me
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                style={{ y: y2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
            >
                <Link to="about" smooth={true} offset={-70}>
                    <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors">
                        <span className="text-xs uppercase tracking-widest">Scroll</span>
                        <ChevronDown className="h-6 w-6 animate-bounce" />
                    </div>
                </Link>
            </motion.div>
        </section>
    );
};

export default Hero;
