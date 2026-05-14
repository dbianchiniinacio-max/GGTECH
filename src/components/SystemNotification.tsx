import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { useGameStore } from '../hooks/use-game-store';
import { ShieldAlert, Info, TrendingUp, Trophy } from 'lucide-react';

export const SystemNotificationContainer = () => {
  const { systemMessages } = useGameStore();

  return (
    <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 items-end pointer-events-none w-full max-w-sm">
      <AnimatePresence mode="popLayout">
        {systemMessages.map((msg) => (
          <SystemNotification key={msg.id} message={msg.text} type={msg.type} />
        ))}
      </AnimatePresence>
    </div>
  );
};

interface SystemNotificationProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'rank_up' | 'stat_up' | 'dungeon' | 'pet' | 'title';
}

const SystemNotification: React.FC<SystemNotificationProps> = ({ message, type = 'info' }) => {
  const getIcon = () => {
    switch (type) {
      case 'warning': return <ShieldAlert className="w-4 h-4 text-red-500" />;
      case 'success': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'rank_up': return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 'stat_up': return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case 'dungeon': return <ShieldAlert className="w-4 h-4 text-purple-500" />;
      case 'pet': return <Info className="w-4 h-4 text-pink-500" />;
      case 'title': return <Trophy className="w-4 h-4 text-indigo-500" />;
      default: return <Info className="w-4 h-4 text-primary" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'warning': return 'border-red-500';
      case 'success': return 'border-green-500';
      case 'rank_up': return 'border-yellow-500/50';
      case 'stat_up': return 'border-blue-500/50';
      default: return 'border-primary/50';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      className={cn(
        "pointer-events-auto p-4 border-l-2 bg-black/80 backdrop-blur-xl shadow-2xl overflow-hidden relative group min-w-[280px]",
        getBorderColor()
      )}
    >
      {/* Background Glow */}
      <div className={cn(
        "absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity",
        type === 'rank_up' ? "bg-yellow-500" : "bg-primary"
      )} />
      
      <div className="relative z-10 flex gap-4 items-start">
        <div className="mt-0.5 p-1.5 bg-white/5 rounded border border-white/10">
          {getIcon()}
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-[10px] font-black tracking-[0.2em] text-primary/80 uppercase flex items-center gap-2">
            [ SYSTEM ]
            <span className="w-1 h-1 bg-primary/40 rounded-full" />
            <span className="opacity-50 font-medium">RECENT LOG</span>
          </div>
          <div className="text-sm font-bold text-white leading-relaxed">
            {message}
          </div>
        </div>
      </div>

      {/* Progress line animation */}
      <motion.div 
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 5, ease: "linear" }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary origin-left"
      />
    </motion.div>
  );
};
