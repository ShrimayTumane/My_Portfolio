
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown, Download, Mail, Linkedin, Github, ExternalLink, Menu, X, MapPin, Calendar, Code, Database, Globe, Terminal, Server, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="text-xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              Shrimay
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
                  className={`text-sm font-medium transition-colors hover:text-white relative ${
                    activeSection === item.id ? 'text-white' : 'text-gray-400'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-white"
                      layoutId="activeTab"
                      initial={false}
                    />
                  )}
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
                className="md:hidden mt-4 pb-4"
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
                    className="block w-full text-left py-2 text-gray-400 hover:text-white transition-colors"
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
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* 3D Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <motion.div 
          className="max-w-4xl mx-auto px-6 text-center relative z-10"
          style={{ y, opacity }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Profile Image */}
            <motion.div 
              className="relative mx-auto w-32 h-32 mb-8"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50"></div>
              <img 
                src="https://ik.imagekit.io/rmlbayysp/1749281936895-IMG_6063_mEUHD-9ABs.HEIC"
                alt="Shrimay Tumane"
                className="relative w-full h-full rounded-full object-cover border-2 border-white/10"
              />
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-light tracking-tight leading-tight"
              variants={itemVariants}
            >
              Hello, I'm{' '}
              <motion.span 
                className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-medium"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Shrimay
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
              variants={itemVariants}
            >
              A passionate full-stack developer crafting exceptional digital experiences 
              with modern technology and innovative design.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
              variants={itemVariants}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => scrollToSection('work')}
                  className="bg-white text-black hover:bg-gray-100 px-8 py-3 text-lg font-medium rounded-full transition-all"
                >
                  View My Work
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg font-light rounded-full"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex space-x-6 justify-center pt-8"
              variants={itemVariants}
            >
              <motion.a 
                href="https://linkedin.com/in/shrimay-tumane-6b5a96277"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="#"
                className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center text-gray-400"
          >
            <span className="text-xs mb-2 tracking-wider uppercase">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-8">About Me</h2>
            <div className="w-16 h-0.5 bg-white mx-auto mb-8"></div>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a <span className="text-white font-medium">B.Tech Information Technology</span> student 
                at Manipal University Jaipur, passionate about creating digital solutions that make a difference.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                With expertise in <span className="text-white font-medium">Python, Java, React, and modern web technologies</span>, 
                I bridge the gap between design and development to create seamless user experiences.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Currently seeking opportunities to push the boundaries of technology and create 
                meaningful digital experiences.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(17, 24, 39, 0.7)" }}
                  transition={{ duration: 0.3 }}
                >
                  <MapPin className="w-8 h-8 mb-4 text-blue-400" />
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-gray-400 text-sm">Jaipur, Rajasthan</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(17, 24, 39, 0.7)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Calendar className="w-8 h-8 mb-4 text-purple-400" />
                  <h3 className="font-semibold mb-2">Experience</h3>
                  <p className="text-gray-400 text-sm">2+ Years Learning</p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h3 className="text-2xl font-light text-center mb-12">Technologies I Work With</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
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
                  className="bg-gray-900/30 rounded-xl p-6 text-center border border-gray-800 hover:border-gray-600 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  viewport={{ once: true }}
                >
                  <skill.icon className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                  <span className="text-sm text-gray-300">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-32 bg-gray-950/50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-8">Selected Work</h2>
            <div className="w-16 h-0.5 bg-white mx-auto mb-8"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A showcase of projects that demonstrate my passion for creating 
              exceptional digital experiences.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="relative max-w-lg mx-auto">
              <motion.div
                className="w-24 h-24 mx-auto mb-8 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <Code className="h-10 w-10 text-gray-400" />
              </motion.div>
              <h3 className="text-2xl font-light mb-6">Coming Soon</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                I'm currently working on some exciting projects that showcase 
                cutting-edge development and innovative design solutions. 
                Stay tuned for updates!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-8">Let's Connect</h2>
            <div className="w-16 h-0.5 bg-white mx-auto mb-8"></div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's create something amazing together.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-light mb-6">Get in Touch</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  I'm always excited to discuss new opportunities and collaborate 
                  on innovative projects.
                </p>
              </div>
              
              <div className="space-y-4">
                <motion.a 
                  href="mailto:shrimaytumane@gmail.com"
                  className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-900/30 transition-colors group"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-400">shrimaytumane@gmail.com</p>
                  </div>
                </motion.a>

                <motion.a 
                  href="https://linkedin.com/in/shrimay-tumane-6b5a96277"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-900/30 transition-colors group"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-gray-400">Connect professionally</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </motion.a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-900/30 rounded-2xl p-8 border border-gray-800"
            >
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    id="name"
                    type="text"
                    required
                    className="bg-gray-800/50 border-gray-700 focus:border-gray-500 text-white"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="bg-gray-800/50 border-gray-700 focus:border-gray-500 text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    className="bg-gray-800/50 border-gray-700 focus:border-gray-500 text-white resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    type="submit"
                    className="w-full bg-white text-black hover:bg-gray-100 font-medium py-3"
                  >
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400">
              © 2024 Shrimay Tumane. Crafted with passion and precision.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
