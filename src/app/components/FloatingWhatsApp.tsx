import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { fireAndForgetLead } from '../lib/submitLead';

const WA_LINK = 'https://wa.me/918384045913';

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  const logWhatsAppIntent = () => {
    fireAndForgetLead({
      source: 'whatsapp_intent',
      name: 'WhatsApp widget',
      subject: 'WhatsApp CTA',
      message: 'User opened “Start Chat on WhatsApp” from the site widget.',
      meta: { link: WA_LINK },
    });
  };

  return (
    <>
      {/* WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      >
        <motion.button
          className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-[0_0_30px_rgba(34,197,94,0.5)] flex items-center justify-center"
          whileHover={{ scale: 1.1, boxShadow: '0 0 50px rgba(34,197,94,0.7)' }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          animate={{
            boxShadow: [
              '0 0 30px rgba(34,197,94,0.5)',
              '0 0 50px rgba(34,197,94,0.7)',
              '0 0 30px rgba(34,197,94,0.5)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="whatsapp"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="close"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <X className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-green-500"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Notification Badge */}
          {!isOpen && (
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              1
            </motion.div>
          )}
        </motion.button>

        {/* Tooltip - Hidden on mobile */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className="hidden sm:block absolute bottom-full right-0 mb-4 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold whitespace-nowrap shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.5 }}
            >
              Chat on WhatsApp
              <div className="absolute top-full right-4 w-3 h-3 bg-green-500 transform rotate-45 -translate-y-1/2" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* WhatsApp Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-4 left-4 sm:bottom-32 sm:right-8 sm:left-auto z-50 sm:w-96"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="relative rounded-3xl border border-green-500/30 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/[0.02] shadow-[0_0_80px_rgba(34,197,94,0.3)] overflow-hidden">
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-600">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-white"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg">Vercom Solutions</h3>
                    <p className="text-green-100 text-sm">Typically replies instantly</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-6 space-y-4 max-h-80 overflow-y-auto">
                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="p-4 rounded-2xl rounded-tl-none bg-green-500/20 border border-green-500/30">
                      <p className="text-cyan-100">
                        Hi there! 👋
                      </p>
                    </div>
                    <p className="text-xs text-cyan-100/40 mt-1">Just now</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="p-4 rounded-2xl rounded-tl-none bg-green-500/20 border border-green-500/30">
                      <p className="text-cyan-100">
                        How can we help you today? Feel free to ask about our services!
                      </p>
                    </div>
                    <p className="text-xs text-cyan-100/40 mt-1">Just now</p>
                  </div>
                </motion.div>
              </div>

              {/* CTA Button */}
              <div className="p-6 border-t border-green-500/20">
                <motion.a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => logWhatsAppIntent()}
                  className="block w-full px-6 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-center shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(34,197,94,0.6)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Chat on WhatsApp
                </motion.a>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-20 right-4 w-24 h-24 border border-green-500/10 rounded-full -z-10" />
              <div className="absolute bottom-20 left-4 w-16 h-16 border border-emerald-500/10 rounded-full -z-10" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}