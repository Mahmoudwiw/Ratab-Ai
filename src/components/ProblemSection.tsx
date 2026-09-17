import React from 'react';
import { VolumeX, Smartphone, BatteryCharging, Check } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section id="problem" className="py-24 px-[7%] bg-white relative">
      {/* Section Header */}
      <div className="text-center max-w-[680px] mx-auto mb-14">
        <h2 className="text-[#075985] text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
          Water should not be another task
        </h2>
        <p className="text-[#5f7b8d] text-base md:text-lg">
          Designed for people who spend long hours studying or working.
        </p>
      </div>

      {/* Main Problem Statement Card */}
      <div className="max-w-[900px] mx-auto p-8 md:p-11 rounded-3xl bg-gradient-to-br from-[#f0fbff] to-white border border-[#c9edf8] text-center text-[#5f7b8d] text-lg md:text-xl leading-relaxed shadow-xs mb-14">
        <p className="mb-6">
          Students and employees are not against drinking water.
          The real problem is that they forget it during deep focus.
          Existing reminders can be annoying, while manual tracking is usually
          abandoned after a few days.
        </p>
        <p className="text-[#075985] font-bold text-xl md:text-2xl pt-4 border-t border-sky-100">
          Ratab AI makes hydration easier, quieter, and more automatic.
        </p>
      </div>

      {/* Comparative Analysis: The Broken Ways vs Ratab AI */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-6 text-left">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold mb-4">
            ✕
          </div>
          <h3 className="font-bold text-slate-800 text-base mb-2">Phone Alarms & Reminders</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Loud chimes and buzzing break deep focus and get dismissed immediately or muted.
          </p>
        </div>

        <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-6 text-left">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold mb-4">
            ✕
          </div>
          <h3 className="font-bold text-slate-800 text-base mb-2">Manual Logging Apps</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Requires tapping your phone every time you drink. 90% of users stop logging after day 4.
          </p>
        </div>

        <div className="bg-gradient-to-b from-sky-50 to-white border-2 border-sky-300 rounded-2xl p-6 text-left shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold mb-4 shadow-xs">
            <Check className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-[#075985] text-base mb-2">The Ratab AI Stand</h3>
          <p className="text-[#5f7b8d] text-sm leading-relaxed">
            Sit your own bottle down. It weighs the difference automatically and emits a soothing, silent glow.
          </p>
        </div>
      </div>
    </section>
  );
};
