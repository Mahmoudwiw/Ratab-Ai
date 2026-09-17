import React, { useState } from 'react';
import { Sparkles, RefreshCw, BellRing, Check, Droplets } from 'lucide-react';

interface InteractiveBottleProps {
  onIntakeLogged?: (amount: number) => void;
}

export const InteractiveBottle: React.FC<InteractiveBottleProps> = ({ onIntakeLogged }) => {
  const [waterLevel, setWaterLevel] = useState<number>(62); // Percentage 0 - 100
  const [isLifting, setIsLifting] = useState<boolean>(false);
  const [isReminderActive, setIsReminderActive] = useState<boolean>(true);
  const [totalDrankMl, setTotalDrankMl] = useState<number>(540);
  const [lastActionMessage, setLastActionMessage] = useState<string | null>(null);

  const bottleCapacityMl = 750;
  const currentVolumeMl = Math.round((waterLevel / 100) * bottleCapacityMl);
  const bottleTareWeightG = 180;
  const totalWeightG = bottleTareWeightG + currentVolumeMl;

  const handleTakeSip = (amountMl: number = 120) => {
    if (waterLevel <= 5) {
      setLastActionMessage('Bottle is empty! Click refill.');
      setTimeout(() => setLastActionMessage(null), 2500);
      return;
    }

    setIsLifting(true);
    const actualDrank = Math.min(currentVolumeMl, amountMl);
    const newVolume = Math.max(0, currentVolumeMl - actualDrank);
    const newPercentage = Math.round((newVolume / bottleCapacityMl) * 100);

    setTimeout(() => {
      setWaterLevel(newPercentage);
      setTotalDrankMl(prev => prev + actualDrank);
      if (onIntakeLogged) onIntakeLogged(actualDrank);
      setLastActionMessage(`Measured: -${actualDrank} ml (${actualDrank}g)`);
    }, 400);

    setTimeout(() => {
      setIsLifting(false);
    }, 900);

    setTimeout(() => {
      setLastActionMessage(null);
    }, 3500);
  };

  const handleRefill = () => {
    setIsLifting(true);
    setTimeout(() => {
      setWaterLevel(92);
      setLastActionMessage('Bottle refilled: 690 ml');
    }, 400);

    setTimeout(() => {
      setIsLifting(false);
    }, 900);

    setTimeout(() => {
      setLastActionMessage(null);
    }, 3000);
  };

  const toggleReminder = () => {
    setIsReminderActive(prev => !prev);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Product Illustration Stage */}
      <div className="product-area w-full max-w-[380px] h-[440px] flex items-center justify-center relative select-none">
        {/* Ambient Glow */}
        <div
          className={`glow transition-opacity duration-700 ${
            isReminderActive ? 'opacity-90' : 'opacity-30'
          }`}
        />

        {/* Smart Stand */}
        <div className="stand relative flex items-center justify-center">
          {/* Bottle that can simulate lifting or sitting */}
          <div
            className="bottle"
            style={{
              transform: isLifting
                ? 'translateY(-34px) rotate(-3deg)'
                : 'translateY(0) rotate(0deg)',
              transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Dynamic Water Volume */}
            <div
              className="water"
              style={{
                height: `${Math.max(4, waterLevel)}%`,
              }}
            >
              {/* Elliptical Water Surface */}
              <div className="water-surface" />
            </div>

            {/* Floating Bubbles */}
            <div className="bubble one" />
            <div className="bubble two" />
            <div className="bubble three" />

            {/* Bottle reflection highlight */}
            <div className="absolute top-4 left-3 w-1.5 h-32 bg-white/40 rounded-full blur-[0.5px] pointer-events-none" />
          </div>

          {/* Stand LED Glow Indicator */}
          <div
            className={`stand-light ${isReminderActive ? 'pulsing' : 'steady'}`}
            title={isReminderActive ? 'Gentle reminder light active' : 'Standby mode'}
            style={{
              boxShadow: isReminderActive
                ? '0 0 24px 9px rgba(56, 189, 248, 0.75)'
                : '0 0 10px 2px rgba(56, 189, 248, 0.35)',
            }}
          />

          {/* Precision weight sensor badge indicator on stand front */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-white/70 backdrop-blur-xs border border-sky-100 text-[10px] font-semibold text-sky-900 tracking-wide">
            {isLifting ? 'LIFTED' : `${totalWeightG}g`}
          </div>
        </div>

        {/* Status Toast when bottle is interacted with */}
        {lastActionMessage && (
          <div className="absolute top-4 bg-sky-900/90 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-full shadow-lg border border-sky-400/30 flex items-center gap-1.5 animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>{lastActionMessage}</span>
          </div>
        )}
      </div>

      {/* Interactive Testing Bar */}
      <div className="mt-4 w-full max-w-sm bg-white/85 backdrop-blur-md p-3.5 rounded-2xl border border-sky-100 shadow-sm flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 px-1">
          <span className="flex items-center gap-1 text-sky-800">
            <Droplets className="w-3.5 h-3.5 text-sky-500" />
            Sensor Reading: <strong className="text-sky-700">{currentVolumeMl} ml</strong>
          </span>
          <span className="text-slate-500">
            Logged Today: <strong className="text-sky-700 font-bold">{totalDrankMl} ml</strong>
          </span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            id="btn-take-sip"
            type="button"
            onClick={() => handleTakeSip(140)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-sky-500 text-white hover:bg-sky-600 active:scale-95 transition shadow-sm cursor-pointer"
          >
            <Droplets className="w-3.5 h-3.5" />
            Take a Sip (-140ml)
          </button>

          <button
            id="btn-refill"
            type="button"
            onClick={handleRefill}
            className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl bg-sky-50 text-sky-800 hover:bg-sky-100 active:scale-95 transition border border-sky-200 cursor-pointer"
            title="Refill water bottle"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refill
          </button>

          <button
            id="btn-toggle-reminder"
            type="button"
            onClick={toggleReminder}
            className={`flex items-center justify-center p-2 rounded-xl border transition cursor-pointer ${
              isReminderActive
                ? 'bg-cyan-50 border-cyan-300 text-cyan-700'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
            title={isReminderActive ? 'Reminder active (click to mute glow)' : 'Glow paused (click to activate)'}
          >
            <BellRing className={`w-3.5 h-3.5 ${isReminderActive ? 'text-sky-600' : 'text-slate-400'}`} />
          </button>
        </div>

        <div className="text-[11px] text-center text-slate-500 font-medium">
          <span className="text-sky-600">Live Demo:</span> Place any bottle. The stand detects weight drop automatically.
        </div>
      </div>
    </div>
  );
};
