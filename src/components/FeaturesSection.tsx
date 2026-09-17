import React, { useState } from 'react';
import { Scale, Droplet, BarChart3, Brain, ArrowUpRight } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const features = [
    {
      id: 1,
      icon: '⚖️',
      title: 'Real Intake Tracking',
      description:
        'The smart stand measures the bottle weight to understand how much water you actually drank.',
      detail:
        'Accurate down to ±5ml with medical-grade strain gauges. Distinguishes between refills and sips automatically.',
    },
    {
      id: 2,
      icon: '💧',
      title: 'Gentle Reminders',
      description:
        'A soft blue light reminds you to drink without sound, alarms, or interruption.',
      detail:
        'Ambient peripheral illumination that alerts your subconscious without ripping you out of your cognitive flow.',
    },
    {
      id: 3,
      icon: '📊',
      title: 'Simple Progress',
      description:
        'Track your daily intake and monthly progress through the companion experience.',
      detail:
        'View daily hydration curves, consistent intake intervals, and optimal brain hydration rhythms.',
    },
    {
      id: 4,
      icon: '🧠',
      title: 'Stay in Focus',
      description:
        'Ratab AI supports your routine without forcing you to stop what you are doing.',
      detail:
        'No notification badges, no intrusive lock screen alerts, no Bluetooth pairing headaches.',
    },
  ];

  return (
    <section id="features" className="py-24 px-[7%] bg-[#e9faff] relative">
      {/* Title */}
      <div className="text-center max-w-[680px] mx-auto mb-14">
        <h2 className="text-[#075985] text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
          Hydration without the hassle
        </h2>
        <p className="text-[#5f7b8d] text-base md:text-lg">
          Everything you need to build a better daily water habit.
        </p>
      </div>

      {/* Grid of 4 features */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <div
            key={feature.id}
            onClick={() => setActiveFeature(activeFeature === idx ? null : idx)}
            className="group bg-white p-7 rounded-2xl border border-[#d2f1fa] shadow-[0_10px_28px_rgba(8,145,178,0.06)] hover:shadow-[0_18px_35px_rgba(8,145,178,0.13)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              {/* Feature Icon */}
              <div className="w-12 h-12 rounded-2xl bg-[#d8f8ff] flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-[#075985] font-bold text-lg mb-2 group-hover:text-[#0284c7] transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-[#5f7b8d] text-sm leading-relaxed mb-3">
                {feature.description}
              </p>
            </div>

            {/* Interactive expansion hint */}
            <div className="pt-3 border-t border-sky-50 text-xs font-semibold text-sky-600 flex items-center justify-between">
              <span>{activeFeature === idx ? 'Close info' : 'Smart hardware note'}</span>
              <ArrowUpRight className={`w-3.5 h-3.5 transition-transform ${activeFeature === idx ? 'rotate-90 text-sky-800' : ''}`} />
            </div>

            {activeFeature === idx && (
              <div className="mt-2.5 p-2.5 rounded-xl bg-sky-50 text-[12px] text-sky-900 border border-sky-100">
                {feature.detail}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
