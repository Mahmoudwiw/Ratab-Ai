import React from 'react';
import { InteractiveBottle } from './InteractiveBottle';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onIntakeLogged?: (amount: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onIntakeLogged }) => {
  return (
    <section className="relative min-h-[720px] pt-36 pb-20 px-[7%] grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-12 overflow-hidden bg-[radial-gradient(circle_at_85%_20%,rgba(103,232,249,0.5),transparent_25%),linear-gradient(135deg,#ffffff_0%,#e4f8ff_100%)]">
      {/* Background Decorative Ambient Circles */}
      <div className="absolute w-[300px] h-[300px] -right-[100px] top-[140px] rounded-full bg-sky-400/10 pointer-events-none blur-xl" />
      <div className="absolute w-[160px] h-[160px] left-[38%] bottom-[50px] rounded-full bg-sky-400/10 pointer-events-none blur-lg" />

      {/* Hero Text Content */}
      <div className="relative z-10 flex flex-col items-start max-w-2xl text-left lg:pr-4">
        <div className="inline-block bg-[#d9f7ff] text-[#075985] px-4 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-normal mb-5 shadow-xs">
          Smart hydration for focused people
        </div>

        <h1 className="text-[#075985] text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold leading-[1.05] tracking-tight mb-6">
          Stay focused.<br />
          Stay <span className="text-[#0284c7]">hydrated.</span>
        </h1>

        <p className="text-[#5f7b8d] text-lg md:text-xl leading-relaxed mb-8 max-w-[550px]">
          Ratab AI helps students and office employees drink water effortlessly
          through real intake tracking and gentle, non-disruptive reminders.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <a
            id="hero-cta-primary"
            href="#join"
            className="inline-flex items-center gap-2 bg-[#0284c7] hover:bg-[#075985] text-white font-bold px-7 py-3.5 rounded-full shadow-[0_9px_22px_rgba(2,132,199,0.25)] hover:-translate-y-0.5 transition-all text-base"
          >
            <span>Join the Waitlist</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            id="hero-cta-secondary"
            href="#how"
            className="inline-flex items-center gap-2 text-[#075985] border border-[#a7dff2] bg-white/70 hover:bg-white font-bold px-6 py-3.5 rounded-full transition-all text-base shadow-xs"
          >
            <span>How It Works</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#5f7b8d] font-medium pt-2 border-t border-sky-200/50 w-full">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-sky-600" />
            <span>Works with any regular bottle</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-sky-600" />
            <span>100% silent — zero audio distraction</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>Zero manual logging required</span>
          </div>
        </div>
      </div>

      {/* Hero Product Stand & Bottle */}
      <div className="relative z-10 flex justify-center items-center w-full">
        <InteractiveBottle onIntakeLogged={onIntakeLogged} />
      </div>
    </section>
  );
};
