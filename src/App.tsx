import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { HydrationCalculator } from './components/HydrationCalculator';
import { WaitlistSection } from './components/WaitlistSection';
import { Footer } from './components/Footer';
import { PitchDeck } from './components/deck/PitchDeck';
import { Presentation, Globe } from 'lucide-react';

export default function App() {
  const [liveIntakeLogged, setLiveIntakeLogged] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'landing' | 'pitchDeck'>('pitchDeck'); // default to pitch deck as requested!

  const handleIntakeLogged = (amount: number) => {
    setLiveIntakeLogged((prev) => prev + amount);
  };

  if (viewMode === 'pitchDeck') {
    return (
      <PitchDeck onExitDeck={() => setViewMode('landing')} />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5fcff] text-[#123047] antialiased selection:bg-sky-200 selection:text-sky-900">
      {/* Navigation Bar */}
      <Navbar onOpenPitchDeck={() => setViewMode('pitchDeck')} />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Hero Section with Interactive Bottle Illustration */}
        <HeroSection onIntakeLogged={handleIntakeLogged} />

        {/* The Problem Section */}
        <ProblemSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Interactive Hydration Rhythm Calculator */}
        <HydrationCalculator />

        {/* Waitlist CTA Section */}
        <WaitlistSection />
      </main>

      {/* Floating Pitch Deck Quick Access Pill */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={() => setViewMode('pitchDeck')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer border border-sky-300/40"
        >
          <Presentation className="w-4 h-4 text-sky-300" />
          <span>Present InnovEgypt Pitch Deck (12 Slides)</span>
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

