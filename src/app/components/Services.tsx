import { motion } from 'motion/react';
import { Brush, Camera, Clapperboard, Code2, Megaphone, MonitorSmartphone, Palette, Smartphone, Sparkles, UserRoundSearch, UsersRound, Workflow } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicesData } from '../data/services';

const services = [
  {
    icon: Code2,
    title: 'SaaS Development',
    description: 'Scalable cloud-based software solutions with seamless integration',
    color: 'from-cyan-500 to-blue-600',
    glowColor: 'rgba(0, 255, 255, 0.5)',
  },
  {
    icon: UsersRound,
    title: 'CRM Solutions',
    description: 'Powerful customer relationship management to streamline operations',
    color: 'from-violet-500 to-purple-600',
    glowColor: 'rgba(138, 43, 226, 0.5)',
  },
  {
    icon: Workflow,
    title: 'ERP (Enterprise Resource Planning)',
    description: 'Integrated ERP systems to unify finance, operations, and inventory',
    color: 'from-blue-500 to-indigo-600',
    glowColor: 'rgba(59, 130, 246, 0.5)',
  },
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    description: 'Native and cross-platform apps delivering exceptional experiences',
    color: 'from-pink-500 to-rose-600',
    glowColor: 'rgba(236, 72, 153, 0.5)',
  },
  {
    icon: Sparkles,
    title: 'AI & Machine Learning',
    description: 'Intelligent automation transforming data into actionable insights',
    color: 'from-emerald-500 to-teal-600',
    glowColor: 'rgba(16, 185, 129, 0.5)',
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    description: 'Creative visual solutions bringing your brand identity to life',
    color: 'from-orange-500 to-amber-600',
    glowColor: 'rgba(249, 115, 22, 0.5)',
  },
  {
    icon: MonitorSmartphone,
    title: 'Website Design',
    description: 'Modern responsive designs that captivate and convert visitors',
    color: 'from-indigo-500 to-blue-600',
    glowColor: 'rgba(99, 102, 241, 0.5)',
  },
  {
    icon: Code2,
    title: 'Web Development',
    description: 'High-performance applications using cutting-edge technologies',
    color: 'from-cyan-500 to-blue-600',
    glowColor: 'rgba(0, 255, 255, 0.5)',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Data-driven strategies maximizing ROI and digital footprint',
    color: 'from-emerald-500 to-teal-600',
    glowColor: 'rgba(16, 185, 129, 0.5)',
  },
  {
    icon: UserRoundSearch,
    title: 'Social Media Marketing',
    description: 'Engaging campaigns that build communities and amplify reach',
    color: 'from-orange-500 to-amber-600',
    glowColor: 'rgba(249, 115, 22, 0.5)',
  },
  {
    icon: Clapperboard,
    title: 'Audio Video Editing',
    description: 'Professional editing transforming footage into compelling stories',
    color: 'from-indigo-500 to-blue-600',
    glowColor: 'rgba(99, 102, 241, 0.5)',
  },
  {
    icon: Brush,
    title: 'Motion Graphics & VFX',
    description: 'Eye-catching visual effects that elevate your content',
    color: 'from-pink-500 to-rose-600',
    glowColor: 'rgba(236, 72, 153, 0.5)',
  },
  {
    icon: Sparkles,
    title: 'Animation',
    description: '2D and 3D animation bringing ideas to life with storytelling',
    color: 'from-indigo-500 to-blue-600',
    glowColor: 'rgba(99, 102, 241, 0.5)',
  },
  {
    icon: Camera,
    title: 'Brand Advertisement & Luxury Promotion Shoots',
    description: 'Premium brand campaigns and luxury promotion shoots for advertising and high-end marketing',
    color: 'from-amber-500 to-orange-600',
    glowColor: 'rgba(245, 158, 11, 0.5)',
  },
];

export function Services() {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-[#0a0a0f] to-[#1a0a2e] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,255,0.05),transparent_50%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-4 px-6 py-2 border border-cyan-500/30 rounded-full backdrop-blur-sm bg-cyan-500/5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-cyan-400 font-semibold">Our Services</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent px-4">
            What We Offer
          </h2>
          <p className="text-lg sm:text-xl text-cyan-100/60 max-w-2xl mx-auto px-4">
            Designed to accelerate growth and digital transformation across every touchpoint
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === index;
            const targetService = servicesData[index];
            
            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                {/* Glow Effect - Always Visible Behind Card */}
                <motion.div
                  className="absolute -inset-4 rounded-3xl blur-2xl opacity-20 md:opacity-0 md:group-hover:opacity-60 transition-opacity duration-500 -z-10"
                  style={{ background: service.glowColor }}
                  animate={
                    isHovered
                      ? { scale: [1, 1.05, 1], opacity: [0.6, 0.7, 0.6] }
                      : {}
                  }
                  transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                />

                {/* Card */}
                <motion.div
                  className="relative h-full p-6 sm:p-8 rounded-3xl border border-cyan-500/20 backdrop-blur-md bg-gradient-to-br from-white/5 to-white/[0.02] overflow-hidden"
                  onClick={() => navigate(`/services/${targetService.slug}`)}
                  whileHover={{ 
                    y: -10, 
                    rotateX: 5,
                    rotateY: 5,
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  {/* Border Glow Animation */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      border: `2px solid transparent`,
                      background: `linear-gradient(135deg, ${service.glowColor}, transparent) border-box`,
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />

                  {/* 3D Icon Container */}
                  <motion.div
                    className={`relative mb-6 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center`}
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      boxShadow: isHovered ? `0 20px 40px ${service.glowColor}` : 'none',
                    }}
                  >
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    
                    {/* Icon Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      animate={{
                        boxShadow: isHovered
                          ? [`0 0 20px ${service.glowColor}`, `0 0 40px ${service.glowColor}`, `0 0 20px ${service.glowColor}`]
                          : 'none',
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-cyan-100/60 leading-relaxed text-sm sm:text-base">
                    {service.description}
                  </p>

                  {/* Hover Arrow */}
                  <motion.div
                    className="mt-4 sm:mt-6 flex items-center gap-2 text-cyan-400 font-semibold text-sm sm:text-base"
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                  >
                    <span>Learn More</span>
                    <motion.span
                      animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                      transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                    >
                      →
                    </motion.span>
                  </motion.div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-16 h-16 sm:w-20 sm:h-20 border border-cyan-500/10 rounded-full" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 sm:w-16 sm:h-16 border border-violet-500/10 rounded-full" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}