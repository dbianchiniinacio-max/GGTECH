export const translations = {
  en: {
    system_interface: "System Interface",
    ascension: "Ascension",
    system: "System",
    dashboard: "Dashboard",
    evolution: "Evolution",
    arsenal: "Arsenal",
    profile_settings: "Profile Settings",
    interface: "Interface",
    hunter_nickname: "Hunter Nickname",
    difficulty_system: "Difficulty & System Path",
    interface_customization: "Interface Customization",
    light_mode: "Light Mode",
    dark_mode: "Dark Mode",
    daily_assignments: "Daily Assignments",
    status_active: "Status: ACTIVE",
    new_quest: "New Quest",
    create_custom_quest: "Create Custom Quest",
    quest_title: "Quest Title",
    quest_description: "Quest Description",
    quest_category: "Category",
    quest_difficulty: "Difficulty",
    quest_stat_reward: "Stat Reward",
    create: "Create",
    cancel: "Cancel",
    xp_progress: "XP Level Progress",
    next_lv: "NEXT LV",
    player_attributes: "Player Attributes",
    combat_power: "Combat Power",
    aura_intensity: "Aura Intensity",
    upgrade: "Upgrade",
    locked: "Locked",
    required: "Required",
    save: "Save",
    edit: "Edit",
    level: "Level",
    rank: "Rank",
    daily_quest_reset: "DAILY QUESTS RESET",
    new_quest_received: "New Quest Received",
    language_system: "Language System",
    login: "Login",
    register: "Register",
    nickname: "Nickname",
    password: "Password",
    create_account: "Create Account",
    already_have_account: "Already have an account? Login",
    dont_have_account: "Don't have an account? Register",
    logout: "Logout",
  },
  pt: {
    system_interface: "Interface do Sistema",
    ascension: "Ascension",
    system: "System",
    dashboard: "Painel",
    evolution: "Evolução",
    arsenal: "Arsenal",
    profile_settings: "Configurações de Perfil",
    interface: "Interface",
    hunter_nickname: "Apelido do Caçador",
    difficulty_system: "Dificuldade & Caminho do Sistema",
    interface_customization: "Customização de Interface",
    light_mode: "Modo Claro",
    dark_mode: "Modo Escuro",
    daily_assignments: "Missões Diárias",
    status_active: "Status: ATIVO",
    new_quest: "Nova Missão",
    create_custom_quest: "Criar Missão Personalizada",
    quest_title: "Título da Missão",
    quest_description: "Descrição da Missão",
    quest_category: "Categoria",
    quest_difficulty: "Dificuldade",
    quest_stat_reward: "Recompensa de Atributo",
    create: "Criar",
    cancel: "Cancelar",
    xp_progress: "Progresso de XP",
    next_lv: "PRÓX NV",
    player_attributes: "Atributos do Jogador",
    combat_power: "Poder de Combate",
    aura_intensity: "Intensidade da Aura",
    upgrade: "Evoluir",
    locked: "Bloqueado",
    required: "Necessário",
    save: "Salvar",
    edit: "Editar",
    level: "Nível",
    rank: "Rank",
    daily_quest_reset: "MISSÕES DIÁRIAS RESETADAS",
    new_quest_received: "Nova Missão Recebida",
    language_system: "Sistema de Linguagem",
    login: "Entrar",
    register: "Registrar",
    nickname: "Apelido",
    password: "Senha",
    create_account: "Criar Conta",
    already_have_account: "Já tem uma conta? Entrar",
    dont_have_account: "Não tem uma conta? Registrar",
    logout: "Sair",
  }
};

export type Language = 'en' | 'pt';

// Difficulty multipliers for daily mission quantities (1=Easy, 2=Normal, 3=Hard)
export const getDailyAmount = (base: number, scale: number, min = 1) => {
  const m = scale === 1 ? 0.4 : scale === 2 ? 1 : 1.8;
  return Math.max(min, Math.round(base * m));
};

export const getDailyTaskContent = (
  id: string,
  lang: 'pt' | 'en',
  scale: number
): { title: string; description: string } | null => {
  switch (id) {
    case '1': {
      const n = getDailyAmount(50, scale, 10);
      return lang === 'pt'
        ? { title: `${n} Flexões`, description: `Demonstre sua força física completando ${n} flexões hoje.` }
        : { title: `${n} Push-ups`, description: `Prove your physical strength by completing ${n} push-ups today.` };
    }
    case '2': {
      const mins = getDailyAmount(60, scale, 15);
      return lang === 'pt'
        ? { title: 'Sessão de Estudo Diária', description: `Afie sua mente com pelo menos ${mins} minutos de estudo focado.` }
        : { title: 'Daily Study Session', description: `Sharpen your mind with at least ${mins} minutes of focused study.` };
    }
    case '3': {
      const mins = getDailyAmount(10, scale, 3);
      return lang === 'pt'
        ? { title: 'Meditação Mindfulness', description: `Acalme o caos interior com ${mins} minutos de meditação.` }
        : { title: 'Mindfulness Meditation', description: `Calm the inner chaos with ${mins} minutes of meditation.` };
    }
    case '4': {
      const liters = scale === 1 ? 1 : scale === 2 ? 2 : 4;
      return lang === 'pt'
        ? { title: `Hidratação de Mana (${liters}L Água)`, description: `Um caçador deve manter-se hidratado. Beba pelo menos ${liters} litros de água.` }
        : { title: `Mana Hydration (${liters}L Water)`, description: `A hunter must stay hydrated. Drink at least ${liters} liters of water.` };
    }
    case '5':
      return lang === 'pt'
        ? { title: 'Acordar antes do Amanhecer', description: 'Domine sua rotina acordando cedo e aproveitando o dia.' }
        : { title: 'Wake Up Before Dawn', description: 'Master your routine by waking up early and seizing the day.' };
    default:
      return null;
  }
};

export const getRandomQuestPool = (lang: 'pt' | 'en') => {
  if (lang === 'pt') {
    return [
      { title: 'Concentração de Mana', category: 'mental', statReward: 'focus', description: 'Medite por 10 minutos para aumentar seu foco.' },
      { title: 'Treino Pesado', category: 'fitness', statReward: 'strength', description: 'Faça um treino de força intenso (3 séries de agachamento, supino e remada).' },
      { title: 'Passo Sombrio', category: 'fitness', statReward: 'agility', description: 'Faça 20 minutos de corrida ou exercícios de agilidade.' },
      { title: 'Análise Estratégica', category: 'study', statReward: 'intelligence', description: 'Estude um novo tópico ou resolva um problema complexo por 30 minutos.' },
      { title: 'Resistência da Vontade', category: 'discipline', statReward: 'discipline', description: 'Evite distrações (celular/redes) e mantenha-se produtivo por 1 hora.' },
      { title: 'Recuperação Física', category: 'health', statReward: 'endurance', description: 'Durma 8 horas hoje à noite ou faça 15 min de alongamento profundo.' },
    ];
  }
  return [
    { title: 'Mana Concentration', category: 'mental', statReward: 'focus', description: 'Meditate for 10 minutes to boost your focus.' },
    { title: 'Heavy Training', category: 'fitness', statReward: 'strength', description: 'Do an intense strength workout (3 sets of squat, bench, row).' },
    { title: 'Shadow Step', category: 'fitness', statReward: 'agility', description: 'Do 20 minutes of running or agility drills.' },
    { title: 'Strategic Analysis', category: 'study', statReward: 'intelligence', description: 'Study a new topic or solve a complex problem for 30 minutes.' },
    { title: 'Willpower Endurance', category: 'discipline', statReward: 'discipline', description: 'Stay productive and avoid distractions for 1 hour.' },
    { title: 'Physical Recovery', category: 'health', statReward: 'endurance', description: 'Sleep 8 hours tonight or do 15 min of deep stretching.' },
  ];
};

