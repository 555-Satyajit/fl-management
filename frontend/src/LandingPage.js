import React, { useState, useEffect,useRef  } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import translations from './translations';

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
  Bug,
  Globe
} from 'lucide-react';



const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const [currentLang, setCurrentLang] = useState('en');
  const isLanguageChange = useRef(false);

  // Get translations for current language
  const t = translations[currentLang];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Only update visibility if it's not a language change
          if (!isLanguageChange.current) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: entry.isIntersecting
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all animated elements
    document.querySelectorAll('[data-animate]').forEach((element) => {
      observer.observe(element);
    });

    // Reset language change flag after elements are observed
    isLanguageChange.current = false;

    return () => observer.disconnect();
  }, [currentLang]);

  // Language toggle component
  const LanguageToggle = () => (
    <div className="flex items-center bg-[#8B4513]/20 px-3 py-2 rounded-lg border border-[#E6B17E]/30 hover:bg-[#8B4513]/30 transition-all duration-300">
      <Globe className="h-5 w-5 text-[#E6B17E] mr-2" />
      <select
        value={currentLang}
        onChange={(e) => {
          isLanguageChange.current = true;
          setCurrentLang(e.target.value);
        }}
        className="bg-transparent text-[#E6B17E] font-medium border-none focus:outline-none cursor-pointer hover:text-[#F3D5B5] transition-colors duration-300 appearance-none pr-6"
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23E6B17E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right center',
          backgroundSize: '16px'
        }}
      >
        <option value="en" className="bg-[#2C1810] text-[#E6B17E]">English</option>
        <option value="or" className="bg-[#2C1810] text-[#E6B17E]">ଓଡ଼ିଆ</option>
      </select>
    </div>
  );
  

  // Features section component rendering
  const renderFeatureSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <div 
          key={feature.title}
          id={`feature-${index}`}
          data-animate 
          className={`bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transform transition-all duration-500 hover:-translate-y-1 ${
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
  );

  const features = [
    {
      title: t.features.smartFarm.title,
      description: t.features.smartFarm.description,
      icon: Sprout
    },
    {
      title: t.features.analytics.title,
      description: t.features.analytics.description,
      icon: BarChart3
    },
    {
      title: t.features.weather.title,
      description: t.features.weather.description,
      icon: CloudRain
    },
    {
      title: t.features.resource.title,
      description: t.features.resource.description,
      icon: Settings
    }
  ];

  // Define mlTools array
  const mlTools = [
    {
      title: t.mlTools.water.title,
      description: t.mlTools.water.description,
      icon: Droplets,
      link: '/water-prediction'
    },
    {
      title: t.mlTools.yield.title,
      description: t.mlTools.yield.description,
      icon: Sprout,
      link: 'https://huggingface.co/spaces/Satya-555/crop-predictor'
    },
    {
      title: t.mlTools.disease.title,
      description: t.mlTools.disease.description,
      icon: Bug,
      link: '/disease-detection'
    }
  ];


  const testimonials = [
    {
      name: t.testimonials.farmer1.name,
      role: t.testimonials.farmer1.role,
      content: t.testimonials.farmer1.content,
      image: "/api/placeholder/100/100"
    },
    {
      name: t.testimonials.farmer2.name,
      role: t.testimonials.farmer2.role,
      content: t.testimonials.farmer2.content,
      image: "/api/placeholder/100/100"
    }
  ];

  
  // ML Tools section component rendering
  const renderMLToolsSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {mlTools.map((tool, index) => (
        <div
          key={tool.title}
          id={`ml-tool-${index}`}
          data-animate
          className={`bg-white rounded-xl p-8 shadow-lg transform transition-all duration-500 hover:scale-105 ${
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
  );


  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      <LoadingSpinner />
      {/* Navigation */}
      <nav className="sticky top-0 bg-[#2C1810]/95 backdrop-blur-md shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Sprout className="h-8 w-8 text-[#E6B17E]" />
              <span className="text-2xl font-bold text-[#E6B17E] ml-2">FarmSmart</span>
            </div>
  
            {/* Center Navigation */}
            <div className="hidden md:flex items-center justify-center flex-grow">
              <div className="flex space-x-12">
                <a href="#features" className="text-[#E6B17E] hover:text-[#F3D5B5] transition-colors duration-300">{t.nav.features}</a>
                <a href="#ml-tools" className="text-[#E6B17E] hover:text-[#F3D5B5]">{t.nav.mlTools}</a>
                <a href="#testimonials" className="text-[#E6B17E] hover:text-[#F3D5B5] transition-colors duration-300">{t.nav.testimonials}</a>
                <a href="#about" className="text-[#E6B17E] hover:text-[#F3D5B5] transition-colors duration-300">{t.nav.about}</a>
                <a href="/login" className="text-[#E6B17E] hover:text-[#F3D5B5] transition-colors duration-300">{t.nav.login}</a>
              </div>
            </div>
  
            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <LanguageToggle />
              <a href="/register" className="bg-[#8B4513] text-white px-6 py-2 rounded-lg hover:bg-[#A0522D] transition-colors duration-300 shadow-lg">
                {t.nav.getStarted}
              </a>
            </div>
  
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                className="text-[#E6B17E] hover:text-[#F3D5B5] transition-colors duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
  
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-[#2C1810] border-t border-[#E6B17E]/20">
              <div className="px-2 pt-2 pb-3 space-y-3">
                <a href="#features" className="block px-3 py-2 text-[#E6B17E] hover:text-[#F3D5B5]">{t.nav.features}</a>
                <a href="#ml-tools" className="block px-3 py-2 text-[#E6B17E] hover:text-[#F3D5B5]">{t.nav.mlTools}</a>
                <a href="#testimonials" className="block px-3 py-2 text-[#E6B17E] hover:text-[#F3D5B5]">{t.nav.testimonials}</a>
                <a href="#about" className="block px-3 py-2 text-[#E6B17E] hover:text-[#F3D5B5]">{t.nav.about}</a>
                <Link to="/login" className="block px-3 py-2 text-[#E6B17E] hover:text-[#F3D5B5]">{t.nav.login}</Link>
                <div className="px-3 py-2">
                  <LanguageToggle 
                    currentLang={currentLang}
                    setCurrentLang={setCurrentLang}
                    isLanguageChange={isLanguageChange}
                  />
                </div>
                <a href="/register" className="block px-3 py-2 text-[#E6B17E] font-medium">{t.nav.getStarted}</a>
              </div>
            </div>
          )}
        </div>
      </nav>
      
  


      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#2C1810] text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Wheat className="absolute top-20 right-0 text-[#8B4513]/20 h-96 w-96 animate-float" />
          <Tractor className="absolute bottom-0 left-0 text-[#8B4513]/20 h-72 w-72 animate-float-delayed" />
        </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 animate-title">
              {t.heroTitle}
              <span className="block text-[#E6B17E] mt-2 animate-title-delayed">{t.heroTitleSpan}</span>
            </h1>
            <p className="text-xl text-[#F3D5B5] mb-12 max-w-2xl mx-auto animate-paragraph">
              {t.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-buttons">
              <a href="/register" className="inline-block bg-[#8B4513] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#A0522D] transform hover:scale-105 transition-all duration-300 shadow-lg">
                {t.startJourney}
              </a>
              <a href="#features" className="inline-block bg-[#E6B17E]/10 text-[#E6B17E] border border-[#E6B17E] px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#E6B17E]/20 transform hover:scale-105 transition-all duration-300">
                {t.learnMore}
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
              <div className="text-sm opacity-80">{t.activeFarmers}</div>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 mb-2" />
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm opacity-80">{t.secureData}</div>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 mb-2" />
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm opacity-80">{t.support}</div>
            </div>
            <div className="flex flex-col items-center">
              <Sprout className="h-8 w-8 mb-2" />
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-sm opacity-80">{t.acresManaged}</div>
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
            {t.featuresTitle}
            </h2>
            <p className="text-xl text-[#5C4033] max-w-2xl mx-auto">
              {t.featuresSubtitle}
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
            {t.mlToolsTitle}
            </h2>
            <p className="text-xl text-[#E6B17E] max-w-2xl mx-auto">
              {t.mlToolsSubtitle}
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
        {t.testimonialsTitle}
      </h2>
      <p className="text-[#8B4513] text-xl">
       {t.testimonialsSubtitle}
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
      {t.ctaTitle}
    </h2>
    <p className="text-[#F3D5B5] mb-8 text-lg max-w-2xl mx-auto">
     {t.ctaDescription}
    </p>
    <a href="/signup" className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-lg text-[#8B4513] bg-white hover:bg-[#F3D5B5] transform hover:scale-105 transition-all duration-300">
      {t.ctaButton}
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
        {t.footer.companyDesc}
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
        <h3 className="text-[#E6B17E] font-semibold mb-4">{t.footer.quickLinks}</h3>
        <ul className="space-y-2">
  <li><a href="#" className="hover:text-[#E6B17E]">{t.footer.quickLinksItems.features}</a></li>
          <li><a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">{t.footer.quickLinksItems.blog}</a></li>
          <li><a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">{t.footer.quickLinksItems.testimonials}</a></li>
          <li><a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">{t.footer.quickLinksItems.pricing}</a></li>
          <li><a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">{t.footer.quickLinksItems.contact}</a></li>
        </ul>
      </div>

      {/* Services */}
      <div>
        <h3 className="text-[#E6B17E] font-semibold mb-4">{t.footer.services.title}</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">{t.footer.services.items.management}</a></li>
          <li><a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">{t.footer.services.items.planning}</a></li>
          <li><a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">{t.footer.services.items.weather}</a></li>
          <li><a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">{t.footer.services.items.optimization}</a></li>
          <li><a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">{t.footer.services.items.market}</a></li>
          <li><a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">{t.footer.services.items.support}</a></li>
        </ul>
      </div>

      {/* Contact Info */}
            <div>
             <h3 className="text-[#E6B17E] font-semibold mb-4">{t.footer.contact.title}</h3>
              <ul className="space-y-4">
               <li className="flex items-center space-x-3">
              <MapPin size={20} className="text-[#E6B17E] flex-shrink-0" />
               <span className="leading-relaxed">
                  {t.footer.contact.address}
                    </span>
                  </li>
                      <li className="flex items-center space-x-3">
                        <Phone size={20} className="text-[#E6B17E] flex-shrink-0" />
                        <span>+1 (555) 123-4567</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <Mail size={20} className="text-[#E6B17E] flex-shrink-0" />
                        <span>support@farmsmart.com</span>
                      </li>
                    </ul>
                  </div>
                </div>

    {/* Newsletter */}
    <div className="border-t border-[#E6B17E]/20 mt-12 pt-8">
      <div className="max-w-md mx-auto text-center">
        <h3 className="text-[#E6B17E] font-semibold mb-4">{t.footer.newsletter.title}</h3>
        <p className="mb-4">{t.footer.newsletter.description}</p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder={t.footer.newsletter.placeholder}
            className="flex-1 px-4 py-2 rounded-lg bg-[#8B4513]/20 border border-[#E6B17E]/20 focus:outline-none focus:border-[#E6B17E]"
          />
          <button className="px-6 py-2 bg-[#8B4513] text-white rounded-lg hover:bg-[#A0522D] transform hover:scale-105 transition-all duration-300">
          {t.footer.newsletter.button}
          </button>
        </div>
      </div>
    </div>

    {/* Bottom Footer */}
    <div className="border-t border-[#E6B17E]/20 mt-12 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-sm">
        {t.footer.legal.copyright}
        </div>
        <div className="flex space-x-6 text-sm">
          <a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">{t.footer.legal.privacy}</a>
          <a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">{t.footer.legal.terms}</a>
          <a href="#" className="hover:text-[#E6B17E] transition-colors duration-300">{t.footer.legal.cookies}</a>
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

  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(30px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
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

  .animate-title {
    animation: slideUp 1s ease-out forwards;
    opacity: 0;
  }

  .animate-title-delayed {
    animation: slideUp 1s ease-out 0.3s forwards;
    opacity: 0;
  }

  .animate-paragraph {
    animation: slideUp 1s ease-out 0.6s forwards;
    opacity: 0;
  }

  .animate-buttons {
    animation: slideUp 1s ease-out 0.9s forwards;
    opacity: 0;
  }
`}</style>
</div>
);
};

export default LandingPage;