import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function Contact() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const subject = searchParams.get('subject')?.trim();
    if (!subject) return;
    setFormData((prev) => (prev.subject ? prev : { ...prev, subject }));
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Could not send message.');
      }

      setSubmitMessage({ type: 'success', text: 'Message sent successfully. We will contact you soon.' });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong.';
      setSubmitMessage({ type: 'error', text: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: (
        <>
          <a
            href="mailto:tech@vercomsolutions.in"
            className="block hover:text-cyan-300 transition-colors"
          >
            tech@vercomsolutions.in
          </a>
          <a
            href="mailto:contact@vercomsolutions.in"
            className="block hover:text-cyan-300 transition-colors"
          >
            contact@vercomsolutions.in
          </a>
        </>
      ),
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 7042183847',
      color: 'from-violet-500 to-purple-600',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Laxmi Nagar, New Delhi',
      color: 'from-pink-500 to-rose-600',
    },
  ];

  return (
    <section className="relative py-20 sm:py-32 bg-gradient-to-b from-[#0a0a0f] to-[#1a0a2e] overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-600/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-violet-600/20 rounded-full blur-[150px]" />

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
            <span className="text-violet-400 font-semibold">Contact Us</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Let's Build Together
          </h2>
          <p className="text-xl text-cyan-100/60 max-w-2xl mx-auto">
            Ready to transform your business? Get in touch with us today
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative p-8 rounded-3xl border border-cyan-500/20 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/[0.02] shadow-[0_0_80px_rgba(0,255,255,0.1)]">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-cyan-100 mb-2 font-semibold">
                    Your Name
                  </label>
                  <motion.div
                    className="relative"
                    animate={{
                      boxShadow: focusedField === 'name' 
                        ? '0 0 30px rgba(0,255,255,0.3)' 
                        : 'none',
                    }}
                  >
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-6 py-4 rounded-xl bg-white/5 border border-cyan-500/30 text-white placeholder-cyan-100/40 focus:outline-none focus:border-cyan-500 transition-colors backdrop-blur-sm"
                      placeholder="John Doe"
                      required
                    />
                  </motion.div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-cyan-100 mb-2 font-semibold">
                    Email Address
                  </label>
                  <motion.div
                    animate={{
                      boxShadow: focusedField === 'email' 
                        ? '0 0 30px rgba(0,255,255,0.3)' 
                        : 'none',
                    }}
                  >
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-6 py-4 rounded-xl bg-white/5 border border-cyan-500/30 text-white placeholder-cyan-100/40 focus:outline-none focus:border-cyan-500 transition-colors backdrop-blur-sm"
                      placeholder="john@example.com"
                      required
                    />
                  </motion.div>
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-cyan-100 mb-2 font-semibold">
                    Subject
                  </label>
                  <motion.div
                    animate={{
                      boxShadow: focusedField === 'subject' 
                        ? '0 0 30px rgba(0,255,255,0.3)' 
                        : 'none',
                    }}
                  >
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-6 py-4 rounded-xl bg-white/5 border border-cyan-500/30 text-white placeholder-cyan-100/40 focus:outline-none focus:border-cyan-500 transition-colors backdrop-blur-sm"
                      placeholder="Project Inquiry"
                      required
                    />
                  </motion.div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-cyan-100 mb-2 font-semibold">
                    Message
                  </label>
                  <motion.div
                    animate={{
                      boxShadow: focusedField === 'message' 
                        ? '0 0 30px rgba(0,255,255,0.3)' 
                        : 'none',
                    }}
                  >
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows={5}
                      className="w-full px-6 py-4 rounded-xl bg-white/5 border border-cyan-500/30 text-white placeholder-cyan-100/40 focus:outline-none focus:border-cyan-500 transition-colors backdrop-blur-sm resize-none"
                      placeholder="Tell us about your project..."
                      required
                    />
                  </motion.div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-xl font-semibold text-white overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.4)]"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(0,255,255,0.6)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
                {submitMessage && (
                  <p
                    className={`text-sm text-center ${
                      submitMessage.type === 'success' ? 'text-emerald-300' : 'text-red-300'
                    }`}
                  >
                    {submitMessage.text}
                  </p>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    className="group relative p-6 rounded-2xl border border-cyan-500/20 backdrop-blur-md bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-cyan-500/40 transition-all"
                    whileHover={{ x: 10, scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-xl bg-gradient-to-br ${info.color} shadow-lg group-hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-shadow`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-cyan-100/60 text-sm mb-1">
                          {info.title}
                        </h4>
                        <div className="text-white font-semibold text-lg flex flex-col gap-0.5">
                          {info.value}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Map Container */}
            <motion.div
              className="relative h-96 rounded-3xl border border-cyan-500/20 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/[0.02] overflow-hidden shadow-[0_0_80px_rgba(0,255,255,0.1)]"
              whileHover={{ scale: 1.02 }}
            >
              {/* Placeholder Map */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                  <p className="text-cyan-100 font-semibold">D-32 Third Floor, Main Vikas Marg</p>
                  <p className="text-cyan-100/60 text-sm mt-2">Interactive Map</p>
                </div>
              </div>

              {/* Map Grid Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />

              {/* Animated Pin */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 shadow-[0_0_30px_rgba(0,255,255,0.8)]" />
              </motion.div>
            </motion.div>

            {/* CTA */}
            <motion.div
              className="p-8 rounded-2xl border border-violet-500/20 backdrop-blur-md bg-gradient-to-br from-violet-500/10 to-cyan-500/10"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Book a Free Consultation
              </h3>
              <p className="text-cyan-100/60 mb-6">
                Let's discuss how we can help transform your business with cutting-edge technology
              </p>
              <motion.button
                className="w-full px-6 py-3 rounded-xl border-2 border-violet-500/50 text-violet-400 font-semibold hover:bg-violet-500/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Meeting →
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}