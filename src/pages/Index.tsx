
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown, Download, Mail, Linkedin, Github, ExternalLink, Menu, X, MapPin, Calendar, Code, Database, Globe, Terminal, Server, Monitor, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      const sections = ['home', 'about', 'work', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });
  };

  const nameVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React and Node.js",
      tech: ["React", "Node.js", "MongoDB"],
      image: "/placeholder.svg"
    },
    {
      title: "Task Management App",
      description: "Collaborative productivity tool with real-time updates",
      tech: ["React", "TypeScript", "Firebase"],
      image: "/placeholder.svg"
    },
    {
      title: "Portfolio Website",
      description: "Responsive portfolio with modern animations",
      tech: ["React", "Framer Motion", "Tailwind"],
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4EDE4] text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-[#F4EDE4]/90 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <motion.div 
              className="text-lg font-medium"
              whileHover={{ scale: 1.05 }}
            >
              Shrimay Tumane
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'work', label: 'Work' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-gray-600 relative ${
                    activeSection === item.id ? 'text-gray-900' : 'text-gray-600'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gray-900"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="md:hidden mt-6 pb-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'about', label: 'About' },
                  { id: 'work', label: 'Work' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left py-3 text-gray-600 hover:text-gray-900 transition-colors"
                    whileHover={{ x: 10 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image */}
          <motion.div 
            className="relative mx-auto w-24 h-24 md:w-32 md:h-32 mb-12"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src="https://ik.imagekit.io/rmlbayysp/1749281936895-IMG_6063_mEUHD-9ABs.HEIC"
              alt="Shrimay Tumane"
              className="w-full h-full rounded-full object-cover shadow-lg"
            />
          </motion.div>

          {/* Animated Name */}
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8"
            variants={nameVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            {"SHRIMAY".split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-600 font-light mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            Full-Stack Developer crafting digital experiences with modern technology and clean design.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <motion.button
              onClick={() => scrollToSection('work')}
              className="group bg-gray-900 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-gray-800 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
            
            <motion.button
              className="group border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-gray-900 hover:text-white transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              Download CV
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-gray-600"
          >
            <span className="text-xs mb-2 tracking-wider uppercase">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">About Me</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  I'm a <span className="font-semibold text-gray-900">B.Tech Information Technology</span> student 
                  at Manipal University Jaipur, passionate about creating digital solutions that make a difference.
                </p>
                <p>
                  With expertise in <span className="font-semibold text-gray-900">Python, Java, React, and modern web technologies</span>, 
                  I bridge the gap between design and development to create seamless user experiences.
                </p>
                <p>
                  Currently seeking opportunities to push the boundaries of technology and create 
                  meaningful digital experiences.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  className="bg-white/50 rounded-3xl p-6 border border-gray-200"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <MapPin className="w-8 h-8 mb-4 text-gray-700" />
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-gray-600 text-sm">Jaipur, Rajasthan</p>
                </motion.div>
                
                <motion.div 
                  className="bg-white/50 rounded-3xl p-6 border border-gray-200"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Calendar className="w-8 h-8 mb-4 text-gray-700" />
                  <h3 className="font-semibold mb-2">Experience</h3>
                  <p className="text-gray-600 text-sm">2+ Years Learning</p>
                </motion.div>
              </div>

              {/* Skills */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: 'React', icon: Code },
                  { name: 'Python', icon: Terminal },
                  { name: 'Java', icon: Database },
                  { name: 'Node.js', icon: Server },
                  { name: 'TypeScript', icon: Monitor },
                  { name: 'MongoDB', icon: Database }
                ].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="bg-white/30 rounded-2xl p-4 text-center border border-gray-200 hover:border-gray-300 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    viewport={{ once: true }}
                  >
                    <skill.icon className="w-6 h-6 mx-auto mb-2 text-gray-700" />
                    <span className="text-xs text-gray-600">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-32 px-6 bg-white/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Selected Work</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A showcase of projects that demonstrate my passion for creating 
              exceptional digital experiences.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -10 }}
                viewport={{ once: true }}
              >
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Code className="w-12 h-12 text-gray-500" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-gray-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
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

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Let's Connect</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's create something amazing together.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.a 
                href="mailto:shrimaytumane@gmail.com"
                className="group flex items-center space-x-4 p-6 rounded-3xl hover:bg-white/50 transition-all border border-transparent hover:border-gray-200"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <Mail className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">shrimaytumane@gmail.com</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 ml-auto group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.a>

              <motion.a 
                href="https://linkedin.com/in/shrimay-tumane-6b5a96277"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-4 p-6 rounded-3xl hover:bg-white/50 transition-all border border-transparent hover:border-gray-200"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <Linkedin className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <p className="font-semibold">LinkedIn</p>
                  <p className="text-gray-600">Connect professionally</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 ml-auto group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/50 rounded-3xl p-8 border border-gray-200"
            >
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-3 text-gray-700">Name</label>
                  <Input
                    id="name"
                    type="text"
                    required
                    className="bg-white border-gray-200 focus:border-gray-400 text-gray-900 rounded-2xl h-12"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-3 text-gray-700">Email</label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="bg-white border-gray-200 focus:border-gray-400 text-gray-900 rounded-2xl h-12"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-3 text-gray-700">Message</label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    className="bg-white border-gray-200 focus:border-gray-400 text-gray-900 resize-none rounded-2xl"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full bg-gray-900 text-white font-medium py-4 rounded-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                  <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600">
              © 2024 Shrimay Tumane. Crafted with passion and precision.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
