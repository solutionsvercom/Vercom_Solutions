import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';

const spotlightProjectLinks: { label: string; url?: string }[] = [
  { label: 'YMB Go Express', url: 'https://ymbgoexpress.in/' },
  { label: 'Utkarsh Infratech', url: 'https://utkarshinfratech.com/' },
  { label: 'Navjyoti Kids Villa School', url: 'https://www.navjyotikidsvillaschool.in/' },
  { label: 'KYK', url: 'https://www.knockyourknowledge.com/' },
  { label: 'Lifee', url: 'https://lifeeh2o.com/' },
  { label: 'Aid For Mankind', url: 'https://www.aidformankind.org/' },
  { label: 'ReviewMyFlat', url: 'https://www.reviewmyflat.com/' },
  { label: 'karakchaa' },
];

const projects = [
  {
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Modern online shopping experience with AI recommendations',
    tags: ['React', 'Node.js', 'AI'],
    color: 'from-cyan-500 to-blue-600',
    gradient: 'from-cyan-500/20 to-blue-600/20',
  },
  {
    title: 'Mobile Banking App',
    category: 'App Development',
    description: 'Secure and intuitive mobile banking solution',
    tags: ['React Native', 'Blockchain', 'Security'],
    color: 'from-violet-500 to-purple-600',
    gradient: 'from-violet-500/20 to-purple-600/20',
  },
  {
    title: 'AI ChatBot System',
    category: 'AI Solutions',
    description: 'Intelligent customer support automation',
    tags: ['NLP', 'Python', 'TensorFlow'],
    color: 'from-pink-500 to-rose-600',
    gradient: 'from-pink-500/20 to-rose-600/20',
  },
  {
    title: 'SaaS Dashboard',
    category: 'UI/UX Design',
    description: 'Analytics platform for business intelligence',
    tags: ['Next.js', 'TypeScript', 'D3.js'],
    color: 'from-emerald-500 to-teal-600',
    gradient: 'from-emerald-500/20 to-teal-600/20',
  },
  {
    title: 'Crypto Trading Bot',
    category: 'Automation',
    description: 'Automated trading with machine learning',
    tags: ['Python', 'ML', 'API'],
    color: 'from-orange-500 to-amber-600',
    gradient: 'from-orange-500/20 to-amber-600/20',
  },
  {
    title: 'Social Media Manager',
    category: 'Digital Marketing',
    description: 'Unified platform for social media management',
    tags: ['React', 'API', 'Analytics'],
    color: 'from-indigo-500 to-blue-600',
    gradient: 'from-indigo-500/20 to-blue-600/20',
  },
];

type PortfolioProps = {
  /** When false, project cards are blurred until the visitor unlocks via the form below. */
  accessUnlocked?: boolean;
  children?: ReactNode;
};

export function Portfolio({ accessUnlocked = true, children }: PortfolioProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const locked = !accessUnlocked;

  return (
    <section className="relative py-20 sm:py-32 bg-[#0a0a0f] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-violet-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className={`text-center ${locked ? 'mb-5 sm:mb-6' : 'mb-12 sm:mb-20'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-4 px-6 py-2 border border-violet-500/30 rounded-full backdrop-blur-sm bg-violet-500/5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-violet-400 font-semibold">Portfolio</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent px-4">
            Our Work
          </h2>
          <p className="text-lg sm:text-xl text-cyan-100/60 max-w-2xl mx-auto px-4">
            Transforming ideas into digital reality
          </p>
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-5xl mx-auto px-2">
            {spotlightProjectLinks.map((item) => {
              const subject = `Inquiry about: ${item.label}`;
              const chipActive =
                'inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border border-cyan-500/35 ' +
                'bg-cyan-500/[0.07] text-cyan-100 hover:border-cyan-400/55 hover:bg-cyan-500/15 hover:text-white ' +
                'transition-colors shadow-[0_0_20px_rgba(0,255,255,0.06)]';
              const chipLocked =
                'inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border border-cyan-500/20 ' +
                'bg-cyan-500/[0.04] text-cyan-100/50 cursor-not-allowed select-none';

              if (locked) {
                return (
                  <span key={item.label} className={chipLocked} aria-disabled="true">
                    {item.label}
                  </span>
                );
              }

              if (item.url) {
                return (
                  <motion.a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={chipActive}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {item.label}
                    <ExternalLink className="w-3.5 h-3.5 opacity-80 shrink-0" aria-hidden />
                  </motion.a>
                );
              }
              return (
                <motion.div key={item.label} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex">
                  <Link
                    to={`/contact?subject=${encodeURIComponent(subject)}`}
                    className={chipActive}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </div>
          {locked && (
            <p className="mt-5 text-sm text-cyan-100/55 max-w-xl mx-auto px-4 leading-relaxed">
              Use the form below with your email and phone to open the project links and full gallery.
            </p>
          )}
        </motion.div>

        {locked && children ? <div className="mb-6 sm:mb-8">{children}</div> : null}

        {/* Projects Grid */}
        <div className="relative rounded-[2rem]">
          <div
            className={
              locked
                ? 'pointer-events-none select-none blur-[7px] opacity-55 sm:blur-[6px]'
                : ''
            }
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => {
            const isHovered = !locked && hoveredIndex === index;

            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => !locked && setHoveredIndex(index)}
                onHoverEnd={() => !locked && setHoveredIndex(null)}
              >
                {/* 3D Tilted Card */}
                <motion.div
                  className="relative h-full"
                  whileHover={{ 
                    y: -10,
                    rotateY: 5,
                    rotateX: 5,
                    z: 50,
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Card Container */}
                  <div className="relative h-full rounded-3xl border border-cyan-500/20 backdrop-blur-md bg-gradient-to-br from-white/5 to-white/[0.02] overflow-hidden">
                    {/* Project Preview (Mockup) */}
                    <div className={`relative h-64 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                      {/* Laptop Mockup */}
                      <motion.div
                        className="relative w-4/5"
                        animate={isHovered ? { scale: 1.05, y: -10 } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Screen */}
                        <div className={`relative rounded-t-lg border-4 border-gray-800 bg-gradient-to-br ${project.color} p-4`}>
                          <div className="aspect-video bg-gradient-to-br from-white/10 to-white/5 rounded backdrop-blur-sm flex items-center justify-center">
                            <div className="text-white/40 text-4xl font-bold">
                              {project.title.substring(0, 2)}
                            </div>
                          </div>
                        </div>
                        {/* Base */}
                        <div className="h-2 bg-gray-800 rounded-b-lg" />
                        <div className="h-1 w-1/2 mx-auto bg-gray-700 rounded-b" />
                      </motion.div>

                      {/* Hover Overlay */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${project.color} flex items-center justify-center gap-4`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 0.9 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.button
                          className="p-4 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink className="w-6 h-6 text-white" />
                        </motion.button>
                        <motion.button
                          className="p-4 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github className="w-6 h-6 text-white" />
                        </motion.button>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className={`inline-block mb-3 px-3 py-1 rounded-full bg-gradient-to-r ${project.color} text-white text-xs font-semibold`}>
                        {project.category}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-cyan-100/60 mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Border Glow on Hover */}
                    <motion.div
                      className={`absolute inset-0 rounded-3xl border-2`}
                      style={{ borderColor: 'rgba(0,255,255,0)' }}
                      animate={{
                        borderColor: isHovered ? ['rgba(0,255,255,0.5)', 'rgba(138,43,226,0.5)', 'rgba(0,255,255,0.5)'] : 'rgba(0,255,255,0)',
                      }}
                      transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                    />
                  </div>

                  {/* 3D Shadow */}
                  <div 
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 blur-2xl -z-10 transition-opacity duration-300`}
                    style={{ transform: 'translateZ(-50px)' }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
            </div>
          </div>
          {locked && (
            <div
              className="absolute inset-0 flex items-end justify-center rounded-[2rem] bg-gradient-to-t from-[#0a0a0f]/65 via-transparent to-transparent px-4 pb-4 pointer-events-none"
              aria-hidden
            >
              <p className="text-center text-xs sm:text-sm font-medium text-cyan-100/65">
                Blurred preview — unlock with the form above
              </p>
            </div>
          )}
        </div>

        {!locked && children}
      </div>
    </section>
  );
}