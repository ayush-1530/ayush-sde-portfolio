import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { fadeInUp } from '../../utils/animations';
import { portfolioData } from '../../data/portfolio';

const Contact = () => {
    // Removed single ref/inView state to allow independent visibility control

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/contact`, formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error: any) {
            console.error('Error sending message:', error);
            setStatus('error');
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setErrorMessage(error.response.data.detail || error.message);
            } else if (error.request) {
                // The request was made but no response was received
                setErrorMessage("No response from server. Check if backend is running.");
            } else {
                // Something happened in setting up the request that triggered an Error
                setErrorMessage(error.message);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Get In Touch</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-8"></div>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                        Interested in collaborating or have a question? Feel free to reach out!
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        {[
                            { icon: Mail, title: "Email", value: portfolioData.header.email, href: `mailto:${portfolioData.header.email}`, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
                            { icon: Phone, title: "Phone", value: portfolioData.header.phone, href: `tel:${portfolioData.header.phone}`, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                            { icon: MapPin, title: "Location", value: portfolioData.header.location, href: "", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false }}
                                variants={fadeInUp}
                                className="flex items-start gap-6"
                            >

                                <motion.div
                                    className={`p-4 rounded-xl ${item.bg} ${item.color}`}
                                    animate={{
                                        rotate: [0, 10, -10, 0],
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: index * 0.2
                                    }}
                                    whileHover={{
                                        rotate: 360,
                                        scale: 1.2
                                    }}
                                >
                                    <item.icon className="w-6 h-6" />
                                </motion.div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1 text-slate-900 dark:text-white">{item.title}</h3>
                                    {item.href ? (
                                        <a href={item.href} className="text-slate-600 dark:text-slate-400 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className="text-slate-600 dark:text-slate-400 font-medium">{item.value}</p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false }}
                        variants={fadeInUp}
                    >
                        <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700">
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white transition-all outline-none"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white transition-all outline-none"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white transition-all outline-none"
                                    placeholder="Your message..."
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={status === 'loading'}
                                className={`w-full py-4 px-6 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 ${status === 'loading'
                                    ? 'bg-slate-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/25'
                                    }`}
                            >
                                {status === 'loading' ? (
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Send Message
                                        <Mail className="w-5 h-5" />
                                    </>
                                )}
                            </motion.button>

                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl flex items-center gap-3"
                                >
                                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                    <p className="font-medium">Message sent successfully!</p>
                                </motion.div>
                            )}

                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3"
                                >
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">Failed to send message.</p>
                                        <p className="text-sm mt-1 opacity-90">{errorMessage}</p>
                                        <button
                                            type="button"
                                            onClick={() => setStatus('idle')}
                                            className="mt-2 text-xs font-bold underline"
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
