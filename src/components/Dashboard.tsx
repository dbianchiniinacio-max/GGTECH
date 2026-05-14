import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../hooks/use-game-store';
import { PlayerProfile } from '../components/PlayerProfile';
import { TaskList } from '../components/TaskList';
import { SystemNotificationContainer } from '../components/SystemNotification';
import { LevelUpModal } from '../components/LevelUpModal';
import { Onboarding } from '../components/Onboarding';
import { Trophy, Home, ShoppingBag, LayoutGrid, Crown, Settings, User, Bell, BellOff, ChevronRight, Moon, Sun, Languages, Globe, Swords, ShieldCheck, Box, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';
import { translations } from '../lib/translations';
import { RPGSystems } from './RPGSystems';

export const Dashboard = () => {
  const { player, calculatePowerScore, promoteRank, addQuest, checkDailyReset, checkDeadlineApproaching, updateProfile, setTheme, setLanguage, toggleNotifications, logout } = useGameStore();
  const t = translations[player.language];
  const [activeTab, setActiveTab] = React.useState('home');
  const [levelUpData, setLevelUpData] = React.useState<{ level: number } | null>(null);
  const [isEditingProfile, setIsEditingProfile] = React.useState(false);
  const [editName, setEditName] = React.useState(player.username);

  const prevLevel = React.useRef(player.level);

  React.useEffect(() => {
    if (player.powerScore === 0) {
      calculatePowerScore();
    }
    checkDailyReset();
    checkDeadlineApproaching();
    
    // Check for notification permission if enabled in store
    if (player.notificationsEnabled && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    
    // Check reset and deadline every minute
    const interval = setInterval(() => {
      checkDailyReset();
      checkDeadlineApproaching();
    }, 60000);
    return () => clearInterval(interval);
  }, [player.onboardingCompleted, player.notificationsEnabled]);

  React.useEffect(() => {
    if (player.onboardingCompleted && player.level > prevLevel.current) {
      if (prevLevel.current > 0) {
        setLevelUpData({ level: player.level });
      }
      prevLevel.current = player.level;
    }
  }, [player.level, player.onboardingCompleted]);

  const navItems = [
    { id: 'home', icon: Home, label: t.dashboard },
    { id: 'ranks', icon: Trophy, label: t.evolution },
    { id: 'rpg', icon: Swords, label: 'Systems' },
    { id: 'shop', icon: ShoppingBag, label: t.arsenal },
    { id: 'system', icon: LayoutGrid, label: t.system },
  ];

  const getRankStyles = (rank: string) => {
    switch (rank) {
      case 'E': return 'text-white border-gray-400/30';
      case 'D': return 'text-white border-green-400/30';
      case 'C': return 'text-white border-[#33adff]/30';
      case 'B': return 'text-white border-purple-400/30';
      case 'A': return 'text-white border-red-400/30';
      case 'S': return 'text-white border-yellow-400/30 shadow-[0_0_15px_rgba(250,204,21,0.2)]';
      case 'National': return 'text-white border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.3)]';
      case 'Monarch': return 'text-white border-indigo-400/30 shadow-[0_0_25px_rgba(129,140,248,0.4)]';
      default: return 'text-white border-primary/30';
    }
  };

  return (
    <div className={cn(
      "min-h-screen pb-32 selection:bg-primary selection:text-primary-foreground overflow-x-hidden transition-colors duration-500",
      player.theme === 'dark' ? "bg-[#050505] text-foreground" : "bg-slate-50 text-slate-900"
    )}>
      {!player.onboardingCompleted && <Onboarding />}
      {/* Immersive Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={cn(
          "absolute top-[-10%] left-[-10%] w-[60%] h-[60%] blur-[150px] rounded-full animate-pulse transition-colors duration-1000",
          player.theme === 'dark' ? "bg-primary/10" : "bg-primary/5"
        )} />
        <div className={cn(
          "absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] blur-[150px] rounded-full transition-colors duration-1000",
          player.theme === 'dark' ? "bg-blue-500/10" : "bg-blue-500/5"
        )} />
        
        {/* Particle Overlay */}
        <div className={cn(
          "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] transition-opacity duration-1000",
          player.theme === 'dark' ? "opacity-[0.05]" : "opacity-[0.02]"
        )} />
        
        {/* Animated Grid lines */}
        <div className={cn(
          "absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] transition-opacity duration-1000",
          player.theme === 'dark' ? "opacity-100" : "opacity-20"
        )} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-10">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-12">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className={cn(
                  "text-[10px] font-black tracking-[0.4em] uppercase",
                  player.theme === 'dark' ? "text-white/40" : "text-slate-400"
                )}>{t.system_interface}</span>
            </div>
            <h1 className={cn(
              "text-4xl font-black tracking-tighter italic uppercase flex items-center gap-3",
              player.theme === 'dark' ? "text-white" : "text-slate-900"
            )}>
                ASCENSION
                <span 
                  className="ml-2"
                  style={{
                    WebkitTextStroke: '2px #33adff',
                    color: 'transparent',
                    textShadow: '0 0 50px #33adff, 0 0 20px #33adff, 0 0 10px #ffffff',
                  }}
                >
                  SYSTEM
                </span>
            </h1>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <motion.button 
                whileHover={{ scale: 1.1, rotate: player.notificationsEnabled ? 10 : 0 }}
                onClick={() => toggleNotifications()}
                className={cn(
                  "p-3 rounded-2xl transition-all group border",
                  player.notificationsEnabled 
                    ? "bg-primary/5 border-primary/40 hover:bg-primary/10 hover:border-primary/60" 
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                )}
                title={player.notificationsEnabled ? "Modo Normal" : "Modo Silencioso"}
              >
                {player.notificationsEnabled ? (
                  <Bell className="w-5 h-5 text-white/60 group-hover:text-primary transition-colors" />
                ) : (
                  <BellOff className="w-5 h-5 text-white/20 group-hover:text-white/40 transition-colors" />
                )}
              </motion.button>
              <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/40 rounded-2xl shadow-[0_0_15px_rgba(var(--primary),0.1)]">
                    <Crown className="w-4 h-4 text-primary fill-primary/20" />
                    <span className="text-lg font-black tracking-tight tabular-nums text-primary">{player.coins.toLocaleString()}</span>
                  </div>
              </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="relative">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                className="space-y-6"
              >
                <PlayerProfile />
                <div className="relative pt-4">
                    <TaskList />
                </div>
              </motion.div>
            )}

            {activeTab === 'ranks' && (
              <motion.div 
                key="ranks"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="space-y-8 py-4"
              >
                <div className="text-center space-y-2 mb-10">
                    <Trophy className="w-16 h-16 text-primary mx-auto mb-4 drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                    <h2 className="text-3xl font-black uppercase tracking-widest italic">Evolution Path</h2>
                    <p className={cn(
                      "text-xs uppercase tracking-[0.2em]",
                      player.theme === 'dark' ? "text-white/40" : "text-slate-500"
                    )}>Ascend through the ranks to unlock Monarch power</p>
                </div>

                <div className="grid gap-4">
                  {['E', 'D', 'C', 'B', 'A', 'S', 'National', 'Monarch'].map((rank) => {
                    const isCurrent = player.rank === rank;
                    const rankProgression = ['E', 'D', 'C', 'B', 'A', 'S', 'National', 'Monarch'];
                    const currentIndex = rankProgression.indexOf(player.rank);
                    const itemIndex = rankProgression.indexOf(rank as any);
                    const isUnlocked = itemIndex <= currentIndex;

                    return (
                      <motion.div 
                        key={rank}
                        whileHover={isUnlocked ? { scale: 1.02, x: 10 } : {}}
                        className={cn(
                          "group relative p-6 border rounded-2xl flex justify-between items-center transition-all duration-500 overflow-hidden",
                          isCurrent 
                            ? "bg-primary/10 border-primary shadow-[0_0_40px_rgba(var(--primary),0.15)]" 
                            : isUnlocked 
                              ? "bg-white/5 border-white/10 opacity-80" 
                              : "bg-white/[0.02] border-white/5 opacity-30 grayscale"
                        )}
                      >
                        {/* Background Rank Letter */}
                        <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-8xl font-black opacity-[0.03] select-none italic">
                            {rank}
                        </div>

                        <div className="flex items-center gap-6">
                            <div className={cn(
                                "w-14 h-14 rounded-xl border-2 flex items-center justify-center font-black text-2xl italic",
                                getRankStyles(rank)
                            )}>
                                {rank[0]}
                            </div>
                            <div>
                                <h3 className="font-black italic text-xl uppercase tracking-tighter">
                                    {rank} <span className="text-primary/60">RANK</span>
                                </h3>
                                <p className={cn(
                                    "text-[10px] font-bold uppercase tracking-widest mt-0.5",
                                    player.theme === 'dark' ? "text-white/40" : "text-slate-500"
                                )}>
                                    {isCurrent ? "Current Level" : isUnlocked ? "Rank Achieved" : "Requirements Not Met"}
                                </p>
                            </div>
                        </div>

                        {isCurrent && (
                          <div className="flex flex-col items-end gap-2">
                            {(() => {
                              const rankRequirements: Record<string, number> = {
                                'E': 1, 'D': 15, 'C': 35, 'B': 60, 'A': 100, 'S': 150, 'National': 250, 'Monarch': 1000
                              };
                              const nextRanks: Record<string, string> = {
                                'E': 'D', 'D': 'C', 'C': 'B', 'B': 'A', 'A': 'S', 'S': 'National', 'National': 'Monarch'
                              };
                              const nextRank = nextRanks[rank];
                              const reqLevel = rankRequirements[nextRank];
                              const isLocked = player.level < reqLevel;

                              return (
                                <>
                                  <motion.button 
                                    whileHover={!isLocked ? { scale: 1.05, backgroundColor: "rgba(var(--primary),0.3)" } : {}}
                                    onClick={() => promoteRank()}
                                    disabled={isLocked}
                                    className={cn(
                                      "relative z-10 px-6 py-2 border text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                                      isLocked 
                                        ? "bg-white/5 border-white/10 text-white/20 cursor-not-allowed" 
                                        : "bg-primary/20 border-primary text-white hover:bg-primary/40"
                                    )}
                                  >
                                    {isLocked ? t.locked : t.upgrade} <ChevronRight className="w-3 h-3" />
                                  </motion.button>
                                  {isLocked && (
                                    <span className="text-[8px] font-bold text-red-500/60 uppercase tracking-tighter">
                                      LV. {reqLevel} {t.required}
                                    </span>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'shop' && (
              <motion.div 
                key="shop"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="min-h-[400px] flex flex-col items-center justify-center space-y-6 text-center"
              >
                <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10 text-white/20" />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-widest italic opacity-40">System Arsenal Locked</h2>
                <p className={cn(
                  "max-w-xs text-xs uppercase tracking-[0.2em] leading-relaxed",
                  player.theme === 'dark' ? "text-white/30" : "text-slate-400"
                )}>
                    The item shop is currently undergoing maintenance. Check back after reaching Level 10.
                </p>
              </motion.div>
            )}

            {activeTab === 'rpg' && (
              <motion.div 
                key="rpg"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2 mb-10">
                    <Swords className="w-16 h-16 text-primary mx-auto mb-4 drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                    <h2 className="text-3xl font-black uppercase tracking-widest italic">Core Systems</h2>
                    <p className={cn(
                      "text-xs uppercase tracking-[0.2em]",
                      player.theme === 'dark' ? "text-white/40" : "text-slate-500"
                    )}>Manage your pets, dungeons, and titles</p>
                </div>
                <RPGSystems />
              </motion.div>
            )}
            
            {activeTab === 'system' && (
              <motion.div 
                key="system"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 pb-20"
              >
                  <div className="space-y-4">
                      <h3 className={cn(
                        "text-xs font-black uppercase tracking-[0.3em] px-2",
                        player.theme === 'dark' ? "opacity-40" : "text-slate-900"
                      )}>{t.profile_settings}</h3>
                      <div className={cn(
                        "p-6 border rounded-3xl space-y-4 transition-all",
                        player.theme === 'dark' ? "bg-primary/5 border-primary/40 shadow-[0_0_15px_rgba(var(--primary),0.05)]" : "bg-white border-slate-200 shadow-sm"
                      )}>
                          <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                  <div className="p-3 bg-primary/10 rounded-2xl">
                                      <User className="w-6 h-6 text-primary" />
                                  </div>
                                  <div className="flex-1">
                                      <p className={cn(
                                        "text-[10px] uppercase font-black",
                                        player.theme === 'dark' ? "text-white" : "text-slate-900"
                                      )}>{t.hunter_nickname}</p>
                                      {isEditingProfile ? (
                                        <input 
                                          value={editName}
                                          onChange={(e) => setEditName(e.target.value)}
                                          onBlur={() => {
                                            updateProfile({ username: editName });
                                            setIsEditingProfile(false);
                                          }}
                                          autoFocus
                                          className="bg-transparent border-b border-primary text-xl font-black italic focus:outline-none w-full text-primary"
                                        />
                                      ) : (
                                        <h4 className="text-xl font-black italic uppercase text-primary">{player.username}</h4>
                                      )}
                                  </div>
                              </div>
                              <div className="text-[10px] font-black uppercase tracking-widest text-primary px-4 py-2 bg-primary/5 rounded-xl border border-primary/40 shadow-[0_0_10px_rgba(var(--primary),0.1)]">
                                Hunter ID
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="space-y-4">
                      <h3 className={cn(
                        "text-xs font-black uppercase tracking-[0.3em] px-2",
                        player.theme === 'dark' ? "opacity-40" : "text-slate-900"
                      )}>Avatar do Caçador</h3>
                      <div className={cn(
                        "p-6 border rounded-3xl space-y-4 transition-all",
                        player.theme === 'dark' ? "bg-primary/5 border-primary/40 shadow-[0_0_15px_rgba(var(--primary),0.05)]" : "bg-white border-slate-200 shadow-sm"
                      )}>
                          <div className="flex items-center gap-6">
                              <div className="relative group">
                                  {player.avatarUrl ? (
                                      <img 
                                          src={player.avatarUrl} 
                                          alt="Avatar" 
                                          className="w-20 h-20 rounded-2xl object-cover border-2 border-primary"
                                      />
                                  ) : (
                                      <div className="w-20 h-20 rounded-2xl bg-black/40 border-2 border-dashed border-white/20 flex items-center justify-center">
                                          <User className="w-8 h-8 text-white/20" />
                                      </div>
                                  )}
                                  <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl">
                                      <input 
                                          type="file" 
                                          accept="image/*" 
                                          className="hidden" 
                                          onChange={(e) => {
                                              const file = e.target.files?.[0];
                                              if (file) {
                                                  const reader = new FileReader();
                                                  reader.onloadend = () => {
                                                      updateProfile({ avatarUrl: reader.result as string });
                                                  };
                                                  reader.readAsDataURL(file);
                                              }
                                          }}
                                      />
                                      <span className="text-[10px] font-black uppercase text-white">Trocar</span>
                                  </label>
                              </div>
                              <div className="flex-1 space-y-2">
                                  <p className={cn(
                                      "text-[10px] uppercase font-black",
                                      player.theme === 'dark' ? "text-white/40" : "text-slate-900"
                                  )}>Personalize sua aparência no sistema</p>
                                  {player.avatarUrl && (
                                      <button 
                                          onClick={() => updateProfile({ avatarUrl: null })}
                                          className="text-[10px] font-black uppercase text-red-500 hover:text-red-400 transition-colors"
                                      >
                                          Remover Foto
                                      </button>
                                  )}
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="space-y-4">
                      <h3 className={cn(
                        "text-xs font-black uppercase tracking-[0.3em] px-2",
                        player.theme === 'dark' ? "opacity-40" : "text-slate-900"
                      )}>{t.difficulty_system}</h3>
                      <div className={cn(
                        "p-6 border rounded-3xl space-y-6 transition-all",
                        player.theme === 'dark' ? "bg-primary/5 border-primary/40 shadow-[0_0_15px_rgba(var(--primary),0.05)]" : "bg-white border-slate-200 shadow-sm"
                      )}>
                          <div className="grid grid-cols-3 gap-2">
                              {[
                                { id: 1, label: 'EASY' },
                                { id: 2, label: 'NORMAL' },
                                { id: 3, label: 'HARD' }
                              ].map(d => (
                                <button
                                  key={d.id}
                                  onClick={() => updateProfile({ difficultyScale: d.id })}
                                  className={cn(
                                    "py-3 rounded-xl text-[10px] font-black italic tracking-widest border transition-all",
                                    player.difficultyScale === d.id 
                                      ? "bg-primary border-primary text-black" 
                                      : player.theme === 'dark' 
                                        ? "bg-primary/5 border-primary/20 text-white/40" 
                                        : "bg-slate-100 border-slate-200 text-slate-400"
                                  )}
                                >
                                  {d.label}
                                </button>
                              ))}
                          </div>
                      </div>
                  </div>

                  <div className="space-y-4">
                      <h3 className={cn(
                        "text-xs font-black uppercase tracking-[0.3em] px-2",
                        player.theme === 'dark' ? "opacity-40" : "text-slate-900"
                      )}>{t.interface_customization}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setTheme('dark')}
                          className={cn(
                            "p-6 rounded-3xl border flex flex-col items-center gap-3 transition-all",
                            player.theme === 'dark' 
                              ? "bg-primary border-primary text-black shadow-[0_0_20px_rgba(var(--primary),0.3)]" 
                              : "bg-white border-slate-200 text-slate-400"
                          )}
                        >
                          <Moon className="w-6 h-6" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Dark Protocol</span>
                        </button>
                        <button
                          onClick={() => setTheme('light')}
                          className={cn(
                            "p-6 rounded-3xl border flex flex-col items-center gap-3 transition-all",
                            player.theme === 'light' 
                              ? "bg-primary border-primary text-black shadow-sm" 
                              : "bg-primary/5 border-primary/20 text-white/40"
                          )}
                        >
                          <Sun className="w-6 h-6" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Light Protocol</span>
                        </button>
                      </div>
                  </div>

                  <div className="space-y-4">
                      <h3 className="text-xs font-black uppercase tracking-[0.3em] opacity-40 px-2">{t.language_system || 'Language System'}</h3>
                      <div className={cn(
                        "p-6 border rounded-3xl space-y-6 transition-all",
                        player.theme === 'dark' ? "bg-primary/5 border-primary/40 shadow-[0_0_15px_rgba(var(--primary),0.05)]" : "bg-white border-slate-200 shadow-sm"
                      )}>
                          <div className="grid grid-cols-2 gap-3">
                              <button
                                onClick={() => setLanguage('pt')}
                                className={cn(
                                  "py-4 rounded-2xl text-[10px] font-black italic tracking-widest border transition-all flex items-center justify-center gap-3",
                                  player.language === 'pt' 
                                    ? "bg-primary border-primary text-black" 
                                    : player.theme === 'dark' 
                                      ? "bg-primary/5 border-primary/20 text-white/40" 
                                      : "bg-slate-100 border-slate-200 text-slate-400"
                                )}
                              >
                                <Globe className="w-4 h-4" />
                                PORTUGUÊS
                              </button>
                              <button
                                onClick={() => setLanguage('en')}
                                className={cn(
                                  "py-4 rounded-2xl text-[10px] font-black italic tracking-widest border transition-all flex items-center justify-center gap-3",
                                  player.language === 'en' 
                                    ? "bg-primary border-primary text-black" 
                                    : player.theme === 'dark' 
                                      ? "bg-primary/5 border-primary/20 text-white/40" 
                                      : "bg-slate-100 border-slate-200 text-slate-400"
                                )}
                              >
                                <Globe className="w-4 h-4" />
                                ENGLISH
                              </button>
                          </div>
                      </div>
                  </div>

                  <div className="pt-10 pb-20">
                      <button
                        onClick={() => logout()}
                        className="w-full py-4 rounded-3xl border border-red-500/20 bg-red-500/5 text-red-500 font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-red-500/10 transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        {t.logout}
                      </button>
                      <p className="text-[10px] text-center text-white/20 uppercase font-black tracking-widest mt-4">
                        {player.language === 'pt' ? 'Seu progresso é salvo localmente neste dispositivo' : 'Your progress is saved locally on this device'}
                      </p>
                  </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Navigation Dock */}
      <nav className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 z-[50] flex items-center gap-1 p-2 border rounded-full backdrop-blur-2xl shadow-2xl transition-all duration-500",
        player.theme === 'dark' ? "bg-black/60 border-white/10" : "bg-white/80 border-slate-200"
      )}>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative group px-5 py-3 rounded-full transition-all"
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center">
                <Icon className={cn(
                  "w-5 h-5 transition-colors duration-300",
                  isActive 
                    ? "text-black" 
                    : player.theme === 'dark' ? "text-white/40 group-hover:text-white" : "text-slate-400 group-hover:text-slate-900"
                )} />
              </div>
            </button>
          );
        })}
      </nav>

      <SystemNotificationContainer />
      <AnimatePresence>
        {levelUpData && (
          <LevelUpModal
            level={levelUpData.level}
            onClose={() => setLevelUpData(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
