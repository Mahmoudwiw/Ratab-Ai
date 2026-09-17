import React, { useState } from 'react';
import { Bluetooth, Droplets, Shield, Flower2, Wifi, CheckCircle2 } from 'lucide-react';

export const PrototypeDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pairing' | 'tracking' | 'risk' | 'garden'>('tracking');
  const [riskLevel, setRiskLevel] = useState<'gentle' | 'moderate' | 'strict'>('moderate');
  const [gardenBlooms, setGardenBlooms] = useState<number>(4);
  const [isWatering, setIsWatering] = useState<boolean>(false);

  const handleWaterGarden = () => {
    setIsWatering(true);
    setTimeout(() => {
      setGardenBlooms(prev => Math.min(8, prev + 1));
      setIsWatering(false);
    }, 600);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/95 rounded-2xl border border-sky-100 shadow-md p-4 md:p-6 text-slate-800">
      {/* Screen Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 pb-4 border-b border-sky-100/70">
        <button
          type="button"
          onClick={() => setActiveTab('pairing')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
            activeTab === 'pairing'
              ? 'bg-sky-700 text-white shadow-xs'
              : 'bg-slate-100 hover:bg-sky-50 text-slate-600'
          }`}
        >
          <Bluetooth className="w-3.5 h-3.5 text-sky-400" />
          1. Smart Cup Pairing
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tracking')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
            activeTab === 'tracking'
              ? 'bg-sky-700 text-white shadow-xs'
              : 'bg-slate-100 hover:bg-sky-50 text-slate-600'
          }`}
        >
          <Droplets className="w-3.5 h-3.5 text-sky-400" />
          2. Daily Real Intake
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('risk')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
            activeTab === 'risk'
              ? 'bg-sky-700 text-white shadow-xs'
              : 'bg-slate-100 hover:bg-sky-50 text-slate-600'
          }`}
        >
          <Shield className="w-3.5 h-3.5 text-sky-400" />
          3. Risk Level Selector
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('garden')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
            activeTab === 'garden'
              ? 'bg-sky-700 text-white shadow-xs'
              : 'bg-slate-100 hover:bg-sky-50 text-slate-600'
          }`}
        >
          <Flower2 className="w-3.5 h-3.5 text-cyan-400" />
          4. Virtual Garden Reward
        </button>
      </div>

      {/* Screen Frame Mockup */}
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 items-center">
        {/* Phone Mockup Body */}
        <div className="mx-auto w-[260px] h-[400px] bg-slate-900 rounded-[36px] p-3 shadow-xl border-4 border-slate-800 relative flex flex-col justify-between overflow-hidden">
          {/* Dynamic Island / Speaker */}
          <div className="w-20 h-4 bg-black rounded-full mx-auto mb-2 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-sky-400 rounded-full animate-pulse mr-1.5" />
          </div>

          {/* Screen Content Container */}
          <div className="flex-1 bg-gradient-to-b from-sky-50 via-white to-sky-50/40 rounded-[24px] p-3.5 flex flex-col justify-between overflow-hidden text-left">
            {/* Top status inside phone */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold mb-2">
              <span className="text-sky-800 font-bold">Ratab AI | رطب</span>
              <div className="flex items-center gap-1">
                <Wifi className="w-3 h-3 text-sky-500" />
                <span>94%</span>
              </div>
            </div>

            {/* TAB 1: PAIRING */}
            {activeTab === 'pairing' && (
              <div className="flex flex-col items-center text-center justify-center flex-1 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-sky-700 text-white flex items-center justify-center shadow-md">
                    <Bluetooth className="w-6 h-6 text-sky-300" />
                  </div>
                </div>
                <h4 className="text-sky-950 font-bold text-sm">Ratab Smart Cup v1.2</h4>
                <p className="text-[11px] text-slate-500 mb-3">Precision Weight Sensor • Active</p>
                <div className="bg-sky-50 text-sky-800 border border-sky-200 px-3 py-1.5 rounded-xl text-[10px] font-bold flex items-center gap-1 mb-2">
                  <CheckCircle2 className="w-3 h-3 text-sky-600" />
                  Auto-sync active (±5g)
                </div>
                <span className="text-[9px] text-slate-400">Desk Stand Mode: Ready</span>
              </div>
            )}

            {/* TAB 2: TRACKING */}
            {activeTab === 'tracking' && (
              <div className="flex flex-col flex-1 justify-between animate-in fade-in">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Today's Hydration</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-2xl font-black text-sky-800">1,650</span>
                    <span className="text-xs text-slate-400">/ 2,200 ml</span>
                  </div>
                </div>

                {/* Circular ring or bar */}
                <div className="my-2 bg-sky-50 rounded-xl p-2.5 border border-sky-100">
                  <div className="flex justify-between text-[10px] font-bold text-slate-600 mb-1">
                    <span>Target Progress</span>
                    <span className="text-sky-600 font-extrabold">75%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full w-[75%]" />
                  </div>
                </div>

                {/* Hourly bars */}
                <div>
                  <span className="text-[9px] text-slate-400 font-semibold mb-1 block">Intake by Work Hour</span>
                  <div className="grid grid-cols-6 gap-1 items-end h-14 bg-white p-1.5 rounded-lg border border-sky-100">
                    <div className="bg-sky-200 h-[40%] rounded-t-xs text-[8px] text-center" />
                    <div className="bg-sky-300 h-[60%] rounded-t-xs text-[8px] text-center" />
                    <div className="bg-sky-600 h-[90%] rounded-t-xs text-[8px] text-center" />
                    <div className="bg-sky-300 h-[30%] rounded-t-xs text-[8px] text-center" />
                    <div className="bg-sky-500 h-[75%] rounded-t-xs text-[8px] text-center" />
                    <div className="bg-slate-200 h-[10%] rounded-t-xs text-[8px] text-center" />
                  </div>
                  <div className="flex justify-between text-[8px] text-slate-400 mt-0.5">
                    <span>9 AM</span>
                    <span>1 PM</span>
                    <span>5 PM</span>
                  </div>
                </div>

                <div className="text-[10px] text-center text-sky-800 font-medium bg-sky-100/60 py-1 rounded-lg">
                  Last intake: 140 ml (22m ago)
                </div>
              </div>
            )}

            {/* TAB 3: RISK LEVEL */}
            {activeTab === 'risk' && (
              <div className="flex flex-col flex-1 justify-between animate-in fade-in">
                <div>
                  <h4 className="text-xs font-bold text-sky-950">Alert Profile</h4>
                  <p className="text-[10px] text-slate-500">Pick how firm your gentle reminders should be:</p>
                </div>

                <div className="flex flex-col gap-1.5 my-2">
                  <button
                    type="button"
                    onClick={() => setRiskLevel('gentle')}
                    className={`p-2 rounded-xl text-left border transition text-[10px] cursor-pointer ${
                      riskLevel === 'gentle'
                        ? 'border-sky-500 bg-sky-50 font-bold text-sky-800'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>🟢 Gentle (Student Mode)</span>
                      {riskLevel === 'gentle' && <CheckCircle2 className="w-3 h-3 text-sky-600" />}
                    </div>
                    <span className="text-[8px] opacity-75 block font-normal">Soft glow every 45-60m</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRiskLevel('moderate')}
                    className={`p-2 rounded-xl text-left border transition text-[10px] cursor-pointer ${
                      riskLevel === 'moderate'
                        ? 'border-sky-500 bg-sky-50 font-bold text-sky-800'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>🟡 Moderate (Focus Work)</span>
                      {riskLevel === 'moderate' && <CheckCircle2 className="w-3 h-3 text-sky-600" />}
                    </div>
                    <span className="text-[8px] opacity-75 block font-normal">Subtle pulsing glow every 30m</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRiskLevel('strict')}
                    className={`p-2 rounded-xl text-left border transition text-[10px] cursor-pointer ${
                      riskLevel === 'strict'
                        ? 'border-sky-700 bg-sky-100/60 font-bold text-sky-900'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>🔴 Strict (Health / Medical)</span>
                      {riskLevel === 'strict' && <CheckCircle2 className="w-3 h-3 text-sky-700" />}
                    </div>
                    <span className="text-[8px] opacity-75 block font-normal">Steady blue light for kidney care</span>
                  </button>
                </div>

                <div className="text-[9px] text-slate-400 text-center">
                  Zero annoying alarm sounds in any mode.
                </div>
              </div>
            )}

            {/* TAB 4: VIRTUAL GARDEN */}
            {activeTab === 'garden' && (
              <div className="flex flex-col flex-1 justify-between text-center animate-in fade-in">
                <div>
                  <span className="text-[10px] font-bold text-sky-800 uppercase">Consistency Garden</span>
                  <p className="text-[10px] text-slate-500">Day 12 Streak • Oasis Blooming</p>
                </div>

                {/* Garden visual */}
                <div className="bg-gradient-to-t from-sky-100 to-sky-50 rounded-2xl p-3 border border-sky-200/60 my-1 flex flex-col items-center justify-center">
                  <div className="text-3xl mb-1 filter drop-shadow-sm">
                    {gardenBlooms > 6 ? '🌳🌸' : gardenBlooms > 3 ? '🌿🌺' : '🌱'}
                  </div>
                  <span className="text-[11px] font-extrabold text-sky-900">
                    {gardenBlooms} Blooms Active
                  </span>
                  <span className="text-[8px] text-sky-600">
                    +150ml hydration unlocks next flower
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleWaterGarden}
                  className="w-full py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer shadow-xs active:scale-95"
                >
                  <Droplets className={`w-3 h-3 ${isWatering ? 'animate-bounce' : ''}`} />
                  {isWatering ? 'Watering...' : 'Log Sip & Water Garden'}
                </button>
              </div>
            )}

            {/* Bottom Home Indicator */}
            <div className="w-20 h-1 bg-slate-300 rounded-full mx-auto mt-2" />
          </div>
        </div>

        {/* Narrative Explanations of the 4 Prototype Screens */}
        <div className="text-left flex flex-col justify-center space-y-4">
          <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-100">
            <h4 className="text-sm font-bold text-sky-900 flex items-center gap-1.5 mb-1">
              <span className="w-5 h-5 rounded-full bg-sky-600 text-white text-[11px] flex items-center justify-center font-bold">1</span>
              Smart Cup Pairing Screen
            </h4>
            <p className="text-xs text-slate-600">
              Instantly pairs via Bluetooth Low Energy (BLE). Shows auto-tare status and long-life battery health (30+ days).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-100">
            <h4 className="text-sm font-bold text-sky-900 flex items-center gap-1.5 mb-1">
              <span className="w-5 h-5 rounded-full bg-sky-600 text-white text-[11px] flex items-center justify-center font-bold">2</span>
              Daily Real Intake View
            </h4>
            <p className="text-xs text-slate-600">
              Replaces self-reported guesswork with gram-accurate sensor readings. Shows hour-by-hour cognitive hydration patterns.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-100">
            <h4 className="text-sm font-bold text-sky-900 flex items-center gap-1.5 mb-1">
              <span className="w-5 h-5 rounded-full bg-sky-600 text-white text-[11px] flex items-center justify-center font-bold">3</span>
              Risk-Level Selector
            </h4>
            <p className="text-xs text-slate-600">
              Users choose their preferred reminder intensity: <strong>Gentle</strong> (light focus), <strong>Moderate</strong> (deep work), or <strong>Strict</strong> (kidney health & doctor recommended).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-100">
            <h4 className="text-sm font-bold text-sky-900 flex items-center gap-1.5 mb-1">
              <span className="w-5 h-5 rounded-full bg-cyan-600 text-white text-[11px] flex items-center justify-center font-bold">4</span>
              Virtual Garden Reward System
            </h4>
            <p className="text-xs text-slate-600">
              Solves the 32% app abandonment rate. Consistent daily sips grow an oasis of native plants and unlock streak milestones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
