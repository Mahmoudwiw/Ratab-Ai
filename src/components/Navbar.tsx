import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenPitchDeck?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPitchDeck }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'The Problem', href: '#problem' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-xs border-b border-sky-100/60' : 'bg-white/85 border-b border-sky-500/10'
      } backdrop-blur-md px-[7%] py-3.5 md:py-4 flex items-center justify-between`}
    >
      {/* Brand Logo */}
      <a href="#" className="flex items-center gap-2.5 text-sky-900 font-extrabold text-2xl tracking-tight no-underline hover:opacity-90 transition">
        <span className="logo-drop" />
        <span>Ratab AI</span>
        <span className="hidden sm:inline text-xs font-normal text-slate-400 font-serif">رطب</span>
      </a>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-slate-800 text-sm font-semibold hover:text-sky-600 transition-colors no-underline"
          >
            {link.label}
          </a>
        ))}

        {/* Pitch Deck Button */}
        {onOpenPitchDeck && (
          <button
            type="button"
            onClick={onOpenPitchDeck}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
          >
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span>InnovEgypt Pitch Deck</span>
            <span className="text-[10px] bg-sky-600 text-white px-1.5 py-0.5 rounded-full font-sans">
              12 Slides
            </span>
          </button>
        )}

        <a
          href="#join"
          className="bg-sky-600 hover:bg-sky-700 active:scale-95 text-white font-bold text-sm px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md"
        >
          Join Us
        </a>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-2">
        {onOpenPitchDeck && (
          <button
            type="button"
            onClick={onOpenPitchDeck}
            className="px-2.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>Pitch Deck</span>
          </button>
        )}
        <button
          id="mobile-menu-toggle"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-700 hover:text-sky-600 focus:outline-hidden"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/98 border-b border-sky-100 shadow-xl px-6 py-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-800 text-base font-semibold py-1 hover:text-sky-600 transition"
            >
              {link.label}
            </a>
          ))}

          {onOpenPitchDeck && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPitchDeck();
              }}
              className="w-full text-center bg-sky-700 hover:bg-sky-800 text-white font-bold text-sm py-2.5 rounded-full transition"
            >
              📊 Open InnovEgypt Pitch Deck (12 Slides)
            </button>
          )}

          <a
            href="#join"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-sky-600 text-white text-center font-bold text-base py-3 rounded-full shadow-sm hover:bg-sky-700 transition"
          >
            Join Us
          </a>
        </div>
      )}
    </nav>
  );
};

