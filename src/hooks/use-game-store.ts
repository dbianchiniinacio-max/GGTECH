import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PlayerData, Task, Rank, Achievement, PlayerStats, SystemMessage, Rarity, Pet, Dungeon, Title } from '../types/game';
import { getDailyTaskContent } from '../lib/translations';

const relocalizeDailyTasks = (tasks: Task[], lang: 'pt' | 'en', scale: number): Task[] => {
  return tasks.map(t => {
    const content = getDailyTaskContent(t.id, lang, scale);
    return content ? { ...t, title: content.title, description: content.description } : t;
  });
};

interface Account {
  nickname: string;
  password: string;
  data: {
    player: PlayerData;
    tasks: Task[];
    achievements: Achievement[];
  };
}

interface GameState {
  player: PlayerData;
  tasks: Task[];
  achievements: Achievement[];
  systemMessages: SystemMessage[];
  isAuthenticated: boolean;
  
  // Actions
  addXp: (amount: number) => { leveledUp: boolean; newLevel: number };
  completeTask: (taskId: string) => void;
  updateStats: (stat: keyof PlayerStats, amount: number) => void;
  addCoins: (amount: number) => void;
  promoteRank: () => { success: boolean; message: string };
  addSystemMessage: (text: string, type?: SystemMessage['type']) => void;
  removeSystemMessage: (id: string) => void;
  calculatePowerScore: () => void;
  completeOnboarding: (username: string, difficulty: number) => void;
  addQuest: (quest: Partial<Task>) => void;
  updateProfile: (data: Partial<PlayerData>) => void;
  checkDailyReset: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setLanguage: (lang: 'pt' | 'en') => void;
  toggleNotifications: () => Promise<void>;
  markAsPaid: () => void;
  
  // Auth Actions
  register: (nickname: string, password: string) => { success: boolean; message: string };
  login: (nickname: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  saveCurrentAccountData: () => void;

  // RPG System Actions
  startDungeon: (dungeonId: string) => void;
  completeDungeon: () => void;
  hatchEgg: (rarity: Rarity) => void;
  evolvePet: (petId: string) => void;
  equipTitle: (titleId: string) => void;
  checkDeadlineApproaching: () => void;
}

const INITIAL_PLAYER: PlayerData = {
  username: "New Hunter",
  level: 0,
  xp: 0,
  nextLevelXp: 100,
  rank: 'E',
  title: "E-Rank Hunter",
  coins: 0,
  streak: 0,
  powerScore: 100,
  combatRating: 10,
  auraIntensity: 5,
  unlockedAuras: ['Blue'],
  currentAura: 'Blue',
  onboardingCompleted: false,
  difficultyScale: 1,
  theme: 'dark',
  language: 'pt',
  notificationsEnabled: true,
  hasPaid: false,
  stats: {
    strength: 10,
    intelligence: 10,
    discipline: 10,
    focus: 10,
    endurance: 10,
    agility: 10,
  },
  titles: [
    { id: 'novice', name: 'Caçador Novato', rarity: 'Common', bonusType: 'xp', bonusValue: 0.05, requirement: 'Alcance o Nível 1', unlocked: true }
  ],
  pets: [],
  inventory: [],
  avatarUrl: null,
};

const INITIAL_TASKS: Task[] = [
  { id: '1', title: '30 Flexões', category: 'fitness', difficulty: 'E', xpReward: 50, coinReward: 10, statReward: 'strength', completed: false, isDaily: true, streakCount: 0, description: 'Demonstre sua força física completando 30 flexões hoje.' },
  { id: '2', title: 'Sessão de Estudo Diária', category: 'study', difficulty: 'E', xpReward: 100, coinReward: 20, statReward: 'intelligence', completed: false, isDaily: true, streakCount: 0, description: 'Afie sua mente com pelo menos 1 hora de estudo focado.' },
  { id: '3', title: 'Meditação Mindfulness', category: 'mental', difficulty: 'E', xpReward: 40, coinReward: 5, statReward: 'focus', completed: false, isDaily: true, streakCount: 0, description: 'Acalme o caos interior com 10 minutos de meditação.' },
  { id: '4', title: 'Hidratação de Mana (1L Água)', category: 'health', difficulty: 'E', xpReward: 30, coinReward: 5, statReward: 'endurance', completed: false, isDaily: true, streakCount: 0, description: 'Um caçador deve manter-se hidratado. Beba pelo menos 1 litro de água.' },
  { id: '5', title: 'Acordar antes do Amanhecer', category: 'discipline', difficulty: 'E', xpReward: 60, coinReward: 15, statReward: 'discipline', completed: false, isDaily: true, streakCount: 0, description: 'Domine sua rotina acordando cedo e aproveitando o dia.' },
];

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      player: INITIAL_PLAYER,
      tasks: INITIAL_TASKS,
      achievements: [
        { id: 'awakened', title: 'Despertado', description: 'Complete sua primeira missão', unlocked: false, rarity: 'Common' },
        { id: 'shadow_monarch', title: 'Monarca das Sombras', description: 'Alcance o nível 100', unlocked: false, rarity: 'Unique' },
      ],
      systemMessages: [],
      isAuthenticated: false,

      saveCurrentAccountData: () => {
        const { player, tasks, achievements, isAuthenticated } = get();
        if (!isAuthenticated) return;

        const accountsJson = localStorage.getItem('ascension_accounts');
        const accounts: Record<string, Account> = accountsJson ? JSON.parse(accountsJson) : {};
        
        const nickname = player.username;
        if (accounts[nickname]) {
          accounts[nickname].data = { player, tasks, achievements };
          localStorage.setItem('ascension_accounts', JSON.stringify(accounts));
        }
      },

      register: (nickname, password) => {
        const accountsJson = localStorage.getItem('ascension_accounts');
        const accounts: Record<string, Account> = accountsJson ? JSON.parse(accountsJson) : {};

        const normalizedNickname = nickname.trim();
        if (accounts[normalizedNickname]) {
          return { success: false, message: "Este apelido já está em uso" };
        }

        const newAccount: Account = {
          nickname: normalizedNickname,
          password,
          data: {
            player: { ...INITIAL_PLAYER, username: normalizedNickname },
            tasks: [...INITIAL_TASKS],
            achievements: [
              { id: 'awakened', title: 'Despertado', description: 'Complete sua primeira missão', unlocked: false, rarity: 'Common' },
              { id: 'shadow_monarch', title: 'Monarca das Sombras', description: 'Alcance o nível 100', unlocked: false, rarity: 'Unique' },
            ]
          }
        };

        accounts[normalizedNickname] = newAccount;
        localStorage.setItem('ascension_accounts', JSON.stringify(accounts));
        
        get().addSystemMessage(`Conta ${normalizedNickname} criada!`, 'success');
        return { success: true, message: "Registro concluído" };
      },

      login: (nickname, password) => {
        const accountsJson = localStorage.getItem('ascension_accounts');
        const accounts: Record<string, Account> = accountsJson ? JSON.parse(accountsJson) : {};

        const normalizedNickname = nickname.trim();
        const account = accounts[normalizedNickname];
        
        if (!account) {
          return { success: false, message: "Conta não encontrada" };
        }
        
        if (account.password !== password) {
          return { success: false, message: "Senha incorreta" };
        }

        set({
          player: account.data.player,
          tasks: account.data.tasks,
          achievements: account.data.achievements,
          isAuthenticated: true
        });

        get().addSystemMessage(`Bem-vindo de volta, ${normalizedNickname}`, 'success');
        return { success: true, message: "Login bem-sucedido" };
      },

      logout: () => {
        get().saveCurrentAccountData();
        set({
          player: INITIAL_PLAYER,
          tasks: INITIAL_TASKS,
          isAuthenticated: false
        });
        get().addSystemMessage("Sessão finalizada", 'info');
      },

      calculatePowerScore: () => {
        const { player } = get();
        const statSum = Object.values(player.stats).reduce((a, b) => a + b, 0);
        const powerScore = Math.floor((statSum * 10) + (player.level * 50));
        const combatRating = Math.floor(powerScore / 10);
        const auraIntensity = Math.min(100, Math.floor(player.level / 2) + 5);
        
        set((state: GameState) => ({
          player: { ...state.player, powerScore, combatRating, auraIntensity }
        }));
        get().saveCurrentAccountData();
      },

      addXp: (amount: number) => {
        const { player } = get();
        const diffMult = player.difficultyScale === 1 ? 0.8 : player.difficultyScale === 2 ? 1 : 1.4;
        const adjustedAmount = Math.floor(amount * diffMult);
        let newXp = player.xp + adjustedAmount;
        let newLevel = player.level;
        let nextLevelXp = player.nextLevelXp;
        let leveledUp = false;

        while (newXp >= nextLevelXp) {
          newXp -= nextLevelXp;
          newLevel += 1;
          nextLevelXp = Math.floor(nextLevelXp * (1.25 + (newLevel * 0.05)));
          leveledUp = true;
          get().addSystemMessage(`Level Up! Você alcançou o nível ${newLevel}.`, 'success');
        }

        set((state: GameState) => ({
          player: { ...state.player, level: newLevel, xp: newXp, nextLevelXp }
        }));

        if (leveledUp) get().calculatePowerScore();
        get().saveCurrentAccountData();
        return { leveledUp, newLevel };
      },

      completeTask: (taskId: string) => {
        const { tasks, player } = get();
        const task = tasks.find(t => t.id === taskId);
        if (task && !task.completed) {
          const reqPowerByDiff: Record<string, number> = {
            'E': 100, 'D': 500, 'C': 1500, 'B': 4000, 'A': 10000, 'S': 25000
          };
          
          const baseReq = reqPowerByDiff[task.difficulty] || 100;
          const difficultyReqMult = 1 + ((player.difficultyScale || 1) - 1) * 0.25;
          const adjustedReq = baseReq * difficultyReqMult;
          const successChance = player.powerScore >= adjustedReq ? 1 : 
                                Math.max(0.1, player.powerScore / adjustedReq);
          
          if (Math.random() > successChance) {
            get().addSystemMessage(`Missão Falhou: ${task.title}. Poder insuficiente (${player.powerScore}/${Math.round(adjustedReq)})`, 'warning');
            return;
          }

          const isCritical = Math.random() < 0.1;
          const xpMult = isCritical ? 2 : 1;
          const difficultyMult = player.difficultyScale === 3 ? 1.5 : player.difficultyScale === 2 ? 1.2 : 1;
          const finalXp = Math.floor(task.xpReward * xpMult * difficultyMult);
          const finalCoins = Math.floor(task.coinReward * difficultyMult);

          if (isCritical) get().addSystemMessage(`RECOMPENSA CRÍTICA! Você recebeu XP em dobro!`, 'success');

          set((state: GameState) => ({
            tasks: state.tasks.map(t => t.id === taskId ? { ...t, completed: true, streakCount: t.streakCount + 1 } : t)
          }));
          
          get().addXp(finalXp);
          get().addCoins(finalCoins);
          get().updateStats(task.statReward, 1);
          get().addSystemMessage(`Missão Concluída: ${task.title}`, 'info');
          get().saveCurrentAccountData();
        }
      },

      updateStats: (stat, amount) => {
        set((state: GameState) => ({
          player: {
            ...state.player,
            stats: { ...state.player.stats, [stat]: state.player.stats[stat] + amount }
          }
        }));
        get().calculatePowerScore();
        get().addSystemMessage(`${stat.charAt(0).toUpperCase() + stat.slice(1)} aumentado.`, 'stat_up');
        get().saveCurrentAccountData();
      },

      addCoins: (amount) => {
        set((state: GameState) => ({
          player: { ...state.player, coins: state.player.coins + amount }
        }));
        get().saveCurrentAccountData();
      },

      promoteRank: () => {
        const rankProgression: Rank[] = ['E', 'D', 'C', 'B', 'A', 'S', 'National', 'Monarch'];
        const rankRequirements: Record<Rank, number> = {
          'E': 1, 'D': 15, 'C': 35, 'B': 60, 'A': 100, 'S': 150, 'National': 250, 'Monarch': 1000
        };
        
        const { player } = get();
        const currentIndex = rankProgression.indexOf(player.rank);
        if (currentIndex < rankProgression.length - 1) {
          const nextRank = rankProgression[currentIndex + 1];
          const reqLevel = rankRequirements[nextRank];
          
          if (player.level < reqLevel) {
            get().addSystemMessage(`PROMOÇÃO DE RANK FALHOU: Nível ${reqLevel} necessário para Rank-${nextRank}.`, 'warning');
            return { success: false, message: `Necessário Nível ${reqLevel}` };
          }

          set((state: GameState) => ({
            player: {
              ...state.player,
              rank: nextRank,
              title: `Caçador Rank-${nextRank}`,
              coins: state.player.coins + (currentIndex + 1) * 500
            }
          }));
          get().addSystemMessage(`Promoção de Rank! Você agora é Rank-${nextRank}.`, 'rank_up');
          get().saveCurrentAccountData();
          return { success: true, message: "Rank Up Successful!" };
        }
        return { success: false, message: "Max Rank Reached" };
      },

      completeOnboarding: (username, difficulty) => {
        set((state: GameState) => ({
          player: {
            ...state.player,
            username,
            difficultyScale: difficulty,
            onboardingCompleted: true,
            level: 1,
            xp: 0,
            nextLevelXp: 100
          }
        }));
        get().calculatePowerScore();
        get().addSystemMessage(`Sistema Inicializado. Bem-vindo, ${username}.`, 'success');
        get().saveCurrentAccountData();
      },

      addQuest: (questData) => {
        const id = Math.random().toString(36).substring(7);
        const newTask: Task = {
          id,
          title: questData.title || "New Quest",
          description: questData.description,
          category: questData.category || 'custom',
          difficulty: questData.difficulty || 'E',
          xpReward: questData.xpReward || 50,
          coinReward: questData.coinReward || 10,
          statReward: questData.statReward || 'strength',
          completed: false,
          isDaily: questData.isDaily ?? false,
          streakCount: 0
        };
        
        set((state: GameState) => ({ tasks: [newTask, ...state.tasks] }));
        get().addSystemMessage(`Nova Missão Recebida: ${newTask.title}`, 'info');
        get().saveCurrentAccountData();
      },

      updateProfile: (data) => {
        const { tasks, player: currentPlayer } = get();
        let updatedTasks = tasks;

        const newScale = data.difficultyScale ?? currentPlayer.difficultyScale;
        const newLang = data.language ?? currentPlayer.language;

        if (
          (data.difficultyScale !== undefined && data.difficultyScale !== currentPlayer.difficultyScale) ||
          (data.language !== undefined && data.language !== currentPlayer.language)
        ) {
          updatedTasks = relocalizeDailyTasks(tasks, newLang, newScale);
        }

        set((state: GameState) => ({
          player: { ...state.player, ...data },
          tasks: updatedTasks
        }));
        get().saveCurrentAccountData();
      },

      setTheme: (theme) => {
        set((state: GameState) => ({ player: { ...state.player, theme } }));
        get().saveCurrentAccountData();
      },

      setLanguage: (lang) => {
        const { tasks, player } = get();
        const updatedTasks = relocalizeDailyTasks(tasks, lang, player.difficultyScale);
        set((state: GameState) => ({
          player: { ...state.player, language: lang },
          tasks: updatedTasks
        }));
        get().saveCurrentAccountData();
      },

      toggleNotifications: async () => {
        const { player } = get();
        const nextState = !player.notificationsEnabled;

        if (nextState && 'Notification' in window) {
          const permission = await Notification.requestPermission();
          if (permission !== 'granted') {
            get().addSystemMessage(
              player.language === 'pt' 
                ? "Permissão de notificação negada. Verifique as configurações do sistema." 
                : "Notification permission denied. Check system settings.",
              'warning'
            );
            return;
          }
        }

        set((state: GameState) => ({
          player: { ...state.player, notificationsEnabled: nextState }
        }));
        
        const updatedPlayer = get().player;
        const message = updatedPlayer.language === 'pt' 
          ? (updatedPlayer.notificationsEnabled ? "Notificações ativadas (Modo Normal)" : "Notificações silenciadas (Modo Silencioso)")
          : (updatedPlayer.notificationsEnabled ? "Notifications enabled (Normal Mode)" : "Notifications silenced (Silent Mode)");
        
        const id = Math.random().toString(36).substring(7);
        set((state: GameState) => ({
          systemMessages: [{ id, text: message, type: 'info', timestamp: Date.now() }, ...state.systemMessages]
        }));
        setTimeout(() => {
          set((state: GameState) => ({
            systemMessages: state.systemMessages.filter((m) => m.id !== id)
          }));
        }, 5000);
        get().saveCurrentAccountData();
      },

      markAsPaid: () => {
        set((state: GameState) => ({
          player: { ...state.player, hasPaid: true }
        }));
        get().saveCurrentAccountData();
      },

      checkDailyReset: () => {
        const { player } = get();
        const brDate = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
        
        if (player.lastReset !== brDate) {
          set((state: GameState) => ({
            player: { ...state.player, lastReset: brDate },
            tasks: state.tasks.map(t => t.isDaily ? { ...t, completed: false } : t)
          }));
          get().addSystemMessage("MISSÕES DIÁRIAS RESETADAS", 'info');
          get().saveCurrentAccountData();
        }
      },

      checkDeadlineApproaching: () => {
        const { tasks, player } = get();
        if (!player.notificationsEnabled) return;
        
        const now = new Date();
        const brTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
        const currentHour = brTime.getHours();

        if (currentHour === 23) {
          const incompleteDailyTasks = tasks.filter(t => t.isDaily && !t.completed);
          
          if (incompleteDailyTasks.length > 0) {
            const lastNotification = (window as any)._lastDeadlineNotification;
            const nowMs = Date.now();
            
            if (!lastNotification || (nowMs - lastNotification > 30 * 60 * 1000)) {
              const taskCount = incompleteDailyTasks.length;
              const msg = player.language === 'pt' 
                ? `ALERTA DE SISTEMA: Você tem ${taskCount} missão${taskCount > 1 ? 'ões' : ''} diária${taskCount > 1 ? 's' : ''} pendente${taskCount > 1 ? 's' : ''}! O reset ocorre em menos de 1 hora.`
                : `SYSTEM ALERT: You have ${taskCount} pending daily quest${taskCount > 1 ? 's' : ''}! Reset occurs in less than 1 hour.`;
              
              get().addSystemMessage(msg, 'warning');
              (window as any)._lastDeadlineNotification = nowMs;
            }
          }
        }
      },

      addSystemMessage: (text, type = 'info') => {
        const { player } = get();
        if (!player.notificationsEnabled) return;

        // Native Notification
        if ('Notification' in window && Notification.permission === 'granted') {
          try {
            new Notification('ASCENSION SYSTEM', {
              body: text,
              icon: '/favicon.ico', // Default icon
              tag: 'system-alert'
            });
          } catch (e) {
            console.error('Failed to send native notification:', e);
          }
        }

        const id = Math.random().toString(36).substring(7);
        set((state: GameState) => ({
          systemMessages: [{ id, text, type, timestamp: Date.now() }, ...state.systemMessages].slice(0, 5)
        }));
        setTimeout(() => get().removeSystemMessage(id), 5000);
      },

      removeSystemMessage: (id) => {
        set((state: GameState) => ({
          systemMessages: state.systemMessages.filter(m => m.id !== id)
        }));
      },

      startDungeon: (dungeonId) => {
        const { player } = get();
        if (player.dungeonStatus) return;
        
        const dungeons: Record<string, { duration: number, power: number, name: string }> = {
          'd1': { duration: 15, power: 100, name: 'Templo da Disciplina' },
          'd2': { duration: 30, power: 500, name: 'Salão do Foco' },
          'd3': { duration: 60, power: 1200, name: 'Arquivo do Erudito' }
        };

        const dungeon = dungeons[dungeonId];
        if (!dungeon) return;

        const timeReduction = Math.min(0.5, player.powerScore / 20000);
        const actualDuration = dungeon.duration * (1 - timeReduction);
        
        const now = Date.now();
        const endTime = now + (actualDuration * 60 * 1000);
        set((state: GameState) => ({
          player: { ...state.player, dungeonStatus: { dungeonId, endTime, startTime: now } }
        }));
        get().addSystemMessage(`Entrou em ${dungeon.name}. Tempo estimado: ${Math.round(actualDuration)}m`, 'dungeon');
        get().saveCurrentAccountData();
      },

      completeDungeon: () => {
        const { player } = get();
        if (!player.dungeonStatus) return;
        
        const now = Date.now();
        if (now < player.dungeonStatus.endTime) {
          get().addSystemMessage("Exploração da Dungeon ainda em progresso.", 'warning');
          return;
        }

        const dungeons: Record<string, { xp: number, coins: number, power: number }> = {
          'd1': { xp: 200, coins: 50, power: 100 },
          'd2': { xp: 500, coins: 150, power: 500 },
          'd3': { xp: 1200, coins: 400, power: 1200 }
        };

        const dungeonData = dungeons[player.dungeonStatus.dungeonId];
        const successChance = Math.min(1, (player.powerScore / (dungeonData?.power || 100)) * 0.8 + 0.2);
        const isSuccess = Math.random() < successChance;

        set((state: GameState) => ({
          player: { ...state.player, dungeonStatus: undefined }
        }));
        
        if (isSuccess) {
          const xpGain = (dungeonData?.xp || 100) * (player.difficultyScale === 3 ? 2 : 1);
          const coinGain = (dungeonData?.coins || 50) * (player.difficultyScale === 3 ? 1.5 : 1);
          get().addXp(xpGain);
          get().addCoins(coinGain);
          get().addSystemMessage(`Dungeon Concluída! Ganhou ${xpGain} XP e ${coinGain} moedas.`, 'success');
        } else {
          get().addSystemMessage("Dungeon Falhou: Seu poder foi insuficiente para derrotar o boss.", 'warning');
        }
        get().saveCurrentAccountData();
      },
      hatchEgg: (rarity) => {
        const costs: Record<Rarity, number> = {
          'Common': 100, 'Rare': 250, 'Epic': 500, 'Legendary': 1200, 'Mythic': 2500, 'Monarch': 10000
        };
        const cost = costs[rarity] || 100;
        const { player } = get();
        if (player.coins < cost) {
          get().addSystemMessage(`FUNDOS INSUFICIENTES: ${cost} moedas necessárias.`, 'warning');
          return;
        }

        const id = Math.random().toString(36).substring(7);
        const petNames: Record<Rarity, string[]> = {
          'Common': ['Rato de Sombra', 'Pássaro de Mana', 'Gato Espiritual'],
          'Rare': ['Javali de Ferro', 'Raposa de Gelo', 'Salamandra de Fogo'],
          'Epic': ['Lobo das Sombras', 'Cobra Venenosa', 'Golem de Pedra'],
          'Legendary': ['Dragão Carmesim', 'Hidra Antiga', 'Pégaso de Prata'],
          'Mythic': ['Fênix do Vazio', 'Destruidor de Estrelas', 'Sentinela Eterna'],
          'Monarch': ['Igris', 'Beru', 'Tusk']
        };
        const names = petNames[rarity] || ['Besta das Sombras'];
        const randomName = names[Math.floor(Math.random() * names.length)];

        const newPet: Pet = {
          id, name: randomName, species: rarity === 'Monarch' ? 'Shadow Soldier' : 'Beast',
          level: 1, xp: 0, nextLevelXp: 100, rarity, evolutionStage: 1,
          bonuses: { value: rarity === 'Common' ? 0.05 : 0.1, type: 'multiplier' }
        };
        
        set((state: GameState) => ({
          player: { ...state.player, coins: state.player.coins - cost, pets: [...state.player.pets, newPet] }
        }));
        get().addSystemMessage(`Novo Pet Chocado: ${newPet.name}`, 'pet');
        get().saveCurrentAccountData();
      },

      evolvePet: (petId) => {
        set((state: GameState) => ({
          player: { ...state.player, pets: state.player.pets.map(p => p.id === petId ? { ...p, evolutionStage: p.evolutionStage + 1 } : p) }
        }));
        get().addSystemMessage("Pet Evoluído!", 'success');
        get().saveCurrentAccountData();
      },

      equipTitle: (titleId) => {
        const title = get().player.titles.find(t => t.id === titleId);
        if (title && title.unlocked) {
          set((state: GameState) => ({ player: { ...state.player, activeTitleId: titleId, title: title.name } }));
          get().addSystemMessage(`Título Equipado: ${title.name}`, 'title');
          get().saveCurrentAccountData();
        }
      }
    }),
    {
      name: 'ascension-system-storage-v4',
    }
  )
);
