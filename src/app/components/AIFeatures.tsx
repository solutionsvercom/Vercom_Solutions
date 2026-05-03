import { motion } from 'motion/react';
import { Bot, Workflow, BarChart3, Sparkles } from 'lucide-react';

export function AIFeatures() {
  return (
    <section className="relative py-20 sm:py-32 bg-[#0a0a0f] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
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
            className="inline-block mb-4 px-6 py-2 border border-violet-500/30 rounded-full backdrop-blur-sm bg-violet-500/5"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-violet-400 font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              AI-Powered Solutions
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Intelligent Automation
          </h2>
          <p className="text-xl text-cyan-100/60 max-w-2xl mx-auto">
            Harness the power of AI to transform your business operations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Feature Cards */}
          <div className="space-y-6">
            {[
              {
                icon: Bot,
                title: 'AI Chatbots',
                description: '24/7 intelligent customer support with natural language processing',
                color: 'from-cyan-500 to-blue-600',
              },
              {
                icon: Workflow,
                title: 'Workflow Automation',
                description: 'Streamline complex processes with smart automation flows',
                color: 'from-violet-500 to-purple-600',
              },
              {
                icon: BarChart3,
                title: 'Predictive Analytics',
                description: 'Data-driven insights for better business decisions',
                color: 'from-pink-500 to-rose-600',
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="group relative p-6 rounded-2xl border border-cyan-500/20 backdrop-blur-md bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-cyan-500/40 transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg group-hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-shadow`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-cyan-100/60">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: AI Dashboard Preview */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Dashboard Container */}
            <div className="relative p-8 rounded-3xl border border-cyan-500/30 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/[0.02] shadow-[0_0_80px_rgba(0,255,255,0.2)]">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-semibold">
                  AI Dashboard
                </div>
              </div>

              {/* Chatbot Preview */}
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border border-cyan-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">AI Assistant</div>
                    <div className="text-xs text-cyan-400">Online</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <motion.div
                    className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-sm text-cyan-100"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    How can I help you today?
                  </motion.div>
                  <motion.div
                    className="p-3 rounded-xl bg-violet-500/20 border border-violet-500/30 text-sm text-violet-100 ml-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    Show me analytics
                  </motion.div>
                </div>
              </div>

              {/* Automation Flow Diagram */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-violet-500/20">
                <div className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-violet-400" />
                  Automation Flow
                </div>
                
                <div className="flex items-center justify-between">
                  {['Input', 'AI Process', 'Output'].map((step, i) => (
                    <div key={i} className="flex items-center">
                      <motion.div
                        className="px-4 py-2 rounded-lg bg-gradient-to-br from-cyan-500/30 to-violet-500/30 border border-cyan-500/40 text-xs font-semibold text-white"
                        whileHover={{ scale: 1.05 }}
                        animate={{
                          boxShadow: [
                            '0 0 10px rgba(0,255,255,0.3)',
                            '0 0 20px rgba(138,43,226,0.4)',
                            '0 0 10px rgba(0,255,255,0.3)',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      >
                        {step}
                      </motion.div>
                      {i < 2 && (
                        <motion.div
                          className="w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-violet-500 mx-2"
                          animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 1] }}
                          transition={{ duration: 1, delay: i * 0.5, repeat: Infinity, repeatDelay: 1 }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Animated Data Streams */}
              <div className="absolute -z-10 inset-0">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              className="absolute -top-6 -right-6 px-6 py-3 rounded-2xl bg-gradient-to-br from-cyan-500/90 to-violet-600/90 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,255,0.4)]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-2xl font-bold text-white">98%</div>
              <div className="text-xs text-cyan-100">Accuracy</div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 px-6 py-3 rounded-2xl bg-gradient-to-br from-violet-500/90 to-pink-600/90 backdrop-blur-xl shadow-[0_0_30px_rgba(138,43,226,0.4)]"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-xs text-violet-100">Uptime</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}