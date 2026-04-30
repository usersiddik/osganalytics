import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Microscope, 
  Activity, 
  Stethoscope,
  Target,
  Rocket,
  Map as MapIcon,
  BrainCircuit,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Lightbulb,
  TrendingUp,
  Database,
  Menu,
  X,
  Search
} from 'lucide-react';

// --- FONTS & CSS INJECTION ---
const FontStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600&family=Poppins:wght@600;700;800&display=swap');
    
    .font-poppins { font-family: 'Poppins', sans-serif; }
    .font-barlow { font-family: 'Barlow', sans-serif; }
  `}} />
);

// --- SCROLL ANIMATION HOOK ---
const useIntersectionObserver = (options = { threshold: 0.1, triggerOnce: true }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        if (options.triggerOnce) observer.disconnect();
      } else if (!options.triggerOnce) {
        setIsIntersecting(false);
      }
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options.triggerOnce, options.threshold]);

  return [ref, isIntersecting];
};

const FadeInUp = ({ children, delay = '0ms', className = '' }) => {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
};

// --- CUSTOM GRADIENT BUTTON COMPONENT ---
// Re-styled to feature a refined 1.5px border and a sleek 4px border radius
const GradientButton = ({ href, children, darkBg = false, onClick, className = '' }) => {
  const innerBgClass = darkBg ? 'bg-[#340a54]' : 'bg-white';
  const textColorClass = darkBg ? 'text-white' : 'text-[#1a1a1a] group-hover:text-white';
  const Component = href ? 'a' : 'button';
  
  return (
    <Component 
      href={href} 
      onClick={onClick}
      className={`group relative inline-flex p-[1.5px] rounded-[4px] bg-gradient-to-r from-[#02ce6b] to-[#058ae5] shadow-sm hover:shadow-lg hover:shadow-[#058ae5]/20 transition-all duration-300 ${className}`}
    >
      <span className={`flex items-center justify-center gap-2 px-8 py-3.5 w-full h-full rounded-[3px] transition-all duration-300 font-poppins font-bold text-[16px] ${innerBgClass} ${textColorClass} group-hover:bg-transparent group-hover:text-white`}>
        {children}
      </span>
    </Component>
  );
};

export default function App() {
  const [activeFilter, setActiveFilter] = useState('All Insights');
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // Nav scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero Slider Data (Mapped exactly to DOC Bullets)
  const heroBullets = [
    { text: "Customer, market, and behavioral analytics tied directly to business decisions", img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80" },
    { text: "Deep experience across pharma, medtech, and healthcare organizations", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80" },
    { text: "Secure workflows for sensitive commercial and healthcare data", img: "https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?auto=format&fit=crop&w=1200&q=80" },
    { text: "Dashboards, models, and insights built for leadership teams", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" }
  ];

  // Auto-play for Hero Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroBullets.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroBullets.length]);

  return (
    <div className="bg-white text-[#1a1a1a] font-barlow selection:bg-[#058ae5] selection:text-white w-full min-h-screen overflow-clip">
      <FontStyles />
      
      {/* NAVBAR */}
      <nav className={`fixed top-0 z-50 w-full h-20 border-b transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-[#e5e5e8] shadow-sm' : 'bg-white border-transparent'}`}>
        <div className="px-5 md:px-10 lg:px-20 w-full h-full flex items-center">
          <div className="max-w-[1200px] mx-auto w-full flex justify-between items-center">
            
            <a href="/" className="flex items-center hover:opacity-80 transition-opacity shrink-0">
              <img 
                src="https://osganalytics.com/wp-content/uploads/2021/09/Logo.svg" 
                alt="OSG Analytics" 
                className="h-10 object-contain"
                onError={(e) => {
                  // Flawless SVG replica of the uploaded OSG logo for fallback
                  e.target.onerror = null; 
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='40' viewBox='0 0 140 40'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='100%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%23058ae5' /%3E%3Cstop offset='100%25' stop-color='%2302ce6b' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ctext x='0' y='34' font-family='sans-serif' font-weight='900' font-size='42' fill='%23340a54' letter-spacing='-1'%3EOS%3C/text%3E%3Ctext x='64' y='34' font-family='sans-serif' font-weight='900' font-size='42' fill='%23340a54' letter-spacing='-1'%3EC%3C/text%3E%3Cpath d='M96 23 L118 12 L124 23 L106 35 Z' fill='url(%23grad)'/%3E%3C/svg%3E";
                }}
              />
            </a>
            
            <div className="hidden lg:flex space-x-8 text-[16px] font-medium text-[#1a1a1a]">
              <a href="#industries" className="hover:text-[#058ae5] transition-colors">Industries</a>
              <a href="#services" className="hover:text-[#058ae5] transition-colors">Capabilities</a>
              <a href="#outcomes" className="hover:text-[#058ae5] transition-colors">Work</a>
              <a href="#process" className="hover:text-[#058ae5] transition-colors">Process</a>
              <a href="#insights" className="hover:text-[#058ae5] transition-colors">Insights</a>
              <a href="#about" className="hover:text-[#058ae5] transition-colors">About</a>
            </div>
            
            <GradientButton href="#contact" className="hidden lg:inline-flex">
              Talk to Our Team
            </GradientButton>

            <button className="lg:hidden text-[#1a1a1a]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-[#e5e5e8] shadow-lg flex flex-col p-6 gap-5">
            <a href="#industries" onClick={() => setIsMobileMenuOpen(false)} className="text-[18px] font-medium text-[#1a1a1a] hover:text-[#058ae5]">Industries</a>
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-[18px] font-medium text-[#1a1a1a] hover:text-[#058ae5]">Capabilities</a>
            <a href="#outcomes" onClick={() => setIsMobileMenuOpen(false)} className="text-[18px] font-medium text-[#1a1a1a] hover:text-[#058ae5]">Work</a>
            <a href="#process" onClick={() => setIsMobileMenuOpen(false)} className="text-[18px] font-medium text-[#1a1a1a] hover:text-[#058ae5]">Process</a>
            <a href="#insights" onClick={() => setIsMobileMenuOpen(false)} className="text-[18px] font-medium text-[#1a1a1a] hover:text-[#058ae5]">Insights</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-[18px] font-medium text-[#1a1a1a] hover:text-[#058ae5]">About</a>
            <GradientButton href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="w-full mt-2">
              Talk to Our Team
            </GradientButton>
          </div>
        )}
      </nav>

      <main className="w-full flex flex-col">

        {/* SECTION 1: HERO */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-white">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-gradient-to-b from-[#058ae5]/5 to-transparent pointer-events-none" />
          
          <div className="px-5 md:px-10 lg:px-20 relative z-10 w-full">
            <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center">
              
              <FadeInUp className="max-w-4xl flex flex-col items-center">
                <h1 className="text-4xl md:text-5xl lg:text-[64px] font-poppins font-extrabold tracking-tight leading-[1.1] mb-6 text-[#1a1a1a]">
                  Data Analytics & Strategy for Better Commercial Decisions
                </h1>
                <p className="text-lg md:text-xl text-[#1a1a1a]/80 max-w-3xl mb-10 leading-relaxed font-barlow">
                  OSG helps pharma, medtech, and healthcare leaders turn fragmented customer, market, and real-world data into clear decisions on growth, customer strategy, product positioning, and experience improvement.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                  <GradientButton href="#services">
                    See Our Capabilities
                  </GradientButton>
                </div>
              </FadeInUp>

              {/* 16:9 Aspect Ratio Hero Slider */}
              <FadeInUp delay="200ms" className="w-full max-w-4xl mx-auto mb-16 mt-6">
                <div className="relative w-full aspect-video rounded-[16px] overflow-hidden shadow-xl border border-[#e5e5e8] bg-[#1a1a1a] group">
                  {heroBullets.map((bullet, idx) => (
                    <div 
                      key={idx} 
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentHeroSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                      <img src={bullet.img} className="w-full h-full object-cover opacity-60" alt="OSG Insight" />
                      <div className="absolute inset-0 bg-[#1a1a1a]/40 flex items-center justify-center px-8 sm:px-16">
                        <p className="text-white text-2xl md:text-3xl lg:text-[36px] font-poppins font-bold text-center max-w-3xl leading-snug shadow-sm drop-shadow-md">
                          {bullet.text}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Slider Pagination Dots */}
                  <div className="absolute bottom-6 left-0 w-full flex justify-center gap-3 z-20">
                    {heroBullets.map((_, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setCurrentHeroSlide(idx)} 
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentHeroSlide === idx ? 'bg-[#058ae5] scale-125' : 'bg-white/50 hover:bg-white'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </FadeInUp>

              {/* Trust Strip */}
              <FadeInUp delay="400ms" className="w-full border-t border-[#e5e5e8] pt-8 flex flex-wrap justify-center gap-4 md:gap-8 text-[14px] font-semibold text-[#1a1a1a]/60 uppercase tracking-widest">
                <span>Pharma</span>
                <span className="hidden md:inline">•</span>
                <span>MedTech</span>
                <span className="hidden md:inline">•</span>
                <span>Healthcare</span>
                <span className="hidden lg:inline">•</span>
                <span>Secure Data Workflows</span>
                <span className="hidden lg:inline">•</span>
                <span>Analytics + Strategy</span>
              </FadeInUp>

            </div>
          </div>
        </section>

        {/* SECTION 2: WHO WE HELP */}
        <section id="industries" className="py-20 md:py-28 bg-[#f8f9fa]">
          <div className="px-5 md:px-10 lg:px-20 w-full">
            <div className="max-w-[1200px] mx-auto flex flex-col items-center">
              
              <FadeInUp className="flex flex-col md:flex-row justify-between items-start md:items-end w-full mb-16 gap-6">
                <div className="max-w-2xl text-left">
                  <h2 className="text-3xl md:text-4xl lg:text-[40px] font-poppins font-bold tracking-tight mb-4 text-[#1a1a1a]">
                    Built for Complex, Data-Rich Industries
                  </h2>
                  <p className="text-lg text-[#1a1a1a]/70 font-barlow">
                    OSG works where commercial decisions are high-stakes, data is fragmented, and leadership teams need clear strategic direction.
                  </p>
                </div>
                <GradientButton href="#industries" className="shrink-0">
                  Explore Industries <ArrowRight className="w-4 h-4"/>
                </GradientButton>
              </FadeInUp>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {[
                  { 
                    title: 'Pharma', 
                    icon: <Microscope className="w-8 h-8 text-white"/>, 
                    desc: 'Use analytics to clarify treatment landscapes, focus brand strategies, and align commercial teams around the right customers and accounts.',
                    img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80'
                  },
                  { 
                    title: 'MedTech', 
                    icon: <Activity className="w-8 h-8 text-white"/>, 
                    desc: 'Understand adoption drivers, prioritize HCP and account targets, and sharpen launch and growth plans for complex device portfolios.',
                    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
                  },
                  { 
                    title: 'Healthcare', 
                    icon: <Stethoscope className="w-8 h-8 text-white"/>, 
                    desc: 'Combine patient, provider, and market data to improve service mix, experience, and growth decisions across your organization.',
                    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
                  }
                ].map((item, i) => (
                  <FadeInUp key={i} delay={`${i * 100}ms`}>
                    <div className="group relative bg-white rounded-[16px] overflow-hidden border border-[#e5e5e8] shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                      <div className="h-[200px] w-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#058ae5]/80 to-[#02ce6b]/80 mix-blend-multiply z-10 transition-opacity group-hover:opacity-90" />
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute top-6 left-6 z-20">
                          {item.icon}
                        </div>
                      </div>
                      <div className="p-8 flex-1 flex flex-col bg-white z-20">
                        <h3 className="text-2xl font-poppins font-bold mb-3 text-[#1a1a1a]">{item.title}</h3>
                        <p className="text-[#1a1a1a]/70 leading-relaxed font-barlow">{item.desc}</p>
                      </div>
                    </div>
                  </FadeInUp>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 3: WHAT WE DO */}
        <section id="services" className="py-20 md:py-28 bg-white border-y border-[#e5e5e8]">
          <div className="px-5 md:px-10 lg:px-20 w-full">
            <div className="max-w-[1200px] mx-auto flex flex-col items-center">
              
              <FadeInUp className="mb-16 text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl lg:text-[40px] font-poppins font-bold tracking-tight mb-4 text-[#1a1a1a]">
                  Analytics and Strategy Services That Support Real Decisions
                </h2>
                <p className="text-lg text-[#1a1a1a]/70 font-barlow mb-8">
                  OSG connects rigorous analytics with practical strategy so leadership teams can act with confidence.
                </p>
              </FadeInUp>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#e5e5e8] w-full">
                {[
                  { title: 'Customer Analytics', icon: <BarChart3 className="w-6 h-6 text-[#058ae5]"/>, desc: 'Identify what truly drives customer behavior, value, loyalty, and choice across segments and channels.' },
                  { title: 'Segmentation & Targeting', icon: <Target className="w-6 h-6 text-[#058ae5]"/>, desc: 'Prioritize the customers, accounts, or audiences that matter most for growth, launch, and retention.' },
                  { title: 'Launch & Growth Strategy', icon: <Rocket className="w-6 h-6 text-[#058ae5]"/>, desc: 'Support go-to-market, launch, and expansion decisions with evidence-based analytics and scenario planning.' },
                  { title: 'Journey & Experience Analytics', icon: <MapIcon className="w-6 h-6 text-[#058ae5]"/>, desc: 'Find the points of friction that matter most and focus resources on the changes that move outcomes.' },
                  { title: 'Dashboarding & Decision Support', icon: <Activity className="w-6 h-6 text-[#058ae5]"/>, desc: 'Give leaders clear, tailored views of the metrics, patterns, and trade-offs behind critical decisions.' },
                  { title: 'Predictive & AI-Enabled Analytics', icon: <BrainCircuit className="w-6 h-6 text-[#058ae5]"/>, desc: 'Use models to forecast behavior, size opportunities, and sharpen strategic planning and resource allocation.' }
                ].map((item, i) => (
                  <FadeInUp key={i} delay={`${i * 50}ms`}>
                    <div className="p-10 border-b border-r border-[#e5e5e8] hover:bg-[#f8f9fa] transition-colors h-full flex flex-col items-start group">
                      <div className="w-12 h-12 bg-white border border-[#e5e5e8] rounded-lg flex items-center justify-center mb-6 group-hover:border-[#058ae5] transition-colors">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-poppins font-bold mb-3 text-[#1a1a1a]">{item.title}</h3>
                      <p className="text-[#1a1a1a]/70 font-barlow leading-relaxed">{item.desc}</p>
                    </div>
                  </FadeInUp>
                ))}
              </div>

              <FadeInUp delay="200ms" className="mt-12 text-center">
                <GradientButton href="#services">
                  View Full Capabilities
                </GradientButton>
              </FadeInUp>

            </div>
          </div>
        </section>

        {/* SECTION 4: WHY OSG */}
        <section className="py-20 md:py-28 bg-[#f8f9fa]">
          <div className="px-5 md:px-10 lg:px-20 w-full">
            <div className="max-w-[1200px] mx-auto">
              
              <FadeInUp className="mb-16 max-w-2xl">
                <h2 className="text-3xl md:text-4xl lg:text-[40px] font-poppins font-bold tracking-tight mb-4 text-[#1a1a1a]">
                  Why Leadership Teams Choose OSG
                </h2>
                <p className="text-lg text-[#1a1a1a]/70 font-barlow">
                  OSG is built for organizations that need more than reports or dashboards — they need analytics that change decisions.
                </p>
              </FadeInUp>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <FadeInUp className="md:col-span-2 bg-white rounded-[16px] p-10 border border-[#e5e5e8] shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#340a54] to-[#058ae5]" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-poppins font-bold mb-4 text-[#340a54]">Decision-Focused Analytics</h3>
                    <p className="text-[#1a1a1a]/70 font-barlow text-lg leading-relaxed max-w-xl">
                      Every engagement starts with the decisions you need to make, then works backwards to the analytics required to support them.
                    </p>
                  </div>
                  <div className="absolute right-0 bottom-0 opacity-5 w-64 h-64 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                    <Target className="w-full h-full text-[#340a54]" />
                  </div>
                </FadeInUp>

                <FadeInUp delay="100ms" className="col-span-1 bg-white rounded-[16px] p-8 border border-[#e5e5e8] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#058ae5] to-[#02ce6b]" />
                  <div className="relative z-10">
                    <h3 className="text-xl font-poppins font-bold mb-3 text-[#1a1a1a]">Industry Depth</h3>
                    <p className="text-[#1a1a1a]/70 font-barlow leading-relaxed">OSG works in industries where stakeholder dynamics, regulation, and data complexity make decisions harder, not simpler.</p>
                  </div>
                  <div className="absolute right-0 bottom-0 opacity-5 w-48 h-48 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                    <Activity className="w-full h-full text-[#1a1a1a]" />
                  </div>
                </FadeInUp>

                <FadeInUp delay="200ms" className="col-span-1 bg-white rounded-[16px] p-8 border border-[#e5e5e8] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#058ae5] to-[#02ce6b]" />
                  <div className="relative z-10">
                    <h3 className="text-xl font-poppins font-bold mb-3 text-[#1a1a1a]">Proprietary Methods + Practical Delivery</h3>
                    <p className="text-[#1a1a1a]/70 font-barlow leading-relaxed">OSG’s proprietary approaches and platforms are translated into clear recommendations, not left as technical detail.</p>
                  </div>
                  <div className="absolute right-0 bottom-0 opacity-5 w-48 h-48 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                    <Lightbulb className="w-full h-full text-[#1a1a1a]" />
                  </div>
                </FadeInUp>

                <FadeInUp delay="300ms" className="md:col-span-2 bg-white rounded-[16px] p-10 border border-[#e5e5e8] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#058ae5] to-[#02ce6b]" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-poppins font-bold mb-4 text-[#1a1a1a]">Secure, Enterprise-Ready Approach</h3>
                    <p className="text-[#1a1a1a]/70 font-barlow text-lg leading-relaxed max-w-xl">
                      Our workflows are designed for sensitive commercial, clinical, and patient-related data, with security and compliance as a core expectation.
                    </p>
                  </div>
                  <div className="absolute right-0 bottom-0 opacity-5 w-64 h-64 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                    <ShieldCheck className="w-full h-full text-[#1a1a1a]" />
                  </div>
                </FadeInUp>
              </div>

              <FadeInUp delay="400ms" className="flex flex-wrap items-center gap-4 text-sm font-semibold uppercase tracking-widest text-[#1a1a1a]/60">
                 <span className="text-[#058ae5]">✓</span> GDPR-aware 
                 <span className="hidden md:inline text-[#e5e5e8]">|</span> 
                 <span className="text-[#058ae5]">✓</span> HIPAA-aware 
                 <span className="hidden md:inline text-[#e5e5e8]">|</span> 
                 <span className="text-[#058ae5]">✓</span> Strategy + Analytics 
                 <span className="hidden md:inline text-[#e5e5e8]">|</span> 
                 <span className="text-[#058ae5]">✓</span> Leadership-ready Outputs
              </FadeInUp>

            </div>
          </div>
        </section>

        {/* SECTION 5: SELECTED OUTCOMES */}
        <section id="outcomes" className="py-20 md:py-28 bg-[#f8f9fa] border-y border-[#e5e5e8]">
          <div className="px-5 md:px-10 lg:px-20 w-full">
            <div className="max-w-[1200px] mx-auto">
              
              <FadeInUp className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                <div className="max-w-2xl text-left">
                  <span className="inline-block px-3 py-1 bg-[#058ae5]/10 text-[#058ae5] text-xs font-bold uppercase tracking-widest rounded-full mb-4">Case Studies</span>
                  <h2 className="text-3xl md:text-4xl lg:text-[40px] font-poppins font-bold tracking-tight mb-4 text-[#1a1a1a]">
                    Selected Outcomes
                  </h2>
                  <p className="text-lg text-[#1a1a1a]/70 font-barlow">
                    A few examples of how analytics and strategy work together in practice.
                  </p>
                </div>
                <GradientButton href="#outcomes" className="shrink-0">
                  See Selected Work <ArrowRight className="w-4 h-4"/>
                </GradientButton>
              </FadeInUp>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {[
                  { 
                    client: 'Global MedTech Company', 
                    icon: <Activity className="w-8 h-8 text-[#1a1a1a]"/>,
                    challenge: 'A complex device portfolio needed clearer customer segmentation and adoption drivers.',
                    osg: 'Built a behavioral segmentation and analytics framework to focus commercial efforts.',
                    outcome: 'Sales and marketing aligned around fewer, higher-value segments and clearer adoption levers.',
                    img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80'
                  },
                  { 
                    client: 'Pharma Brand Team', 
                    icon: <Microscope className="w-8 h-8 text-[#1a1a1a]"/>,
                    challenge: 'Launch planning required sharper understanding of customer response to messages and channels.',
                    osg: 'Combined survey, secondary, and behavioral data to quantify decision drivers.',
                    outcome: 'Clearer targeting and messaging strategy to support launch execution.',
                    img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80'
                  },
                  { 
                    client: 'Healthcare Services Organization', 
                    icon: <Stethoscope className="w-8 h-8 text-[#1a1a1a]"/>,
                    challenge: 'Leadership needed to understand where experience issues were impacting growth.',
                    osg: 'Mapped the end-to-end journey and identified high-impact friction points.',
                    outcome: 'A prioritized roadmap of experience improvements linked to strategic goals.',
                    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
                  }
                ].map((item, i) => (
                  <FadeInUp key={i} delay={`${i * 100}ms`}>
                    <div className="bg-white rounded-[16px] border border-[#e5e5e8] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full p-6 lg:p-8 group text-left">
                      
                      <div className="mb-6">
                        {item.icon}
                      </div>
                      
                      <h3 className="text-[20px] font-poppins font-bold text-[#1a1a1a] mb-4">{item.client}</h3>
                      
                      <div className="text-[14px] text-[#1a1a1a]/70 font-barlow space-y-3 mb-8 flex-1">
                        <p><strong className="font-semibold text-[#1a1a1a]">Challenge:</strong> {item.challenge}</p>
                        <p><strong className="font-semibold text-[#1a1a1a]">OSG contribution:</strong> {item.osg}</p>
                        <p><strong className="font-semibold text-[#1a1a1a]">Outcome:</strong> {item.outcome}</p>
                      </div>

                      <div className="w-full h-[200px] rounded-[12px] overflow-hidden shrink-0 mt-auto">
                        <img src={item.img} alt={item.client} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>

                    </div>
                  </FadeInUp>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: HOW OSG WORKS */}
        <section id="process" className="py-20 md:py-28 bg-[#f8f9fa] relative">
          <div className="px-5 md:px-10 lg:px-20 w-full h-full">
            <div className="max-w-[1200px] mx-auto">
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative h-full">
                
                <div className="lg:sticky lg:top-32 max-w-xl self-start">
                  <FadeInUp>
                    <h2 className="text-3xl md:text-4xl lg:text-[40px] font-poppins font-bold tracking-tight mb-6 text-[#1a1a1a] leading-tight">
                      A Clear Path from Data to Decision
                    </h2>
                    <p className="text-lg text-[#1a1a1a]/70 font-barlow leading-relaxed">
                      OSG brings structure to complex questions so analytics lead to action, not just insight. We efficiently manage your data-insights-decision value chain to drive immediate impact.
                    </p>
                  </FadeInUp>
                </div>
                
                <div className="relative border-l border-[#058ae5]/30 pl-8 md:pl-12 space-y-10 py-4 ml-4 lg:ml-0">
                  {[
                    { num: '1', title: 'Clarify the business question', desc: 'Align with leadership on the decisions that need to be made and the outcomes that matter.' },
                    { num: '2', title: 'Build the analytics view', desc: 'Bring together the right data, methods, and models to answer those questions with confidence.' },
                    { num: '3', title: 'Deliver decision-ready outputs', desc: 'Translate findings into dashboards, recommendations, and strategic support aligned to your teams.' }
                  ].map((step, i) => (
                    <FadeInUp key={i} delay={`${i * 150}ms`} className="relative">
                      <div className="absolute left-[-32px] md:left-[-48px] -translate-x-1/2 top-4 w-10 h-10 md:w-12 md:h-12 bg-white border-2 border-[#058ae5] text-[#058ae5] rounded-full flex items-center justify-center font-poppins font-bold text-lg shadow-sm">
                        {step.num}
                      </div>
                      
                      <div className="bg-white border border-[#e5e5e8] rounded-xl p-6 md:p-8 hover:shadow-md transition-shadow">
                        <h3 className="text-xl md:text-2xl font-poppins font-bold mb-3 text-[#1a1a1a]">{step.title}</h3>
                        <p className="text-[#1a1a1a]/70 font-barlow leading-relaxed">{step.desc}</p>
                      </div>
                    </FadeInUp>
                  ))}
                </div>
                
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 7: INSIGHTS */}
        <section id="insights" className="py-20 md:py-28 bg-white border-y border-[#e5e5e8]">
          <div className="px-5 md:px-10 lg:px-20 w-full">
            <div className="max-w-[1200px] mx-auto">
              
              <FadeInUp className="mb-12 flex flex-col items-start w-full">
                <h2 className="text-3xl md:text-4xl lg:text-[40px] font-poppins font-bold tracking-tight mb-4 text-[#1a1a1a]">
                  Insights for Analytics and Strategy Leaders
                </h2>
                <p className="text-lg text-[#1a1a1a]/70 font-barlow mb-10 max-w-2xl">
                  Perspectives from OSG on where analytics and strategy create the most value.
                </p>
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full border-b border-[#e5e5e8] pb-6">
                  <div className="flex flex-wrap justify-start gap-3 w-full md:w-auto">
                    {['All Insights', 'AI & Data', 'Customer Strategy', 'Healthcare'].map(tab => (
                      <button 
                        key={tab}
                        onClick={() => setActiveFilter(tab)}
                        className={`px-6 py-2 rounded-[4px] text-sm font-semibold transition-all ${activeFilter === tab ? 'bg-[#1a1a1a] text-white' : 'bg-white text-[#1a1a1a]/60 border border-[#e5e5e8] hover:border-[#058ae5] hover:text-[#058ae5]'}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full md:w-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a1a1a]/40" />
                    <input 
                      type="text" 
                      placeholder="Search Posts" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full md:w-[280px] pl-10 pr-4 py-2.5 rounded-[4px] border border-[#e5e5e8] text-sm font-medium text-[#1a1a1a] placeholder-[#1a1a1a]/40 focus:outline-none focus:border-[#058ae5] focus:ring-1 focus:ring-[#058ae5] transition-all bg-white"
                    />
                  </div>
                </div>
              </FadeInUp>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[
                  { title: 'AI Governance in Commercial Analytics', desc: 'How leadership teams can safely scale AI while keeping decisions explainable and defensible.', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80', tag: 'AI & Data' },
                  { title: 'Beyond Traditional Segmentation', desc: 'Why behavioral and attitudinal data often reveal more than demographics alone.', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80', tag: 'Customer Strategy' },
                  { title: 'Measuring Customer Value in Healthcare', desc: 'Linking patient, provider, and commercial data to understand where value is really created.', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80', tag: 'Healthcare' }
                ].map((article, i) => (
                  <FadeInUp key={i} delay={`${i * 100}ms`}>
                    <div className="bg-white rounded-[16px] overflow-hidden border border-[#e5e5e8] shadow-sm hover:shadow-lg transition-all h-full flex flex-col group cursor-pointer">
                      <div className="h-[200px] w-full overflow-hidden relative">
                        <div className="absolute inset-0 bg-[#340a54]/10 group-hover:bg-transparent transition-colors z-10" />
                        <img src={article.img} alt={article.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      <div className="p-8 flex-1 flex flex-col">
                        <span className="text-xs font-bold text-[#058ae5] uppercase tracking-widest mb-3 block">{article.tag}</span>
                        <h3 className="text-xl font-poppins font-bold mb-3 text-[#1a1a1a] group-hover:text-[#058ae5] transition-colors">{article.title}</h3>
                        <p className="text-[#1a1a1a]/70 font-barlow flex-1 mb-6">{article.desc}</p>
                        <div className="text-sm font-bold text-[#340a54] flex items-center gap-2 uppercase tracking-wider group-hover:gap-3 transition-all">
                          Read Article <ArrowRight className="w-4 h-4"/>
                        </div>
                      </div>
                    </div>
                  </FadeInUp>
                ))}
              </div>

              <div className="text-center">
                <GradientButton href="#insights">
                  View All Insights
                </GradientButton>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 8: ABOUT */}
        <section id="about" className="py-20 md:py-28 bg-[#f8f9fa]">
          <div className="px-5 md:px-10 lg:px-20 w-full">
            <FadeInUp className="max-w-4xl mx-auto text-center flex flex-col items-center">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold tracking-tight mb-6 text-[#1a1a1a]">
                About OSG
              </h2>
              <p className="text-lg md:text-xl text-[#1a1a1a]/80 font-barlow leading-relaxed mb-10">
                OSG is a Data Analytics & Strategy partner focused on helping leadership teams in pharma, medtech, and healthcare make better commercial and customer decisions. The firm brings together analytics, research, and strategic thinking to support the kind of complex choices that cannot be made on instinct alone.
              </p>
              
              <ul className="flex flex-col md:flex-row flex-wrap justify-center gap-x-12 gap-y-4 text-[16px] font-medium text-[#1a1a1a] mb-12 text-left md:text-center">
                <li className="flex items-center justify-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#058ae5]"/> Experience across global and regional organizations</li>
                <li className="flex items-center justify-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#058ae5]"/> Multidisciplinary teams spanning analytics, research, and strategy</li>
                <li className="flex items-center justify-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#058ae5]"/> Engagement models tailored to specific decisions and timelines</li>
              </ul>
              
              <GradientButton href="#about">
                Learn About OSG
              </GradientButton>
            </FadeInUp>
          </div>
        </section>

      </main>

      {/* SECTION 9: FINAL CTA BAND */}
      <footer id="contact" className="bg-[#340a54] text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full max-w-[800px] h-[800px] bg-gradient-to-bl from-[#058ae5]/20 to-transparent rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/2" />
        
        <div className="px-5 md:px-10 lg:px-20 w-full relative z-10">
          <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center">
            
            <FadeInUp>
              <h2 className="text-3xl md:text-4xl lg:text-[48px] font-poppins font-bold tracking-tight max-w-3xl leading-tight mb-10">
                Need an analytics and strategy partner for a high-stakes commercial decision?
              </h2>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <GradientButton href="#contact" darkBg={true}>
                  Talk to Our Team
                </GradientButton>
                <button className="bg-transparent border-2 border-white/30 text-white px-8 py-3 rounded-[4px] text-[16px] font-bold hover:bg-white/10 hover:border-white transition-all w-full sm:w-auto">
                  Request a Capabilities Overview
                </button>
              </div>
            </FadeInUp>

          </div>
        </div>
      </footer>

    </div>
  );
}