import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { 
  Sprout, 
  BarChart3, 
  CloudRain, 
  Settings,
  Menu,
  X,
  Tractor,
  Wheat,
  Sun,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
  Clock,
  Shield,
  Users,
  Droplets,
  Bug
} from 'lucide-react';



const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: 'Smart Farm Management',
      description: 'Blend traditional farming wisdom with modern technology. Track crops, resources, and performance all in one place.',
      icon: Sprout
    },
    {
      title: 'Advanced Analytics',
      description: 'Make data-driven decisions while respecting time-tested farming practices.',
      icon: BarChart3
    },
    {
      title: 'Weather Integration',
      description: 'Combine traditional weather wisdom with modern forecasting technology.',
      icon: CloudRain
    },
    {
      title: 'Resource Optimization',
      description: 'Balance traditional conservation methods with AI-powered recommendations.',
      icon: Settings
    }
  ];

  const testimonials = [
    {
      name: "John Smith",
      role: "Third Generation Farmer",
      content: "FarmSmart helped us maintain our traditional practices while improving efficiency by 40%.",
      image: "/api/placeholder/100/100"
    },
    {
      name: "Sarah Johnson",
      role: "Agricultural Specialist",
      content: "The perfect blend of old-school farming wisdom and modern technology.",
      image: "/api/placeholder/100/100"
    }
  ];

  const mlTools = [
    {
      title: 'Water Usage Prediction',
      description: 'Optimize your water resources with AI-powered predictions based on crop type, season, and environmental factors.',
      icon: Droplets,
      link: '/water-prediction'
    },
    {
      title: 'Crop Yield Prediction',
      description: 'Get accurate yield forecasts using advanced machine learning models that consider multiple agricultural variables.',
      icon: Sprout,
      link: ' https://huggingface.co/spaces/Satya-555/crop-predictor'
    },
    {
      title: 'Disease Detection',
      description: 'Early detection of crop diseases using computer vision and AI to protect your harvest.',
      icon: Bug,
      link: '/disease-detection'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F1]">
          <LoadingSpinner />
      {/* Navigation */}
      <nav className="sticky top-0 bg-[#2C1810]/95 backdrop-blur-md shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-[#E6B17E]" />
              <span className="text-2xl font-bold text-[#E6B17E]">FarmSmart</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-[#E6B17E] hover:text-[#F3D5B5] transition-colors duration-300">Features</a>
              <a href="#ml-tools" className="text-[#E6B17E] hover:text-[#F3D5B5] transition-colors duration-300">ML Tools</a>
              <a href="#testimonials" className="text-[#E6B17E] hover:text-[#F3D5B5] transition-colors duration-300">Testimonials</a>
              <a href="#about" className="text-[#E6B17E] hover:text-[#F3D5B5] transition-colors duration-300">About</a>
              <a href="/login" className="text-[#E6B17E] hover:text-[#F3D5B5] transition-colors duration-300">Login</a>
              <a href="/register" className="bg-[#8B4513] text-white px-6 py-2 rounded-lg hover:bg-[#A0522D] transition-colors duration-300 shadow-lg">
                Get Started
              </a>
            </div>

            <div className="md:hidden flex items-center">
              <button
                className="text-[#E6B17E] hover:text-[#F3D5B5] transition-colors duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#2C1810] border-t border-[#E6B17E]/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-[#E6B17E] hover:text-[#F3D5B5]">Features</a>
              <a href="#ml-tools" className="block px-3 py-2 text-[#E6B17E] hover:text-[#F3D5B5]">ML Tools</a>
              <a href="#testimonials" className="block px-3 py-2 text-[#E6B17E] hover:text-[#F3D5B5]">Testimonials</a>
              <a href="#about" className="block px-3 py-2 text-[#E6B17E] hover:text-[#F3D5B5]">About</a>
              <Link to="/login" className="text-[#E6B17E] hover:text-[#F3D5B5] transition-colors duration-300">Login</Link>
              <a href="/register" className="block px-3 py-2 text-[#E6B17E] font-medium">Get Started</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#2C1810] text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Wheat className="absolute top-20 right-0 text-[#8B4513]/20 h-96 w-96 animate-float" />
          <Tractor className="absolute bottom-0 left-0 text-[#8B4513]/20 h-72 w-72 animate-float-delayed" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          <div 
            className="text-center max-w-3xl mx-auto animate-fade-in"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              Cultivating Tomorrow,
              <span className="block text-[#E6B17E] mt-2">Honoring Today</span>
            </h1>
            <p className="text-xl text-[#F3D5B5] mb-12 max-w-2xl mx-auto">
              Where traditional farming wisdom meets modern innovation. 
              Experience the perfect balance of time-tested practices and cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register" className="inline-block bg-[#8B4513] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#A0522D] transform hover:scale-105 transition-all duration-300 shadow-lg">
                Start Your Journey
              </a>
              <a href="#features" className="inline-block bg-[#E6B17E]/10 text-[#E6B17E] border border-[#E6B17E] px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#E6B17E]/20 transform hover:scale-105 transition-all duration-300">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-[#8B4513] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Users className="h-8 w-8 mb-2" />
              <div className="text-2xl font-bold">10,000+</div>
              <div className="text-sm opacity-80">Active Farmers</div>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 mb-2" />
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm opacity-80">Secure Data</div>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 mb-2" />
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm opacity-80">Support</div>
            </div>
            <div className="flex flex-col items-center">
              <Sprout className="h-8 w-8 mb-2" />
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-sm opacity-80">Acres Managed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-[#FAF6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="features-header"
            data-animate
            className={`text-center mb-20 transform transition-all duration-1000 ${
              isVisible['features-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl font-bold text-[#2C1810] sm:text-4xl mb-4">
              Traditional Wisdom, Modern Solutions
            </h2>
            <p className="text-xl text-[#5C4033] max-w-2xl mx-auto">
              Bridging generations of farming knowledge with innovative technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                id={`feature-${index}`}
                data-animate 
                className={`bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transform transition-all duration-500 hover:-translate-y-1 delay-${
                  index * 200
                } ${
                  isVisible[`feature-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } border border-[#E6B17E]/20`}
              >
                <div className="w-12 h-12 bg-[#8B4513]/10 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-[#8B4513]" />
                </div>
                <h3 className="text-xl font-semibold text-[#2C1810] mb-4">{feature.title}</h3>
                <p className="text-[#5C4033]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ML Tools Section */}
      <div id="ml-tools" className="py-24 bg-[#2C1810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="ml-tools-header"
            data-animate
            className={`text-center mb-20 transform transition-all duration-1000 ${
              isVisible['ml-tools-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              Smart Farming Tools
            </h2>
            <p className="text-xl text-[#E6B17E] max-w-2xl mx-auto">
              Harness the power of artificial intelligence to optimize your farming operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mlTools.map((tool, index) => (
              <div
                key={tool.title}
                id={`ml-tool-${index}`}
                data-animate
                className={`bg-white rounded-xl p-8 shadow-lg transform transition-all duration-500 delay-${
                  index * 200
                } hover:scale-105 ${
                  isVisible[`ml-tool-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <a href={tool.link} className="block h-full">
                  <div className="w-12 h-12 bg-[#8B4513]/10 rounded-lg flex items-center justify-center mb-6">
                    <tool.icon className="h-6 w-6 text-[#8B4513]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2C1810] mb-4">{tool.title}</h3>
                  <p className="text-[#5C4033] mb-6">{tool.description}</p>
                  <div className="flex items-center text-[#8B4513] font-semibold">
                    Try Now <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                </a>
              </div>
            ))}
          </div>
          </div>
</div>
{/* Testimonials */}
<div id="testimonials" className="py-24 bg-[#FAF6F1]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div 
      id="testimonials-header"
      data-animate
      className={`text-center mb-16 transform transition-all duration-1000 ${
        isVisible['testimonials-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <h2 className="text-3xl font-bold text-[#2C1810] sm:text-4xl mb-4">
        Trusted by Farmers Worldwide
      </h2>
      <p className="text-[#8B4513] text-xl">
        Hear from those who've transformed their farming practices
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      {testimonials.map((testimonial, index) => (
        <div 
          key={index}
          id={`testimonial-${index}`}
          data-animate
          className={`bg-white p-8 rounded-xl border border-[#E6B17E]/20 shadow-lg transform transition-all duration-500 delay-${
            index * 200
          } ${
            isVisible[`testimonial-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-[#5C4033] mb-6 text-lg italic">"{testimonial.content}"</p>
          <div className="flex items-center">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <div className="text-[#2C1810] font-semibold">{testimonial.name}</div>
              <div className="text-[#8B4513] text-sm">{testimonial.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

{/* CTA Section */}
<div className="bg-[#8B4513] py-16">
  <div 
    id="cta-section"
    data-animate
    className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transform transition-all duration-1000 ${
      isVisible['cta-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}
  >
    <h2 className="text-3xl font-bold text-white mb-4">
      Ready to Transform Your Farm?
    </h2>
    <p className="text-[#F3D5B5] mb-8 text-lg max-w-2xl mx-auto">
      Join thousands of farmers who are already benefiting from our smart farming solutions
    </p>
    <a href="/signup" className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-lg text-[#8B4513] bg-white hover:bg-[#F3D5B5] transform hover:scale-105 transition-all duration-300">
      Get Started Today
      <ArrowRight className="ml-2 h-5 w-5" />
    </a>
  </div>
</div>

{/* Footer */}
<footer className="bg-[#2C1810] text-[#F3D5B5]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Company Info */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Sprout className="h-6 w-6 text-[#E6B17E]" />
          <span className="text-xl font-bold text-[#E6B17E]">FarmSmart</span>
        </div>
        <p className="text-sm">
          Empowering farmers with smart solutions while preserving traditional wisdom.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-[#E6B17E] hover:text-[#F3D5B5] transition-colors duration-300">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-[#E6B17E] hover:text-[#F3D5B5] transition-colors duration-300">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-[#E6B17E] hover:text-[#F3D5B5] transition-colors duration-300">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-[#E6B17E] hover:text-[#F3D5B5] transition-colors duration-300">
            <Youtube size={20} />
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-[#E6B17E] font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">Features</a></li>
          <li><a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">Blog</a></li>
          <li><a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">Testimonials</a></li>
          <li><a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">Pricing</a></li>
          <li><a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">Contact</a></li>
        </ul>
      </div>

      {/* Services */}
      <div>
        <h3 className="text-[#E6B17E] font-semibold mb-4">Our Services</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">Farm Management</a></li>
          <li><a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">Crop Planning</a></li>
          <li><a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">Weather Forecasting</a></li>
          <li><a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">Resource Optimization</a></li>
          <li><a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">Market Integration</a></li>
          <li><a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">Support Center</a></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="text-[#E6B17E] font-semibold mb-4">Contact Us</h3>
        <ul className="space-y-4">
          <li className="flex items-center space-x-3">
            <MapPin size={20} className="text-[#E6B17E]" />
            <span>123 Farm Road, Agricultural District, Country</span>
          </li>
          <li className="flex items-center space-x-3">
            <Phone size={20} className="text-[#E6B17E]" />
            <span>+1 (555) 123-4567</span>
          </li>
          <li className="flex items-center space-x-3">
            <Mail size={20} className="text-[#E6B17E]" />
            <span>support@farmsmart.com</span>
          </li>
        </ul>
      </div>
    </div>

    {/* Newsletter */}
    <div className="border-t border-[#E6B17E]/20 mt-12 pt-8">
      <div className="max-w-md mx-auto text-center">
        <h3 className="text-[#E6B17E] font-semibold mb-4">Subscribe to Our Newsletter</h3>
        <p className="mb-4">Stay updated with the latest farming insights and tips</p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-lg bg-[#8B4513]/20 border border-[#E6B17E]/20 focus:outline-none focus:border-[#E6B17E]"
          />
          <button className="px-6 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#A0522D] transform hover:scale-105 transition-all duration-300">
            Subscribe
          </button>
        </div>
      </div>
    </div>

    {/* Bottom Footer */}
    <div className="border-t border-[#E6B17E]/20 mt-12 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-sm">
          © 2024 FarmSmart. All rights reserved.
        </div>
        <div className="flex space-x-6 text-sm">
          <a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">Terms of Service</a>
          <a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">Cookie Policy</a>
        </div>
      </div>
    </div>
  </div>
</footer>

<style jsx global>{`
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-float-delayed {
    animation: float 6s ease-in-out infinite;
    animation-delay: 2s;
  }

  .animate-fade-in {
    animation: fadeIn 1s ease-out;
  }
`}</style>
</div>
);
};

export default LandingPage;