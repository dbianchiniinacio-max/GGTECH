import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../hooks/use-game-store';
import { Shield, Target, Zap, ChevronRight, User, Swords, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { translations } from '../lib/translations';

export const Onboarding = () => {
  const { completeOnboarding, player } = useGameStore();
  const t = translations[player.language];
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState(1);

  const steps = [
    {
      title: "SYSTEM INITIALIZATION",
      subtitle: "A NEW HUNTER HAS AWAKENED",
      content: (
        <div className="space-y-6">
          <div className="relative">
            <User className="w-12 h-12 text-primary mx-auto mb-4 opacity-50" />
            <input
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ENTER PLAYER NAME..."
              className="w-full bg-black/40 border-2 border-primary/20 rounded-xl px-6 py-4 text-center text-xl font-black italic tracking-widest focus:border-primary/60 focus:outline-none transition-all placeholder:text-white/10 text-primary"
            />
          </div>
          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] leading-relaxed">
            Choose your identity within the system. This name will be recorded in the Eternal Records of Ascension.
          </p>
        </div>
      )
    },
    {
      title: "SELECT DIFFICULTY",
      subtitle: "THE PATH YOU CHOOSE DEFINES YOUR POWER",
      content: (
        <div className="grid gap-4">
          {[
            { id: 1, label: 'EASY', desc: 'Lower requirements. Reduced XP growth.', icon: Zap, color: 'text-[#33adff]' },
            { id: 2, label: 'NORMAL', desc: 'Standard growth rate. Balanced progression.', icon: Target, color: 'text-purple-400' },
            { id: 3, label: 'HARDCORE', desc: 'Higher CP requirements. Maximum XP rewards.', icon: Shield, color: 'text-red-400' }
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setDifficulty(d.id)}
              className={cn(
                "p-4 rounded-xl border-2 text-left transition-all group flex items-center gap-4",
                difficulty === d.id 
                  ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(var(--primary),0.2)]" 
                  : "bg-white/5 border-white/5 hover:border-white/20"
              )}
            >
              <div className={cn("p-2 rounded-lg bg-black/40 border border-white/10 group-hover:border-primary/40", d.color)}>
                <d.icon className="w-6 h-6" />
              </div>
              <div>
                <div className={cn("font-black italic tracking-widest", difficulty === d.id ? "text-primary" : "text-white/60")}>
                  {d.label}
                </div>
                <div className="text-[10px] text-white/30 uppercase font-bold mt-0.5">{d.desc}</div>
              </div>
            </button>
          ))}
        </div>
      )
    },
    {
      title: "THE AWAKENING",
      subtitle: "DO YOU ACCEPT THE BURDEN OF POWER?",
      content: (
        <div className="space-y-6 text-center">
          <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
            <Zap className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
            <p className="text-xs text-primary font-bold uppercase tracking-widest leading-relaxed">
              Your journey begins here. Prepare yourself for the trials ahead.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-left">
              <span className="text-[10px] text-white/40 block mb-1">PLAYER</span>
              <span className="font-black italic text-primary uppercase">{name || 'UNKNOWN'}</span>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-left">
              <span className="text-[10px] text-white/40 block mb-1">PATH</span>
              <span className="font-black italic text-secondary uppercase">
                {difficulty === 1 ? 'EASY' : difficulty === 2 ? 'NORMAL' : 'HARDCORE'}
              </span>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[step - 1];

  const handleNext = () => {
    if (step < steps.length) {
      if (step === 1 && !name.trim()) return;
      setStep(step + 1);
    } else {
      completeOnboarding(name.trim() || 'Sung Jin-Woo', difficulty);
    }
  };

  const isDark = player.theme === 'dark';

  return (
    <div className={cn(
      "fixed inset-0 z-[200] flex items-center justify-center p-6 overflow-hidden transition-colors duration-1000",
      isDark ? "bg-black" : "bg-slate-50"
    )}>
      {/* Background Cinematic Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.1),transparent_70%)]" />
        <div className={cn(
          "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] transition-opacity",
          isDark ? "opacity-10" : "opacity-5"
        )} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="text-center mb-12">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h2 className="text-[10px] font-black tracking-[0.6em] text-primary uppercase">
              {currentStepData.title}
            </h2>
            <h1 className={cn(
              "text-2xl font-black italic tracking-tighter uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]",
              isDark ? "text-white" : "text-slate-900"
            )}>
              {currentStepData.subtitle}
            </h1>
          </motion.div>
        </div>

        <div className="min-h-[300px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
              className="w-full"
            >
              {currentStepData.content}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-between">
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  "w-12 h-1 rounded-full transition-all duration-500",
                  s <= step ? "bg-primary" : (isDark ? "bg-white/10" : "bg-slate-200")
                )}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="flex items-center gap-3 bg-primary px-8 py-3 rounded-xl font-black italic tracking-widest text-black group transition-all"
          >
            {step === steps.length ? 'AWAKEN' : 'CONTINUE'}
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};