import { motion } from 'motion/react';
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, MapPin, Phone, Zap } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    Services: [
      'SaaS Development',
      'CRM Solutions',
      'ERP (Enterprise Resource Planning)',
      'Web Development',
      'Digital Marketing',
      'Brand Advertisement & Luxury Promotion Shoots',
    ],
    Company: ['About Us', 'Why Choose Us', 'Industries', 'Contact'],
    Resources: ['Get Started', 'Case Studies', 'Consultation', 'Support'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-400' },
    { icon: Twitter, href: '#', color: 'hover:text-cyan-400' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-500' },
    { icon: Github, href: '#', color: 'hover:text-violet-400' },
  ];

  // Client logos for the scrolling banner
  const clientLogos = [
    { name: 'Microsoft', abbr: 'MS' },
    { name: 'Amazon', abbr: 'AMZ' },
    { name: 'Google', abbr: 'GOO' },
    { name: 'Meta', abbr: 'META' },
    { name: 'Apple', abbr: 'APL' },
    { name: 'Netflix', abbr: 'NFX' },
    { name: 'Tesla', abbr: 'TSLA' },
    { name: 'Nvidia', abbr: 'NVDA' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#1a0a2e] to-[#0a0a0f] border-t border-cyan-500/20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.4)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  Vercom Solutions
                </h2>
                <p className="text-xs text-cyan-400/60">Smart Digital Solutions</p>
              </div>
            </motion.div>
            <p className="text-cyan-100/60 mb-6 leading-relaxed">
              Transforming businesses through innovative digital solutions, scalable technology, and measurable business outcomes.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 ${social.color} transition-colors`}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <div key={index}>
              <h3 className="text-white font-bold mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link, i) => (
                  <li key={i}>
                    <motion.a
                      href="/"
                      className="text-cyan-100/60 hover:text-cyan-400 transition-colors inline-block"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Mail, text: 'solutionsvercom@gmail.com', color: 'from-cyan-500 to-blue-600' },
            { icon: Phone, text: '+91 7042183847', color: 'from-violet-500 to-purple-600' },
            { icon: MapPin, text: 'D-32 Third Floor, Main Vikas Marg, Laxmi Nagar, New Delhi-110092', color: 'from-pink-500 to-rose-600' },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="flex items-center gap-4 p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(0,255,255,0.1)' }}
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-cyan-100">{item.text}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Newsletter */}
        <motion.div
          className="mb-12 p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-cyan-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              Stay Updated
            </h3>
            <p className="text-cyan-100/60 mb-6">
              Subscribe to our newsletter for the latest updates and insights
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-cyan-500/30 text-white placeholder-cyan-100/40 focus:outline-none focus:border-cyan-500 transition-colors backdrop-blur-sm"
              />
              <motion.button
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold shadow-[0_0_30px_rgba(0,255,255,0.4)]"
                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0,255,255,0.6)' }}
                whileTap={{ scale: 0.95 }}
              >
              Get Started
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Client Logo Banner */}
        <div className="mb-12 overflow-hidden">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-cyan-400/80 tracking-wide">
              Join 15+ Companies
            </h3>
          </div>
          <div className="relative">
            {/* Gradient fade on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1a0a2e] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1a0a2e] to-transparent z-10" />
            
            {/* Scrolling container */}
            <div className="flex gap-12">
              {/* First set of logos */}
              <motion.div
                className="flex gap-12 flex-shrink-0"
                animate={{ x: ['0%', '-100%'] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                {clientLogos.map((client, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 w-32 h-20 flex flex-col items-center justify-center gap-1 px-6 py-3 rounded-xl border border-cyan-500/10 bg-cyan-500/5 backdrop-blur-sm grayscale hover:grayscale-0 transition-all duration-300"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                      borderColor: 'rgba(0, 255, 255, 0.3)',
                    }}
                  >
                    <span className="text-2xl font-bold text-cyan-400/60 hover:text-cyan-400 transition-colors">{client.abbr}</span>
                    <span className="text-xs text-cyan-100/40 hover:text-cyan-100/60 transition-colors">{client.name}</span>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Duplicate set for seamless loop */}
              <motion.div
                className="flex gap-12 flex-shrink-0"
                animate={{ x: ['0%', '-100%'] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                {clientLogos.map((client, index) => (
                  <motion.div
                    key={`duplicate-${index}`}
                    className="flex-shrink-0 w-32 h-20 flex flex-col items-center justify-center gap-1 px-6 py-3 rounded-xl border border-cyan-500/10 bg-cyan-500/5 backdrop-blur-sm grayscale hover:grayscale-0 transition-all duration-300"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                      borderColor: 'rgba(0, 255, 255, 0.3)',
                    }}
                  >
                    <span className="text-2xl font-bold text-cyan-400/60 hover:text-cyan-400 transition-colors">{client.abbr}</span>
                    <span className="text-xs text-cyan-100/40 hover:text-cyan-100/60 transition-colors">{client.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-cyan-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cyan-100/60 text-sm">
              © {new Date().getFullYear()} Vercom Solutions. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <motion.a
                href="/"
                className="text-cyan-100/60 hover:text-cyan-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="/"
                className="text-cyan-100/60 hover:text-cyan-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="/"
                className="text-cyan-100/60 hover:text-cyan-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                Cookies
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500" />
    </footer>
  );
}