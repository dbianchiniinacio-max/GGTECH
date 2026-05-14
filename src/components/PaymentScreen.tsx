import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../hooks/use-game-store';
import { Lock, ShoppingCart, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// As chaves foram movidas para o backend por segurança


export const PaymentScreen = () => {
  const { markAsPaid } = useGameStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<'pending' | 'checking' | 'completed'>('pending');

  // Signature calculation no longer needed for the current API version according to docs
  const handlePurchase = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const path = '/v1/depix/buycard';
      const requestData = {
        amountCents: 1000, // R$ 10,00
        walletAddress: "lq1ascensionsystem",
        description: "Protocolo Despertar Ascension",
      };

      const { data, error: invokeError } = await supabase.functions.invoke('deflow-proxy', {
        body: {
          path: path,
          method: 'POST',
          data: requestData
        }
      });

      if (invokeError) throw new Error(invokeError.message);

      console.log("RESPOSTA SUCESSO:", data);

      if (data.error) {
        throw new Error(data.error);
      }

      // De acordo com a documentação enviada:
      // data.id, data.qrCode (pixPayload), data.qrCodeImage
      if (data.qrCode || data.id) {
        setPaymentId(data.id);
        setQrCode(data.qrCode || data.id);
        setQrImageUrl(data.qrCodeImage || null);
        setStatus('pending');
      } else {
        throw new Error('Resposta da API sem dados de pagamento');
      }
    } catch (err: any) {
      console.error("FALHA:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval: any;
    if (paymentId && status !== 'completed') {
      interval = setInterval(async () => {
        try {
          // Consultar status do depósito DePix
          const path = `/v1/depix/buycard/${paymentId}`;
          const { data, error: invokeError } = await supabase.functions.invoke('deflow-proxy', {
            body: {
              path: path,
              method: 'GET'
            }
          });

          if (data && !invokeError) {
            // Verificar se o status é COMPLETED ou PAID
            if (data.status === 'COMPLETED' || data.status === 'PAID' || data.status === 'paid') {
              setStatus('completed');
              setTimeout(() => markAsPaid(), 2000);
            }
          }
        } catch (e) {
          console.error("Erro ao verificar status:", e);
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [paymentId, status, markAsPaid]);

  const copyPaymentCode = () => {
    if (qrCode) {
      navigator.clipboard.writeText(qrCode);
      alert('Código de pagamento copiado!');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 shadow-2xl"
      >
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20">
            <Lock className="w-10 h-10 text-blue-500" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter text-white uppercase italic">Ascension System</h1>
            <p className="text-blue-400 font-medium tracking-[0.2em] text-xs uppercase">Sincronização Necessária</p>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed px-4">
            Atenção, Caçador. Para <span className="text-white font-semibold">desbloquear todo o seu potencial</span> e acessar os registros do Sistema de Evolução, é necessária uma contribuição de energia para estabilizar sua conexão vitalícia.
          </p>

          {!paymentId ? (
            <div className="w-full space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center group hover:border-blue-500/30 transition-colors">
                <span className="text-gray-400 text-sm">Protocolo de Despertar</span>
                <span className="text-2xl font-bold text-white tracking-tight">R$ 10,00</span>
              </div>

              <button
                onClick={handlePurchase}
                disabled={loading}
                className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)] disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <ShoppingCart className="w-5 h-5" />}
                INICIAR DESPERTAR
              </button>
            </div>
          ) : (
            <div className="w-full space-y-6">
              {status === 'completed' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center space-y-3 py-4"
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                  <p className="text-green-500 font-bold">PAGAMENTO CONFIRMADO!</p>
                  <p className="text-gray-400 text-sm italic">Despertando sistema...</p>
                </motion.div>
              ) : (
                <>
                  <div className="bg-white p-4 rounded-xl inline-block mx-auto">
                    <div className="w-48 h-48 bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
                      {qrImageUrl ? (
                        <img 
                          src={qrImageUrl} 
                          alt="Payment QR Code"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCode || '')}`} 
                          alt="Payment QR Code"
                          className="w-full h-full"
                        />
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={copyPaymentCode}
                      className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors"
                    >
                      Copiar Endereço de Pagamento
                    </button>
                    <div className="flex items-center justify-center gap-2 text-xs text-blue-400 animate-pulse">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      Aguardando confirmação do pagamento...
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-2 text-left">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-red-500 text-xs">{error}</p>
            </div>
          )}

          <p className="text-[10px] text-gray-600 uppercase tracking-widest pt-4">
            Secured by DigiFakt • Encryption Active
          </p>
        </div>
      </motion.div>
    </div>
  );
};
