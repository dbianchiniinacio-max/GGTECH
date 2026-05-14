import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../hooks/use-game-store';
import { CheckCircle2, Coins, Plus, Zap, Timer, Star, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { Task, PlayerStats, TaskCategory, TaskDifficulty } from '../types/game';
import { translations, getRandomQuestPool } from '../lib/translations';

export const TaskList = () => {
  const { tasks, completeTask, addQuest, player } = useGameStore();
  const isDark = player.theme === 'dark';
  const t = translations[player.language];

  const [isCreatingCustom, setIsCreatingCustom] = React.useState(false);
  const [customQuest, setCustomQuest] = React.useState({
    title: '',
    description: '',
    category: 'fitness' as TaskCategory,
    difficulty: 'E' as TaskDifficulty,
    statReward: 'strength' as keyof PlayerStats
  });

  const handleNewQuest = () => {
    const difficulties = ['E', 'D', 'C', 'B', 'A', 'S'];
    const maxDifficultyIndex = Math.min(difficulties.length - 1, Math.floor(player.level / 15));
    const randomDifficulty = difficulties[Math.floor(Math.random() * (maxDifficultyIndex + 1))] as any;

    const questPool = getRandomQuestPool(player.language);
    const randomQuest = questPool[Math.floor(Math.random() * questPool.length)];

    const diffMultiplier = difficulties.indexOf(randomDifficulty) + 1;
    const scaleMult = player.difficultyScale === 1 ? 0.7 : player.difficultyScale === 2 ? 1 : 1.4;

    addQuest({
      ...randomQuest,
      description: randomQuest.description,
      difficulty: randomDifficulty,
      xpReward: Math.round(50 * diffMultiplier * scaleMult),
      coinReward: Math.round(10 * diffMultiplier * scaleMult),
      category: randomQuest.category as any,
      statReward: randomQuest.statReward as any,
      isDaily: false
    });
  };

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuest.title.trim()) return;

    addQuest({
      ...customQuest,
      xpReward: 50,
      coinReward: 10,
      isDaily: false
    });

    setCustomQuest({
      title: '',
      description: '',
      category: 'fitness',
      difficulty: 'E',
      statReward: 'strength'
    });
    setIsCreatingCustom(false);
  };

  const handleTaskClick = (task: Task) => {
    if (!task.completed) {
      completeTask(task.id);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'E': return 'text-gray-400';
      case 'D': return 'text-green-400';
      case 'C': return 'text-[#33adff]';
      case 'B': return 'text-purple-400';
      case 'A': return 'text-red-400';
      case 'S': return 'text-yellow-400';
      default: return 'text-primary';
    }
  };

  const getCategoryIcon = (category: string) => {
      switch (category) {
          case 'fitness': return <Zap className="w-4 h-4" />;
          case 'study': return <Timer className="w-4 h-4" />;
          case 'mental': return <Star className="w-4 h-4" />;
          default: return <Plus className="w-4 h-4" />;
      }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-1">
        <div className="flex flex-col">
            <h3 className={cn("text-[11px] font-black tracking-[0.3em] uppercase flex items-center gap-2", isDark ? "text-white/40" : "text-slate-400")}>
                <span className="w-1.5 h-1.5 bg-primary animate-pulse rounded-full" />
                {translations[player.language].daily_assignments}
            </h3>
            <p className="text-[10px] text-primary font-bold uppercase mt-1">
              {translations[player.language].status_active} • Reseta às 00:00 BRT
            </p>
        </div>
        <div className="flex gap-2">
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreatingCustom(true)}
                className={cn(
                "text-[10px] font-black uppercase tracking-widest px-4 py-2 border rounded-lg hover:bg-primary/10 hover:border-primary/50 transition-all flex items-center gap-2",
                isDark ? "bg-white/5 border-white/10 text-white/60 hover:text-primary" : "bg-white border-slate-200 text-slate-500 hover:text-primary shadow-sm"
                )}
            >
            <Plus className="w-3 h-3" /> {t.create_custom_quest}
            </motion.button>
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNewQuest}
                className={cn(
                "text-[10px] font-black uppercase tracking-widest px-4 py-2 border rounded-lg hover:bg-primary/10 hover:border-primary/50 transition-all flex items-center gap-2",
                isDark ? "bg-white/5 border-white/10 text-white/60 hover:text-primary" : "bg-white border-slate-200 text-slate-500 hover:text-primary shadow-sm"
                )}
            >
            <Zap className="w-3 h-3" /> {t.new_quest}
            </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isCreatingCustom && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleCreateCustom} className={cn(
              "p-6 border rounded-2xl space-y-4 mb-6 relative",
              isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200 shadow-sm"
            )}>
              <button 
                type="button"
                onClick={() => setIsCreatingCustom(false)}
                className="absolute top-4 right-4 p-1 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary mb-1 block">{t.quest_title}</label>
                  <input 
                    type="text"
                    required
                    value={customQuest.title}
                    onChange={e => setCustomQuest({...customQuest, title: e.target.value})}
                    placeholder="Ex: 10 abdominais"
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border font-bold focus:outline-none transition-all",
                      isDark ? "bg-black/40 border-white/10 text-white focus:border-primary" : "bg-slate-50 border-slate-200 text-slate-900 focus:border-primary"
                    )}
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary mb-1 block">{t.quest_description}</label>
                  <textarea 
                    value={customQuest.description}
                    onChange={e => setCustomQuest({...customQuest, description: e.target.value})}
                    placeholder="Opcional..."
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border font-bold focus:outline-none transition-all resize-none h-20",
                      isDark ? "bg-black/40 border-white/10 text-white focus:border-primary" : "bg-slate-50 border-slate-200 text-slate-900 focus:border-primary"
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary mb-1 block">{t.quest_category}</label>
                    <select 
                      value={customQuest.category}
                      onChange={e => setCustomQuest({...customQuest, category: e.target.value as TaskCategory})}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border font-bold focus:outline-none transition-all",
                        isDark ? "bg-black/40 border-white/10 text-white focus:border-primary" : "bg-slate-50 border-slate-200 text-slate-900 focus:border-primary"
                      )}
                    >
                      <option value="fitness">Fitness</option>
                      <option value="study">Study</option>
                      <option value="mental">Mental</option>
                      <option value="health">Health</option>
                      <option value="discipline">Discipline</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary mb-1 block">{t.quest_difficulty}</label>
                    <select 
                      value={customQuest.difficulty}
                      onChange={e => setCustomQuest({...customQuest, difficulty: e.target.value as TaskDifficulty})}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border font-bold focus:outline-none transition-all",
                        isDark ? "bg-black/40 border-white/10 text-white focus:border-primary" : "bg-slate-50 border-slate-200 text-slate-900 focus:border-primary"
                      )}
                    >
                      <option value="E">E</option>
                      <option value="D">D</option>
                      <option value="C">C</option>
                      <option value="B">B</option>
                      <option value="A">A</option>
                      <option value="S">S</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary mb-1 block">{t.quest_stat_reward}</label>
                  <select 
                    value={customQuest.statReward}
                    onChange={e => setCustomQuest({...customQuest, statReward: e.target.value as keyof PlayerStats})}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border font-bold focus:outline-none transition-all",
                      isDark ? "bg-black/40 border-white/10 text-white focus:border-primary" : "bg-slate-50 border-slate-200 text-slate-900 focus:border-primary"
                    )}
                  >
                    <option value="strength">Strength</option>
                    <option value="intelligence">Intelligence</option>
                    <option value="discipline">Discipline</option>
                    <option value="focus">Focus</option>
                    <option value="endurance">Endurance</option>
                    <option value="agility">Agility</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="submit"
                    className="flex-1 bg-primary text-black font-black uppercase tracking-widest py-3 rounded-xl hover:scale-[1.02] transition-transform"
                  >
                    {t.create}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsCreatingCustom(false)}
                    className={cn(
                      "flex-1 border font-black uppercase tracking-widest py-3 rounded-xl hover:bg-white/5 transition-all",
                      isDark ? "border-white/10 text-white/60" : "border-slate-200 text-slate-500"
                    )}
                  >
                    {t.cancel}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              key={task.id}
              onClick={() => handleTaskClick(task)}
              className={cn(
                "group relative p-5 border rounded-2xl cursor-pointer transition-all duration-300",
                isDark 
                  ? "bg-gradient-to-br from-white/[0.05] to-transparent border-white/5 hover:from-white/[0.08] hover:shadow-[0_0_30px_rgba(var(--primary),0.1)]" 
                  : "bg-white border-slate-200 shadow-sm hover:border-primary/40 hover:shadow-md",
                task.completed && "opacity-40 grayscale pointer-events-none"
              )}
            >
              {/* Difficulty Indicator Side Bar */}
              <div className={cn(
                  "absolute left-0 top-4 bottom-4 w-1 rounded-r-full transition-colors",
                  task.completed ? "bg-primary" : (isDark ? "bg-white/10" : "bg-slate-200") + " group-hover:bg-primary/50"
              )} />

              <div className="flex items-center gap-5">
                <div className="relative">
                    <div className={cn(
                    "w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-500 overflow-hidden relative",
                    task.completed ? "bg-primary border-primary" : (isDark ? "bg-black/40 border-white/10" : "bg-slate-50 border-slate-200") + " group-hover:border-primary/30"
                    )}>
                        {task.completed ? (
                            <CheckCircle2 className="w-7 h-7 text-black drop-shadow-sm" />
                        ) : (
                            <span className={cn("font-black text-xl italic", getDifficultyColor(task.difficulty))}>
                                {task.difficulty}
                            </span>
                        )}
                        
                        {/* Shimmer effect for uncompleted */}
                        {!task.completed && (
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        )}
                    </div>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className={cn(
                      "font-black text-xl uppercase tracking-tight leading-none group-hover:text-primary transition-colors",
                      isDark ? "text-white" : "text-slate-900"
                    )}>
                        {task.title}
                    </h4>
                    {task.description && (
                      <p className={cn(
                        "text-sm lowercase first-letter:uppercase mt-1 font-bold",
                        isDark ? "text-white" : "text-slate-700"
                      )}>
                        {task.description}
                      </p>
                    )}
                    {task.streakCount > 0 && (
                        <div className={cn(
                            "flex items-center gap-1 px-1.5 py-0.5 border rounded text-[8px] font-black",
                            isDark ? "bg-orange-500/10 border-orange-500/20 text-orange-500" : "bg-white border-slate-300 text-slate-900 shadow-sm"
                        )}>
                            STREAK {task.streakCount}
                        </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <div className={cn("p-1 rounded", isDark ? "bg-white/5" : "bg-slate-100")}>
                            <Zap className="w-3 h-3 text-[#33adff]" />
                        </div>
                        <span className={cn(
                            "text-[10px] font-black uppercase",
                            isDark ? "text-white/50" : "text-slate-900"
                        )}>+{task.xpReward} XP</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className={cn("p-1 rounded", isDark ? "bg-white/5" : "bg-slate-100")}>
                            <Coins className="w-3 h-3 text-yellow-500" />
                        </div>
                        <span className={cn(
                            "text-[10px] font-black uppercase",
                            isDark ? "text-white/50" : "text-slate-900"
                        )}>{task.coinReward}</span>
                    </div>
                    <div className="px-2 py-0.5 bg-primary/5 border border-primary/20 rounded text-[9px] font-black text-primary uppercase">
                        {task.statReward} +1
                    </div>
                    {/* Required Power Info */}
                    {(() => {
                      const reqPowerByDiff: Record<string, number> = {
                        'E': 100, 'D': 500, 'C': 1500, 'B': 4000, 'A': 10000, 'S': 25000
                      };
                      const difficultyReqMult = 1 + ((player.difficultyScale || 1) - 1) * 0.25;
                      const req = (reqPowerByDiff[task.difficulty] || 100) * difficultyReqMult;
                      const isInsufficient = player.powerScore < req;
                      return (
                        <div className={cn(
                          "px-2 py-0.5 border rounded text-[8px] font-black uppercase tracking-tighter",
                          isInsufficient ? "bg-red-500/10 border-red-500 text-red-500" : "bg-green-500/10 border-green-500/30 text-green-500"
                        )}>
                          REQ: {req} CP {isInsufficient && "⚠️"}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Reward Particle Effect placeholder (Visual only) */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-1 h-1 bg-primary rounded-full animate-ping" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Footer Info */}
      <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
          <p className="text-[10px] font-bold text-primary/80 uppercase tracking-widest text-center">
              "Fail to complete your daily quests and you will face a penalty."
          </p>
      </div>
    </div>
  );
};
