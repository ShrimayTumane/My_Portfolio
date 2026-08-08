import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail, Code, Rocket, ArrowDown, Download, ChevronDown, User, MapPin, GraduationCap, Briefcase, Monitor, Server, Database, Terminal, Zap, Globe, ExternalLink, Lightbulb, Star, Orbit, Cpu, BarChart3, ShieldAlert, Lock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [jobTitleIndex, setJobTitleIndex] = useState(0);
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({ projects: 0, certificates: 0, years: 0, contributions: 0 });
  const [buttonMousePos, setButtonMousePos] = useState({ x: 0, y: 0 });
  const [cardMousePos, setCardMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const prefersReducedMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -200]);

  const jobTitles = [
    'Full Stack Developer',
    'React Developer',
    'Backend Developer',
    'Python Developer',
    'AI Enthusiast'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setJobTitleIndex((prev) => (prev + 1) % jobTitles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate statistics on scroll
  useEffect(() => {
    if (prefersReducedMotion) {
      setAnimatedStats({ projects: 15, certificates: 5, years: 2, contributions: 1000 });
      return;
    }

    const animateStats = () => {
      const stats = { projects: 15, certificates: 5, years: 2, contributions: 1000 };
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setAnimatedStats({
          projects: Math.floor(stats.projects * easeOut),
          certificates: Math.floor(stats.certificates * easeOut),
          years: Math.floor(stats.years * easeOut),
          contributions: Math.floor(stats.contributions * easeOut)
        });
        
        if (step >= steps) clearInterval(timer);
      }, interval);
      
      return () => clearInterval(timer);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateStats();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const statsSection = document.getElementById('hero-stats');
    if (statsSection) observer.observe(statsSection);
    
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

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

      // Navbar shrinking
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setButtonMousePos({ x, y });
  };

  const handleButtonMouseLeave = () => {
    setButtonMousePos({ x: 0, y: 0 });
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setCardMousePos({ x, y });
  };

  const handleCardMouseLeave = () => {
    setCardMousePos({ x: 0, y: 0 });
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const templateParams = {
      from_name: formData.get('name') as string,
      from_email: formData.get('email') as string,
      message: formData.get('message') as string,
      to_name: 'Shrimay Tumane',
    };

    try {
      await emailjs.send(
        'service_r0f3xvl',
        'template_58kxhzd',
        templateParams,
        'SgEqE2zmMXInsiqW4'
      );

      toast({
        title: "Message Sent Successfully!",
        description: "Thanks for reaching out. I'll get back to you soon!",
      });
      
      form.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: "Error Sending Message",
        description: "There was a problem sending your message. Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative" ref={containerRef}>
      {/* Scroll Progress Indicator */}
      {!prefersReducedMotion && (
        <motion.div 
          style={{ scaleX: useTransform(scrollY, [0, document.body.scrollHeight - window.innerHeight], [0, 1]) }}
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 origin-left z-[60]"
        />
      )}

      {/* Animated Background System */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Base gradient - Space theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 via-purple-950 to-black animate-gradient"></div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/30 via-transparent to-purple-950/30"></div>
        
        {/* Floating rotated squares */}
        {!prefersReducedMotion && (
          <>
            <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rotate-45 animate-float hidden sm:block rounded-lg"></div>
            <div className="absolute top-40 right-32 w-12 h-12 bg-gradient-to-br from-purple-500/30 to-indigo-500/30 rotate-45 animate-float-reverse hidden md:block rounded-lg"></div>
            <div className="absolute bottom-32 left-40 w-20 h-20 bg-gradient-to-br from-green-500/30 to-blue-500/30 rotate-45 animate-float hidden lg:block rounded-lg"></div>
            <div className="absolute bottom-20 right-20 w-14 h-14 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rotate-45 animate-float-reverse hidden sm:block rounded-lg"></div>
          </>
        )}

        {/* Two large radial glow blobs */}
        {!prefersReducedMotion && (
          <>
            <motion.div 
              className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 via-purple-600/10 to-transparent rounded-full blur-3xl animate-pulse-slow"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-purple-500/25 via-indigo-600/15 to-transparent rounded-full blur-2xl animate-float"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </>
        )}

        {/* Twinkling star particles */}
        {!prefersReducedMotion && (
          Array.from({ length: 80 }).map((_, i) => {
            const sizes = ['w-0.5 h-0.5', 'w-1 h-1', 'w-1.5 h-1.5'];
            const colors = ['bg-white', 'bg-blue-300', 'bg-purple-300', 'bg-indigo-300'];
            const size = sizes[Math.floor(Math.random() * sizes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            return (
              <motion.div
                key={i}
                className={`absolute rounded-full ${size} ${color} animate-twinkle`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2.3 + Math.random() * 2.7}s`
                }}
              />
            );
          })
        )}

        {/* Subtle grid overlay - desktop only */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 opacity-20 hidden md:block" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(139, 92, 246, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}></div>
        )}

        {/* Two large rotating outline squares */}
        {!prefersReducedMotion && (
          <>
            <motion.div 
              className="absolute top-1/4 right-1/4 w-64 h-64 border-2 border-blue-400/50 animate-rotate-slow hidden lg:block"
              style={{ borderRadius: '8px' }}
            />
            <motion.div 
              className="absolute bottom-1/4 left-1/4 w-48 h-48 border-2 border-purple-400/50 animate-rotate-slow hidden lg:block"
              style={{ borderRadius: '8px', animationDirection: 'reverse' }}
            />
          </>
        )}
      </div>
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-blue-500/20 transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="relative">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isScrolled ? 'w-8 h-8' : 'w-10 h-10'
                  }`}
                >
                  <Rocket className={`text-white transition-all duration-300 ${isScrolled ? 'w-5 h-5' : 'w-6 h-6'}`} />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl blur-lg opacity-50 animate-pulse"></div>
              </div>
              <div className={`text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent transition-all duration-300 ${
                isScrolled ? 'text-xl' : 'text-2xl'
              }`}>
                Shrimay
              </div>
            </motion.div>
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
                <div key={item} className="relative">
                  <motion.button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    whileHover={{ scale: 1.05 }}
                    className={`text-sm font-medium transition-colors ${
                      activeSection === item.toLowerCase() 
                        ? 'text-blue-400' 
                        : 'text-gray-300 hover:text-blue-400'
                    }`}
                  >
                    {item}
                  </motion.button>
                  {activeSection === item.toLowerCase() && (
                    <motion.div 
                      layoutId="activeSection"
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div className="space-y-6 lg:space-y-8 order-2 lg:order-1 relative z-20">
              {/* Available Badge */}
              <div className="inline-flex items-center space-x-2 bg-indigo-900/30 border border-indigo-500/30 rounded-full px-4 py-2 backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Available for work</span>
              </div>

              {/* Greeting */}
              <p className="text-lg md:text-xl text-white mb-2">
                Hello, I'm
              </p>

              {/* Name - Gradient */}
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-purple-500 bg-clip-text text-transparent"
              >
                Shrimay Tumane
              </h1>

              {/* Role line */}
              <p className="text-xl md:text-2xl lg:text-3xl text-white font-bold mb-3">
                Full-Stack Developer
              </p>

              {/* Tagline */}
              <p className="text-base md:text-lg text-gray-400 mb-4">
                Specializing in React, Python & Modern Web Technologies
              </p>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl mb-6">
                B.Tech IT student at Manipal University Jaipur. Building full-stack applications with React, Python, and modern technologies. Passionate about creating impactful digital solutions.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                {/* Primary - Get In Touch */}
                <div>
                  <Button 
                    className="group relative bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold rounded-2xl"
                    onClick={() => scrollToSection('contact')}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <span className="relative flex items-center">
                      Get In Touch
                      <ArrowDown className="ml-2 h-4 w-4 md:h-5 md:w-5 rotate-[-45deg]" />
                    </span>
                  </Button>
                </div>
                
                {/* Secondary - Download CV */}
                <div>
                  <Button 
                    variant="outline" 
                    className="border-2 border-blue-500/50 text-white hover:bg-blue-500/10 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold rounded-2xl backdrop-blur-sm"
                    onClick={() => setResumeDropdownOpen(!resumeDropdownOpen)}
                  >
                    <Download className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Download CV
                  </Button>
                </div>
              </div>

              {/* Resume Dropdown */}
              <AnimatePresence>
                {resumeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-3 w-full min-w-[220px] bg-slate-900/95 backdrop-blur-xl border border-purple-500/30 rounded-xl overflow-hidden z-[100]"
                  >
                    <a
                      href="/Shrimay_Tumane_CV.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      onClick={() => setResumeDropdownOpen(false)}
                      className="w-full px-4 py-3 text-left text-gray-300 hover:text-purple-400 hover:bg-purple-500/10 transition-colors flex items-center"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      SDE Resume
                    </a>
                    <a
                      href="/Shrimay_Tumane_Analyst_CV.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      onClick={() => setResumeDropdownOpen(false)}
                      className="w-full px-4 py-3 text-left text-gray-300 hover:text-purple-400 hover:bg-purple-500/10 transition-colors flex items-center border-t border-purple-500/20"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Data Analyst Resume
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Social Icons */}
              <div className="flex space-x-4">
                <a 
                  href="https://linkedin.com/in/shrimay-tumane-6b5a96277"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-slate-800/50 border border-blue-500/30 rounded-2xl flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                >
                  <Linkedin className="w-6 h-6 text-blue-400" />
                </a>
                <a 
                  href="https://github.com/ShrimayTumane"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-slate-800/50 border border-purple-500/30 rounded-2xl flex items-center justify-center hover:bg-purple-500/20 transition-colors"
                >
                  <Github className="w-6 h-6 text-purple-400" />
                </a>
              </div>

              {/* Statistics */}
              <div 
                id="hero-stats"
                className="grid grid-cols-4 gap-4 md:gap-6 pt-6 md:pt-8"
              >
                {[
                  { value: animatedStats.projects, label: 'Projects' },
                  { value: animatedStats.certificates, label: 'Certificates' },
                  { value: animatedStats.years, label: 'Years' },
                  { value: animatedStats.contributions, label: 'Contributions' }
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    className="text-center"
                  >
                    <div className="text-xl md:text-2xl font-bold text-blue-400">{stat.value}+</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Side - Code Window */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="relative bg-gradient-to-br from-slate-800/50 to-blue-900/20 rounded-3xl p-4 md:p-6 border border-blue-500/30 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-400 text-sm ml-2">developer.js</span>
                </div>
                <div className="font-mono text-xs md:text-sm space-y-2 text-gray-300">
                  <div className="text-purple-400">const</div>
                  <div className="text-blue-400 ml-4">developer</div>
                  <div className="text-white ml-4">=</div>
                  <div className="text-yellow-400 ml-4">{`{`}</div>
                  <div className="text-green-400 ml-8">name:</div>
                  <div className="text-orange-400 ml-12">"Shrimay Tumane"</div>
                  <div className="text-green-400 ml-8">role:</div>
                  <div className="text-orange-400 ml-12">"Full Stack Developer"</div>
                  <div className="text-green-400 ml-8">passion:</div>
                  <div className="text-orange-400 ml-12">"Building amazing things"</div>
                  <div className="text-yellow-400 ml-4">{`}`}</div>
                </div>
                
                {/* Floating Tech Icons */}
                {!prefersReducedMotion && (
                  <>
                    <motion.div 
                      animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-4 -left-4 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center border border-yellow-500/30 backdrop-blur-sm"
                    >
                      <Zap className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                    </motion.div>
                    <motion.div 
                      animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute -bottom-4 -right-4 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30 backdrop-blur-sm"
                    >
                      <Code className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                    </motion.div>
                    <motion.div 
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="absolute top-1/2 -right-6 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center border border-purple-500/30 backdrop-blur-sm"
                    >
                      <Database className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Explore More scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-blue-400/50 rounded-full flex items-start justify-center p-2"
          >
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-1 bg-blue-400 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-20"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 md:px-6 py-2 md:py-3 backdrop-blur-sm mb-6 md:mb-8">
              <User className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
              <span className="text-blue-400 text-xs md:text-sm font-medium">Get to know me</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent backdrop-blur-sm">
              About Me
            </h2>
            <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left - Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="space-y-4 md:space-y-6 text-base md:text-lg text-gray-300 leading-relaxed">
                <p className="text-lg md:text-xl text-white font-medium">
                  I'm a passionate <span className="text-blue-400 font-semibold">B.Tech Information Technology</span> student 
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

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 pt-6 md:pt-8">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="text-center bg-gradient-to-br from-blue-500/10 to-blue-900/20 rounded-2xl p-4 md:p-6 border border-blue-500/30 backdrop-blur-sm"
                >
                  <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">2+</div>
                  <div className="text-gray-400 text-xs md:text-sm">Years Learning</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="text-center bg-gradient-to-br from-purple-500/10 to-purple-900/20 rounded-2xl p-4 md:p-6 border border-purple-500/30 backdrop-blur-sm"
                >
                  <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-2">10+</div>
                  <div className="text-gray-400 text-xs md:text-sm">Technologies</div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right - Cards */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4 md:space-y-6"
            >
              {/* Education Card */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }}
                className="group bg-gradient-to-br from-slate-800/50 to-blue-900/20 rounded-2xl md:rounded-3xl p-4 md:p-8 border border-blue-500/30 backdrop-blur-sm"
              >
                <div className="flex items-start space-x-3 md:space-x-4">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl md:rounded-2xl flex items-center justify-center"
                  >
                    <GraduationCap className="w-5 h-5 md:w-7 md:h-7 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-xl font-semibold text-blue-400 mb-1 md:mb-2">Education</h3>
                    <p className="font-medium text-sm md:text-lg text-white">B.Tech Information Technology</p>
                    <p className="text-purple-300 font-medium text-xs md:text-sm">Manipal University Jaipur</p>
                    <p className="text-gray-400 text-xs mt-1">Expected Graduation: 2027</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Experience Card */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }}
                className="group bg-gradient-to-br from-slate-800/50 to-purple-900/20 rounded-2xl md:rounded-3xl p-4 md:p-8 border border-purple-500/30 backdrop-blur-sm"
              >
                <div className="flex items-start space-x-3 md:space-x-4">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-r from-purple-400 to-blue-500 rounded-xl md:rounded-2xl flex items-center justify-center"
                  >
                    <Briefcase className="w-5 h-5 md:w-7 md:h-7 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-xl font-semibold text-purple-400 mb-1 md:mb-2">Experience</h3>
                    <p className="font-medium text-sm md:text-lg text-white">Full-Stack Developer Intern</p>
                    <p className="text-blue-300 font-medium text-xs md:text-sm">OPM Corporation</p>
                    <p className="text-gray-400 text-xs mt-1">June – August 2025</p>
                  </div>
                </div>
              </motion.div>

              {/* Location Card */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }}
                className="group bg-gradient-to-br from-slate-800/50 to-indigo-900/20 rounded-2xl md:rounded-3xl p-4 md:p-8 border border-indigo-500/30 backdrop-blur-sm"
              >
                <div className="flex items-start space-x-3 md:space-x-4">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl md:rounded-2xl flex items-center justify-center"
                  >
                    <MapPin className="w-5 h-5 md:w-7 md:h-7 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-xl font-semibold text-green-400 mb-1 md:mb-2">Location</h3>
                    <p className="font-medium text-sm md:text-lg text-white">Jaipur, Rajasthan</p>
                    <p className="text-gray-400 text-xs mt-1">Available for remote work</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-20"
          >
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 md:px-6 py-2 md:py-3 backdrop-blur-sm mb-6 md:mb-8">
              <Zap className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
              <span className="text-purple-400 text-xs md:text-sm font-medium">What I work with</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent backdrop-blur-sm">
              Tech Arsenal
            </h2>
            <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                category: 'Frontend', 
                skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Next.js'],
                icon: Monitor,
                gradient: 'from-blue-500 to-indigo-600'
              },
              { 
                category: 'Backend', 
                skills: ['Python', 'Node.js', 'Java', 'Express.js'],
                icon: Server,
                gradient: 'from-purple-500 to-blue-600'
              },
              { 
                category: 'Database', 
                skills: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase'],
                icon: Database,
                gradient: 'from-green-500 to-blue-600'
              },
              { 
                category: 'Tools & DevOps', 
                skills: ['Git', 'Docker', 'AWS', 'Linux'],
                icon: Terminal,
                gradient: 'from-indigo-500 to-purple-600'
              },
              { 
                category: 'Languages', 
                skills: ['C++', 'C', 'JavaScript', 'Python'],
                icon: Code,
                gradient: 'from-yellow-500 to-purple-600'
              },
              { 
                category: 'Design', 
                skills: ['Figma', 'UI/UX', 'Responsive Design', 'Prototyping'],
                icon: Globe,
                gradient: 'from-blue-500 to-purple-600'
              }
            ].map((category, index) => (
              <motion.div 
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group bg-gradient-to-br from-slate-800/50 to-blue-900/20 rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 border border-blue-500/30 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-10 h-10 md:w-14 md:h-14 bg-gradient-to-r ${category.gradient} rounded-xl md:rounded-2xl flex items-center justify-center`}
                  >
                    <category.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                  </motion.div>
                  <h3 className="text-base md:text-xl font-semibold text-blue-400">{category.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div 
                      key={skill} 
                      className="flex items-center space-x-2 animate-fade-in"
                      style={{ animationDelay: `${0.2 + skillIndex * 0.1}s` }}
                    >
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-20"
          >
            <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 md:px-6 py-2 md:py-3 backdrop-blur-sm mb-6 md:mb-8">
              <Briefcase className="w-3 h-3 md:w-4 md:h-4 text-indigo-400" />
              <span className="text-indigo-400 text-xs md:text-sm font-medium">My journey</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent backdrop-blur-sm">
              Experience
            </h2>
            <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Vertical Timeline */}
          <div className="relative">
            {/* Center timeline line */}
            {!prefersReducedMotion && (
              <motion.div 
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500 origin-top hidden md:block"
              />
            )}

            {/* Experience Item 1 - Left side */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex items-center mb-12 md:mb-16"
            >
              <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
                <motion.div 
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group bg-gradient-to-br from-slate-800/50 to-blue-900/20 rounded-2xl md:rounded-3xl p-4 md:p-8 border border-blue-500/30 backdrop-blur-sm"
                >
                  <div className="flex items-start space-x-3 md:space-x-4 mb-4">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl md:rounded-2xl flex items-center justify-center"
                    >
                      <Briefcase className="w-5 h-5 md:w-7 md:h-7 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-base md:text-xl font-semibold text-blue-400 mb-1 md:mb-2">Full-Stack Developer Intern</h3>
                      <p className="text-purple-300 font-medium mb-2 text-sm md:text-base">OPM Corporation</p>
                      <div className="flex items-center space-x-2 text-gray-400 text-xs md:text-sm">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                        <span>June – August 2025</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    Developed full-stack web applications using React, Node.js, and MongoDB. 
                    Collaborated with cross-functional teams to deliver scalable solutions.
                    Implemented RESTful APIs and optimized database queries for improved performance.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['React', 'Node.js', 'MongoDB', 'TypeScript'].map((tech) => (
                      <span key={tech} className="px-2 md:px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full border-4 border-slate-950 shadow-lg shadow-blue-500/50 hidden md:block"
              />
              <div className="w-full md:w-1/2 pl-0 md:pl-8"></div>
            </motion.div>

            {/* Experience Item 2 - Right side */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex items-center mb-12 md:mb-16"
            >
              <div className="w-full md:w-1/2 pr-0 md:pr-8 order-2 md:order-1"></div>
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-purple-500 rounded-full border-4 border-slate-950 shadow-lg shadow-purple-500/50 hidden md:block"
              />
              <div className="w-full md:w-1/2 pl-0 md:pl-8 mb-8 md:mb-0 order-1 md:order-2">
                <motion.div 
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group bg-gradient-to-br from-slate-800/50 to-purple-900/20 rounded-2xl md:rounded-3xl p-4 md:p-8 border border-purple-500/30 backdrop-blur-sm"
                >
                  <div className="flex items-start space-x-3 md:space-x-4 mb-4">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl md:rounded-2xl flex items-center justify-center"
                    >
                      <GraduationCap className="w-5 h-5 md:w-7 md:h-7 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-base md:text-xl font-semibold text-purple-400 mb-1 md:mb-2">B.Tech Information Technology</h3>
                      <p className="text-pink-300 font-medium mb-2 text-sm md:text-base">Manipal University Jaipur</p>
                      <div className="flex items-center space-x-2 text-gray-400 text-xs md:text-sm">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                        <span>2023 – 2027 (Expected)</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    Pursuing B.Tech in Information Technology with focus on software development, 
                    algorithms, and data structures. Active in hackathons and coding competitions.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Data Structures', 'Algorithms', 'Web Development', 'Database Systems'].map((tech) => (
                      <span key={tech} className="px-2 md:px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-20"
          >
            <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 md:px-6 py-2 md:py-3 backdrop-blur-sm mb-6 md:mb-8">
              <Rocket className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
              <span className="text-green-400 text-xs md:text-sm font-medium">My work</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Projects
            </h2>
            <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Project Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: 'Gram_Seva',
                description: 'A comprehensive web application that allows villagers to report issues like broken streetlights, water supply problems, and road damage with real-time dashboard.',
                tech: ['React', 'Node.js', 'MongoDB', 'Express'],
                github: 'https://github.com/ShrimayTumane/Gram_Seva',
                live: 'https://gram-seva.vercel.app/'
              },
              {
                name: 'JobShield',
                description: 'Job posting fraud detection system using machine learning algorithms to identify suspicious job postings and protect job seekers.',
                tech: ['Python', 'ML', 'Pandas', 'Scikit-learn'],
                github: 'https://github.com/ShrimayTumane/JobShield',
                live: 'https://jobshield.vercel.app/'
              },
              {
                name: 'Net-Guard',
                description: 'Network security monitoring tool that detects and alerts on potential security threats in real-time with comprehensive reporting.',
                tech: ['Python', 'Network Security', 'Flask', 'SQLite'],
                github: 'https://github.com/ShrimayTumane/Net-Guard',
                live: '#'
              },
              {
                name: 'HR Analytics',
                description: 'Interactive HR attrition analytics dashboard built in Tableau analyzing employee turnover patterns across 1,470 employees.',
                tech: ['Tableau', 'Excel', 'Data Analysis', 'Visualization'],
                github: 'https://github.com/ShrimayTumane/HR-Attrition-Analytics-Tableau',
                live: '#'
              },
              {
                name: 'Portfolio',
                description: 'My personal portfolio website showcasing my skills, projects, and experience with modern animations and responsive design.',
                tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
                github: 'https://github.com/ShrimayTumane/ShrimayTumane',
                live: 'https://shrimay-portfolio-glow.vercel.app/'
              },
              {
                name: 'JobShield Dashboard',
                description: 'Interactive risk & operations console for job posting fraud detection with real-time analytics and ML-powered detection.',
                tech: ['Python', 'Tableau', 'Analytics', 'ML', 'Data Viz'],
                github: 'https://github.com/ShrimayTumane/JobShield_Dashboard',
                live: '#'
              }
            ].map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group bg-gradient-to-br from-slate-800/50 to-blue-900/20 rounded-2xl md:rounded-3xl p-4 md:p-6 border border-blue-500/30 backdrop-blur-sm relative"
              >
                {/* Twinkle accents at corners */}
                {!prefersReducedMotion && (
                  <>
                    <motion.div 
                      className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-twinkle"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    />
                    <motion.div 
                      className="absolute top-2 right-2 w-1 h-1 bg-blue-300 rounded-full animate-twinkle"
                      style={{ animationDelay: `${index * 0.2 + 0.5}s` }}
                    />
                    <motion.div 
                      className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-purple-300 rounded-full animate-twinkle"
                      style={{ animationDelay: `${index * 0.2 + 1}s` }}
                    />
                    <motion.div 
                      className="absolute bottom-2 right-2 w-1 h-1 bg-indigo-300 rounded-full animate-twinkle"
                      style={{ animationDelay: `${index * 0.2 + 1.5}s` }}
                    />
                  </>
                )}
                <h3 className="text-lg md:text-xl font-semibold text-blue-400 mb-3">{project.name}</h3>
                <p className="text-gray-300 text-sm md:text-base mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-2 md:px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-3">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 text-white py-2 rounded-xl font-medium text-center flex items-center justify-center space-x-2 text-xs md:text-sm"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </motion.a>
                  {project.live !== '#' && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border-2 border-blue-500/50 text-blue-300 py-2 rounded-xl font-medium text-center flex items-center justify-center space-x-2 text-xs md:text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live</span>
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-20"
          >
            <div className="inline-flex items-center space-x-2 bg-indigo-900/30 border border-indigo-500/30 rounded-full px-4 md:px-6 py-2 md:py-3 backdrop-blur-sm mb-6 md:mb-8">
              <Mail className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
              <span className="text-blue-400 text-xs md:text-sm font-medium">Get in touch</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent backdrop-blur-sm">
              Let's Connect
            </h2>
            <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-400 text-base md:text-lg">
              Ready to bring your ideas to life? Let's create something amazing together.
            </p>
          </motion.div>
          
          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left - Contact Methods */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-4">Get in Touch</h3>
                <p className="text-gray-300 text-base md:text-lg">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
              </div>
              
              <div className="space-y-4">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  href="https://linkedin.com/in/shrimay-tumane-6b5a96277"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-4 p-4 md:p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-blue-900/20 border border-blue-500/30 backdrop-blur-sm"
                >
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <Linkedin className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="font-medium text-lg text-blue-400">LinkedIn</p>
                    <p className="text-gray-400 text-sm">Connect with me professionally</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </motion.a>

                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  href="mailto:shrimaytumane@gmail.com"
                  className="group flex items-center space-x-4 p-4 md:p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-purple-900/20 border border-purple-500/30 backdrop-blur-sm"
                >
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <Mail className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="font-medium text-lg text-purple-400">Email</p>
                    <p className="text-gray-400 text-sm">shrimaytumane@gmail.com</p>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/50 to-blue-900/20 border border-blue-500/30 backdrop-blur-xl">
                <CardContent className="p-6 md:p-8">
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-blue-400 mb-2">Name</label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="bg-slate-900/50 border-blue-500/30 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-blue-400 mb-2">Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        className="bg-slate-900/50 border-blue-500/30 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-blue-400 mb-2">Message</label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        placeholder="Tell me about your project..."
                        rows={5}
                        className="bg-slate-900/50 border-blue-500/30 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400 resize-none rounded-xl"
                      />
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full group relative bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 text-white py-4 rounded-xl font-bold"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                        <span className="relative flex items-center justify-center">
                          {isSubmitting ? (
                            <span className="flex items-center">
                              <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                              />
                              Sending...
                            </span>
                          ) : (
                            <>
                              <Zap className="mr-2 h-5 w-5" />
                              Send Message
                            </>
                          )}
                        </span>
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-blue-500/20 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-6"
          >
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Shrimay
              </div>
            </motion.div>

            {/* Copyright */}
            <p className="text-gray-400 text-sm text-center">
              2025 Shrimay Tumane. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
