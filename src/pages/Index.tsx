import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowDown, Download, Mail, Linkedin, Code, Palette, Database, Globe, Github, ExternalLink, Camera, MapPin, Calendar, Monitor, Cpu, Zap, Layers, Terminal, Server, Smartphone, Lightbulb, Star, Rocket, Orbit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { toast } = useToast();
  const { scrollYProgress } = useScroll();

  // Parallax transforms
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  // Custom cursor
  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
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
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });
  };

  // Text reveal animation variants
  const textReveal = {
    hidden: { opacity: 0, y: 100 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.6, 0.01, -0.05, 0.95]
      }
    })
  };

  // Letter animation for name
  const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  // Section fade in
  const sectionVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const name = "SHRIMAY TUMANE";
  const title = "FULL-STACK DEVELOPER";

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Custom Cursor */}
      <motion.div
        className="fixed w-6 h-6 border-2 border-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: cursorPosition.x - 12,
          top: cursorPosition.y - 12,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? '#06b6d4' : 'transparent'
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Cosmic Background */}
      <motion.div 
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{ y: yBg }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-black"></div>
        
        <motion.div 
          className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-radial from-purple-500/30 via-purple-600/20 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <motion.div 
          className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-radial from-cyan-500/25 via-blue-600/15 to-transparent rounded-full blur-2xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </motion.div>
      
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-purple-500/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
            >
              <div className="relative">
                <motion.div 
                  className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Rocket className="w-6 h-6 text-white" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl blur-lg opacity-50 animate-pulse"></div>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Shrimay
              </div>
            </motion.div>
            <div className="hidden md:flex items-center space-x-12">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'experience', label: 'Experience' },
                { id: 'projects', label: 'Projects' },
                { id: 'contact', label: 'Contact' }
              ].map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-300 relative ${
                    activeSection === item.id 
                      ? 'text-cyan-400' 
                      : 'text-gray-300 hover:text-cyan-400'
                  }`}
                  onHoverStart={() => setIsHovering(true)}
                  onHoverEnd={() => setIsHovering(false)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                  <motion.div
                    className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: activeSection === item.id ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            
            {/* Animated Name */}
            <div className="mb-8">
              <motion.div className="flex flex-wrap justify-center gap-2 mb-4">
                {name.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                    variants={letterAnimation}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </motion.div>
              
              <motion.div className="flex flex-wrap justify-center gap-2">
                {title.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    className="text-2xl md:text-4xl font-semibold text-white"
                    variants={letterAnimation}
                    initial="hidden"
                    animate="visible"
                    custom={name.length + index}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Profile Image */}
            <motion.div 
              className="relative mx-auto mb-12"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 1, ease: "easeOut" }}
            >
              <div className="relative w-80 h-80 mx-auto">
                {/* Outer rotating rings */}
                <motion.div 
                  className="absolute inset-0 w-80 h-80 border-2 border-purple-500/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute inset-4 w-72 h-72 border border-cyan-500/20 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Profile Image Container */}
                <motion.div 
                  className="relative w-64 h-64 mx-auto mt-8 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full p-1"
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(6, 182, 212, 0.3)",
                      "0 0 40px rgba(139, 92, 246, 0.5)",
                      "0 0 20px rgba(6, 182, 212, 0.3)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden border border-purple-500/50">
                    <img 
                      src="https://ik.imagekit.io/rmlbayysp/1749281936895-IMG_6063_mEUHD-9ABs.HEIC"
                      alt="Shrimay Tumane"
                      className="w-60 h-60 rounded-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </motion.div>
                
                {/* Floating Tech Icons */}
                <motion.div 
                  className="absolute top-4 right-8 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Code className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div 
                  className="absolute bottom-8 left-4 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center"
                  animate={{
                    y: [0, 20, 0],
                    rotate: [360, 180, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <Terminal className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div 
                  className="absolute top-1/2 -left-6 w-10 h-10 bg-gradient-to-r from-green-400 to-cyan-500 rounded-2xl flex items-center justify-center"
                  animate={{
                    x: [0, -15, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Database className="w-5 h-5 text-white" />
                </motion.div>
                <motion.div 
                  className="absolute top-1/4 -right-4 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center"
                  animate={{
                    x: [0, 15, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Zap className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Subtitle and Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="space-y-6 mb-12"
            >
              <motion.div 
                className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-6 py-3 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Available for work</span>
              </motion.div>

              <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                I create exceptional digital experiences by combining cutting-edge technology 
                with innovative design. Currently pursuing B.Tech in Information Technology 
                at Manipal University Jaipur.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                <Button 
                  className="group relative bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg font-medium rounded-2xl"
                  onClick={() => scrollToSection('contact')}
                >
                  <span className="relative flex items-center">
                    Get In Touch
                    <ArrowDown className="ml-2 h-5 w-5 rotate-[-45deg]" />
                  </span>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                <Button 
                  variant="outline" 
                  className="border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-4 text-lg font-medium rounded-2xl backdrop-blur-sm"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download CV
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex justify-center space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 0.8 }}
            >
              <motion.a 
                href="https://linkedin.com/in/shrimay-tumane-6b5a96277"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-14 h-14 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                whileHover={{ scale: 1.1, rotate: 5 }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                <Linkedin className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors" />
              </motion.a>
              <motion.a 
                href="#"
                className="group relative w-14 h-14 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                whileHover={{ scale: 1.1, rotate: -5 }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                <Github className="w-6 h-6 text-purple-400 group-hover:text-white transition-colors" />
              </motion.a>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4, duration: 1 }}
          >
            <div className="flex flex-col items-center space-y-4 text-gray-400">
              <span className="text-xs tracking-wider uppercase font-medium">Explore More</span>
              <motion.div 
                className="relative"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-8 h-12 border-2 border-purple-500/50 rounded-full flex justify-center backdrop-blur-sm">
                  <motion.div 
                    className="w-1.5 h-4 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full mt-2"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <motion.section 
        id="about" 
        className="py-24 relative"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p className="text-xl">
                  I'm a passionate <span className="text-cyan-400 font-semibold">B.Tech Information Technology</span> student 
                  at Manipal University Jaipur, driven by the endless possibilities of technology.
                </p>
                <p>
                  With expertise in <span className="text-purple-400 font-semibold">Python, Java, C, and C++</span>, 
                  I transform complex problems into elegant digital solutions. My journey combines the 
                  art of design with the science of development.
                </p>
                <p>
                  Currently seeking opportunities to push the boundaries of innovation and create 
                  technology that makes a meaningful impact on the world.
                </p>
              </div>
            </div>
            
            <div className="space-y-8 animate-slide-in-right">
              <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/20 rounded-2xl p-8 border border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-cyan-400">Education</h3>
                </div>
                <div className="space-y-2 text-gray-300">
                  <p className="font-medium text-lg">B.Tech Information Technology</p>
                  <p className="text-purple-300">Manipal University Jaipur</p>
                  <p className="text-gray-400">Expected Graduation: 2027</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/20 rounded-2xl p-8 border border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-purple-400">Experience</h3>
                </div>
                <div className="space-y-2 text-gray-300">
                  <p className="font-medium text-lg">Full-Stack Developer Intern</p>
                  <p className="text-cyan-300">OPM Corporation</p>
                  <p className="text-gray-400">June – August 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        id="skills" 
        className="py-24 bg-gradient-to-r from-slate-900/50 to-purple-900/30 relative"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Tech Arsenal
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                category: 'Frontend', 
                skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Next.js'], 
                icon: Monitor,
                gradient: 'from-cyan-500 to-blue-600'
              },
              { 
                category: 'Backend', 
                skills: ['Python', 'Node.js', 'Java', 'Express.js'], 
                icon: Server,
                gradient: 'from-purple-500 to-pink-600'
              },
              { 
                category: 'Database', 
                skills: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase'], 
                icon: Database,
                gradient: 'from-green-500 to-cyan-600'
              },
              { 
                category: 'Tools & DevOps', 
                skills: ['Git', 'Docker', 'AWS', 'Linux'], 
                icon: Terminal,
                gradient: 'from-orange-500 to-red-600'
              }
            ].map((category, index) => (
              <motion.div 
                key={category.category} 
                className="group bg-gradient-to-br from-slate-800/50 to-purple-900/20 rounded-2xl p-8 border border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-full flex items-center justify-center group-hover:animate-pulse`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-cyan-400">{category.category}</h3>
                </div>
                <ul className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <li 
                      key={skill} 
                      className="text-gray-300 hover:text-cyan-300 transition-colors duration-300 cursor-pointer"
                      style={{ animationDelay: `${index * 0.1 + skillIndex * 0.05}s` }}
                    >
                      • {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Experience Timeline */}
      <motion.section 
        id="experience" 
        className="py-24 relative"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Journey
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <div className="space-y-16">
              {[
                {
                  year: '2025',
                  title: 'Full-Stack Developer Intern',
                  company: 'OPM Corporation',
                  description: 'Developing scalable web applications using modern technologies',
                  icon: Cpu,
                  side: 'right'
                },
                {
                  year: '2024',
                  title: 'Tech Enthusiast',
                  company: 'Self-Learning',
                  description: 'Mastering new frameworks and building personal projects',
                  icon: Lightbulb,
                  side: 'left'
                },
                {
                  year: '2023',
                  title: 'Started B.Tech Journey',
                  company: 'Manipal University Jaipur',
                  description: 'Beginning my formal education in Information Technology',
                  icon: Monitor,
                  side: 'right'
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className={`relative flex items-center ${item.side === 'left' ? 'flex-row-reverse' : ''} animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline Node */}
                  <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center border-4 border-slate-900 z-10"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  {/* Content Card */}
                  <div className={`w-5/12 ${item.side === 'left' ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/20 rounded-2xl p-8 border border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                      <span className="text-cyan-400 font-bold text-lg">{item.year}</span>
                      <h3 className="text-xl font-semibold text-white mt-2">{item.title}</h3>
                      <p className="text-purple-300 font-medium">{item.company}</p>
                      <p className="text-gray-300 mt-3">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        id="projects" 
        className="py-24 bg-gradient-to-r from-slate-900/50 to-purple-900/30 relative"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="text-center animate-fade-in-up delay-200">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-full flex items-center justify-center border border-purple-500/30 backdrop-blur-sm animate-pulse-glow">
              <Code className="h-16 w-16 text-cyan-400" />
            </div>
            <h3 className="text-3xl font-semibold mb-6 text-cyan-400">Coming Soon</h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              I'm currently working on some exciting projects that showcase cutting-edge 
              full-stack development and innovative design solutions. Stay tuned for updates!
            </p>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        className="py-24 bg-gradient-to-r from-slate-900/50 to-purple-900/30 relative"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mt-6">
              Ready to bring your ideas to life? Let's create something amazing together.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8 animate-slide-in-left">
              <div>
                <h3 className="text-3xl font-semibold mb-6 text-cyan-400">Get in Touch</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  I'm always excited to discuss new opportunities, collaborate on innovative projects, 
                  or just chat about the latest in technology and design.
                </p>
              </div>
              
              <motion.a 
                href="https://linkedin.com/in/shrimay-tumane-6b5a96277"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-purple-900/20 hover:from-slate-700/50 hover:to-purple-800/30 transition-all duration-300 border border-purple-500/30 backdrop-blur-sm hover:scale-105"
                whileHover={{ scale: 1.1, rotate: 5 }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                <div className="w-14 h-14 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Linkedin className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="font-medium text-lg text-cyan-400">LinkedIn</p>
                  <p className="text-gray-300">Connect with me professionally</p>
                </div>
              </motion.a>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/20 rounded-2xl p-8 border border-purple-500/30 backdrop-blur-sm animate-slide-in-right">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-3 text-cyan-400">Name</label>
                  <Input
                    id="name"
                    type="text"
                    required
                    className="bg-slate-800/50 border-purple-500/30 focus:border-cyan-400 text-white h-12 rounded-xl"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-3 text-cyan-400">Email</label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="bg-slate-800/50 border-purple-500/30 focus:border-cyan-400 text-white h-12 rounded-xl"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-3 text-cyan-400">Message</label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    className="bg-slate-800/50 border-purple-500/30 focus:border-cyan-400 text-white resize-none rounded-xl"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 h-12 text-base font-medium rounded-xl hover:scale-105 transition-all duration-300 glow-button"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="py-12 border-t border-purple-500/20 bg-slate-900/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-lg">
            © 2024 Shrimay Tumane. Crafted with 
            <span className="text-red-400 mx-1">♥</span> 
            and cutting-edge technology.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
