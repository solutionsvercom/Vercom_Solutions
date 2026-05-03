import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStartup Inc',
    content: 'Vercom Solutions transformed our business with their innovative AI solutions. The results exceeded our expectations!',
    rating: 5,
    avatar: 'SJ',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    name: 'Michael Chen',
    role: 'CTO, Digital Innovations',
    content: 'Outstanding work! The team delivered a cutting-edge platform that scaled our operations 10x.',
    rating: 5,
    avatar: 'MC',
    color: 'from-violet-500 to-purple-600',
  },
  {
    name: 'Emma Williams',
    role: 'Founder, EcoCommerce',
    content: 'Professional, creative, and results-driven. Our e-commerce platform is now the industry benchmark.',
    rating: 5,
    avatar: 'EW',
    color: 'from-pink-500 to-rose-600',
  },
  {
    name: 'David Martinez',
    role: 'Director, FinTech Solutions',
    content: 'The automation tools they built saved us countless hours. Highly recommended for any tech project!',
    rating: 5,
    avatar: 'DM',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Lisa Anderson',
    role: 'VP Marketing, BrandCo',
    content: 'Their digital marketing solutions tripled our engagement. The ROI speaks for itself!',
    rating: 5,
    avatar: 'LA',
    color: 'from-orange-500 to-amber-600',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-[#0a0a0f] via-[#1a0a2e] to-[#0a0a0f] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-violet-600/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-4 px-6 py-2 border border-cyan-500/30 rounded-full backdrop-blur-sm bg-cyan-500/5"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-cyan-400 font-semibold">Testimonials</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            What Clients Say
          </h2>
          <p className="text-xl text-cyan-100/60 max-w-2xl mx-auto">
            Trusted by industry leaders worldwide
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
              }}
              className="relative"
            >
              {/* Main Card */}
              <div className="relative p-10 md:p-12 rounded-3xl border border-cyan-500/30 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/[0.02] shadow-[0_0_80px_rgba(0,255,255,0.15)]">
                {/* Quote Icon */}
                <motion.div
                  className="absolute -top-6 left-10 w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.5)]"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Quote className="w-6 h-6 text-white" />
                </motion.div>

                {/* Content */}
                <div className="mb-8">
                  <p className="text-xl md:text-2xl text-cyan-100 leading-relaxed">
                    "{testimonials[currentIndex].content}"
                  </p>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <motion.div
                    className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${testimonials[currentIndex].color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {testimonials[currentIndex].avatar}
                    
                    {/* Glow Ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(0,255,255,0.5)',
                          '0 0 40px rgba(138,43,226,0.6)',
                          '0 0 20px rgba(0,255,255,0.5)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  <div>
                    <h4 className="text-xl font-bold text-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-cyan-400">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 right-10 w-32 h-32 border border-cyan-500/10 rounded-full -z-10" />
                <div className="absolute bottom-10 left-1/3 w-24 h-24 border border-violet-500/10 rounded-full -z-10" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'w-12 bg-gradient-to-r from-cyan-500 to-violet-600' 
                    : 'w-2 bg-cyan-500/30'
                }`}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* Background Testimonial Cards (Depth Effect) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl -z-10">
          <motion.div
            className="absolute inset-0 p-10 md:p-12 rounded-3xl border border-cyan-500/10 backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/[0.01]"
            style={{ transform: 'translateY(20px) scale(0.95)' }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 p-10 md:p-12 rounded-3xl border border-cyan-500/5 backdrop-blur-sm bg-gradient-to-br from-white/3 to-white/[0.005]"
            style={{ transform: 'translateY(40px) scale(0.9)' }}
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </div>
      </div>
    </section>
  );
}