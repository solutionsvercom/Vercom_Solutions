import { motion } from 'motion/react';
import { Menu, X, Zap } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0a0a0f]/80 border-b border-cyan-500/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to="/" className="flex items-center gap-3">
              <motion.div
                className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.4)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Zap className="w-6 h-6 text-white" />
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(0,255,255,0.4)',
                      '0 0 40px rgba(138,43,226,0.5)',
                      '0 0 20px rgba(0,255,255,0.4)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  Vercom Solutions
                </h1>
                <p className="text-xs text-cyan-400/60">Think Forward Think Vercom</p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={index}
                className="relative text-cyan-100 hover:text-cyan-400 transition-colors font-semibold group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <NavLink to={link.href}>{link.name}</NavLink>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            className="hidden lg:block px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold shadow-[0_0_30px_rgba(0,255,255,0.4)]"
            whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0,255,255,0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/get-started">Get Started</Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="lg:hidden overflow-hidden"
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="px-4 pt-2 pb-6 space-y-3 border-t border-cyan-500/20 bg-[#0a0a0f]/95 backdrop-blur-xl">
          {navLinks.map((link, index) => (
            <motion.div
              key={index}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-100 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors font-semibold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <NavLink to={link.href}>{link.name}</NavLink>
            </motion.div>
          ))}
          <motion.div
            className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold shadow-[0_0_30px_rgba(0,255,255,0.4)]"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
            transition={{ delay: navLinks.length * 0.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to="/get-started" className="block text-center">
              Get Started
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
}