import React, { useState } from 'react';
import { Clock, Droplets, Lightbulb, Sparkles } from 'lucide-react';

export const HydrationCalculator: React.FC = () => {
  const [deskHours, setDeskHours] = useState<number>(8);
  const [role, setRole] = useState<'student' | 'office' | 'developer'>('office');

  // Multipliers based on mental focus intensity
  const hourlyMl = role === 'student' ? 220 : role === 'developer' ? 250 : 230;
  const totalRecommendedMl = deskHours * hourlyMl;
  const sipSizeMl = 140;
  const sipsNeeded = Math.round(totalRecommendedMl / sipSizeMl);
  const intervalMinutes = Math.round((deskHours * 60) / sipsNeeded);

  return (
    <section className="py-16 px-[7%] bg-gradient-to-b from-white to-[#f5fcff] border-y border-sky-100">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-7 md:p-10 border border-[#d2f1fa] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-sky-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              Focus Hydration Estimator
            </div>
            <h3 className="text-[#075985] text-2xl font-extrabold tracking-tight">
              Calculate your desk hydration rhythm
            </h3>
            <p className="text-[#5f7b8d] text-sm mt-1">
              See how Ratab AI schedules gentle, quiet reminders for your focus hours.
            </p>
          </div>

          {/* Role selector */}
          <div className="flex bg-sky-50 p-1.5 rounded-2xl border border-sky-200/60 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                role === 'student' ? 'bg-white text-sky-800 shadow-xs' : 'text-slate-600 hover:text-sky-700'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole('office')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                role === 'office' ? 'bg-white text-sky-800 shadow-xs' : 'text-slate-600 hover:text-sky-700'
              }`}
            >
              Office
            </button>
            <button
              type="button"
              onClick={() => setRole('developer')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                role === 'developer' ? 'bg-white text-sky-800 shadow-xs' : 'text-slate-600 hover:text-sky-700'
              }`}
            >
              Creative/Tech
            </button>
          </div>
        </div>

        {/* Sliders & Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 items-center">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="desk-hours-slider" className="text-sm font-bold text-[#075985]">
                Daily Screen / Focus Time
              </label>
              <span className="text-base font-extrabold text-[#0284c7]">{deskHours} hours</span>
            </div>
            <input
              id="desk-hours-slider"
              type="range"
              min="4"
              max="12"
              step="1"
              value={deskHours}
              onChange={(e) => setDeskHours(parseInt(e.target.value))}
              className="w-full h-2 bg-sky-100 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>4 hours</span>
              <span>8 hours</span>
              <span>12 hours</span>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-sky-50/70 border border-sky-100/80 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                Dehydration drops concentration by up to <strong>15%</strong>. Taking regular small sips is 3x more hydrating than chugging water all at once.
              </p>
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-gradient-to-br from-[#e0f7ff] to-[#f0fbff] p-6 rounded-2xl border border-[#c9edf8] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">Ratab Schedule</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white text-sky-700 font-bold border border-sky-200">
                100% Silent
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white/80 p-3.5 rounded-xl border border-sky-100">
                <span className="text-[11px] text-slate-500 font-medium block">Daily Session Target</span>
                <span className="text-xl font-extrabold text-[#075985] flex items-center gap-1">
                  <Droplets className="w-4 h-4 text-sky-500" />
                  {totalRecommendedMl} ml
                </span>
              </div>

              <div className="bg-white/80 p-3.5 rounded-xl border border-sky-100">
                <span className="text-[11px] text-slate-500 font-medium block">Gentle Pulse Every</span>
                <span className="text-xl font-extrabold text-[#0284c7] flex items-center gap-1">
                  <Clock className="w-4 h-4 text-sky-500" />
                  {intervalMinutes} min
                </span>
              </div>
            </div>

            <p className="text-xs text-[#5f7b8d] text-center">
              The stand light softly breathes ~{sipSizeMl}ml reminders without taking you out of your flow state.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
