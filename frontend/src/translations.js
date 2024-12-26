// translations.js
import React, { useState, useEffect } from 'react';
const translations = {
    en: {
      // Navigation
	nav: {
      features: "Features",
      mlTools: "ML Tools",
      testimonials: "Testimonials",
      about: "About",
      login: "Login",
      getStarted: "Get Started",
},
      
      // Hero Section
      heroTitle: "Cultivating Tomorrow,",
      heroTitleSpan: "Honoring Today",
      heroDescription: "Where traditional farming wisdom meets modern innovation. Experience the perfect balance of time-tested practices and cutting-edge technology.",
      startJourney: "Start Your Journey",
      learnMore: "Learn More",
      
      // Trust Indicators
      activeFarmers: "Active Farmers",
      secureData: "Secure Data",
      support: "Support",
      acresManaged: "Acres Managed",
      count: {
        farmers: "10,000+",
        security: "100%",
        support: "24/7",
        acres: "50K+"
      },
      
      // Features Section
      featuresTitle: "Traditional Wisdom, Modern Solutions",
      featuresSubtitle: "Bridging generations of farming knowledge with innovative technology",
      
      // Feature items
      features: {
        smartFarm: {
          title: "Smart Farm Management",
          description: "Blend traditional farming wisdom with modern technology. Track crops, resources, and performance all in one place."
        },
        analytics: {
          title: "Advanced Analytics",
          description: "Make data-driven decisions while respecting time-tested farming practices."
        },
        weather: {
          title: "Weather Integration",
          description: "Combine traditional weather wisdom with modern forecasting technology."
        },
        resource: {
          title: "Resource Optimization",
          description: "Balance traditional conservation methods with AI-powered recommendations."
        }
      },
      
      // ML Tools Section
      mlToolsTitle: "Smart Farming Tools",
      mlToolsSubtitle: "Harness the power of artificial intelligence to optimize your farming operations",
      
      // ML Tool items
      mlTools: {
        water: {
          title: "Water Usage Prediction",
          description: "Optimize your water resources with AI-powered predictions based on crop type, season, and environmental factors."
        },
        yield: {
          title: "Crop Yield Prediction",
          description: "Get accurate yield forecasts using advanced machine learning models that consider multiple agricultural variables."
        },
        disease: {
          title: "Disease Detection",
          description: "Early detection of crop diseases using computer vision and AI to protect your harvest."
        }
      },
      tryNow: "Try Now",
      
      // Testimonials Section
      testimonialsTitle: "Trusted by Farmers Worldwide",
      testimonialsSubtitle: "Hear from those who've transformed their farming practices",
      testimonials: {
        farmer1: {
          name: "John Smith",
          role: "Third Generation Farmer",
          content: "FarmSmart helped us maintain our traditional practices while improving efficiency by 40%."
        },
        farmer2: {
          name: "Sarah Johnson",
          role: "Agricultural Specialist",
          content: "The perfect blend of old-school farming wisdom and modern technology."
        }
      },
      
      // CTA Section
      ctaTitle: "Ready to Transform Your Farm?",
      ctaDescription: "Join thousands of farmers who are already benefiting from our smart farming solutions",
      ctaButton: "Get Started Today",
      
      // Footer
      footer: {
        companyDesc: "Empowering farmers with smart solutions while preserving traditional wisdom.",
        quickLinks: "Quick Links",
        quickLinksItems: {
          features: "Features",
          blog: "Blog",
          testimonials: "Testimonials",
          pricing: "Pricing",
          contact: "Contact"
        },
        services: {
          title: "Our Services",
          items: {
            management: "Farm Management",
            planning: "Crop Planning",
            weather: "Weather Forecasting",
            optimization: "Resource Optimization",
            market: "Market Integration",
            support: "Support Center"
          }
        },
        contact: {
          title: "Contact Us",
          address: "123 Farm Road, Agricultural",
          phone: "+1 (555) 123-4567",
          email: "support@farmsmart.com"
        },
        newsletter: {
          title: "Subscribe to Our Newsletter",
          description: "Stay updated with the latest farming insights and tips",
          placeholder: "Enter your email",
          button: "Subscribe"
        },
        legal: {
          copyright: "© 2024 FarmSmart. All rights reserved.",
          privacy: "Privacy Policy",
          terms: "Terms of Service",
          cookies: "Cookie Policy"
        }
      }
    },
    or: {
      // Navigation
	nav: {
      features: "ବୈଶିଷ୍ଟ୍ୟ",
      mlTools: "ଏମଏଲ ଟୁଲ୍ସ",
      testimonials: "ପ୍ରଶଂସାପତ୍ର",
      about: "ବିଷୟରେ",
      login: "ଲଗଇନ୍",
      getStarted: "ଆରମ୍ଭ କରନ୍ତୁ",
},
      
      // Hero Section
      heroTitle: "ଆସନ୍ତାକାଲି ଚାଷ କରିବା,",
      heroTitleSpan: "ଆଜିର ସମ୍ମାନ",
      heroDescription: "ପାରମ୍ପରିକ ଚାଷ ଜ୍ଞାନ ଆଧୁନିକ ନବୀକରଣ ସହ ମିଶ୍ରିତ। ପରୀକ୍ଷିତ ଅଭ୍ୟାସ ଏବଂ ଅତ୍ୟାଧୁନିକ ପ୍ରଯୁକ୍ତିର ସଠିକ୍ ସନ୍ତୁଳନ ଅନୁଭବ କରନ୍ତୁ।",
      startJourney: "ଆପଣଙ୍କର ଯାତ୍ରା ଆରମ୍ଭ କରନ୍ତୁ",
      learnMore: "ଅଧିକ ଜାଣନ୍ତୁ",
      
      // Trust Indicators
      activeFarmers: "ସକ୍ରିୟ ଚାଷୀ",
      secureData: "ସୁରକ୍ଷିତ ତଥ୍ୟ",
      support: "ସହାୟତା",
      acresManaged: "ପରିଚାଳିତ ଏକର",
      count: {
        farmers: "୧୦,୦୦୦+",
        security: "୧୦୦%",
        support: "୨୪/୭",
        acres: "୫୦କେ+"
      },
      
      // Features Section
      featuresTitle: "ପାରମ୍ପରିକ ଜ୍ଞାନ, ଆଧୁନିକ ସମାଧାନ",
      featuresSubtitle: "ଚାଷ ଜ୍ଞାନର ପିଢ଼ି ସହିତ ନବୀନ ପ୍ରଯୁକ୍ତିର ସେତୁ",
      
      // Feature items
      features: {
        smartFarm: {
          title: "ସ୍ମାର୍ଟ ଫାର୍ମ ପରିଚାଳନା",
          description: "ପାରମ୍ପରିକ ଚାଷ ଜ୍ଞାନକୁ ଆଧୁନିକ ପ୍ରଯୁକ୍ତି ସହ ମିଶ୍ରଣ କରନ୍ତୁ। ଫସଲ, ସମ୍ବଳ ଏବଂ କାର୍ଯ୍ୟଦକ୍ଷତାକୁ ଗୋଟିଏ ସ୍ଥାନରେ ଟ୍ରାକ୍ କରନ୍ତୁ।"
        },
        analytics: {
          title: "ଉନ୍ନତ ବିଶ୍ଲେଷଣ",
          description: "ପରୀକ୍ଷିତ ଚାଷ ପଦ୍ଧତିକୁ ସମ୍ମାନ କରିବା ସହିତ ତଥ୍ୟ-ଆଧାରିତ ନିଷ୍ପତ୍ତି ନିଅନ୍ତୁ।"
        },
        weather: {
          title: "ପାଗ ଏକୀକରଣ",
          description: "ପାରମ୍ପରିକ ପାଗ ଜ୍ଞାନକୁ ଆଧୁନିକ ପାଗ ପୂର୍ବାନୁମାନ ପ୍ରଯୁକ୍ତି ସହ ମିଶ୍ରଣ କରନ୍ତୁ।"
        },
        resource: {
          title: "ସମ୍ବଳ ଅନୁକୂଳନ",
          description: "ପାରମ୍ପରିକ ସଂରକ୍ଷଣ ପଦ୍ଧତି ସହ AI-ଶକ୍ତି ପ୍ରାପ୍ତ ସୁପାରିଶଗୁଡ଼ିକର ସନ୍ତୁଳନ।"
        }
      },
      
      // ML Tools Section
      mlToolsTitle: "ସ୍ମାର୍ଟ ଚାଷ ଉପକରଣ",
      mlToolsSubtitle: "ଆପଣଙ୍କର ଚାଷ କାର୍ଯ୍ୟକୁ ଅନୁକୂଳ କରିବା ପାଇଁ କୃତ୍ରିମ ବୁଦ୍ଧିମତ୍ତାର ଶକ୍ତି ବ୍ୟବହାର କରନ୍ତୁ",
      
      // ML Tool items
      mlTools: {
        water: {
          title: "ଜଳ ବ୍ୟବହାର ପୂର୍ବାନୁମାନ",
          description: "ଫସଲ ପ୍ରକାର, ଋତୁ ଏବଂ ପରିବେଶ କାରକ ଆଧାରରେ AI-ଶକ୍ତି ପ୍ରାପ୍ତ ପୂର୍ବାନୁମାନ ସହିତ ଆପଣଙ୍କର ଜଳ ସମ୍ବଳକୁ ଅନୁକୂଳ କରନ୍ତୁ।"
        },
        yield: {
          title: "ଫସଲ ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ",
          description: "ବହୁବିଧ କୃଷି ଭେରିଏବଲ୍ ବିଚାର କରୁଥିବା ଉନ୍ନତ ମେସିନ୍ ଲର୍ନିଂ ମଡେଲ୍ ବ୍ୟବହାର କରି ସଠିକ୍ ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ ପାଆନ୍ତୁ।"
        },
        disease: {
          title: "ରୋଗ ଚିହ୍ନଟ",
          description: "ଆପଣଙ୍କର ଫସଲକୁ ସୁରକ୍ଷିତ ରଖିବା ପାଇଁ କମ୍ପ୍ୟୁଟର ଭିଜନ ଏବଂ AI ବ୍ୟବହାର କରି ଫସଲ ରୋଗର ଆଗୁଆ ଚିହ୍ନଟ।"
        }
      },
      tryNow: "ବର୍ତ୍ତମାନ ଚେଷ୍ଟା କରନ୍ତୁ",
      
      // Testimonials Section
      testimonialsTitle: "ବିଶ୍ୱବ୍ୟାପୀ ଚାଷୀଙ୍କ ଦ୍ୱାରା ବିଶ୍ୱସ୍ତ",
      testimonialsSubtitle: "ସେମାନଙ୍କର ଚାଷ ପଦ୍ଧତିକୁ ପରିବର୍ତ୍ତନ କରିଥିବା ଲୋକଙ୍କଠାରୁ ଶୁଣନ୍ତୁ",
      testimonials: {
        farmer1: {
          name: "ଜନ୍ ସ୍ମିଥ୍",
          role: "ତୃତୀୟ ପିଢ଼ି ଚାଷୀ",
          content: "ଫାର୍ମସ୍ମାର୍ଟ ଆମକୁ ଆମର ପାରମ୍ପରିକ ଅଭ୍ୟାସକୁ ବଜାୟ ରଖିବା ସହିତ ଦକ୍ଷତାକୁ ୪୦% ବୃଦ୍ଧି କରିବାରେ ସାହାଯ୍ୟ କଲା।"
        },
        farmer2: {
          name: "ସାରା ଜନସନ",
          role: "କୃଷି ବିଶେଷଜ୍ଞ",
          content: "ପୁରୁଣା ଚାଷ ଜ୍ଞାନ ଏବଂ ଆଧୁନିକ ପ୍ରଯୁକ୍ତିର ସଠିକ୍ ମିଶ୍ରଣ।"
        }
      },
      
      // CTA Section
      ctaTitle: "ଆପଣଙ୍କର ଫାର୍ମକୁ ପରିବର୍ତ୍ତନ କରିବାକୁ ପ୍ରସ୍ତୁତ?",
      ctaDescription: "ହଜାର ହଜାର ଚାଷୀଙ୍କ ସହ ଯୋଗ ଦିଅନ୍ତୁ ଯେଉଁମାନେ ଆମର ସ୍ମାର୍ଟ ଚାଷ ସମାଧାନରୁ ଲାଭାନ୍ୱିତ ହେଉଛନ୍ତି",
      ctaButton: "ଆଜି ଆରମ୍ଭ କରନ୍ତୁ",
      
      // Footer
      footer: {
        companyDesc: "ପାରମ୍ପରିକ ଜ୍ଞାନକୁ ସଂରକ୍ଷଣ କରିବା ସହିତ ଚାଷୀମାନଙ୍କୁ ସ୍ମାର୍ଟ ସମାଧାନ ସହ ସଶକ୍ତ କରୁଛୁ।",
        quickLinks: "ଦ୍ରୁତ ଲିଙ୍କ",
        quickLinksItems: {
          features: "ବୈଶିଷ୍ଟ୍ୟ",
          blog: "ବ୍ଲଗ",
          testimonials: "ପ୍ରଶଂସାପତ୍ର",
          pricing: "ମୂଲ୍ୟ",
          contact: "ଯୋଗାଯୋଗ"
        },
        services: {
          title: "ଆମର ସେବା",
          items: {
            management: "ଫାର୍ମ ପରିଚାଳନା",
            planning: "ଫସଲ ଯୋଜନା",
            weather: "ପାଗ ପୂର୍ବାନୁମାନ",
            optimization: "ସମ୍ବଳ ଅନୁକୂଳନ",
            market: "ବଜାର ଏକୀକରଣ",
            support: "ସହାୟତା କେନ୍ଦ୍ର"
          }
        },
        contact: {
          title: "ଯୋଗାଯୋଗ କରନ୍ତୁ",
          address: "୧୨୩ ଫାର୍ମ ରୋଡ, ଏଗ୍ରିକଲଚରାଲ",
          phone: "+୧ (୫୫୫) ୧୨୩-୪୫୬୭",
          email: "support@farmsmart.com"
        },
        newsletter: {
          title: "ଆମର ନ୍ୟୁଜଲେଟରରେ ସଦସ୍ୟତା ନିଅନ୍ତୁ",
          description: "ନବୀନତମ ଚାଷ ଅନ୍ତର୍ଦୃଷ୍ଟି ଏବଂ ପରାମର୍ଶ ସହ ଅପଡେଟ ରୁହନ୍ତୁ",
          placeholder: "ଆପଣଙ୍କର ଇମେଲ୍ ପ୍ରବେଶ କରନ୍ତୁ",
          button: "ସଦସ୍ୟତା ନିଅନ୍ତୁ"
        },
        legal: {
          copyright: "© ୨୦୨୪ ଫାର୍ମସ୍ମାର୍ଟ। ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ।",
          privacy: "ଗୋପନୀୟତା ନୀତି",
          terms: "ସେବା ସର୍ତ୍ତାବଳୀ",
          cookies: "କୁକି ନୀତି"
        }
      }
    }
  };

  export default translations;
