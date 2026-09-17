import React, { useState, useEffect } from 'react';
import { CheckCircle, Sparkles, Send, Users } from 'lucide-react';
import { WaitlistEntry } from '../types';

export const WaitlistSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('Student');
  const [message, setMessage] = useState('');
  const [savedEntry, setSavedEntry] = useState<WaitlistEntry | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ratab_waitlist');
      if (stored) {
        setSavedEntry(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return;

    const queueNum = 1420 + Math.floor(Math.random() * 80) + 1;
    const entry: WaitlistEntry = {
      email: cleanEmail,
      role: selectedRole,
      timestamp: Date.now(),
      queueNumber: queueNum,
    };

    try {
      localStorage.setItem('ratab_waitlist', JSON.stringify(entry));
    } catch {
      // ignore
    }

    setSavedEntry(entry);
    setMessage('Thanks! You are now on the Ratab AI waitlist.');
    setEmail('');
  };

  const handleResetWaitlist = () => {
    try {
      localStorage.removeItem('ratab_waitlist');
    } catch {
      // ignore
    }
    setSavedEntry(null);
    setMessage('');
  };

  return (
    <section id="join" className="cta relative py-20 px-[7%] bg-gradient-to-br from-[#075985] to-[#0284c7] text-white text-center overflow-hidden">
      {/* Decorative Floating Circles */}
      <div className="absolute w-44 h-44 border-2 border-white/15 rounded-full -left-12 -top-16 pointer-events-none" />
      <div className="absolute w-44 h-44 border-2 border-white/15 rounded-full -right-10 -bottom-16 pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">
          Make hydration effortless
        </h2>
        <p className="text-sky-100 text-base md:text-lg mb-7 leading-relaxed">
          Be one of the first people to experience Ratab AI.
        </p>

        {savedEntry ? (
          <div className="bg-white/15 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-white shadow-xl animate-in fade-in">
            <div className="w-12 h-12 rounded-full bg-cyan-400/20 border border-cyan-300 flex items-center justify-center mx-auto mb-3 text-cyan-200">
              <CheckCircle className="w-6 h-6 text-cyan-300" />
            </div>
            <h3 className="text-xl font-bold mb-1">You're on the priority waitlist!</h3>
            <p className="text-sky-100 text-sm mb-4">
              Registered with: <strong className="text-white">{savedEntry.email}</strong>
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-300 text-[#075985] font-extrabold text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              Priority Spot #{savedEntry.queueNumber}
            </div>
            <p className="text-xs text-sky-200 block mb-4">
              We will notify you the moment the first batch of Ratab AI smart stands is ready for shipment.
            </p>
            <button
              type="button"
              onClick={handleResetWaitlist}
              className="text-xs text-sky-200 hover:text-white underline cursor-pointer"
            >
              Sign up with another email
            </button>
          </div>
        ) : (
          <div>
            {/* Quick Role Toggle */}
            <div className="flex justify-center items-center gap-2 mb-4 text-xs font-semibold">
              <span className="text-sky-200">I am a:</span>
              {['Student', 'Office Employee', 'Other'].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`px-3 py-1 rounded-full transition cursor-pointer ${
                    selectedRole === role
                      ? 'bg-white text-[#075985] font-bold shadow-xs'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            {/* Waitlist Form conforming exactly to user's HTML IDs and Classes */}
            <form
              id="waitlistForm"
              onSubmit={handleSubmit}
              className="waitlist max-w-[470px] mx-auto flex flex-col sm:flex-row gap-2.5 relative z-10"
            >
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 py-3.5 px-5 bg-white text-slate-800 placeholder-slate-400 rounded-full text-sm outline-hidden shadow-xs focus:ring-2 focus:ring-cyan-300"
              />
              <button
                id="btn-waitlist-submit"
                type="submit"
                className="px-6 py-3.5 sm:py-0 rounded-full bg-[#a5f3fc] hover:bg-white text-[#075985] font-bold text-sm transition-all cursor-pointer shadow-xs active:scale-95 whitespace-nowrap"
              >
                Join Us
              </button>
            </form>

            {/* Form feedback message */}
            <div id="message" className="mt-4 text-[#d9faff] text-sm font-medium min-h-[20px]">
              {message}
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-sky-200">
              <Users className="w-3.5 h-3.5 text-cyan-300" />
              <span>Over 1,400+ focused minds waiting for the launch</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
