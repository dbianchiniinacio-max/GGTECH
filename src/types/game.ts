export type Rank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'National' | 'Monarch';
export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic' | 'Monarch';

export type TaskCategory = 'fitness' | 'study' | 'mental' | 'health' | 'discipline' | 'custom';
export type TaskDifficulty = 'E' | 'D' | 'C' | 'B' | 'A' | 'S';

export interface PlayerStats {
  strength: number;
  intelligence: number;
  discipline: number;
  focus: number;
  endurance: number;
  agility: number;
}

export interface Title {
  id: string;
  name: string;
  rarity: Rarity;
  bonusType: keyof PlayerStats | 'xp' | 'coins';
  bonusValue: number;
  requirement: string;
  unlocked: boolean;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  rarity: Rarity;
  evolutionStage: number;
  bonuses: {
    stat?: keyof PlayerStats;
    value: number;
    type: 'multiplier' | 'flat';
  };
}

export interface Dungeon {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  requiredPower: number;
  duration: number; // in minutes
  rewards: {
    xp: number;
    coins: number;
    items?: string[];
  };
  isActive: boolean;
  startTime?: number;
}

export interface PlayerData {
  username: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  rank: Rank;
  title: string;
  activeTitleId?: string;
  coins: number;
  streak: number;
  powerScore: number;
  combatRating: number;
  auraIntensity: number;
  stats: PlayerStats;
  unlockedAuras: string[];
  currentAura: string;
  onboardingCompleted: boolean;
  difficultyScale: number;
  theme: 'dark' | 'light';
  language: 'pt' | 'en';
  lastReset?: string;
  notificationsEnabled: boolean;
  
  // New RPG Systems
  titles: Title[];
  pets: Pet[];
  inventory: string[];
  dungeonStatus?: {
    dungeonId: string;
    endTime: number;
    startTime: number;
  };
  avatarUrl?: string | null;
  hasPaid?: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  difficulty: TaskDifficulty;
  xpReward: number;
  coinReward: number;
  statReward: keyof PlayerStats;
  completed: boolean;
  isDaily: boolean;
  streakCount: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Unique';
}

export interface SystemMessage {
  id: string;
  type: 'info' | 'success' | 'warning' | 'rank_up' | 'stat_up' | 'dungeon' | 'pet' | 'title';
  text: string;
  timestamp: number;
}
