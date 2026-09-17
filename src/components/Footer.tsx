import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-6 px-[7%] bg-[#043b5b] text-[#bdeefa] text-center text-xs md:text-sm relative">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="logo-drop w-4 h-5 scale-75" />
          <span className="font-semibold text-white">Ratab AI</span>
        </div>

        <p className="m-0">
          © 2026 Ratab AI — Stay focused. Stay hydrated.
        </p>

        <div className="flex items-center gap-4">
          <a href="#problem" className="text-[#bdeefa] hover:text-white transition">Problem</a>
          <a href="#features" className="text-[#bdeefa] hover:text-white transition">Features</a>
          <a href="#how" className="text-[#bdeefa] hover:text-white transition">How it Works</a>
          <button
            type="button"
            onClick={scrollToTop}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
