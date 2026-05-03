import { motion } from 'motion/react';
import { Search, FileText, Palette, Code, Rocket, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Discover',
    description: 'We analyze your needs and goals to create the perfect strategy',
    color: 'from-cyan-500 to-blue-600',
    glowColor: 'rgba(0, 255, 255, 0.5)',
  },
  {
    icon: FileText,
    title: 'Plan',
    description: 'Detailed roadmap and timeline for your project success',
    color: 'from-violet-500 to-purple-600',
    glowColor: 'rgba(138, 43, 226, 0.5)',
  },
  {
    icon: Palette,
    title: 'Design',
    description: 'Beautiful, intuitive interfaces that users love',
    color: 'from-pink-500 to-rose-600',
    glowColor: 'rgba(236, 72, 153, 0.5)',
  },
  {
    icon: Code,
    title: 'Develop',
    description: 'Building robust, scalable solutions with cutting-edge tech',
    color: 'from-emerald-500 to-teal-600',
    glowColor: 'rgba(16, 185, 129, 0.5)',
  },
  {
    icon: Rocket,
    title: 'Launch',
    description: 'Seamless deployment and go-live support',
    color: 'from-orange-500 to-amber-600',
    glowColor: 'rgba(249, 115, 22, 0.5)',
  },
  {
    icon: TrendingUp,
    title: 'Scale',
    description: 'Continuous optimization and growth strategies',
    color: 'from-indigo-500 to-blue-600',
    glowColor: 'rgba(99, 102, 241, 0.5)',
  },
];

export function ProcessTimeline() {
  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-[#1a0a2e] to-[#0a0a0f] overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

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
            <span className="text-cyan-400 font-semibold">Our Process</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            How We Work
          </h2>
          <p className="text-xl text-cyan-100/60 max-w-2xl mx-auto">
            A proven methodology that delivers exceptional results
          </p>
        </motion.div>

        {/* Timeline - Desktop */}
        <div className="hidden lg:block relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2">
            <div className="relative h-full bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-cyan-500/20 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500"
                initial={{ x: '-100%' }}
                whileInView={{ x: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-6 gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, y: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Card */}
                  <div className={`${isEven ? 'mb-20' : 'mt-20'} w-full`}>
                    <motion.div
                      className="relative p-6 rounded-2xl border border-cyan-500/20 backdrop-blur-md bg-gradient-to-br from-white/5 to-white/[0.02] group"
                      whileHover={{ 
                        scale: 1.05, 
                        rotateY: 5,
                        boxShadow: `0 20px 40px ${step.glowColor}`,
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Icon */}
                      <motion.div
                        className={`mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-white mb-2 text-center group-hover:text-cyan-400 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm text-cyan-100/60 text-center leading-relaxed">
                        {step.description}
                      </p>

                      {/* Step Number */}
                      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_20px_rgba(0,255,255,0.5)]">
                        {index + 1}
                      </div>
                    </motion.div>
                  </div>

                  {/* Connecting Dot */}
                  <motion.div
                    className={`absolute ${isEven ? 'bottom-16' : 'top-16'} w-6 h-6 rounded-full bg-gradient-to-br ${step.color} border-4 border-[#0a0a0f] shadow-[0_0_20px_${step.glowColor}]`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ scale: 1.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        boxShadow: [
                          `0 0 10px ${step.glowColor}`,
                          `0 0 30px ${step.glowColor}`,
                          `0 0 10px ${step.glowColor}`,
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Timeline - Mobile/Tablet (Vertical) */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={index}
                className="relative flex gap-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Timeline Line */}
                <div className="relative flex flex-col items-center">
                  {/* Dot */}
                  <motion.div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold shadow-[0_0_20px_${step.glowColor}] z-10`}
                    whileHover={{ scale: 1.2 }}
                  >
                    {index + 1}
                  </motion.div>

                  {/* Line */}
                  {index < steps.length - 1 && (
                    <div className="w-1 flex-1 bg-gradient-to-b from-cyan-500/40 to-violet-500/40 my-2" />
                  )}
                </div>

                {/* Card */}
                <motion.div
                  className="flex-1 p-6 rounded-2xl border border-cyan-500/20 backdrop-blur-md bg-gradient-to-br from-white/5 to-white/[0.02]"
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: `0 20px 40px ${step.glowColor}`,
                  }}
                >
                  <motion.div
                    className={`mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-3 hover:text-cyan-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-cyan-100/60 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}