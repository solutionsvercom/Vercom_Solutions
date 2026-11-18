import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { servicesData } from '../data/services';
import { BrandLogoBox } from './BrandLogoBox';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const navLinks = [
    { name: 'Solutions', href: '/solutions' },
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
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to="/" className="flex items-center gap-3">
              <BrandLogoBox />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  Vercom Solutions
                </h1>
                <p className="text-xs text-cyan-400/60">Think Forward Think Vercom</p>
              </div>
            </Link>
          </motion.div>

          <div className="hidden lg:flex items-center gap-8">
            <NavLink
              to="/solutions"
              className="relative text-cyan-100 hover:text-cyan-400 transition-colors font-semibold"
            >
              Solutions
            </NavLink>

            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 text-cyan-100 hover:text-cyan-400 transition-colors font-semibold"
                onClick={() => setServicesOpen((open) => !open)}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-3"
                  >
                    <div className="w-[34rem] max-h-[28rem] overflow-y-auto rounded-2xl border border-cyan-500/25 bg-[#0d0d16]/98 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-3">
                      <div className="grid grid-cols-2 gap-1">
                        {servicesData.map((service) => (
                          <Link
                            key={service.slug}
                            to={`/services/${service.slug}`}
                            onClick={() => setServicesOpen(false)}
                            className="px-3 py-2.5 rounded-xl text-sm text-cyan-100/85 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t border-cyan-500/15">
                        <Link
                          to="/services"
                          onClick={() => setServicesOpen(false)}
                          className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                        >
                          View all services →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks
              .filter((link) => link.name !== 'Solutions')
              .map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className="relative text-cyan-100 hover:text-cyan-400 transition-colors font-semibold"
                >
                  {link.name}
                </NavLink>
              ))}
          </div>

          <motion.div
            className="hidden lg:block px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold shadow-[0_0_30px_rgba(0,255,255,0.4)]"
            whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0,255,255,0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/get-started">Get Started</Link>
          </motion.div>

          <motion.button
            className="lg:hidden p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      <motion.div
        className="lg:hidden overflow-hidden"
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="px-4 pt-2 pb-6 space-y-3 border-t border-cyan-500/20 bg-[#0a0a0f]/95 backdrop-blur-xl">
          <Link
            to="/solutions"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-100 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors font-semibold"
          >
            Solutions
          </Link>

          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 overflow-hidden">
            <button
              type="button"
              onClick={() => setMobileServicesOpen((open) => !open)}
              className="w-full px-4 py-3 flex items-center justify-between text-cyan-100 font-semibold"
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {mobileServicesOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-cyan-500/15"
                >
                  <div className="max-h-64 overflow-y-auto py-2">
                    {servicesData.map((service) => (
                      <Link
                        key={service.slug}
                        to={`/services/${service.slug}`}
                        onClick={() => {
                          setIsOpen(false);
                          setMobileServicesOpen(false);
                        }}
                        className="block px-4 py-2.5 text-sm text-cyan-100/75 hover:text-cyan-300"
                      >
                        {service.title}
                      </Link>
                    ))}
                    <Link
                      to="/services"
                      onClick={() => {
                        setIsOpen(false);
                        setMobileServicesOpen(false);
                      }}
                      className="block px-4 py-2.5 text-sm font-semibold text-cyan-400"
                    >
                      View all services →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks
            .filter((link) => link.name !== 'Solutions')
            .map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-100 hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors font-semibold"
              >
                {link.name}
              </Link>
            ))}

          <Link
            to="/get-started"
            onClick={() => setIsOpen(false)}
            className="block w-full px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold text-center shadow-[0_0_30px_rgba(0,255,255,0.4)]"
          >
            Get Started
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
}
