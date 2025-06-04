
import { useState, useEffect } from 'react';
import { ArrowDown, Download, Mail, Linkedin, Code, Palette, Database, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'services', 'portfolio', 'contact'];
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

  const skills = [
    { name: 'Python', level: 85, icon: Code },
    { name: 'Java', level: 80, icon: Code },
    { name: 'C/C++', level: 75, icon: Code },
    { name: 'JavaScript', level: 70, icon: Globe },
    { name: 'React.js', level: 75, icon: Globe },
    { name: 'MongoDB', level: 65, icon: Database },
    { name: 'SQL', level: 70, icon: Database },
    { name: 'UI/UX Design', level: 80, icon: Palette }
  ];

  const services = [
    {
      title: "Full-Stack Web Development",
      description: "End-to-end website and web application development using modern technologies",
      icon: Globe,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "UI/UX Design",
      description: "User-first interfaces for web and mobile applications with modern design principles",
      icon: Palette,
      gradient: "from-purple-500 to-pink-600"
    },
    {
      title: "Software Development",
      description: "Custom software solutions using Python, Java, and other programming languages",
      icon: Code,
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Shrimay Tumane
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'services', 'portfolio', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors duration-300 hover:text-blue-400 ${
                    activeSection === section ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mb-8 animate-fade-in">
            <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-6xl font-bold">
                  ST
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in delay-300">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Shrimay Tumane
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-4 animate-fade-in delay-500">
            Aspiring Full-Stack Developer & UI/UX Designer
          </p>
          
          <p className="text-lg text-gray-400 mb-8 animate-fade-in delay-700">
            Solving problems through code and creativity
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-1000">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
            <Button 
              variant="outline" 
              onClick={() => scrollToSection('contact')}
              className="border-blue-500 text-blue-400 hover:bg-blue-500/10 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Let's Connect
            </Button>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="h-6 w-6 text-gray-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  B.Tech student in Information Technology with a strong foundation in Python, Java, C, and C++. 
                  Passionate about software development and problem-solving, with experience in data structures 
                  and object-oriented programming.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Eager to learn, build, and contribute to real-world tech solutions through innovative 
                  development and user-centered design.
                </p>
              </div>
              
              <div className="space-y-6">
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-blue-400">Education</h3>
                    <div className="space-y-2">
                      <p className="font-medium">B.Tech in Information Technology</p>
                      <p className="text-gray-400">Manipal University Jaipur</p>
                      <p className="text-gray-400">Expected 2027</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-purple-400">Experience</h3>
                    <div className="space-y-2">
                      <p className="font-medium">Full-Stack Developer Intern</p>
                      <p className="text-gray-400">OPM Corporation</p>
                      <p className="text-gray-400">June – August 2025</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Skills
          </h2>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={skill.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <skill.icon className="h-5 w-5 text-blue-400" />
                    <span className="font-medium">{skill.name}</span>
                  </div>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Services
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={service.title} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105 group">
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${service.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Portfolio
          </h2>
          
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center">
              <Code className="h-16 w-16 text-blue-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">More Projects Coming Soon!</h3>
            <p className="text-gray-400 text-lg">
              Currently working on exciting projects that showcase my full-stack development 
              and UI/UX design skills. Stay tuned for updates!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  I'm always excited to discuss new opportunities, collaborate on projects, 
                  or just chat about technology and innovation.
                </p>
              </div>
              
              <div className="space-y-4">
                <a 
                  href="https://linkedin.com/in/shrimay-tumane-6b5a96277"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Linkedin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-gray-400 text-sm">Connect with me professionally</p>
                  </div>
                </a>
              </div>
            </div>
            
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      id="name"
                      type="text"
                      required
                      className="bg-gray-700/50 border-gray-600 focus:border-blue-500 text-white"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      id="email"
                      type="email"
                      required
                      className="bg-gray-700/50 border-gray-600 focus:border-blue-500 text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <Textarea
                      id="message"
                      required
                      rows={4}
                      className="bg-gray-700/50 border-gray-600 focus:border-blue-500 text-white resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Shrimay Tumane. Built with passion and modern web technologies.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
