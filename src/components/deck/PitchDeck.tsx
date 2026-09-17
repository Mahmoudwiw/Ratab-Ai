import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Clock,
  RotateCcw,
  Play,
  FileText,
  Copy,
  Check,
  Grid,
  X,
  Stethoscope,
  HeartPulse,
  AlertTriangle,
  Users,
  CheckCircle2,
  Award,
  Sparkles,
} from 'lucide-react';
import { PrototypeDemo } from './PrototypeDemo';
import { TeamEditor } from './TeamEditor';

interface PitchDeckProps {
  onExitDeck?: () => void;
}

export const PitchDeck: React.FC<PitchDeckProps> = ({ onExitDeck }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  // Pitch Timer state (defaults to 5 minutes for InnovEgypt pitch presentation)
  const [timerSeconds, setTimerSeconds] = useState<number>(300);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerDuration, setTimerDuration] = useState<number>(300);

  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation for presentation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return; // Don't intercept while editing team cards
      }
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        setCurrentSlide(prev => Math.min(12, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrentSlide(prev => Math.max(1, prev - 1));
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlide(12);
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'n') {
        e.preventDefault();
        setShowNotes(prev => !prev);
      } else if (e.key.toLowerCase() === 'g') {
        e.preventDefault();
        setShowGrid(prev => !prev);
      } else if (e.key === 'Escape') {
        if (showGrid) setShowGrid(false);
        if (showNotes) setShowNotes(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showGrid, showNotes]);

  // Fullscreen toggle handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Timer interval countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => Math.max(0, prev - 1));
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSeconds]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const resetTimer = (durationSecs: number = 300) => {
    setTimerRunning(false);
    setTimerSeconds(durationSecs);
    setTimerDuration(durationSecs);
  };

  // Full raw prompt for copying into Gamma/Canva/Slides
  const fullPromptText = `PROMPT STARTS HERE

You are a pitch deck designer. Build a 12-slide investor/judge pitch deck for a student innovation program (InnovEgypt / TIEC / Aspire Youth) for a startup called Ratab AI (رطب AI), built by Team SyntriX.

Visual style:
Water/hydration themed, professional, clean and crisp, matching the Ratab blue droplet logo.
Color palette:
- Midnight Ocean Navy #082F49 (title & closing slides)
- Royal Ocean Blue #0284C7 (primary brand blue)
- Deep Sky Navy #0C4A6E (headers & strong contrasts)
- Sky Blue #38BDF8 (secondary accent)
- Cyan Water #00B4D8 / #67E8F9 (subtle glowing accents)
- Off-white Ice Blue #F0F9FF (content slide backgrounds)
Serif bold headers (e.g. Cambria or Georgia), clean sans-serif body text (e.g. Arial/Calibri).
Use rounded cards, colored icon badges, and big bold stat numbers. Do NOT use thin accent stripes/color bars as decoration. Vary layout slide to slide — don't repeat the same grid every time.
Include the Arabic product name "رطب" next to "Ratab AI" on the title and closing slides.

Slide 1 — Title "Ratab AI | رطب AI" — tagline: "A smart cup and app that know exactly when your body needs water — before the headache does." Subtext: Team SyntriX — Dehydration & Lack of Daily Water Intake — InnovEgypt Program.
Slide 2 — The Problem (3 stat cards): 77% employees don't drink enough, 600 dialysis/million in Dakahlia (>2x global 264/M), 1-2% water loss hurts focus & mood. Root cause closing line.
Slide 3 — Who we talked to: Ahmed, Omar, Reda, Mokhtar, Abdullah + Dr. Hala Abdelrazek (Nephrology & Urology Consultant).
Slide 4 — Point of View (dark slide, large quote block).
Slide 5 — Our Solution (6 feature cards: Weight cup, blue light, 3 risk levels, virtual garden, doctor on demand, phase 2 verified water).
Slide 6 — Product Demo: Cup pairing, daily tracking, risk levels, virtual garden.
Slide 7 — Why we're different: Comparison table "Others" vs "Ratab AI".
Slide 8 — Business Model: The Cup 950 EGP, Premium 89 EGP/mo, Medical 220 EGP/mo, B2B Wellness.
Slide 9 — Validating First: Riskiest assumption + Plan, Build, Measure, Learn.
Slide 10 — The Ask: 500,000 EGP (50% cups manufacturing, 30% app dev, 20% marketing).
Slide 11 — Meet the Team: Team SyntriX (Mahmoud Abdelhameed, Abdullah Saad, Ahmed Hamdy, Ahmed Mohamed, Amira Elsayed, Salma Ahmed, Abdullah Abdelaziz).
Slide 12 — Closing: "Ratab AI — Knowing when you're thirsty, before your body has to tell you." — Thank you — Team SyntriX.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(fullPromptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  // Speaker notes per slide
  const speakerNotes: Record<number, string> = {
    1: 'Good morning esteemed judges and mentors. We are Team SyntriX, and today we present Ratab AI (رطب AI)—a smart cup and companion platform that knows when your body needs water before symptoms strike.',
    2: 'Highlight the alarming local urgency: In Dakahlia, dialysis rates are 600 per million—more than double the global average. Most people wait until they feel a headache or fatigue, but that means cognitive and organ strain has already begun.',
    3: 'We did not build this in a silo. We interviewed 5 diverse personas across students, clerks, pharmacists, and factory workers—and consulted Dr. Hala Abdelrazek, Consultant in Nephrology & Urology, to validate our clinical grounds.',
    4: 'Our POV statement captures the essence: Deeply focused individuals need subtle, predictive hydration nudges without loud intrusive phone alarms that disrupt flow state.',
    5: 'Walk through our 6 pillars: The precision weight-sensing base, silent blue breathing LED, personalized 3-tier risk profiles, habit-forming virtual garden, on-demand nephrology consultation, and future verified water marketplace.',
    6: 'Live App Demo: Point out the fast Bluetooth calibration, continuous intake monitoring, the risk level selector (Gentle, Moderate, Strict), and our gamified oasis garden.',
    7: 'Competitive moat: Other solutions buzz loudly and suffer an 8-week drop-off rate of 32%. Ratab AI respects focus, is personalized, and directly addresses the high renal risk profile in Egypt.',
    8: 'Economics: Hardware gross margin with 950 EGP one-time entry, backed by recurring SaaS (89 EGP/mo) and telemedicine (220 EGP/mo), plus high-margin B2B corporate wellness packages.',
    9: 'Execution rigor: We mitigate the novelty fade risk by testing a single-page pre-order validation hypothesis with a 20% conversion benchmark before mass tooling.',
    10: 'The Ask: 500,000 EGP to manufacture our initial 200–300 cups, finalize the sensor BLE firmware, and pilot with our student and corporate partner cohorts.',
    11: 'Meet Team SyntriX: Our 7-member multidisciplinary squad combining product, embedded hardware, firmware, mobile dev, UX design, medical validation, and market discovery.',
    12: 'Thank you judges. With Ratab AI, we protect focus and kidney health one gentle sip at a time. We now welcome your questions.'
  };

  const slideTitles = [
    { num: 1, title: 'Title & Vision', dark: true },
    { num: 2, title: 'The Problem', dark: false },
    { num: 3, title: 'Who We Talked To', dark: false },
    { num: 4, title: 'Point of View', dark: true },
    { num: 5, title: 'Our Solution', dark: false },
    { num: 6, title: 'Product Demo', dark: false },
    { num: 7, title: "Why We're Different", dark: false },
    { num: 8, title: 'Business Model', dark: false },
    { num: 9, title: 'Validating First', dark: false },
    { num: 10, title: 'The Ask', dark: true },
    { num: 11, title: 'Meet the Team', dark: false },
    { num: 12, title: 'Closing', dark: true },
  ];

  const currentIsDark = slideTitles[currentSlide - 1]?.dark;

  return (
    <div
      ref={containerRef}
      className={`min-h-screen flex flex-col font-sans select-none transition-colors duration-300 ${
        currentIsDark ? 'bg-[#082F49] text-white' : 'bg-[#F0F9FF] text-slate-800'
      }`}
      style={{
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {/* Top Deck Control Toolbar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-sky-200/60 px-4 py-2.5 flex items-center justify-between text-xs text-slate-700 dark:text-slate-200 shadow-xs">
        {/* Left: Brand & Slide Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-sky-900 dark:text-sky-300 text-sm">
            <span className="logo-drop w-4 h-5" />
            <span>Ratab AI</span>
            <span className="text-[10px] text-sky-600 dark:text-sky-400 font-serif">رطب</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 bg-sky-50 dark:bg-slate-800 px-2.5 py-1 rounded-md text-sky-800 dark:text-sky-300 font-semibold border border-sky-100 dark:border-slate-700">
            <span>Slide {currentSlide} of 12</span>
            <span className="text-slate-400">•</span>
            <span className="text-xs truncate max-w-[150px]">{slideTitles[currentSlide - 1]?.title}</span>
          </div>
        </div>

        {/* Center: Pitch Timer */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
          <Clock className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span className={`font-mono font-bold text-xs ${timerSeconds < 30 ? 'text-rose-600 animate-pulse' : 'text-slate-700 dark:text-slate-200'}`}>
            {formatTimer(timerSeconds)}
          </span>
          <button
            type="button"
            onClick={() => setTimerRunning(!timerRunning)}
            className="p-1 text-slate-600 dark:text-slate-300 hover:text-sky-600 cursor-pointer"
            title={timerRunning ? 'Pause Pitch Timer' : 'Start Pitch Timer'}
          >
            {timerRunning ? <span className="font-bold text-[10px]">PAUSE</span> : <Play className="w-3 h-3 fill-current" />}
          </button>
          <button
            type="button"
            onClick={() => resetTimer(timerDuration)}
            className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
            title={`Reset ${Math.round(timerDuration / 60)}-minute timer`}
          >
            <RotateCcw className="w-3 h-3" />
          </button>
          <div className="flex items-center gap-1 border-l border-slate-300 dark:border-slate-600 pl-1.5 text-[10px]">
            <button
              type="button"
              onClick={() => resetTimer(300)}
              className={`px-1.5 py-0.5 rounded font-bold cursor-pointer transition ${
                timerDuration === 300 ? 'bg-sky-600 text-white' : 'text-slate-500 hover:text-sky-700'
              }`}
              title="Set timer to 5 minutes"
            >
              5m
            </button>
            <button
              type="button"
              onClick={() => resetTimer(180)}
              className={`px-1.5 py-0.5 rounded font-bold cursor-pointer transition ${
                timerDuration === 180 ? 'bg-sky-600 text-white' : 'text-slate-500 hover:text-sky-700'
              }`}
              title="Set timer to 3 minutes"
            >
              3m
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Speaker Notes Toggle */}
          <button
            type="button"
            onClick={() => setShowNotes(!showNotes)}
            className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition cursor-pointer ${
              showNotes ? 'bg-sky-600 text-white' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300'
            }`}
            title="Toggle Judge/Speaker Notes"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Notes</span>
          </button>

          {/* Grid Overview */}
          <button
            type="button"
            onClick={() => setShowGrid(!showGrid)}
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              showGrid ? 'bg-sky-600 text-white' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300'
            }`}
            title="Slide Grid Overview"
          >
            <Grid className="w-4 h-4" />
          </button>

          {/* Copy Prompt Button */}
          <button
            type="button"
            onClick={handleCopyPrompt}
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 font-semibold transition cursor-pointer border border-sky-200"
            title="Copy Pitch Deck Prompt for Gamma/Canva/Slides"
          >
            {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedPrompt ? 'Prompt Copied!' : 'Copy Prompt'}</span>
          </button>

          {/* Fullscreen */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 cursor-pointer"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Exit / Return to Landing Page */}
          {onExitDeck && (
            <button
              type="button"
              onClick={onExitDeck}
              className="ml-1 px-3 py-1 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition cursor-pointer shadow-xs"
            >
              Landing Page
            </button>
          )}
        </div>
      </header>

      {/* Main Slide Canvas */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 py-8 md:px-12 md:py-10 max-w-7xl mx-auto w-full relative">
        {/* SLIDE 1: TITLE SLIDE (Dark Navy #082F49) */}
        {currentSlide === 1 && (
          <div className="w-full text-center max-w-4xl mx-auto py-10 animate-in fade-in zoom-in-95 duration-300">
            {/* Logo and Arabic Title */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="logo-drop w-10 h-14" />
              <h1
                className="text-6xl md:text-8xl font-black tracking-tight"
                style={{ fontFamily: "'Georgia', 'Cambria', serif", color: '#F0F9FF' }}
              >
                Ratab AI <span className="text-sky-400 font-serif font-normal">| رطب</span>
              </h1>
            </div>

            {/* Tagline */}
            <p
              className="text-2xl md:text-3xl lg:text-4xl text-sky-300 font-serif font-bold max-w-3xl mx-auto leading-tight mb-8"
            >
              "A smart cup and app that know exactly when your body needs water — before the headache does."
            </p>

            {/* Subtext Card */}
            <div className="inline-block bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3.5 border border-white/15 text-sm md:text-base text-sky-100 font-medium shadow-lg">
              <span className="text-sky-300 font-bold">Team SyntriX</span>
              <span className="mx-2.5 opacity-40">•</span>
              <span>Dehydration & Lack of Daily Water Intake</span>
              <span className="mx-2.5 opacity-40">•</span>
              <span className="text-cyan-300 font-bold">InnovEgypt Program</span>
            </div>

            <div className="mt-12 text-xs text-sky-300/70 flex items-center justify-center gap-4">
              <span>Press <strong className="text-white">→</strong> or click Next</span>
              <span>•</span>
              <span>TIEC / Aspire Youth Investor Deck</span>
            </div>
          </div>
        )}

        {/* SLIDE 2: THE PROBLEM (Off-white Ice Blue #F0F9FF) */}
        {currentSlide === 2 && (
          <div className="w-full max-w-5xl mx-auto animate-in fade-in duration-300">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-2">Slide 2</span>
              <h2
                className="text-3xl md:text-5xl font-extrabold text-sky-950"
                style={{ fontFamily: "'Georgia', 'Cambria', serif" }}
              >
                The Silent Urgency of Dehydration
              </h2>
            </div>

            {/* 3 Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* Stat 1 */}
              <div className="bg-white rounded-3xl p-7 border border-sky-100 shadow-xs flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-lg mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-5xl font-black text-sky-950 tracking-tight mb-3">
                    77%
                  </div>
                  <p className="text-slate-700 text-sm font-semibold leading-relaxed mb-4">
                    of employees feel they don't drink enough water on a daily basis.
                  </p>
                </div>
                <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-100 font-medium">
                  Source: Quench Survey, 2018
                </div>
              </div>

              {/* Stat 2 - Dakahlia Dialysis */}
              <div className="bg-white rounded-3xl p-7 border-2 border-sky-500/40 shadow-md flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-sky-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  Critical Regional Data
                </div>
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-lg mb-4">
                    <HeartPulse className="w-5 h-5 text-sky-600" />
                  </div>
                  <div className="text-5xl font-black text-sky-950 tracking-tight mb-3">
                    600
                  </div>
                  <p className="text-slate-700 text-sm font-semibold leading-relaxed mb-4">
                    dialysis patients per million people in <strong className="text-sky-900">Dakahlia</strong> — over <strong className="text-rose-600">2x the global rate</strong> of 264/million.
                  </p>
                </div>
                <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-100 font-medium">
                  Source: Egyptian Society of Nephrology
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-white rounded-3xl p-7 border border-sky-100 shadow-xs flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg mb-4">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="text-5xl font-black text-sky-950 tracking-tight mb-3">
                    1–2%
                  </div>
                  <p className="text-slate-700 text-sm font-semibold leading-relaxed mb-4">
                    body water loss is enough to impair mood, cognitive focus, memory, and daytime energy levels.
                  </p>
                </div>
                <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-100 font-medium">
                  Source: Multiple Clinical Hydration Trials
                </div>
              </div>
            </div>

            {/* Closing Line Callout */}
            <div className="bg-sky-900 text-white p-5 md:p-6 rounded-2xl text-center max-w-3xl mx-auto shadow-sm">
              <p className="text-base md:text-lg font-serif italic text-sky-100">
                "The root cause: the only real alert people get is a symptom — headache, fatigue — and by then it's already too late."
              </p>
            </div>
          </div>
        )}

        {/* SLIDE 3: WHO WE TALKED TO (Off-white Ice Blue) */}
        {currentSlide === 3 && (
          <div className="w-full max-w-5xl mx-auto animate-in fade-in duration-300">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-2">Slide 3</span>
              <h2
                className="text-3xl md:text-5xl font-extrabold text-sky-950"
                style={{ fontFamily: "'Georgia', 'Cambria', serif" }}
              >
                Field Discovery: Who We Talked To
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-1">
                Real customer personas interviewed across universities, clinics, and workplaces.
              </p>
            </div>

            {/* 5 Persona Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* Persona 1 */}
              <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center">
                      AH
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-sky-950">Ahmed</h4>
                      <span className="text-[11px] text-slate-500">Engineering Student</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 italic border-l-2 border-sky-500 pl-3 py-1 my-2">
                    "Forgets water in deep focus"
                  </p>
                </div>
                <span className="text-[10px] text-slate-400">Context: Coding & study marathons</span>
              </div>

              {/* Persona 2 */}
              <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center">
                      OM
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-sky-950">Omar</h4>
                      <span className="text-[11px] text-slate-500">Pharmacy, Mansoura Univ</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 italic border-l-2 border-sky-500 pl-3 py-1 my-2">
                    "No bottle, bag full of books"
                  </p>
                </div>
                <span className="text-[10px] text-slate-400">Context: Heavy bag, lectures all day</span>
              </div>

              {/* Persona 3 */}
              <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center">
                      RD
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-sky-950">Reda</h4>
                      <span className="text-[11px] text-slate-500">Factory Clerk</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 italic border-l-2 border-sky-500 pl-3 py-1 my-2">
                    "Water cooler feels far, tea is closer"
                  </p>
                </div>
                <span className="text-[10px] text-slate-400">Context: Desk inertia & caffeine substitute</span>
              </div>

              {/* Persona 4 */}
              <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center">
                      MK
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-sky-950">Mokhtar</h4>
                      <span className="text-[11px] text-slate-500">Pharmacist & Dialysis Patient</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 italic border-l-2 border-rose-400 pl-3 py-1 my-2">
                    "Cares about water quality, not just quantity"
                  </p>
                </div>
                <span className="text-[10px] text-slate-400">Context: Dakahlia renal health risk</span>
              </div>

              {/* Persona 5 */}
              <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center">
                      AB
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-sky-950">Abdullah</h4>
                      <span className="text-[11px] text-slate-500">Factory Security Head</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 italic border-l-2 border-sky-500 pl-3 py-1 my-2">
                    "Always moving, desk solutions don't fit"
                  </p>
                </div>
                <span className="text-[10px] text-slate-400">Context: Active shifts, mobile hydration</span>
              </div>

              {/* Persona 6: Medical Expert Line */}
              <div className="bg-gradient-to-br from-sky-900 to-sky-700 text-white p-5 rounded-2xl shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-white/20 text-cyan-300 font-bold text-xs flex items-center justify-center">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Dr. Hala Abdelrazek</h4>
                      <span className="text-[11px] text-sky-200">Nephrology & Urology Consultant</span>
                    </div>
                  </div>
                  <p className="text-xs text-white/95 leading-relaxed my-2">
                    Grounding the product in real medical evidence: regular, evenly spaced hydration prevents kidney crystallization far better than sporadic heavy drinking.
                  </p>
                </div>
                <div className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">
                  Clinical Advisor
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 4: POINT OF VIEW (Dark Slide #082F49) */}
        {currentSlide === 4 && (
          <div className="w-full max-w-4xl mx-auto py-8 text-center animate-in fade-in duration-300">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400 block mb-4">Slide 4 • Point of View</span>

            <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-14 border border-white/15 shadow-2xl text-left">
              {/* Large quote marks */}
              <span className="text-7xl font-serif text-sky-400/40 leading-none absolute top-4 left-6">“</span>

              <p
                className="text-xl md:text-3xl lg:text-[32px] text-sky-50 font-serif leading-relaxed relative z-10 pl-6"
                style={{ fontFamily: "'Georgia', 'Cambria', serif" }}
              >
                Students and employees who stay deeply focused on work or studying need to know they're approaching the point of needing water <span className="text-sky-300 underline decoration-sky-400">before symptoms appear</span>, without their focus being broken by annoying alerts, yet every existing solution either alerts randomly with no connection to actual drinking, or requires manual logging that gets abandoned within days.
              </p>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-sky-200">
                <span>The Core Synthesis</span>
                <span className="font-mono text-cyan-300">Team SyntriX Discovery</span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 5: OUR SOLUTION (Off-white Ice Blue) */}
        {currentSlide === 5 && (
          <div className="w-full max-w-5xl mx-auto animate-in fade-in duration-300">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-2">Slide 5</span>
              <h2
                className="text-3xl md:text-5xl font-extrabold text-sky-950"
                style={{ fontFamily: "'Georgia', 'Cambria', serif" }}
              >
                Our Solution: The Ratab AI Ecosystem
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-1">
                Combining passive smart hardware with intelligent cognitive habit reinforcement.
              </p>
            </div>

            {/* 6 Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Feature 1 */}
              <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold mb-3">
                  ⚖️
                </div>
                <h3 className="font-bold text-base text-sky-900 mb-1.5">Weight-Sensing Cup</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Detects real intake automatically using strain gauges. Zero manual logging or tapping required.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold mb-3">
                  💡
                </div>
                <h3 className="font-bold text-base text-sky-900 mb-1.5">Blue Light, Not Sound</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A calm, peripheral visual breathing nudge that catches your eye gently. Never breaks your flow state.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold mb-3">
                  🎚️
                </div>
                <h3 className="font-bold text-base text-sky-900 mb-1.5">3 Risk Levels</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  User-chosen reminder intensity from Gentle (relaxed) to Moderate (work) to Strict (kidney health).
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold mb-3">
                  🌱
                </div>
                <h3 className="font-bold text-base text-sky-900 mb-1.5">Virtual Garden Reward</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Daily consistency blooms native plants and flora. Sustained positive motivation that doesn't fade.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold mb-3">
                  🩺
                </div>
                <h3 className="font-bold text-base text-sky-900 mb-1.5">Doctor on Demand</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direct consultation with kidney and hydration specialists anytime for personalized guidance.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-gradient-to-br from-sky-50 to-sky-100/60 p-5 rounded-2xl border border-sky-200 shadow-xs hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold mb-3 shadow-xs">
                  💧
                </div>
                <h3 className="font-bold text-base text-sky-900 mb-1.5">Phase 2: Verified Water</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Future storefront selling certified, quality-tested drinking water delivered right to your home or office.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 6: PRODUCT DEMO / HOW IT WORKS */}
        {currentSlide === 6 && (
          <div className="w-full max-w-5xl mx-auto animate-in fade-in duration-300">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-1">Slide 6</span>
              <h2
                className="text-3xl md:text-5xl font-extrabold text-sky-950"
                style={{ fontFamily: "'Georgia', 'Cambria', serif" }}
              >
                Product Demo: The 4 Core Experiences
              </h2>
              <p className="text-slate-600 text-xs md:text-sm">
                Interactive walkthrough of the pairing screen, daily tracking view, risk-level selector, and virtual garden.
              </p>
            </div>

            {/* Embedded Interactive Prototype */}
            <PrototypeDemo />
          </div>
        )}

        {/* SLIDE 7: WHY WE'RE DIFFERENT */}
        {currentSlide === 7 && (
          <div className="w-full max-w-5xl mx-auto animate-in fade-in duration-300">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-2">Slide 7</span>
              <h2
                className="text-3xl md:text-5xl font-extrabold text-sky-950"
                style={{ fontFamily: "'Georgia', 'Cambria', serif" }}
              >
                Why We're Different: Real Problem-Solution Fit
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-1">
                Comparing conventional hydration tools vs. the Ratab AI architecture.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] bg-sky-50 text-xs font-bold text-slate-600 uppercase tracking-wider p-4 border-b border-sky-100">
                <div className="hidden md:block">Dimension</div>
                <div className="text-rose-600">Existing Alternatives & Apps</div>
                <div className="text-sky-900 font-black flex items-center gap-1.5">
                  <span className="logo-drop w-3 h-4 scale-75" />
                  Ratab AI (رطب AI)
                </div>
              </div>

              {/* Row 1: Alert Style */}
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] p-5 border-b border-slate-100 items-center text-sm gap-3">
                <div className="font-bold text-sky-900 text-xs uppercase tracking-wider">
                  Alert Style
                </div>
                <div className="text-slate-600 bg-rose-50/70 p-3 rounded-xl border border-rose-100">
                  <strong className="text-rose-700 block mb-1">Sound & phone vibrations</strong>
                  Feels intrusive, creates notification anxiety, and gets muted during meetings or deep study.
                </div>
                <div className="text-slate-800 bg-sky-50/70 p-3 rounded-xl border border-sky-200">
                  <strong className="text-sky-900 block mb-1">Calm peripheral blue light</strong>
                  Gentle breathing glow from the desk stand. Subconscious reminder that never breaks focus.
                </div>
              </div>

              {/* Row 2: Long-Term Engagement */}
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] p-5 border-b border-slate-100 items-center text-sm gap-3">
                <div className="font-bold text-sky-900 text-xs uppercase tracking-wider">
                  Engagement
                </div>
                <div className="text-slate-600 bg-rose-50/70 p-3 rounded-xl border border-rose-100">
                  <strong className="text-rose-700 block mb-1">~32% drop-off after 8 weeks</strong>
                  Manual logging creates cognitive friction. Users forget or get tired of tapping every glass.
                </div>
                <div className="text-slate-800 bg-sky-50/70 p-3 rounded-xl border border-sky-200">
                  <strong className="text-sky-900 block mb-1">Virtual garden & passive scale</strong>
                  Zero manual entry needed. Growing desert blooms sustain intrinsic emotional motivation.
                </div>
              </div>

              {/* Row 3: Sense of Control */}
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] p-5 border-b border-slate-100 items-center text-sm gap-3">
                <div className="font-bold text-sky-900 text-xs uppercase tracking-wider">
                  Sense of Control
                </div>
                <div className="text-slate-600 bg-rose-50/70 p-3 rounded-xl border border-rose-100">
                  <strong className="text-rose-700 block mb-1">Feels like being monitored</strong>
                  Rigid, robotic alarms commanding the user to drink on fixed intervals without flexibility.
                </div>
                <div className="text-slate-800 bg-sky-50/70 p-3 rounded-xl border border-sky-200">
                  <strong className="text-sky-900 block mb-1">User chooses risk level</strong>
                  3 custom profiles (Gentle, Moderate, Strict) matching their specific workday rhythm.
                </div>
              </div>

              {/* Row 4: Local Relevance */}
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] p-5 items-center text-sm gap-3">
                <div className="font-bold text-sky-900 text-xs uppercase tracking-wider">
                  Relevance
                </div>
                <div className="text-slate-600 bg-rose-50/70 p-3 rounded-xl border border-rose-100">
                  <strong className="text-rose-700 block mb-1">Generic Western wellness apps</strong>
                  Disconnected from Egyptian climate, water quality concerns, or regional health profiles.
                </div>
                <div className="text-slate-800 bg-sky-50/70 p-3 rounded-xl border border-sky-200">
                  <strong className="text-sky-900 block mb-1">Grounded in Dakahlia's reality</strong>
                  Designed specifically around our regional 600/M dialysis data with Egyptian medical guidance.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 8: BUSINESS MODEL */}
        {currentSlide === 8 && (
          <div className="w-full max-w-5xl mx-auto animate-in fade-in duration-300">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-2">Slide 8</span>
              <h2
                className="text-3xl md:text-5xl font-extrabold text-sky-950"
                style={{ fontFamily: "'Georgia', 'Cambria', serif" }}
              >
                Business Model: Hardware + High-Margin SaaS
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-1">
                Multiple revenue streams spanning consumer hardware, health subscriptions, and enterprise wellness.
              </p>
            </div>

            {/* 4 Pricing Tier Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Tier 1: The Cup */}
              <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-xs flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-2">
                    Entry Hardware
                  </div>
                  <h3 className="text-xl font-black text-sky-950 mb-1">The Cup</h3>
                  <div className="flex items-baseline gap-1 my-3">
                    <span className="text-3xl font-black text-sky-900">950</span>
                    <span className="text-xs font-bold text-slate-500">EGP one-time</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Weight-sensing smart cup + lifetime access to the core app (reminders, intake tracking, and garden).
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[11px] text-sky-800 font-semibold">
                  ✓ High-margin physical entry point
                </div>
              </div>

              {/* Tier 2: Premium */}
              <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-xs flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-2">
                    Personal SaaS
                  </div>
                  <h3 className="text-xl font-black text-sky-950 mb-1">Premium</h3>
                  <div className="flex items-baseline gap-1 my-3">
                    <span className="text-3xl font-black text-sky-900">89</span>
                    <span className="text-xs font-bold text-slate-500">EGP / month</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Advanced monthly analytics, circadian focus curves, seasonal hydration insights, and bonus garden plants.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[11px] text-sky-600 font-semibold">
                  ✓ Recurring monthly revenue
                </div>
              </div>

              {/* Tier 3: Medical Plan */}
              <div className="bg-gradient-to-b from-sky-50 to-white p-6 rounded-3xl border-2 border-sky-500 shadow-sm flex flex-col justify-between relative">
                <div className="absolute -top-2.5 right-4 bg-sky-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Health Guard
                </div>
                <div>
                  <div className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-2">
                    Telehealth
                  </div>
                  <h3 className="text-xl font-black text-sky-950 mb-1">Medical Plan</h3>
                  <div className="flex items-baseline gap-1 my-3">
                    <span className="text-3xl font-black text-sky-900">220</span>
                    <span className="text-xs font-bold text-slate-500">EGP / month</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    On-demand nephrologist / doctor consultations, urine color logging analysis, and custom renal health targets.
                  </p>
                </div>
                <div className="pt-3 border-t border-sky-100 text-[11px] text-sky-900 font-bold">
                  ✓ High-value healthcare margin
                </div>
              </div>

              {/* Tier 4: B2B Wellness */}
              <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-xs flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
                    Corporate
                  </div>
                  <h3 className="text-xl font-black text-sky-950 mb-1">B2B Wellness</h3>
                  <div className="flex items-baseline gap-1 my-3">
                    <span className="text-2xl font-black text-sky-900">Custom</span>
                    <span className="text-xs font-bold text-slate-500">per employee</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Bulk smart cups + employer wellness dashboard to reduce office sick leave, afternoon brain fog, and fatigue.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[11px] text-indigo-700 font-semibold">
                  ✓ Scalable B2B contracts
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 9: VALIDATING FIRST */}
        {currentSlide === 9 && (
          <div className="w-full max-w-5xl mx-auto animate-in fade-in duration-300">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-2">Slide 9</span>
              <h2
                className="text-3xl md:text-5xl font-extrabold text-sky-950"
                style={{ fontFamily: "'Georgia', 'Cambria', serif" }}
              >
                Validating First: Lean Experimentation
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-1">
                Derisking our core hypothesis before committing capital to hardware tooling.
              </p>
            </div>

            {/* Riskiest Assumption Box */}
            <div className="bg-amber-50 border-2 border-amber-300 p-5 md:p-6 rounded-3xl mb-8 max-w-3xl mx-auto text-center shadow-xs">
              <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider block mb-1">
                Our Riskiest Assumption
              </span>
              <p className="text-base md:text-lg font-bold text-slate-900 leading-snug">
                "Will people actually place the cup on their desk and use it daily, once the novelty fades?"
              </p>
            </div>

            {/* 4-Step Plan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Step 1: Plan */}
              <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-sky-800 text-white font-bold text-xs flex items-center justify-center mb-3">
                    1
                  </div>
                  <h3 className="font-bold text-sm text-sky-900 mb-1.5 uppercase tracking-wide">Plan</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    One-page landing site with the concept + a single "Notify me" CTA.
                  </p>
                </div>
                <div className="mt-4 p-2 rounded-lg bg-sky-50 text-[11px] font-bold text-sky-700">
                  Hypothesis: ≥20% sign-up rate
                </div>
              </div>

              {/* Step 2: Build */}
              <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center mb-3">
                    2
                  </div>
                  <h3 className="font-bold text-sm text-sky-900 mb-1.5 uppercase tracking-wide">Build</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Fast live landing page only. Zero upfront hardware tooling and zero heavy app engineering yet.
                  </p>
                </div>
                <div className="mt-4 p-2 rounded-lg bg-slate-50 text-[11px] text-slate-500 font-medium">
                  Zero wasted development
                </div>
              </div>

              {/* Step 3: Measure */}
              <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-cyan-600 text-white font-bold text-xs flex items-center justify-center mb-3">
                    3
                  </div>
                  <h3 className="font-bold text-sm text-sky-900 mb-1.5 uppercase tracking-wide">Measure</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Share with university classmates, focus-group contacts & relevant desk-worker groups for 5–7 days.
                  </p>
                </div>
                <div className="mt-4 p-2 rounded-lg bg-slate-50 text-[11px] text-slate-500 font-medium">
                  Track visits vs. sign-ups
                </div>
              </div>

              {/* Step 4: Learn */}
              <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-sky-900 text-white font-bold text-xs flex items-center justify-center mb-3">
                    4
                  </div>
                  <h3 className="font-bold text-sm text-sky-900 mb-1.5 uppercase tracking-wide">Learn</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    If ≥20% sign up → proceed to hardware prototype. If below → refine messaging & value proposition first.
                  </p>
                </div>
                <div className="mt-4 p-2 rounded-lg bg-emerald-50 text-[11px] font-bold text-emerald-700">
                  Data-driven milestone gate
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 10: THE ASK (Dark Slide #082F49) */}
        {currentSlide === 10 && (
          <div className="w-full max-w-4xl mx-auto py-6 text-center animate-in fade-in duration-300">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-300 block mb-2">Slide 10</span>
            <h2
              className="text-3xl md:text-5xl font-extrabold text-sky-100 mb-2"
              style={{ fontFamily: "'Georgia', 'Cambria', serif" }}
            >
              The Ask: Seed Prototype Funding
            </h2>
            <p className="text-sky-200 text-lg md:text-xl font-medium mb-8">
              "500,000 EGP to build our first real prototype cohort"
            </p>

            {/* 3 Budget Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
              {/* Card 1: 50% Manufacturing */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-7 border border-white/15 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="text-4xl font-black text-sky-300 mb-1">50%</div>
                  <div className="text-xl font-extrabold text-white mb-2">250,000 EGP</div>
                  <h4 className="text-sm font-bold text-sky-200 mb-2">Prototype Hardware</h4>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Tooling and manufacturing the initial batch of 200–300 functional smart cups & precision load cells.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-sky-300">
                  Tooling, PCB, casing & assembly
                </div>
              </div>

              {/* Card 2: 30% App Development */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-7 border border-white/15 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="text-4xl font-black text-cyan-300 mb-1">30%</div>
                  <div className="text-xl font-extrabold text-white mb-2">150,000 EGP</div>
                  <h4 className="text-sm font-bold text-sky-200 mb-2">Software & Sensor Integration</h4>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Mobile companion app engineering, BLE auto-sync firmware, virtual garden rewards, and intake algorithm.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-sky-300">
                  iOS & Android production release
                </div>
              </div>

              {/* Card 3: 20% Marketing & Pilots */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-7 border border-white/15 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="text-4xl font-black text-sky-400 mb-1">20%</div>
                  <div className="text-xl font-extrabold text-white mb-2">100,000 EGP</div>
                  <h4 className="text-sm font-bold text-sky-200 mb-2">Pilot Operations & Outreach</h4>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Running 3-month focus group pilots across universities and corporate offices in Mansoura and Cairo.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-sky-300">
                  User acquisition & clinical feedback
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-xs text-white font-medium">
              <CheckCircle2 className="w-4 h-4 text-sky-300" />
              <span>InnovEgypt / TIEC Incubation & Prototype Track</span>
            </div>
          </div>
        )}

        {/* SLIDE 11: MEET THE TEAM (Off-white Ice Blue) */}
        {currentSlide === 11 && (
          <div className="w-full max-w-6xl mx-auto animate-in fade-in duration-300">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block mb-1">Slide 11</span>
              <h2
                className="text-3xl md:text-5xl font-extrabold text-sky-950"
                style={{ fontFamily: "'Georgia', 'Cambria', serif" }}
              >
                Meet Team SyntriX
              </h2>
              <p className="text-slate-600 text-xs md:text-sm">
                Passionate multidisciplinary builders tackling Egypt's everyday hydration deficit.
              </p>
            </div>

            {/* Editable Team Customizer */}
            <TeamEditor />
          </div>
        )}

        {/* SLIDE 12: CLOSING SLIDE (Dark Navy #082F49) */}
        {currentSlide === 12 && (
          <div className="w-full max-w-4xl mx-auto py-12 text-center animate-in fade-in duration-300">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="logo-drop w-10 h-14" />
              <h1
                className="text-5xl md:text-7xl font-black tracking-tight"
                style={{ fontFamily: "'Georgia', 'Cambria', serif", color: '#F0F9FF' }}
              >
                Ratab AI <span className="text-sky-400 font-serif font-normal">| رطب</span>
              </h1>
            </div>

            <p
              className="text-2xl md:text-4xl text-sky-300 font-serif font-bold max-w-2xl mx-auto leading-snug mb-10"
            >
              "Knowing when you're thirsty, before your body has to tell you."
            </p>

            <div className="my-8">
              <h3 className="text-3xl font-extrabold text-white mb-2">Thank You</h3>
              <p className="text-lg text-sky-200 font-medium">Team SyntriX</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/80">
              <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20">
                InnovEgypt Program
              </span>
              <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20">
                TIEC / Aspire Youth Competition
              </span>
              <span className="px-4 py-2 rounded-full bg-sky-500 text-white font-bold shadow-xs">
                Q&A Ready
              </span>
            </div>

            <div className="mt-12 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentSlide(1)}
                className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Start from Slide 1
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Speaker Notes Drawer (Toggled from Top Bar) */}
      {showNotes && (
        <div className="fixed bottom-16 left-4 right-4 md:left-12 md:right-12 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-sky-200 shadow-2xl animate-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 mb-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-600" />
              <span className="font-bold text-xs uppercase tracking-wider text-sky-900 dark:text-sky-300">
                Speaker Talking Points • Slide {currentSlide}: {slideTitles[currentSlide - 1]?.title}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowNotes(false)}
              className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            {speakerNotes[currentSlide]}
          </p>
        </div>
      )}

      {/* Slide Thumbnails / Overview Modal */}
      {showGrid && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-6 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-5xl w-full max-h-[85vh] overflow-y-auto border border-sky-200 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
              <div>
                <h3 className="font-bold text-lg text-sky-950 dark:text-sky-200">All 12 Slides</h3>
                <p className="text-xs text-slate-500">Jump directly to any slide in the deck</p>
              </div>
              <button
                type="button"
                onClick={() => setShowGrid(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {slideTitles.map((slide) => (
                <div
                  key={slide.num}
                  onClick={() => {
                    setCurrentSlide(slide.num);
                    setShowGrid(false);
                  }}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all hover:scale-102 ${
                    currentSlide === slide.num
                      ? 'border-sky-500 ring-2 ring-sky-400/30 shadow-md'
                      : 'border-slate-200 dark:border-slate-800 hover:border-sky-300'
                  } ${slide.dark ? 'bg-[#082F49] text-white' : 'bg-[#F0F9FF] text-slate-800'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-white/20 text-xs">
                      #{slide.num}
                    </span>
                    {slide.dark && <span className="text-[9px] text-sky-300">Dark</span>}
                  </div>
                  <h4 className="text-xs font-bold truncate">{slide.title}</h4>
                  <p className="text-[10px] opacity-70 line-clamp-2 mt-1">
                    {speakerNotes[slide.num]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Control Bar */}
      <footer className="sticky bottom-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-sky-200/60 px-4 py-2.5 flex items-center justify-between shadow-lg">
        {/* Left: Previous Button */}
        <button
          type="button"
          disabled={currentSlide === 1}
          onClick={() => setCurrentSlide(prev => Math.max(1, prev - 1))}
          className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
            currentSlide === 1
              ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400'
              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 active:scale-95'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {/* Center: Slide Indicators Dots */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-[280px] sm:max-w-none px-2">
          {slideTitles.map((slide) => (
            <button
              key={slide.num}
              type="button"
              onClick={() => setCurrentSlide(slide.num)}
              className={`transition-all rounded-full cursor-pointer ${
                currentSlide === slide.num
                  ? 'w-6 h-2.5 bg-sky-600'
                  : 'w-2 h-2 bg-slate-300 hover:bg-sky-400 dark:bg-slate-700'
              }`}
              title={`Jump to Slide ${slide.num}: ${slide.title}`}
            />
          ))}
        </div>

        {/* Right: Next Button */}
        <button
          type="button"
          disabled={currentSlide === 12}
          onClick={() => setCurrentSlide(prev => Math.min(12, prev + 1))}
          className={`flex items-center gap-1 px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
            currentSlide === 12
              ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400'
              : 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs active:scale-95'
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
};
