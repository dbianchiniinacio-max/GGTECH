import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../hooks/use-game-store';
import { Shield, User, Lock, ArrowRight, UserPlus, LogIn } from 'lucide-react';
import { translations } from '../lib/translations';

export const Auth = ({ onAuthSuccess }: { onAuthSuccess: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login, register, player } = useGameStore();
  const t = translations[player.language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nickname || !password) {
      setError(player.language === 'pt' ? 'Preencha todos os campos' : 'Fill all fields');
      return;
    }

    if (isLogin) {
      const result = login(nickname, password);
      if (result.success) {
        onAuthSuccess();
      } else {
        setError(result.message);
      }
    } else {
      const result = register(nickname, password);
      if (result.success) {
        setIsLogin(true);
        setError(player.language === 'pt' ? 'Conta criada! Agora faça login.' : 'Account created! Now login.');
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 border border-white/10 bg-black/40 backdrop-blur-xl rounded-2xl">
      <div className="flex justify-center mb-8">
        <div className="p-4 bg-primary/20 rounded-full">
          <Shield className="w-12 h-12 text-primary" />
        </div>
      </div>

      <h2 className="text-3xl font-black text-center mb-2 uppercase tracking-tighter">
        {isLogin ? `Hunter ${t.login}` : t.register}
      </h2>
      <p className="text-white/40 text-center mb-8 text-xs font-bold uppercase tracking-widest">
        {isLogin ? 'Access your hunter profile' : 'Begin your evolution journey'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
            <User className="w-3 h-3" /> {t.nickname}
          </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
            placeholder="Solo_Leveling_Fan"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
            <Lock className="w-3 h-3" /> {t.password}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-[10px] font-black uppercase text-center"
          >
            {error}
          </motion.p>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-primary text-black font-black uppercase py-4 rounded-lg flex items-center justify-center gap-3 tracking-[0.2em] transition-all hover:shadow-[0_0_30px_rgba(var(--primary),0.3)]"
        >
          {isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
          {isLogin ? t.login : t.create_account}
        </motion.button>
      </form>

      <div className="mt-8 pt-8 border-t border-white/5 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-primary transition-colors flex items-center gap-2 mx-auto"
        >
          {isLogin ? t.dont_have_account : t.already_have_account}
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
