import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { AIFeatures } from '../components/AIFeatures';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { Testimonials } from '../components/Testimonials';
import { Contact } from '../components/Contact';

export function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <AIFeatures />
      <ProcessTimeline />
      <Testimonials />
      <Contact />
    </>
  );
}
