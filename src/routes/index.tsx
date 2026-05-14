import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dashboard } from '../components/Dashboard';
import { Auth } from '../components/Auth';
import { PaymentScreen } from '../components/PaymentScreen';
import { useGameStore } from '../hooks/use-game-store';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { isAuthenticated, player } = useGameStore();
  const hasPaid = player.hasPaid;

  return (
    <AnimatePresence mode="wait">
        <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen bg-[#050505] text-white overflow-hidden relative"
        >
            {!hasPaid ? (
              <PaymentScreen />
            ) : !isAuthenticated ? (
              <div className="min-h-screen flex items-center justify-center p-6">
                <Auth onAuthSuccess={() => {}} />
              </div>
            ) : (
              <Dashboard />
            )}
        </motion.div>
    </AnimatePresence>
  );
}
