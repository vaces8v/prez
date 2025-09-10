'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaJsSquare, 
  FaCode, 
  FaHistory, 
  FaChartLine, 
  FaCheckCircle, 
  FaGlobe, 
  FaRocket, 
  FaTrophy 
} from 'react-icons/fa';
import { 
  SiJavascript, 
  SiReact, 
  SiNodedotjs,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiNuxtdotjs,
  SiSvelte,
  SiNestjs
} from 'react-icons/si';
import { 
  HiSparkles, 
  HiLightBulb 
} from 'react-icons/hi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const slides = [
  {
    id: 1,
    title: "JavaScript Programming Language",
    subtitle: "The language of the web",
    content: "Hello everyone. Today we want to talk about JavaScript. It is one of the most important programming languages in the world.",
    icon: FaJsSquare,
    hasImage: false
  },
  {
    id: 2,
    title: "What is JavaScript?",
    subtitle: "JavaScript is a popular programming language. It makes websites interactive.",
    content: "JavaScript is special because it makes websites dynamic. When you click, type, or watch animations — this is JavaScript.",
    icon: SiJavascript,
    hasImage: true,
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop&crop=center"
  },
  {
    id: 3,
    title: "History",
    subtitle: "Created in 1995 by Brendan Eich. At first, it was small and simple.",
    content: "JavaScript was made in 1995 in only 10 days! At first, it was very small, but now it is very powerful.",
    icon: FaHistory,
    hasImage: true,
    imageUrl: "/eich.jpg"
  },
  {
    id: 4,
    title: "Growth",
    subtitle: "From small scripts to big applications. Now it works everywhere.",
    content: "JavaScript started with small browser scripts. Today it is used for websites, mobile apps, and even servers.",
    icon: FaChartLine,
    hasImage: true,
    hasChart: true
  },
  {
    id: 5,
    title: "Advantages",
    subtitle: "✓ Works in all browsers\n✓ Easy to learn\n✓ Big community\n✓ Many libraries and frameworks",
    content: "JavaScript is easy to start. It has a huge community. Frameworks like React, Angular, and Vue help developers.",
    icon: FaCheckCircle,
    hasImage: true,
    hasFrameworkCarousel: true
  },
  {
    id: 6,
    title: "Where is JavaScript used?",
    subtitle: "🌍 Websites\n📱 Mobile apps\n☁️ Cloud and servers",
    content: "JavaScript is everywhere. It is used by Google, Facebook, Netflix, and many other companies.",
    icon: FaGlobe,
    hasImage: true,
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&crop=center"
  },
  {
    id: 7,
    title: "Today and Future",
    subtitle: "JavaScript is everywhere today. It will stay important in the future.",
    content: "JavaScript keeps growing every year. It will stay strong in the future of technology.",
    icon: FaRocket,
    hasImage: true,
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&crop=center"
  },
  {
    id: 8,
    title: "Conclusion",
    subtitle: "JavaScript: From small idea → to global technology.",
    content: "JavaScript started small but became huge. It helps people create modern applications. Thank you for listening!",
    icon: FaTrophy,
    hasImage: true,
    imageUrl: "/end.png",
    isLastSlide: true
  }
];

const backgroundColors = [
  { from: '#1e3a8a', via: '#581c87', to: '#4338ca' }, // Slide 1 - JavaScript intro (blue-purple-indigo)
  { from: '#064e3b', via: '#115e59', to: '#164e63' }, // Slide 2 - What is JS (emerald-teal-cyan)
  { from: '#1e40af', via: '#3730a3', to: '#5b21b6' }, // Slide 3 - History (deep blue-indigo-violet)
  { from: '#4c1d95', via: '#581c87', to: '#701a75' }, // Slide 4 - Growth (violet-purple-fuchsia)
  { from: '#0f172a', via: '#1e293b', to: '#334155' }, // Slide 5 - Advantages (slate-blue-gray)
  { from: '#0c4a6e', via: '#0369a1', to: '#0284c7' }, // Slide 6 - Where used (deep blue-sky-blue)
  { from: '#312e81', via: '#1e3a8a', to: '#581c87' }, // Slide 7 - Future (indigo-blue-purple)
  { from: '#1e1b4b', via: '#312e81', to: '#4c1d95' }  // Slide 8 - Conclusion (dark indigo-indigo-violet)
];

// Данные для карусели фреймворков
const frameworks = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
  { name: 'Vue', icon: SiVuedotjs, color: '#4FC08D' },
  { name: 'Angular', icon: SiAngular, color: '#DD0031' },
  { name: 'Nuxt', icon: SiNuxtdotjs, color: '#00DC82' },
  { name: 'Svelte', icon: SiSvelte, color: '#FF3E00' },
  { name: 'Nest.js', icon: SiNestjs, color: '#E0234E' }
];

// Данные для графика сравнения языков программирования
const chartData = {
  labels: ['JavaScript', 'Python', 'Java', 'TypeScript', 'C#', 'PHP', 'C++', 'Go', 'Rust', 'Swift'],
  datasets: [
    {
      label: 'Популярность (%)',
      data: [65, 48, 35, 25, 23, 21, 18, 15, 12, 10],
      backgroundColor: [
        'rgba(255, 206, 84, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(199, 199, 199, 0.8)',
        'rgba(83, 102, 255, 0.8)',
        'rgba(255, 99, 255, 0.8)',
        'rgba(54, 255, 162, 0.8)'
      ],
      borderColor: [
        'rgba(255, 206, 84, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(199, 199, 199, 1)',
        'rgba(83, 102, 255, 1)',
        'rgba(255, 99, 255, 1)',
        'rgba(54, 255, 162, 1)'
      ],
      borderWidth: 2,
      borderRadius: 8,
      borderSkipped: false,
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Популярность языков программирования 2024',
      color: 'white',
      font: {
        size: 18,
        weight: 'bold'
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 70,
      ticks: {
        color: 'white',
        font: {
          size: 12
        }
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    },
    x: {
      ticks: {
        color: 'white',
        font: {
          size: 11
        },
        maxRotation: 45
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    }
  },
  animation: {
    duration: 2000,
    easing: 'easeInOutQuart' as const
  }
};

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentFramework, setCurrentFramework] = useState(0);

  // Автоматическая смена фреймворков
  useEffect(() => {
    if (currentSlide === 4) { // 5-й слайд (индекс 4)
      const interval = setInterval(() => {
        setCurrentFramework((prev) => (prev + 1) % frameworks.length);
      }, 6000); // Увеличено время для статичного показа (4.5 сек) + анимация (1.5 сек)
      return () => clearInterval(interval);
    }
  }, [currentSlide]);

  // Автоматическая смена устройств для 6-го слайда была убрана.

  const slideVariants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.8,
        rotateY: direction > 0 ? 45 : -45
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.8,
        rotateY: direction < 0 ? 45 : -45
      };
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    if (newDirection > 0 && currentSlide < slides.length - 1) {
      setDirection(newDirection);
      setCurrentSlide(currentSlide + 1);
    } else if (newDirection < 0 && currentSlide > 0) {
      setDirection(newDirection);
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'Enter':
          e.preventDefault();
          paginate(1);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          paginate(-1);
          break;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <motion.div 
      className="min-h-screen overflow-hidden relative"
      animate={{
        background: `linear-gradient(135deg, ${backgroundColors[currentSlide].from} 0%, ${backgroundColors[currentSlide].via} 50%, ${backgroundColors[currentSlide].to} 100%)`
      }}
      transition={{
        background: { 
          duration: 1.2, 
          ease: [0.4, 0, 0.2, 1] // Custom cubic-bezier for smooth transition
        }
      }}
    >
      {/* Subtle background with parallax effect */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        animate={{
          x: mousePosition.x * 0.2,
          y: mousePosition.y * 0.2
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        {/* Subtle gradient orbs */}
        <motion.div 
          className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.3,
            y: mousePosition.y * 0.3,
          }}
          transition={{ type: "spring", stiffness: 30, damping: 15 }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div 
          className="absolute w-80 h-80 bg-white/3 rounded-full blur-3xl"
          animate={{
            x: -mousePosition.x * 0.2,
            y: -mousePosition.y * 0.2,
          }}
          transition={{ type: "spring", stiffness: 25, damping: 12 }}
          style={{ bottom: '10%', right: '10%' }}
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center p-8">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 },
              rotateY: { duration: 0.6 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="w-full max-w-7xl mx-auto cursor-grab active:cursor-grabbing"
          >
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              slide.hasImage ? 'lg:gap-16' : ''
            }`}>
              
              {/* Text Content */}
              <motion.div
                className={`${slide.hasImage ? 'order-1 lg:order-1' : 'order-1 col-span-full text-center'}`}
                initial={{ opacity: 0, x: slide.hasImage ? -100 : 0, y: slide.hasImage ? 0 : 50 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                {/* Icon */}
                 <motion.div
                   className={`${slide.hasImage ? 'text-6xl mb-6' : 'text-8xl mb-8'} ${slide.hasImage ? 'text-left' : 'text-center'} text-white`}
                   initial={{ scale: 0, rotate: -180 }}
                   animate={{ scale: 1, rotate: 0 }}
                   transition={{ 
                     type: "spring", 
                     stiffness: 200, 
                     damping: 15,
                     delay: 0.4 
                   }}
                 >
                   {React.createElement(slide.icon)}
                 </motion.div>

                {/* Slide number */}
                <motion.div 
                  className={`mb-6 ${slide.hasImage ? 'text-left' : 'text-center'}`}
                  initial={{ y: -20, opacity: 0.7 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <span className="text-white/60 text-lg font-mono">
                    {currentSlide + 1} / {slides.length}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1 
                  className={`${slide.hasImage ? 'text-4xl md:text-6xl text-left' : 'text-6xl md:text-8xl text-center'} font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.6,
                    ease: "easeOut" 
                  }}
                >
                  {slide.title}
                </motion.h1>

                {/* Subtitle */}
                <motion.div 
                  className={`text-lg md:text-xl text-gray-300 mb-8 leading-relaxed whitespace-pre-line ${
                    slide.hasImage ? 'text-left max-w-lg' : 'text-center max-w-4xl mx-auto'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.8,
                    ease: "easeOut" 
                  }}
                >
                  {slide.subtitle}
                </motion.div>

                {/* Content */}
                <motion.p 
                  className={`text-base md:text-lg text-white/80 leading-relaxed ${
                    slide.hasImage ? 'text-left max-w-lg' : 'text-center max-w-3xl mx-auto'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.3 }}
                >
                  {slide.content}
                </motion.p>
              </motion.div>

              {/* Image/Chart Content */}
              {slide.hasImage && (
                <motion.div
                  className="order-2 lg:order-2 relative"
                  initial={{ opacity: 0, x: 100, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    scale: slide.isLastSlide ? 0.8 : 1,
                    y: mousePosition.y * 0.1
                  }}
                  transition={{ 
                    duration: 1, 
                    delay: 0.4, 
                    ease: "easeOut",
                    y: { type: "spring", stiffness: 100, damping: 20 }
                  }}
                >
                  {slide.hasChart ? (
                    <div className="relative w-full h-96 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                      <Bar data={chartData} options={{
                        ...chartOptions,
                        plugins: {
                          ...chartOptions.plugins,
                          title: {
                            ...chartOptions.plugins.title,
                            font: {
                              size: chartOptions.plugins.title.font.size,
                              weight: chartOptions.plugins.title.font.weight as "bold"
                            }
                          }
                        }
                      }} />
                    </div>
                  ) : slide.hasFrameworkCarousel ? (
                    <div className="relative w-full h-96 flex flex-col items-center justify-center overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentFramework}
                          initial={{ 
                            x: 300, 
                            opacity: 0, 
                            scale: 0.3,
                            rotateY: 45,
                            filter: "blur(10px)"
                          }}
                          animate={{ 
                            x: 0, 
                            opacity: 1, 
                            scale: 1,
                            rotateY: 0,
                            filter: "blur(0px)"
                          }}
                          exit={{ 
                            x: -300, 
                            opacity: 0, 
                            scale: 0.8,
                            rotateY: -20,
                            filter: "blur(5px)"
                          }}
                          transition={{ 
                            type: "spring",
                            stiffness: 120,
                            damping: 20,
                            mass: 0.8,
                            duration: 1.2
                          }}
                          className="text-center"
                        >
                          <motion.div
                            className="text-[12rem] mb-8"
                            style={{ color: frameworks[currentFramework].color }}
                            animate={{
                              scale: [1, 1.05, 1],
                              rotateZ: [0, 2, -2, 0],
                              filter: ["drop-shadow(0 0 30px rgba(255,255,255,0.4))", "drop-shadow(0 0 40px rgba(255,255,255,0.6))", "drop-shadow(0 0 30px rgba(255,255,255,0.4))"]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                              repeatDelay: 0.5
                            }}
                          >
                            {React.createElement(frameworks[currentFramework].icon)}
                          </motion.div>
                          <motion.h3
                            className="text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                            style={{
                              backgroundImage: `linear-gradient(135deg, ${frameworks[currentFramework].color}, ${frameworks[currentFramework].color}aa, ${frameworks[currentFramework].color})`
                            }}
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ 
                              delay: 0.4, 
                              duration: 0.8,
                              type: "spring",
                              stiffness: 100
                            }}
                          >
                            {frameworks[currentFramework].name}
                          </motion.h3>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  ) : currentSlide === 5 ? (
                    // 6-й слайд - Красивое облако с анимацией
                    <div className="relative w-full h-96 flex items-center justify-center">
                      <motion.div
                        className="relative w-[45rem] h-[35rem]"
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          y: [0, -10, 0],
                          x: mousePosition.x * 0.03,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 80,
                          damping: 15,
                          duration: 2,
                          delay: 0.3,
                          y: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }}
                      >
                        <svg width="100%" height="100%" viewBox="0 0 600 350" className="drop-shadow-2xl overflow-visible">
                          <defs>
                            <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#e0f2fe" />
                              <stop offset="30%" stopColor="#b3e5fc" />
                              <stop offset="70%" stopColor="#81d4fa" />
                              <stop offset="100%" stopColor="#4fc3f7" />
                            </linearGradient>
                            <linearGradient id="cloudGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#f8f9ff" />
                              <stop offset="50%" stopColor="#e3f2fd" />
                              <stop offset="100%" stopColor="#bbdefb" />
                            </linearGradient>
                            <filter id="cloudGlow" x="-50%" y="-50%" width="200%" height="200%">
                              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                              <feMerge> 
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/> 
                              </feMerge>
                            </filter>
                            <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
                              <feGaussianBlur stdDeviation="4" result="softBlur"/>
                              <feMerge> 
                                <feMergeNode in="softBlur"/>
                                <feMergeNode in="SourceGraphic"/> 
                              </feMerge>
                            </filter>
                          </defs>
                          
                          {/* Тень облака */}
                          <ellipse cx="300" cy="320" rx="180" ry="25" fill="rgba(0,0,0,0.1)" />
                          
                          {/* Основное облако */}
                          <g filter="url(#cloudGlow)">
                            {/* Классическая форма облака из кругов */}
                             {/* Основные большие круги для базовой формы */}
                             <circle cx="200" cy="220" r="50" fill="url(#cloudGrad)" opacity="1"/>
                             <circle cx="280" cy="200" r="60" fill="url(#cloudGrad)" opacity="1"/>
                             <circle cx="360" cy="210" r="55" fill="url(#cloudGrad)" opacity="1"/>
                             <circle cx="420" cy="230" r="45" fill="url(#cloudGrad)" opacity="1"/>
                             
                             {/* Средние круги для пушистости */}
                             <circle cx="150" cy="240" r="35" fill="url(#cloudGrad2)" opacity="0.9" filter="url(#softGlow)"/>
                             <circle cx="240" cy="170" r="40" fill="url(#cloudGrad2)" opacity="0.8" filter="url(#softGlow)"/>
                             <circle cx="320" cy="160" r="35" fill="url(#cloudGrad2)" opacity="0.9" filter="url(#softGlow)"/>
                             <circle cx="380" cy="180" r="30" fill="url(#cloudGrad2)" opacity="0.85" filter="url(#softGlow)"/>
                             <circle cx="450" cy="200" r="25" fill="url(#cloudGrad2)" opacity="0.8" filter="url(#softGlow)"/>
                             
                             {/* Мелкие детали для естественности */}
                             <circle cx="180" cy="190" r="25" fill="url(#cloudGrad)" opacity="0.7"/>
                             <circle cx="300" cy="240" r="30" fill="url(#cloudGrad)" opacity="0.6"/>
                             <circle cx="340" cy="250" r="20" fill="url(#cloudGrad)" opacity="0.8"/>
                             <circle cx="400" cy="250" r="18" fill="url(#cloudGrad)" opacity="0.7"/>
                             
                             {/* Дополнительные маленькие пушистые края */}
                             <circle cx="130" cy="210" r="20" fill="url(#cloudGrad2)" opacity="0.6"/>
                             <circle cx="470" cy="220" r="15" fill="url(#cloudGrad2)" opacity="0.7"/>
                             <circle cx="260" cy="250" r="15" fill="url(#cloudGrad2)" opacity="0.5"/>
                          </g>
                          
                          {/* Блики на облаке */}
                          <ellipse cx="200" cy="190" rx="15" ry="8" fill="rgba(255,255,255,0.6)" opacity="0.8"/>
                          <ellipse cx="320" cy="175" rx="20" ry="10" fill="rgba(255,255,255,0.5)" opacity="0.9"/>
                          <ellipse cx="420" cy="185" rx="12" ry="6" fill="rgba(255,255,255,0.7)" opacity="0.7"/>
                        </svg>
                        
                        {/* Плавающие частички вокруг облака */}
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                            animate={{
                              y: [0, -20, 0],
                              x: [0, Math.sin(i * 60) * 10, 0],
                              opacity: [0.3, 0.8, 0.3],
                              scale: [0.5, 1, 0.5]
                            }}
                            transition={{
                              duration: 3 + i * 0.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: i * 0.4
                            }}
                            style={{
                              left: `${20 + i * 12}%`,
                              top: `${30 + Math.sin(i) * 20}%`
                            }}
                          />
                        ))}
                      </motion.div>
                    </div>
                  ) : currentSlide === 6 ? (
                    // 7-й слайд - Будущее с красивой декорацией
                    <div className="relative w-full h-96 flex items-center justify-center">
                      {/* Фоновые декоративные элементы */}
                      <motion.div
                        className="absolute inset-0 opacity-20"
                        animate={{
                          rotate: [0, 360]
                        }}
                        transition={{
                          duration: 30,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        {/* Орбитальные кольца */}
                        <div className="absolute top-1/2 left-1/2 w-80 h-80 border-2 border-white/30 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute top-1/2 left-1/2 w-96 h-96 border border-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute top-1/2 left-1/2 w-64 h-64 border-2 border-white/40 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                      </motion.div>

                      {/* Плавающие частицы */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white rounded-full"
                          animate={{
                            x: [0, Math.sin(i * 45 * Math.PI / 180) * 150],
                            y: [0, Math.cos(i * 45 * Math.PI / 180) * 150],
                            opacity: [0.3, 1, 0.3],
                            scale: [0.5, 1.5, 0.5]
                          }}
                          transition={{
                            duration: 4 + i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.3
                          }}
                          style={{
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                          }}
                        />
                      ))}

                      {/* Центральная надпись JS */}
                      <motion.div
                        className="relative w-80 h-80 flex items-center justify-center z-10"
                        animate={{
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        {/* Светящийся фон для надписи */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-2xl"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.4, 0.7, 0.4]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        
                        {/* Иконка JS */}
                        <motion.div
                          className="text-yellow-400 drop-shadow-2xl"
                          style={{
                            filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.6)) drop-shadow(0 0 60px rgba(255,255,255,0.4))'
                          }}
                        >
                          <SiJavascript size={120} />
                        </motion.div>
                      </motion.div>
                      
                      {/* Анимированные смайлики по бокам кругов */}
                      {/* Левая сторона */}
                      <motion.div
                        className="absolute left-8 top-1/4 text-yellow-400 text-3xl z-20"
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.4, 1],
                          x: [-10, 10, -10]
                        }}
                        transition={{
                          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                          x: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        ✨
                      </motion.div>
                      
                      <motion.div
                        className="absolute left-12 bottom-1/4 text-blue-300 text-2xl z-20"
                        animate={{
                          y: [-15, 15, -15],
                          rotate: [0, -360],
                          scale: [0.8, 1.3, 0.8]
                        }}
                        transition={{
                          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                          rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                        }}
                      >
                        💫
                      </motion.div>
                      
                      {/* Правая сторона */}
                      <motion.div
                        className="absolute right-8 top-1/3 text-purple-400 text-3xl z-20"
                        animate={{
                          rotate: [360, 0],
                          scale: [1, 1.5, 1],
                          x: [10, -10, 10]
                        }}
                        transition={{
                          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                          scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 },
                          x: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        ⭐
                      </motion.div>
                      
                      <motion.div
                        className="absolute right-6 bottom-1/3 text-pink-400 text-2xl z-20"
                        animate={{
                          y: [20, -20, 20],
                          rotate: [0, 180, 360],
                          scale: [0.9, 1.4, 0.9]
                        }}
                        transition={{
                          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
                          rotate: { duration: 7, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
                        }}
                      >
                        ☄️
                      </motion.div>
                      
                      {/* Верх и низ */}
                      <motion.div
                        className="absolute top-8 left-1/2 transform -translate-x-1/2 text-green-400 text-2xl z-20"
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.3, 1],
                          y: [-8, 8, -8]
                        }}
                        transition={{
                          rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
                          y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        🌟
                      </motion.div>
                      
                      <motion.div
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-orange-400 text-2xl z-20"
                        animate={{
                          rotate: [360, 0],
                          scale: [0.8, 1.4, 0.8],
                          y: [8, -8, 8]
                        }}
                        transition={{
                          rotate: { duration: 9, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2.3, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
                          y: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }
                        }}
                      >
                        ✨
                      </motion.div>

                      {/* Дополнительные световые эффекты */}
                      <motion.div
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                        animate={{
                          background: [
                            'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                            'radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
                            'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
                            'radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
                            'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
                          ]
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                  ) : (
                    <div className={`relative overflow-hidden rounded-2xl ${slide.isLastSlide ? '' : 'shadow-2xl'}`}>
                      <motion.img
                        src={slide.imageUrl}
                        alt={slide.title}
                        className="w-full h-auto object-cover"
                        animate={{
                          y: mousePosition.y * 0.05,
                          x: mousePosition.x * 0.02
                        }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                      />
                      {/* Overlay gradient */}
                      {!slide.isLastSlide && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation hints */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm text-center"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-2">Use ← → arrows, Space, Enter to navigate • Drag to swipe</div>
          <div className="flex gap-2 justify-center">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  const newDirection = index > currentSlide ? 1 : -1;
                  setDirection(newDirection);
                  setCurrentSlide(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white/30 hover:bg-white/60'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Navigation arrows */}
        {currentSlide > 0 && (
          <motion.button
            onClick={() => paginate(-1)}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-300 text-4xl"
            whileHover={{ scale: 1.2, x: -5 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            ←
          </motion.button>
        )}
        {currentSlide < slides.length - 1 && (
          <motion.button
            onClick={() => paginate(1)}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-300 text-4xl"
            whileHover={{ scale: 1.2, x: 5 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            →
          </motion.button>
        )}
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </motion.div>

  );
}
