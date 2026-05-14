import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../hooks/use-game-store';
import { cn } from '../lib/utils';
import { Swords, Brain, Zap, Target, Shield, Activity, Flame, Star, TrendingUp } from 'lucide-react';
import { translations } from '../lib/translations';

export const PlayerProfile = () => {
  const { player } = useGameStore();
  const isDark = player.theme === 'dark';
  const t = translations[player.language];
  
  const xpPercentage = (player.xp / player.nextLevelXp) * 100;

  const statIcons = {
    strength: Swords,
    intelligence: Brain,
    discipline: Activity,
    focus: Target,
    endurance: Shield,
    agility: Zap,
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'E': return 'text-white border-gray-400 shadow-[0_0_10px_rgba(156,163,175,0.5)]';
      case 'D': return 'text-white border-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]';
      case 'C': return 'text-white border-[#33adff] shadow-[0_0_10px_rgba(51,173,255,0.5)]';
      case 'B': return 'text-white border-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.5)]';
      case 'A': return 'text-white border-red-400 shadow-[0_0_15px_rgba(248,113,113,0.5)]';
      case 'S': return 'text-white border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)]';
      case 'National': return 'text-white border-orange-500 shadow-[0_0_25px_rgba(249,115,22,0.7)]';
      case 'Monarch': return 'text-white border-indigo-400 shadow-[0_0_30px_rgba(129,140,248,0.8)] animate-pulse';
      default: return 'text-white border-primary';
    }
  };

  const getAuraColor = (rank: string) => {
      switch (rank) {
          case 'S':
          case 'National':
          case 'Monarch':
              return 'bg-gradient-to-t from-orange-500/20 via-yellow-500/10 to-transparent';
          default:
              return 'bg-gradient-to-t from-primary/20 via-transparent to-transparent';
      }
  }

  return (
    <div className="space-y-8 relative">
      {/* Background Aura Effect */}
      <div className={cn("absolute -inset-20 opacity-60 blur-[100px] rounded-full -z-10 transition-colors duration-1000", getAuraColor(player.rank))} />

      {/* Top Header & Avatar */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <motion.div 
            animate={{ 
                boxShadow: [
                    "0 0 20px rgba(var(--primary),0.2)",
                    "0 0 40px rgba(var(--primary),0.4)",
                    "0 0 20px rgba(var(--primary),0.2)"
                ] 
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className={cn(
                "w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center backdrop-blur-md relative overflow-hidden transition-all duration-500",
                isDark ? "bg-black/40 border-primary/20" : "bg-white border-slate-200 shadow-sm",
                getRankColor(player.rank).split(' ')[1] // Get border color
            )}
          >
             {player.avatarUrl ? (
                <div className="relative w-full h-full">
                  <img src={player.avatarUrl} alt="Avatar" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm py-0.5 flex flex-col items-center justify-center z-10">
                    <span className="text-[8px] font-black uppercase text-primary leading-none">LV</span>
                    <span className="text-xs font-black italic tracking-tighter text-white leading-none">{player.level}</span>
                  </div>
                </div>
             ) : (
                <>
                  <span className={cn("text-[10px] font-black uppercase", isDark ? "text-white" : "text-slate-900")}>{t.level}</span>
                  <span className={cn("text-3xl font-black italic tracking-tighter", isDark ? "text-white" : "text-slate-900")}>{player.level}</span>
                </>
             )}
             
             {/* Subtle scanline effect */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
          </motion.div>
          
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={cn(
                "absolute -top-3 -right-3 px-3 py-1 text-[16px] font-black rounded-lg border-2 bg-black uppercase tracking-widest z-20 shadow-xl",
                getRankColor(player.rank)
            )}
          >
            {player.rank}
          </motion.div>
        </div>
        
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black tracking-tight uppercase italic text-primary">{player.username}</h2>
            {player.streak > 2 && <Flame className="w-5 h-5 text-orange-500 fill-orange-500 animate-bounce" />}
          </div>
          <div className="flex flex-wrap gap-2">
              <span className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-[9px] font-bold text-primary uppercase tracking-tighter rounded">
                {player.title}
              </span>
              <span className={cn(
                "px-2 py-0.5 border text-[9px] font-bold uppercase tracking-tighter rounded flex items-center gap-1 transition-colors",
                isDark ? "bg-white/5 border-white/10 text-white/60" : "bg-white border-slate-300 text-slate-900 shadow-sm"
              )}>
                <Star className="w-2.5 h-2.5" /> COMBO: {player.streak}
              </span>
          </div>
        </div>
      </div>

      {/* Power Score Dashboard */}
      <div className="grid grid-cols-2 gap-4">
          <div className={cn(
            "relative p-4 border rounded-2xl overflow-hidden group transition-all",
            isDark ? "bg-gradient-to-br from-black/60 to-black/40 border-white/5" : "bg-white border-slate-200 shadow-sm"
          )}>
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                  <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">{t.combat_power}</p>
              <h3 className={cn("text-3xl font-black tracking-tighter", isDark ? "text-white" : "text-slate-900")}>{player.powerScore.toLocaleString()}</h3>
              <div className={cn("mt-2 h-1 w-full rounded-full overflow-hidden", isDark ? "bg-white/5" : "bg-slate-100")}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (player.powerScore / 10000) * 100)}%` }}
                    className="h-full bg-primary"
                  />
              </div>
          </div>
          <div className={cn(
            "relative p-4 border rounded-2xl overflow-hidden group transition-all",
            isDark ? "bg-gradient-to-br from-black/60 to-black/40 border-white/5" : "bg-white border-slate-200 shadow-sm"
          )}>
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Flame className="w-8 h-8 text-secondary" />
              </div>
              <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-1">{t.aura_intensity}</p>
              <h3 className={cn("text-3xl font-black tracking-tighter", isDark ? "text-white" : "text-slate-900")}>{player.auraIntensity}%</h3>
              <div className={cn("mt-2 h-1 w-full rounded-full overflow-hidden", isDark ? "bg-white/5" : "bg-slate-100")}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${player.auraIntensity}%` }}
                    className="h-full bg-secondary"
                  />
              </div>
          </div>
      </div>

      {/* XP Bar Section */}
      <div className="space-y-2 px-1">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
              <span className={cn(
                "text-[10px] font-black tracking-[0.3em] uppercase",
                isDark ? "text-white/40" : "text-slate-900"
              )}>{t.xp_progress}</span>
              <span className="text-xs font-bold text-primary">{t.next_lv}: {Math.floor(xpPercentage)}%</span>
          </div>
          <div className={cn(
            "text-[10px] font-black tracking-widest tabular-nums",
            isDark ? "text-white/60" : "text-slate-900"
          )}>
            {player.xp.toLocaleString()} <span className={isDark ? "text-white/20" : "text-slate-300"}>/</span> {player.nextLevelXp.toLocaleString()}
          </div>
        </div>
        <div className={cn("h-4 w-full rounded-lg p-1 border relative", isDark ? "bg-black/40 border-white/10" : "bg-slate-100 border-slate-200")}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${xpPercentage}%` }}
            className="h-full bg-gradient-to-r from-blue-600 via-primary to-purple-600 rounded-sm relative"
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-[shimmer_2s_infinite]" />
            <motion.div 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white blur-md rounded-full"
            />
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h3 className={cn("text-[11px] font-black tracking-[0.3em] uppercase flex items-center gap-2", isDark ? "text-white/40" : "text-slate-400")}>
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                {t.player_attributes}
            </h3>
            <span className="text-[9px] font-bold text-primary/60 uppercase">Manual Stat Allocation: OFF</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
            {(Object.entries(player.stats) as [keyof typeof player.stats, number][]).map(([key, value]) => {
            const Icon = statIcons[key];
            return (
                <motion.div 
                    whileHover={{ scale: 1.02, borderColor: "rgba(var(--primary),0.3)" }}
                    key={key} 
                    className={cn(
                      "p-4 rounded-xl flex items-center gap-4 group transition-all border",
                      isDark ? "bg-gradient-to-br from-white/[0.03] to-transparent border-white/5" : "bg-white border-slate-200 shadow-sm"
                    )}
                >
                <div className={cn("p-2.5 rounded-lg border transition-colors", isDark ? "bg-black/40 border-white/5 group-hover:border-primary/30" : "bg-slate-50 border-slate-100 group-hover:border-primary/20")}>
                    <Icon className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
                </div>
                <div>
                    <div className={cn(
                        "text-[10px] font-black uppercase tracking-[0.15em] mb-0.5",
                        isDark ? "text-white/60" : "text-slate-900"
                    )}>{key}</div>
                    <div className={cn("text-xl font-black italic tracking-tighter flex items-center gap-2", isDark ? "text-white" : "text-slate-900")}>
                        {value}
                        <TrendingUp className="w-3 h-3 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
                </motion.div>
            );
            })}
        </div>
      </div>
    </div>
  );
};
