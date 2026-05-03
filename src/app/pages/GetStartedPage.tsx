import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Clapperboard,
  Code2,
  Megaphone,
  MonitorSmartphone,
  Palette,
  Smartphone,
  Sparkles,
  UserRoundSearch,
  UsersRound,
  Workflow,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { AiCustomizeNavigationState } from '../components/AIChatbot';

const services = [
  { name: 'SaaS Development', icon: Code2 },
  { name: 'CRM Solutions', icon: UsersRound },
  { name: 'ERP', icon: Workflow },
  { name: 'Mobile Apps', icon: Smartphone },
  { name: 'AI & Machine Learning', icon: Sparkles },
  { name: 'Graphic Design', icon: Palette },
  { name: 'Website Design', icon: MonitorSmartphone },
  { name: 'Web Development', icon: Code2 },
  { name: 'Digital Marketing', icon: Megaphone },
  { name: 'Social Media Marketing', icon: UserRoundSearch },
  { name: 'Audio Video Editing', icon: Clapperboard },
  { name: 'Motion Graphics & VFX', icon: Clapperboard },
  { name: 'Animation', icon: Sparkles },
  { name: 'Brand Advertisement & Luxury Promotion Shoots', icon: Camera },
];

export function GetStartedPage() {
  const location = useLocation();
  const aiStateConsumed = useRef(false);
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [industry, setIndustry] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (aiStateConsumed.current) return;
    const st = location.state as AiCustomizeNavigationState | null;
    if (!st?.fromAiCustomize) return;
    aiStateConsumed.current = true;

    if (st.services.length > 0) {
      setSelectedServices((prev) => {
        const merged = new Set([...prev, ...st.services]);
        return Array.from(merged);
      });
    }
    if (st.industryHint) setIndustry(st.industryHint);

    const descParts: string[] = [];
    if (st.customizationNotes) descParts.push(st.customizationNotes);
    if (st.featurePicks.length > 0) descParts.push(`Selected focus areas: ${st.featurePicks.join(', ')}`);
    if (descParts.length > 0) {
      setProjectDescription((prev) => (prev ? `${prev}\n\n${descParts.join('\n\n')}` : descParts.join('\n\n')));
    }
  }, [location.state]);

  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName) ? prev.filter((item) => item !== serviceName) : [...prev, serviceName]
    );
  };

  const goNext = () => {
    if (step === 1 && selectedServices.length === 0) {
      setStatus('Please select at least one service.');
      return;
    }

    if (step === 2 && (!firstName || !lastName || !email || !phone)) {
      setStatus('Please fill all required personal details.');
      return;
    }

    setStatus(null);
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const goBack = () => {
    setStatus(null);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Submitting...');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'get_started',
          name: `${firstName} ${lastName}`.trim(),
          email,
          phone,
          company,
          industry,
          budgetRange,
          subject: `Get Started — ${selectedServices.join(', ') || 'General Inquiry'}`,
          message: [
            `Project description: ${projectDescription || 'Not provided'}`,
            `Additional notes: ${message || 'None'}`,
          ].join('\n'),
          selectedServices,
          meta: { origin: 'get_started_wizard' },
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Submission failed');
      }
      setStatus('Your project request has been submitted.');
      setSelectedServices([]);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setIndustry('');
      setBudgetRange('');
      setProjectDescription('');
      setMessage('');
      setStep(1);
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Something went wrong';
      setStatus(text);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen py-32 bg-gradient-to-b from-[#0a0a0f] to-[#1a0a2e]">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-cyan-400 font-semibold mb-3">Get Started</p>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Start Your Project
          </h1>
          <p className="mt-5 text-cyan-100/70">
            Tell us about your project and we'll create a customized solution for you.
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((dot, index) => (
            <div key={dot} className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= dot ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white' : 'bg-white/10 text-cyan-100/60'
                }`}
              >
                {step > dot ? <Check className="w-4 h-4" /> : dot}
              </div>
              {index < 2 && <div className={`w-10 h-0.5 ${step > dot ? 'bg-cyan-400' : 'bg-white/20'}`} />}
            </div>
          ))}
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="p-8 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {step === 1 && (
            <>
              <div>
                <h2 className="text-white text-xl font-semibold mb-1">Select Services</h2>
                <p className="text-cyan-100/65 text-sm">Choose the services you're interested in.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {services.map((service) => {
                  const Icon = service.icon;
                  const selected = selectedServices.includes(service.name);
                  return (
                    <button
                      key={service.name}
                      type="button"
                      onClick={() => toggleService(service.name)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selected
                          ? 'border-cyan-400 bg-cyan-500/20 text-white'
                          : 'border-cyan-500/20 bg-white/5 text-cyan-100/80'
                      }`}
                    >
                      <Icon className="w-4 h-4 mb-2" />
                      <p className="text-sm font-medium">{service.name}</p>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <h2 className="text-white text-xl font-semibold mb-1">Your Information</h2>
                <p className="text-cyan-100/65 text-sm">Tell us about yourself and your company.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required placeholder="First Name *" className="w-full px-5 py-3 rounded-xl bg-white/5 border border-cyan-500/30 text-white placeholder-cyan-100/40 focus:outline-none" />
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} required placeholder="Last Name *" className="w-full px-5 py-3 rounded-xl bg-white/5 border border-cyan-500/30 text-white placeholder-cyan-100/40 focus:outline-none" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Email *" className="w-full px-5 py-3 rounded-xl bg-white/5 border border-cyan-500/30 text-white placeholder-cyan-100/40 focus:outline-none" />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="Phone *" className="w-full px-5 py-3 rounded-xl bg-white/5 border border-cyan-500/30 text-white placeholder-cyan-100/40 focus:outline-none" />
                <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" className="w-full px-5 py-3 rounded-xl bg-white/5 border border-cyan-500/30 text-white placeholder-cyan-100/40 focus:outline-none" />
                <input value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="Industry" className="w-full px-5 py-3 rounded-xl bg-white/5 border border-cyan-500/30 text-white placeholder-cyan-100/40 focus:outline-none" />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <h2 className="text-white text-xl font-semibold mb-1">Project Details</h2>
                <p className="text-cyan-100/65 text-sm">Tell us more about your project.</p>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <CircleDollarSign className="w-4 h-4 text-cyan-300/70 absolute left-4 top-1/2 -translate-y-1/2" />
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full pl-11 pr-5 py-3 rounded-xl bg-white/5 border border-cyan-500/30 text-white focus:outline-none"
                  >
                    <option value="" className="text-black">
                      Select Budget Range
                    </option>
                    <option value="Under 50k" className="text-black">
                      Under 50k
                    </option>
                    <option value="50k - 2L" className="text-black">
                      50k - 2L
                    </option>
                    <option value="2L - 10L" className="text-black">
                      2L - 10L
                    </option>
                    <option value="10L+" className="text-black">
                      10L+
                    </option>
                  </select>
                </div>
                <textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  required
                  rows={5}
                  placeholder="Project description"
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-cyan-500/30 text-white placeholder-cyan-100/40 focus:outline-none resize-none"
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Any additional notes..."
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-cyan-500/30 text-white placeholder-cyan-100/40 focus:outline-none resize-none"
                />
              </div>
            </>
          )}

          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 1 || isSubmitting}
              className="px-5 py-3 rounded-xl border border-cyan-500/30 text-cyan-100 disabled:opacity-40 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={goNext}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold flex items-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {status && (
            <p className="text-cyan-100/80 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              {status}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
