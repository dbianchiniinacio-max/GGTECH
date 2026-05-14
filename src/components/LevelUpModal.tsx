import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import canvasConfetti from 'canvas-confetti';

interface LevelUpModalProps {
  level: number;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({ level, onClose }) => {
  React.useEffect(() => {
    // Cinematic entrance confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      canvasConfetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#3b82f6', '#000000'] });
      canvasConfetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#a855f7', '#ffffff'] });
    }, 250);

    // Auto-close after 8 seconds
    const timer = setTimeout(() => {
        onClose();
    }, 8000);

    return () => {
        clearInterval(interval);
        clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-primary/10" />
          {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: "100%", x: `${Math.random() * 100}%`, opacity: 0 }}
                animate={{ y: "-10%", opacity: [0, 1, 0] }}
                transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }}
                className="absolute w-1 h-20 bg-gradient-to-t from-transparent via-primary/50 to-transparent blur-sm"
              />
          ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotateX: 45 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 100 }}
        className="relative text-center perspective-1000"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1], 
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 90, 180, 270, 360] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/30 blur-[100px] rounded-full"
        />
        
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
        >
            <h2 className="text-[14px] font-black tracking-[1em] text-primary uppercase mb-6 drop-shadow-[0_0_10px_rgba(var(--primary),0.8)]">
                [ SYSTEM UPDATE ]
            </h2>
            
            <div className="relative inline-block mb-4">
                <motion.h1 
                    initial={{ scale: 0.5, letterSpacing: "1em" }}
                    animate={{ scale: 1, letterSpacing: "0.1em" }}
                    className="text-8xl font-black italic tracking-tighter text-white uppercase leading-none drop-shadow-2xl"
                >
                    LEVEL UP
                </motion.h1>
                <motion.div 
                    className="absolute -inset-2 bg-primary/20 blur-lg -z-10"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                />
            </div>

            <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-purple-400 mb-12 drop-shadow-glow"
            >
                LV. {level - 1} <span className="text-white">→</span> LV. {level}
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-12 text-left"
            >
                <div className="p-3 bg-white/5 border border-white/10 rounded backdrop-blur-sm">
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">Combat Power</p>
                    <p className="text-xl font-black">+500 CP</p>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded backdrop-blur-sm">
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">Aura Intensity</p>
                    <p className="text-xl font-black">+2%</p>
                </div>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(var(--primary), 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="group relative px-12 py-4 bg-primary text-black font-black uppercase tracking-[0.2em] transition-all overflow-hidden"
            >
              <span className="relative z-10">CONTINUE ASCENSION</span>
              <motion.div 
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
                style={{ opacity: 0.2 }}
              />
            </motion.button>
            
            <p className="mt-6 text-[10px] font-bold text-white/30 uppercase tracking-widest animate-pulse">
                Closing automatically in 8 seconds...
            </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
