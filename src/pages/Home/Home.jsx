import React from 'react';
import Hero from '../../components/Hero';
import Stats from '../../components/Stats';
import Features from '../../components/Features';
import HowItWorks from '../../components/HowItWorks';
import Testimonials from '../../components/Testimonials';
import CTA from '../../components/CTA';
import Footer from '../../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
