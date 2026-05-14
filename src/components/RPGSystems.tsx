import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../hooks/use-game-store';
import { cn } from '../lib/utils';
import { Sword, Brain, Activity, Target, Shield, Zap, Sparkles, Ghost, Bot, Trophy, Timer, Coins, ChevronRight } from 'lucide-react';

const DungeonTimer = ({ status, onComplete, theme }: { status: { dungeonId: string, endTime: number, startTime: number }, onComplete: () => void, theme: 'light' | 'dark' }) => {
  const [timeLeft, setTimeLeft] = React.useState(Math.max(0, status.endTime - Date.now()));

  React.useEffect(() => {
    const timer = setInterval(() => {
      const remaining = Math.max(0, status.endTime - Date.now());
      setTimeLeft(remaining);
    }, 1000);
    return () => clearInterval(timer);
  }, [status.endTime]);

  const totalDuration = status.endTime - status.startTime;
  const elapsed = Date.now() - status.startTime;
  const progress = Math.min(100, (elapsed / totalDuration) * 100);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  const isFinished = timeLeft === 0;

  return (
    <div className="p-8 bg-primary/5 border border-primary/30 rounded-3xl text-center space-y-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
         <motion.div 
           initial={{ width: '0%' }}
           animate={{ width: `${progress}%` }}
           transition={{ duration: 1, ease: 'linear' }}
           className="h-full bg-primary"
         />
      </div>
      <Timer className={cn("w-12 h-12 mx-auto", isFinished ? "text-green-400" : "text-primary animate-pulse")} />
      <div>
        <h3 className={cn(
          "text-xl font-black italic uppercase tracking-tighter",
          theme === 'dark' ? "text-white" : "text-slate-900"
        )}>
          {isFinished ? "Exploration Complete" : "Exploring Dungeon"}
        </h3>
        <p className="text-2xl font-black font-mono text-primary mt-2">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </p>
      </div>
      <button 
        onClick={onComplete}
        disabled={!isFinished}
        className={cn(
          "w-full py-4 font-black uppercase tracking-widest text-xs rounded-xl transition-all",
          isFinished 
            ? "bg-primary text-black hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(155,135,245,0.4)]" 
            : "bg-white/5 text-white/20 cursor-not-allowed"
        )}
      >
        {isFinished ? "Claim Rewards" : "Battling Entities..."}
      </button>
    </div>
  );
};

export const RPGSystems = () => {
  const { player, startDungeon, completeDungeon, hatchEgg, equipTitle } = useGameStore();
  const [activeSubTab, setActiveSubTab] = React.useState<'pets' | 'dungeons' | 'titles'>('pets');

  const rarityColors = {
    Common: 'text-gray-400',
    Rare: 'text-blue-400',
    Epic: 'text-purple-400',
    Legendary: 'text-yellow-400',
    Mythic: 'text-red-400',
    Monarch: 'text-indigo-400',
  };

  const statIcons = {
    strength: Sword,
    intelligence: Brain,
    discipline: Activity,
    focus: Target,
    endurance: Shield,
    agility: Zap,
  };

  return (
    <div className="space-y-6">
      <div className={cn(
        "flex gap-2 p-1 border rounded-2xl",
        player.theme === 'dark' ? "bg-white/5 border-white/10" : "bg-slate-100 border-slate-200"
      )}>
        {['pets', 'dungeons', 'titles'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab as any)}
            className={cn(
              "flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
              activeSubTab === tab ? "bg-primary text-black" : (player.theme === 'dark' ? "text-white/40 hover:text-white/60" : "text-slate-500 hover:text-slate-700")
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="min-h-[300px]">
        {activeSubTab === 'pets' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { rarity: 'Common' as const, icon: Sparkles, cost: 100, color: 'primary' },
                { rarity: 'Epic' as const, icon: Ghost, cost: 500, color: 'purple-500' }
              ].map((egg) => (
                <button 
                  key={egg.rarity}
                  onClick={() => hatchEgg(egg.rarity)}
                  disabled={player.coins < egg.cost}
                  className={cn(
                    "p-6 bg-white/5 border border-white/10 rounded-3xl group transition-all text-center relative overflow-hidden",
                    player.coins >= egg.cost ? `hover:border-${egg.color}/50` : "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className={cn(
                    "w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-transform",
                    player.coins >= egg.cost ? `bg-${egg.color}/10 group-hover:scale-110` : "bg-white/5"
                  )}>
                    <egg.icon className={cn("w-8 h-8", `text-${egg.color}`)} />
                  </div>
                  <h3 className={cn("text-xs font-black uppercase tracking-widest mb-1", `text-${egg.color}`)}>{egg.rarity} Egg</h3>
                  <p className={cn(
                    "text-[10px] uppercase font-black",
                    player.theme === 'dark' ? "text-white/40" : "text-slate-900"
                  )}>{egg.cost} Coins</p>
                  
                  {player.coins < egg.cost && (
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="text-[8px] font-black bg-red-500 text-white px-2 py-1 rounded rotate-12">LOCKED</span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Your Companions</h3>
              {player.pets.length === 0 ? (
                <div className="p-10 border border-dashed border-white/10 rounded-3xl text-center">
                  <Bot className="w-10 h-10 text-white/10 mx-auto mb-4" />
                  <p className="text-xs text-white/30 uppercase tracking-widest font-black">No pets found</p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {player.pets.map(pet => (
                    <div key={pet.id} className={cn(
                      "p-4 border rounded-2xl flex items-center gap-4",
                      player.theme === 'dark' ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-sm"
                    )}>
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-black/40 border", rarityColors[pet.rarity])}>
                        <Bot className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className={cn(
                            "font-black italic uppercase text-sm",
                            player.theme === 'dark' ? "text-white" : "text-slate-900"
                          )}>{pet.name}</h4>
                          <span className={cn("text-[8px] font-black uppercase px-2 py-0.5 border rounded-full", rarityColors[pet.rarity])}>
                            {pet.rarity}
                          </span>
                        </div>
                        <p className={cn(
                          "text-[9px] uppercase font-black",
                          player.theme === 'dark' ? "text-white/40" : "text-slate-500"
                        )}>Level {pet.level} • {pet.species}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeSubTab === 'dungeons' && (
          <div className="space-y-6">
            {player.dungeonStatus ? (
              <DungeonTimer 
                status={player.dungeonStatus} 
                onComplete={completeDungeon} 
                theme={player.theme}
              />
            ) : (
              <div className="grid gap-4">
                {[
                  { id: 'd1', name: 'Temple of Discipline', rarity: 'Common', power: 100, duration: '15m' },
                  { id: 'd2', name: 'Hall of Focus', rarity: 'Rare', power: 500, duration: '30m' },
                  { id: 'd3', name: 'Scholar’s Archive', rarity: 'Epic', power: 1200, duration: '1h' }
                ].map(d => (
                  <button
                    key={d.id}
                    onClick={() => startDungeon(d.id)}
                    className={cn(
                      "p-5 border rounded-2xl flex items-center justify-between group hover:border-primary/40 transition-all",
                      player.theme === 'dark' ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-sm"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-black/40 rounded-xl flex items-center justify-center border border-white/5">
                        <Ghost className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                      </div>
                      <div className="text-left">
                        <h4 className={cn(
                          "font-black italic uppercase text-sm",
                          player.theme === 'dark' ? "text-white" : "text-slate-900"
                        )}>{d.name}</h4>
                        <div className="flex gap-2 mt-1">
                          <span className={cn(
                            "text-[8px] font-black uppercase tracking-widest",
                            player.theme === 'dark' ? "text-white/30" : "text-slate-500"
                          )}>{d.duration}</span>
                          <span className="text-[8px] font-black uppercase text-primary tracking-widest">Req: {d.power} CP</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSubTab === 'titles' && (
          <div className="grid gap-3">
            {player.titles.map(title => (
              <button
                key={title.id}
                onClick={() => equipTitle(title.id)}
                className={cn(
                  "p-4 border rounded-2xl flex items-center justify-between transition-all",
                  player.activeTitleId === title.id 
                    ? "bg-primary/10 border-primary" 
                    : (player.theme === 'dark' ? "bg-white/5 border-white/10 opacity-70 hover:opacity-100" : "bg-white border-slate-200 shadow-sm hover:border-primary/30")
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-black/40 border", rarityColors[title.rarity])}>
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className={cn("font-black italic uppercase text-sm", rarityColors[title.rarity])}>{title.name}</h4>
                    <p className={cn(
                      "text-[9px] uppercase font-black",
                      player.theme === 'dark' ? "text-white/40" : "text-slate-500"
                    )}>Bonus: +{(title.bonusValue * 100).toFixed(0)}% {title.bonusType}</p>
                  </div>
                </div>
                {player.activeTitleId === title.id && (
                  <span className="text-[8px] font-black uppercase px-2 py-1 bg-primary text-black rounded">Equipped</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
