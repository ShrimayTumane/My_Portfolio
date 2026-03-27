import { useState, useEffect } from 'react';
import { ArrowDown, Download, Mail, Linkedin, Code, Database, Globe, Github, ExternalLink, Calendar, Monitor, Cpu, Zap, Terminal, Server, Lightbulb, Star, Rocket, Orbit, User, MapPin, GraduationCap, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
        'service_r0f3xvl', // service ID
        'template_58kxhzd', // template ID
        templateParams,
        'SgEqE2zmMXInsiqW4' // public key
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
    <div className="min-h-screen text-white overflow-x-hidden relative">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Multi-layered gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 via-purple-950 to-black animate-gradient"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/30 via-transparent to-purple-950/30"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-radial from-blue-500/20 via-purple-600/10 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-gradient-radial from-purple-500/25 via-indigo-600/15 to-transparent rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-gradient-radial from-indigo-500/15 via-blue-600/10 to-transparent rounded-full blur-3xl animate-float-reverse"></div>
        
        {/* Enhanced Stars with different sizes and colors */}
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-twinkle ${
              i % 4 === 0 ? 'w-1.5 h-1.5 bg-blue-300' :
              i % 4 === 1 ? 'w-1 h-1 bg-purple-300' :
              i % 4 === 2 ? 'w-0.5 h-0.5 bg-indigo-300' :
              'w-1 h-1 bg-white'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Futuristic Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.4) 1px, transparent 1px),
              linear-gradient(rgba(129, 140, 248, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(129, 140, 248, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px, 100px 100px, 50px 50px, 50px 50px'
          }}></div>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 right-1/4 w-8 h-8 border-2 border-blue-400/50 rotate-45 animate-rotate-slow"></div>
        <div className="absolute bottom-1/3 left-1/5 w-6 h-6 border-2 border-purple-400/50 animate-rotate-slow"></div>
        <div className="absolute top-2/3 right-1/5 w-4 h-8 bg-gradient-to-t from-purple-500/30 to-blue-500/30 animate-float"></div>
      </div>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-blue-500/20 animate-fade-in">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 animate-slide-in-left">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl blur-lg opacity-50 animate-pulse"></div>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Shrimay
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-12 animate-slide-in-right">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'experience', label: 'Experience' },
                { id: 'projects', label: 'Projects' },
                { id: 'contact', label: 'Contact' }
              ].map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-300 hover:scale-105 relative animate-fade-in interactive-element ${
                    activeSection === item.id 
                      ? 'text-blue-400 after:absolute after:bottom-[-8px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-1 after:h-1 after:bg-blue-400 after:rounded-full' 
                      : 'text-gray-300 hover:text-blue-400'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Content */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-3 backdrop-blur-sm animate-bounce-in">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">Available for work</span>
                </div>
                
                <div className="space-y-4">
                  <h1 className="text-6xl md:text-7xl font-bold leading-tight animate-slide-in-left delay-200">
                    <span className="block text-white">Hello, I'm</span>
                    <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                      Shrimay Tumane
                    </span>
                  </h1>
                  
                  <div className="space-y-2 animate-slide-in-left delay-400">
                    <p className="text-3xl md:text-4xl font-semibold text-white">
                      Full-Stack Developer
                    </p>
                    <p className="text-xl text-gray-400">
                      Specializing in React, Python & Modern Web Technologies
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-gray-300 max-w-xl leading-relaxed animate-fade-in delay-500">
                I create exceptional digital experiences by combining cutting-edge technology 
                with innovative design. Currently pursuing B.Tech in Information Technology 
                at Manipal University Jaipur.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-bounce-in delay-700">
                <Button 
                  className="group relative bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 text-white px-8 py-4 text-lg font-medium rounded-2xl interactive-element"
                  onClick={() => scrollToSection('contact')}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <span className="relative flex items-center">
                    Get In Touch
                    <ArrowDown className="ml-2 h-5 w-5 rotate-[-45deg]" />
                  </span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-2 border-blue-500/50 text-blue-300 hover:bg-blue-500/10 px-8 py-4 text-lg font-medium rounded-2xl interactive-element backdrop-blur-sm"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/Shrimay_Tumane_CV.pdf';
                    link.download = 'Shrimay_Tumane_CV.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download CV
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex space-x-6 animate-scale-in delay-800">
                <a 
                  href="https://linkedin.com/in/shrimay-tumane-6b5a96277"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-14 h-14 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-2xl flex items-center justify-center interactive-element backdrop-blur-sm"
                >
                  <Linkedin className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>
                <a 
                  href="#"
                  className="group relative w-14 h-14 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl flex items-center justify-center interactive-element backdrop-blur-sm"
                >
                  <Github className="w-6 h-6 text-purple-400 group-hover:text-white transition-colors" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>
              </div>
            </div>

            {/* Right Side - Profile Image with Cosmic Effects */}
            <div className="relative flex items-center justify-center animate-fade-in-up delay-300">
              
              {/* Large Central Circle with Profile */}
              <div className="relative">
                {/* Outer rotating ring */}
                <div className="absolute inset-0 w-96 h-96 border border-blue-500/30 rounded-full animate-rotate-slow"></div>
                
                {/* Middle rotating ring */}
                <div className="absolute inset-8 w-80 h-80 border border-purple-500/20 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse' }}></div>
                
                {/* Inner glowing circle with profile image */}
                <div className="relative w-72 h-72 bg-gradient-to-br from-blue-400/20 via-purple-500/30 to-indigo-500/20 rounded-full backdrop-blur-sm border border-blue-500/40 flex items-center justify-center animate-glow-pulse">
                  
                  {/* Profile Image Container */}
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-500 rounded-full p-1">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden border border-blue-500/50">
                      <img 
                        src="https://ik.imagekit.io/rmlbayysp/1749281936895-IMG_6063_mEUHD-9ABs.HEIC"
                        alt="Shrimay Tumane"
                        className="w-44 h-44 rounded-full object-cover hover-scale"
                      />
                    </div>
                  </div>
                  
                  {/* Floating Tech Icons */}
                  <div className="absolute top-4 right-8 w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center animate-float">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute bottom-8 left-4 w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-500 rounded-2xl flex items-center justify-center animate-float-reverse">
                    <Terminal className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute top-1/2 -left-6 w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center animate-float">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute top-1/4 -right-4 w-10 h-10 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-2xl flex items-center justify-center animate-float-reverse">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                {/* Additional floating elements */}
                <div className="absolute -top-8 left-1/4 w-6 h-6 bg-blue-400/60 rounded-full animate-twinkle"></div>
                <div className="absolute -bottom-4 right-1/3 w-4 h-4 bg-purple-400/60 rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-3/4 -left-8 w-5 h-5 bg-indigo-400/60 rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-in delay-1000">
            <div className="flex flex-col items-center space-y-4 text-gray-400">
              <span className="text-xs tracking-wider uppercase font-medium">Explore More</span>
              <div className="relative">
                <div className="w-8 h-12 border-2 border-blue-500/50 rounded-full flex justify-center backdrop-blur-sm">
                  <div className="w-1.5 h-4 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mt-2 animate-float"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-3 backdrop-blur-sm mb-8 animate-bounce-in">
              <User className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Get to know me</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-slide-in-left delay-200">
              About Me
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full animate-scale-in delay-300"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Text Content */}
            <div className="space-y-8 animate-slide-in-left delay-400">
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p className="text-xl text-white font-medium">
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
              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="text-center animate-scale-in delay-600">
                  <div className="text-3xl font-bold text-blue-400 mb-2">2+</div>
                  <div className="text-gray-400">Years Learning</div>
                </div>
                <div className="text-center animate-scale-in delay-700">
                  <div className="text-3xl font-bold text-purple-400 mb-2">10+</div>
                  <div className="text-gray-400">Technologies</div>
                </div>
              </div>
            </div>
            
            {/* Right - Cards */}
            <div className="space-y-6 animate-slide-in-right delay-500">
              {/* Education Card */}
              <div className="group bg-gradient-to-br from-slate-800/50 to-blue-900/20 rounded-3xl p-8 border border-blue-500/30 backdrop-blur-sm interactive-element">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center group-hover:animate-pulse">
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">Education</h3>
                    <p className="font-medium text-lg text-white">B.Tech Information Technology</p>
                    <p className="text-purple-300 font-medium">Manipal University Jaipur</p>
                    <p className="text-gray-400 text-sm mt-1">Expected Graduation: 2027</p>
                  </div>
                </div>
              </div>
              
              {/* Experience Card */}
              <div className="group bg-gradient-to-br from-slate-800/50 to-purple-900/20 rounded-3xl p-8 border border-purple-500/30 backdrop-blur-sm interactive-element">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-blue-500 rounded-2xl flex items-center justify-center group-hover:animate-pulse">
                    <Briefcase className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-purple-400 mb-2">Experience</h3>
                    <p className="font-medium text-lg text-white">Full-Stack Developer Intern</p>
                    <p className="text-blue-300 font-medium">OPM Corporation</p>
                    <p className="text-gray-400 text-sm mt-1">June – August 2025</p>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="group bg-gradient-to-br from-slate-800/50 to-indigo-900/20 rounded-3xl p-8 border border-indigo-500/30 backdrop-blur-sm interactive-element">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center group-hover:animate-pulse">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-green-400 mb-2">Location</h3>
                    <p className="font-medium text-lg text-white">Jaipur, Rajasthan</p>
                    <p className="text-gray-400 text-sm mt-1">Available for remote work</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-6 py-3 backdrop-blur-sm mb-8 animate-bounce-in">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">What I work with</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-slide-in-left delay-200">
              Tech Arsenal
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full animate-scale-in delay-300"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div 
                key={category.category} 
                className="group bg-gradient-to-br from-slate-800/50 to-blue-900/20 rounded-3xl p-8 border border-blue-500/30 backdrop-blur-sm interactive-element animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-14 h-14 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center group-hover:animate-pulse`}>
                    <category.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-400">{category.category}</h3>
                </div>
                <ul className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <li 
                      key={skill} 
                      className="text-gray-300 hover:text-blue-300 transition-colors duration-300 cursor-pointer flex items-center space-x-2 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1 + skillIndex * 0.05}s` }}
                    >
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-3 backdrop-blur-sm mb-8">
              <Briefcase className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">My career path</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Journey
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
            
            <div className="space-y-16">
              {[
                {
                  year: '2025',
                  title: 'Full-Stack Developer Intern',
                  company: 'OPM Corporation',
                  description: 'Developing scalable web applications using modern technologies and contributing to innovative projects.',
                  icon: Cpu,
                  side: 'right'
                },
                {
                  year: '2024',
                  title: 'Tech Enthusiast',
                  company: 'Self-Learning',
                  description: 'Mastering new frameworks, building personal projects, and exploring cutting-edge technologies.',
                  icon: Lightbulb,
                  side: 'left'
                },
                {
                  year: '2023',
                  title: 'Started B.Tech Journey',
                  company: 'Manipal University Jaipur',
                  description: 'Beginning my formal education in Information Technology and diving deep into programming.',
                  icon: GraduationCap,
                  side: 'right'
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center ${item.side === 'left' ? 'flex-row-reverse' : ''} animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center border-4 border-slate-900 z-10 group-hover:animate-pulse">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content Card */}
                  <div className={`w-5/12 ${item.side === 'left' ? 'pr-8' : 'pl-8'}`}>
                    <div className="group bg-gradient-to-br from-slate-800/50 to-blue-900/20 rounded-3xl p-8 border border-blue-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300">
                      <span className="inline-block px-4 py-1 bg-gradient-to-r from-blue-400/20 to-purple-400/20 border border-blue-400/30 rounded-full text-blue-400 font-bold text-sm mb-4">{item.year}</span>
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-blue-300 font-medium mb-3">{item.company}</p>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-3 backdrop-blur-sm mb-8">
              <Rocket className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">What I've built</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 animate-fade-in-up delay-200">
            {/* Geo Quest Project */}
            <div className="group bg-gradient-to-br from-slate-800/50 to-blue-900/20 rounded-3xl p-8 border border-blue-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 interactive-element">
              <div className="relative overflow-hidden rounded-xl mb-6 border border-blue-500/30">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img 
                  src="https://geo-quest-one.vercel.app/og-image.png" 
                  alt="Geo Quest Game" 
                  className="w-full h-64 object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/600x400/1e293b/38bdf8?text=Geo+Quest";
                  }}
                />
                <div className="absolute top-4 right-4 bg-blue-500/80 backdrop-blur-sm rounded-full p-2 shadow-lg">
                  <Globe className="h-5 w-5 text-white" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-blue-400">Geo Quest</h3>
                  <div className="flex space-x-3">
                    <a href="https://github.com/shrimaytumane/geo-quest" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors duration-300">
                      <Github className="h-5 w-5 text-gray-300" />
                    </a>
                    <a href="https://geo-quest-one.vercel.app/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-500 p-2 rounded-full transition-colors duration-300">
                      <ExternalLink className="h-5 w-5 text-white" />
                    </a>
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                  An interactive geography game that challenges players to guess countries based on their shapes. Features multiple difficulty levels, regional filtering, and a time-based scoring system.
                </p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-xs font-medium">React</span>
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-xs font-medium">TypeScript</span>
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-xs font-medium">Tailwind CSS</span>
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-xs font-medium">Vercel</span>
                </div>
              </div>
            </div>
            
            {/* Coming Soon Project */}
            <div className="group bg-gradient-to-br from-slate-800/50 to-blue-900/20 rounded-3xl p-8 border border-blue-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 interactive-element">
              <div className="relative overflow-hidden rounded-xl mb-6 border border-blue-500/30 flex items-center justify-center h-64 bg-gradient-to-br from-slate-900/80 to-blue-900/30">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center border border-blue-500/30 animate-glow-pulse">
                  <Code className="h-10 w-10 text-blue-400" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-blue-400">More Coming Soon</h3>
                <p className="text-gray-300 leading-relaxed">
                  I'm currently working on some exciting projects that showcase cutting-edge 
                  full-stack development and innovative design solutions. Stay tuned for updates!
                </p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-xs font-medium">Next.js</span>
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-xs font-medium">React</span>
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-xs font-medium">Node.js</span>
                </div>
              </div>
            </div>
            
          </div>
          
          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400/60 rounded-full animate-twinkle"></div>
          <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-purple-400/60 rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-3 backdrop-blur-sm mb-8">
              <Mail className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Get in touch</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's create something amazing together.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left - Contact Info */}
            <div className="space-y-8 animate-slide-in-left">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-blue-400">Get in Touch</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  I'm always excited to discuss new opportunities, collaborate on innovative projects, 
                  or just chat about the latest in technology and design.
                </p>
              </div>
              
              {/* Contact Methods */}
              <div className="space-y-6">
                <a 
                  href="https://linkedin.com/in/shrimay-tumane-6b5a96277"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-blue-900/20 hover:from-slate-700/50 hover:to-blue-800/30 transition-all duration-300 border border-blue-500/30 backdrop-blur-sm hover:scale-105"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center group-hover:animate-pulse">
                    <Linkedin className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-lg text-blue-400">LinkedIn</p>
                    <p className="text-gray-300">Connect with me professionally</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors ml-auto" />
                </a>

                <div className="group flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-blue-900/20 border border-blue-500/30 backdrop-blur-sm">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                    <Mail className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-lg text-purple-400">Email</p>
                    <p className="text-gray-300">shrimaytumane@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right - Contact Form */}
            <div className="bg-gradient-to-br from-slate-800/50 to-blue-900/20 rounded-3xl p-8 border border-blue-500/30 backdrop-blur-sm animate-slide-in-right">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-3 text-blue-400">Name</label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    disabled={isSubmitting}
                    className="bg-slate-800/50 border-blue-500/30 focus:border-blue-400 text-white h-12 rounded-xl"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-3 text-blue-400">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={isSubmitting}
                    className="bg-slate-800/50 border-blue-500/30 focus:border-blue-400 text-white h-12 rounded-xl"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-3 text-blue-400">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    disabled={isSubmitting}
                    rows={5}
                    className="bg-slate-800/50 border-blue-500/30 focus:border-blue-400 text-white resize-none rounded-xl"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 h-12 text-base font-medium rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-blue-500/20 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Shrimay
            </span>
          </div>
          <p className="text-gray-400 text-lg">
            © 2024 Shrimay Tumane. Crafted with 
            <span className="text-red-400 mx-1"></span> 
            and cutting-edge technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
