import React, { useState } from 'react';

export const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      stepNumber: 1,
      title: 'Place',
      description: 'Put your water bottle on the Ratab AI stand.',
      detail: 'Compatible with any standard insulated bottle, tumbler, or glass cup.',
    },
    {
      stepNumber: 2,
      title: 'Measure',
      description: "The built-in sensor tracks the bottle's weight.",
      detail: 'Continuous precision monitoring measures fluid displacement in real-time.',
    },
    {
      stepNumber: 3,
      title: 'Remind',
      description: 'A soft blue light appears when it is time to drink.',
      detail: 'Adaptive intervals based on ambient focus and elapsed time since last sip.',
    },
    {
      stepNumber: 4,
      title: 'Improve',
      description: 'See your progress and build a healthier routine.',
      detail: 'Subconscious habit formation keeps your mind energized and head clear.',
    },
  ];

  return (
    <section id="how" className="py-24 px-[7%] bg-white relative">
      {/* Title */}
      <div className="text-center max-w-[680px] mx-auto mb-16">
        <h2 className="text-[#075985] text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
          How Ratab AI works
        </h2>
        <p className="text-[#5f7b8d] text-base md:text-lg">
          Simple hydration tracking with zero manual logging.
        </p>
      </div>

      {/* 4 Steps */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step) => {
          const isSelected = activeStep === step.stepNumber;
          return (
            <div
              key={step.stepNumber}
              onClick={() => setActiveStep(step.stepNumber)}
              className={`text-center p-5 rounded-2xl transition-all duration-300 cursor-pointer ${
                isSelected ? 'bg-sky-50/60 ring-2 ring-sky-300' : 'hover:bg-slate-50'
              }`}
            >
              {/* Step Number Circle */}
              <div
                className={`w-14 h-14 mx-auto mb-5 rounded-full flex items-center justify-center text-white text-xl font-bold transition-transform ${
                  isSelected ? 'scale-110 shadow-md' : ''
                }`}
                style={{
                  background: 'linear-gradient(145deg, #38bdf8, #075985)',
                }}
              >
                {step.stepNumber}
              </div>

              {/* Step Title */}
              <h3 className="text-[#075985] text-xl font-bold mb-2">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-[#5f7b8d] text-sm leading-relaxed mb-3">
                {step.description}
              </p>

              {/* Micro detail hint */}
              <p className="text-[12px] text-sky-600/90 font-medium">
                {step.detail}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
