import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Award, Target, Sprout, Globe, Clock, CheckCircle, ArrowRight,
  Leaf, Heart, Shield, TreePine, Book, Tractor, Cloud,  BarChart,
  HandHeart, Zap, Share2
} from 'lucide-react';

const AboutPage = () => {
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

  const stats = [
    { icon: Users, value: '50,000+', label: 'Farmers Helped', subtext: 'Across 6 continents' },
    { icon: Globe, value: '20+', label: 'Countries', subtext: 'Local support in each region' },
    { icon: Clock, value: '5+ Years', label: 'Experience', subtext: '24/7 customer service' },
    { icon: CheckCircle, value: '95%', label: 'Success Rate', subtext: 'In crop yield improvement' }
  ];

  const values = [
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Promoting environmentally conscious farming practices for a better tomorrow.',
      examples: ['Carbon footprint reduction', 'Water conservation', 'Soil health management']
    },
    {
      icon: Heart,
      title: 'Farmer First',
      description: 'Putting farmers needs and success at the center of everything we do.',
      examples: ['24/7 support', 'Local language assistance', 'Customized solutions']
    },
    {
      icon: Shield,
      title: 'Reliability',
      description: 'Providing dependable solutions and support when farmers need it most.',
      examples: ['99.9% uptime', 'Offline capabilities', 'Data backup systems']
    },
    {
      icon: TreePine,
      title: 'Innovation',
      description: 'Continuously evolving our technology to meet modern farming challenges.',
      examples: ['AI-powered insights', 'Satellite integration', 'IoT sensors']
    }
  ];

  const timeline = [
    {
      year: '2019',
      title: 'Foundation',
      description: 'FarmSmart was founded with a vision to revolutionize farming through technology.',
      achievements: [
        'Initial funding of $2M secured',
        'Core team of 10 agricultural experts formed',
        'First pilot program launched in India'
      ]
    },
    {
      year: '2020',
      title: 'First ML Models',
      description: 'Launched our first machine learning models for crop prediction and disease detection.',
      achievements: [
        'Developed proprietary crop disease detection algorithm',
        'Achieved 92% accuracy in yield prediction',
        'Partnership with 5 agricultural universities'
      ]
    },
    {
      year: '2021',
      title: 'Global Expansion',
      description: 'Expanded our services to 10+ countries, helping thousands of farmers.',
      achievements: [
        'Established offices in 5 continents',
        'Launched mobile app in 12 languages',
        'Reached 10,000 active users'
      ]
    },
    {
      year: '2022',
      title: 'AI Integration',
      description: 'Introduced advanced AI capabilities for precise farming recommendations.',
      achievements: [
        'Real-time crop monitoring system',
        'Weather prediction integration',
        'Smart irrigation management'
      ]
    },
    {
      year: '2023',
      title: 'Community Focus',
      description: 'Launched farmer community programs and educational initiatives.',
      achievements: [
        'Created online learning platform',
        'Established farmer support network',
        'Introduced sustainable farming certification'
      ]
    }
  ];

  const solutions = [
    {
      icon: Cloud,
      title: 'Weather Intelligence',
      description: 'Advanced forecasting and climate analysis for informed decision-making',
      features: ['7-day detailed forecast', 'Extreme weather alerts', 'Historical patterns']
    },
    {
      icon: Sprout,
      title: 'Crop Management',
      description: 'Complete lifecycle monitoring and optimization for maximum yield',
      features: ['Growth tracking', 'Disease detection', 'Nutrient management']
    },
    {
      icon: BarChart,
      title: 'Market Intelligence',
      description: 'Real-time market data and pricing trends for better selling decisions',
      features: ['Price predictions', 'Market demand analysis', 'Direct buyer connections']
    },
    {
      icon: Tractor,
      title: 'Equipment Optimization',
      description: 'Smart management of farming equipment and resources',
      features: ['Maintenance scheduling', 'Usage optimization', 'Cost tracking']
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      {/* Hero Section */}
      <div className="bg-[#2C1810] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="hero-content"
            data-animate
            className={`text-center transform transition-all duration-1000 ${
              isVisible['hero-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Empowering Farmers Through Technology
            </h1>
            <p className="text-xl text-[#E6B17E] max-w-3xl mx-auto mb-8">
              Our mission is to revolutionize agriculture by making smart farming technologies 
              accessible to farmers worldwide, promoting sustainable practices and improving yields.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-[#3D261C] px-4 py-2 rounded-full">🌱 Sustainable Farming</div>
              <div className="bg-[#3D261C] px-4 py-2 rounded-full">🤖 AI-Powered Insights</div>
              <div className="bg-[#3D261C] px-4 py-2 rounded-full">🌍 Global Community</div>
              <div className="bg-[#3D261C] px-4 py-2 rounded-full">📱 24/7 Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                id={`stat-${index}`}
                data-animate
                className={`text-center transform transition-all duration-500 delay-${
                  index * 200
                } ${
                  isVisible[`stat-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-[#8B4513]" />
                <div className="text-3xl font-bold text-[#2C1810] mb-2">{stat.value}</div>
                <div className="text-[#5C4033] mb-2">{stat.label}</div>
                <div className="text-sm text-[#8B4513]/70">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solutions Section */}
      <div className="py-24 bg-[#FAF6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="solutions-header"
            data-animate
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible['solutions-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl font-bold text-[#2C1810] mb-4">Our Solutions</h2>
            <p className="text-xl text-[#5C4033]">Comprehensive tools for modern farming</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution, index) => (
              <div
                key={solution.title}
                id={`solution-${index}`}
                data-animate
                className={`bg-white p-8 rounded-xl shadow-lg transform transition-all duration-500 delay-${
                  index * 200
                } ${
                  isVisible[`solution-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <solution.icon className="h-12 w-12 text-[#8B4513] mb-6" />
                <h3 className="text-xl font-semibold text-[#2C1810] mb-4">{solution.title}</h3>
                <p className="text-[#5C4033] mb-4">{solution.description}</p>
                <ul className="space-y-2 text-sm text-[#8B4513]">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="values-header"
            data-animate
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible['values-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl font-bold text-[#2C1810] mb-4">Our Values</h2>
            <p className="text-xl text-[#5C4033]">The principles that guide our mission and shape our service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                id={`value-${index}`}
                data-animate
                className={`bg-[#FAF6F1] p-8 rounded-xl shadow-lg transform transition-all duration-500 delay-${
                  index * 200
                } ${
                  isVisible[`value-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <value.icon className="h-12 w-12 text-[#8B4513] mb-6" />
                <h3 className="text-xl font-semibold text-[#2C1810] mb-4">{value.title}</h3>
                <p className="text-[#5C4033] mb-4">{value.description}</p>
                <ul className="space-y-2 text-sm text-[#8B4513]">
                  {value.examples.map((example, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-24 bg-[#2C1810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="timeline-header"
            data-animate
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible['timeline-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-xl text-[#E6B17E]">From inception to innovation</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#E6B17E]/20" />

            {timeline.map((event, index) => (
              <div
                key={event.year}
                id={`timeline-${index}`}
                data-animate
                className={`relative flex items-center justify-center mb-16 transform transition-all duration-500 delay-${
                  index * 200
                } ${
                  isVisible[`timeline-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className={`w-1/2 pr-8 text-right ${index % 2 === 0 ? 'md:block' : 'md:hidden'}`}>
                  <div className="text-[#E6B17E] font-bold mb-2">{event.year}</div>
                  <h3 className="text-white font-semibold mb-2">{event.title}</h3>
                  <p className="text-[#F3D5B5] mb-4">{event.description}</p>
                  <ul className="space-y-2 text-sm text-[#E6B17E]/80">
                    {event.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-center justify-end">
                        {achievement}
                        <CheckCircle className="h-4 w-4 ml-2" />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#E6B17E] rounded-full" />
                <div className={`w-1/2 pl-8 ${index % 2 === 0 ? 'md:hidden' : 'md:block'}`}>
                  <div className="text-[#E6B17E] font-bold mb-2">{event.year}</div>
                  <h3 className="text-white font-semibold mb-2">{event.title}</h3>
                  <p className="text-[#F3D5B5] mb-4">{event.description}</p>
                  <ul className="space-y-2 text-sm text-[#E6B17E]/80">
                    {event.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            id="impact-header"
            data-animate
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible['impact-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl font-bold text-[#2C1810] mb-4">Our Impact</h2>
            <p className="text-xl text-[#5C4033]">Making a difference in agricultural communities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: HandHeart,
                title: 'Community Support',
                stats: [
                  { value: '100+', label: 'Local workshops conducted' },
                  { value: '5,000+', label: 'Farmers trained' },
                  { value: '20+', label: 'Community partnerships' }
                ]
              },
              {
                icon: Zap,
                title: 'Efficiency Gains',
                stats: [
                  { value: '35%', label: 'Average yield increase' },
                  { value: '40%', label: 'Water usage reduction' },
                  { value: '25%', label: 'Cost reduction' }
                ]
              },
              {
                icon: Share2,
                title: 'Knowledge Sharing',
                stats: [
                  { value: '1,000+', label: 'Best practices documented' },
                  { value: '12', label: 'Languages supported' },
                  { value: '50+', label: 'Expert consultants' }
                ]
              }
            ].map((section, index) => (
              <div
                key={section.title}
                id={`impact-${index}`}
                data-animate
                className={`bg-[#FAF6F1] p-8 rounded-xl shadow-lg transform transition-all duration-500 delay-${
                  index * 200
                } ${
                  isVisible[`impact-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <section.icon className="h-12 w-12 text-[#8B4513] mb-6" />
                <h3 className="text-xl font-semibold text-[#2C1810] mb-6">{section.title}</h3>
                <div className="space-y-4">
                  {section.stats.map((stat, i) => (
                    <div key={i} className="border-l-4 border-[#8B4513] pl-4">
                      <div className="text-2xl font-bold text-[#2C1810]">{stat.value}</div>
                      <div className="text-[#5C4033]">{stat.label}</div>
                    </div>
                  ))}
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
            Ready to Transform Your Farming?
          </h2>
          <p className="text-[#F3D5B5] mb-8 text-lg max-w-2xl mx-auto">
            Join thousands of farmers who are already using FarmSmart to improve their yields 
            and make data-driven decisions. Get started with a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-lg text-[#8B4513] bg-white hover:bg-[#F3D5B5] transform hover:scale-105 transition-all duration-300"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/contact" 
              className="inline-flex items-center px-8 py-3 border-2 border-white text-lg font-medium rounded-lg text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
            >
              Schedule a Demo
              <Book className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;