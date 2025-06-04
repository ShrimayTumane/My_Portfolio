
import { useState, useEffect } from 'react';
import { ArrowDown, Download, Mail, Linkedin, Code, Palette, Database, Globe, Github, ExternalLink, Camera, MapPin, Calendar } from 'lucide-react';
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
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-medium text-white">
              Shrimay Tumane
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id 
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
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
        <div className="max-w-6xl mx-auto px-6 text-center">
          {/* Profile Image */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-2xl font-bold">
                  ST
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="block text-white">Hi, I'm</span>
              <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Shrimay Tumane
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Aspiring Full-Stack Developer & UI/UX Designer passionate about creating 
              digital experiences that matter.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button 
                className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-base font-medium"
                onClick={() => scrollToSection('contact')}
              >
                Get in touch
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 text-base font-medium"
              >
                <Download className="mr-2 h-4 w-4" />
                Resume
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 pt-8">
              <a 
                href="https://linkedin.com/in/shrimay-tumane-6b5a96277"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center space-y-2 text-gray-500">
              <span className="text-xs tracking-wide">SCROLL</span>
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-[#111111]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">About Me</h2>
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  I'm a B.Tech student in Information Technology at Manipal University Jaipur, 
                  passionate about creating digital solutions that make a difference.
                </p>
                <p>
                  With a strong foundation in Python, Java, C, and C++, I love solving complex 
                  problems through code and creating user-centered designs that bring ideas to life.
                </p>
                <p>
                  Currently seeking opportunities to grow as a full-stack developer and contribute 
                  to innovative projects that push the boundaries of technology.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800">
                <div className="flex items-center space-x-3 mb-4">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-semibold">Education</h3>
                </div>
                <div className="space-y-2 text-gray-300">
                  <p className="font-medium">B.Tech in Information Technology</p>
                  <p className="text-gray-400">Manipal University Jaipur</p>
                  <p className="text-gray-400">Expected 2027</p>
                </div>
              </div>
              
              <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <h3 className="text-xl font-semibold">Experience</h3>
                </div>
                <div className="space-y-2 text-gray-300">
                  <p className="font-medium">Full-Stack Developer Intern</p>
                  <p className="text-gray-400">OPM Corporation</p>
                  <p className="text-gray-400">June – August 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Skills & Technologies</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { category: 'Frontend', skills: ['React.js', 'JavaScript', 'HTML/CSS', 'UI/UX Design'], icon: Palette },
              { category: 'Backend', skills: ['Python', 'Java', 'C/C++', 'Node.js'], icon: Code },
              { category: 'Database', skills: ['MongoDB', 'SQL', 'Database Design'], icon: Database },
              { category: 'Tools', skills: ['Git', 'VS Code', 'Figma', 'Linux'], icon: Globe }
            ].map((category) => (
              <div key={category.category} className="bg-[#111111] rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="flex items-center space-x-3 mb-6">
                  <category.icon className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-semibold">{category.category}</h3>
                </div>
                <ul className="space-y-3">
                  {category.skills.map((skill) => (
                    <li key={skill} className="text-gray-300">{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-[#111111]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Featured Projects</h2>
          
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center">
              <Code className="h-12 w-12 text-blue-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Coming Soon</h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              I'm currently working on some exciting projects that showcase my full-stack 
              development and design skills. Check back soon for updates!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it. Let's chat and see how we can bring your ideas to life.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  I'm always excited to discuss new opportunities, collaborate on projects, 
                  or just chat about technology and innovation.
                </p>
              </div>
              
              <a 
                href="https://linkedin.com/in/shrimay-tumane-6b5a96277"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-6 rounded-2xl bg-[#111111] hover:bg-[#1a1a1a] transition-colors border border-gray-800"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Linkedin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-lg">LinkedIn</p>
                  <p className="text-gray-400">Connect with me professionally</p>
                </div>
              </a>
            </div>
            
            <div className="bg-[#111111] rounded-2xl p-8 border border-gray-800">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-3">Name</label>
                  <Input
                    id="name"
                    type="text"
                    required
                    className="bg-[#1a1a1a] border-gray-700 focus:border-blue-500 text-white h-12"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-3">Email</label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="bg-[#1a1a1a] border-gray-700 focus:border-blue-500 text-white h-12"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-3">Message</label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    className="bg-[#1a1a1a] border-gray-700 focus:border-blue-500 text-white resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-white text-black hover:bg-gray-200 h-12 text-base font-medium"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2024 Shrimay Tumane. Designed and developed with passion.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
