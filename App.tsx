import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './components/Button';
import { GenericModal } from './components/GenericModal';
import { PixModal } from './components/PixModal';
import { STATIC_QUOTES, PIX_PAYLOAD, STORAGE_KEY_PREMIUM } from './constants';
import { generateMotivationalQuote } from './services/geminiService';
import { ModalConfig, QuoteState } from './types';

function App() {
  // State
  const [quote, setQuote] = useState<QuoteState>({ text: "Clique abaixo para começar!", isAiGenerated: false });
  const [isLoading, setIsLoading] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  
  // Modals State
  const [modalConfig, setModalConfig] = useState<ModalConfig>({ isOpen: false, title: '', content: '', type: 'info' });
  const [showPixModal, setShowPixModal] = useState(false);

  // Initialize
  useEffect(() => {
    // Check Premium Status
    const savedPremium = localStorage.getItem(STORAGE_KEY_PREMIUM);
    if (savedPremium === 'true') {
      setIsPremium(true);
    }
    
    // Initial Random Quote
    handleGenerateStaticQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handlers
  const handleGenerateStaticQuote = () => {
    setIsLoading(true);
    // Simulate a tiny delay for better UX feel
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * STATIC_QUOTES.length);
      setQuote({ text: STATIC_QUOTES[randomIndex], isAiGenerated: false });
      setIsLoading(false);
    }, 300);
  };

  const handleGenerateAIQuote = async () => {
    if (!isPremium) {
      setModalConfig({
        isOpen: true,
        title: "Recurso Premium",
        content: "Desbloqueie o Premium para acessar a inteligência artificial!",
        type: 'info'
      });
      return;
    }

    setIsLoading(true);
    try {
      const aiQuote = await generateMotivationalQuote();
      setQuote({ text: aiQuote, isAiGenerated: true });
    } catch (error) {
      console.error(error);
      setModalConfig({
        isOpen: true,
        title: "Erro de Conexão",
        content: "Não foi possível conectar à IA. Tente novamente em alguns instantes.",
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(quote.text)
      .then(() => {
        setModalConfig({
          isOpen: true,
          title: "Copiado!",
          content: "A citação foi copiada para a área de transferência.",
          type: 'success'
        });
      })
      .catch(() => {
        setModalConfig({
          isOpen: true,
          title: "Erro",
          content: "Falha ao copiar automaticamente.",
          type: 'error'
        });
      });
  };

  const handleUnlockPremium = () => {
    if (isPremium) {
      setModalConfig({
        isOpen: true,
        title: "Já Premium",
        content: "Você já possui acesso a todos os recursos!",
        type: 'success'
      });
      return;
    }
    setShowPixModal(true);
  };

  const confirmPayment = () => {
    localStorage.setItem(STORAGE_KEY_PREMIUM, 'true');
    setIsPremium(true);
    setShowPixModal(false);
    setModalConfig({
      isOpen: true,
      title: "Parabéns!",
      content: "Recursos Premium e IA desbloqueados com sucesso!",
      type: 'success'
    });
  };

  const copyPixCode = () => {
    navigator.clipboard.writeText(PIX_PAYLOAD);
    setModalConfig({
      isOpen: true,
      title: "Código PIX Copiado",
      content: "Código copiado! Cole no seu aplicativo bancário.",
      type: 'success'
    });
  };

  return (
    <div className="flex items-center justify-center p-4 min-h-screen">
      <div className="w-full max-w-md bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] p-6 md:p-8 text-center transition-all duration-300">
        
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 tracking-tight">
          Motivação <span className="text-indigo-600">Rápida</span>
        </h1>
        <p className="text-gray-500 mb-8 font-medium">
          Sua dose diária de inspiração. O modo premium usa a <span className="text-indigo-600 font-bold">IA do Google</span>.
        </p>

        {/* Quote Display Area */}
        <div className={`relative bg-indigo-50 border-l-4 border-indigo-500 rounded-lg p-8 mb-8 min-h-[180px] flex items-center justify-center transition-all duration-300 ${isLoading ? 'opacity-80' : ''}`}>
          
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-indigo-50 bg-opacity-80 rounded-lg z-10">
               <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
          )}

          <p className="text-xl font-semibold text-gray-700 italic leading-relaxed animate-fade-in-up">
            "{quote.text}"
          </p>
          
          {quote.isAiGenerated && (
             <span className="absolute top-2 right-2 bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                 <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
               </svg>
               IA
             </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button onClick={handleGenerateStaticQuote} fullWidth variant="primary" disabled={isLoading}>
            Gerar Citação Comum
          </Button>

          <Button 
            onClick={handleGenerateAIQuote} 
            fullWidth 
            variant="ai"
            disabled={isLoading || (!isPremium && false)} /* If premium logic was strict, we'd disable here, but we want them to click to see the modal */
            className={!isPremium ? "opacity-70" : ""}
          >
            {isPremium ? "⭐ Gerar Nova Citação IA" : "⭐ Gerar Citação com IA (Premium)"}
          </Button>

          <Button onClick={handleCopy} fullWidth variant="success" disabled={isLoading}>
            Copiar e Compartilhar
          </Button>

          <div className="h-px bg-gray-200 w-full my-6"></div>

          <Button 
            onClick={handleUnlockPremium} 
            fullWidth 
            variant={isPremium ? "success" : "premium"}
            className="flex items-center justify-center font-extrabold"
          >
            {isPremium ? (
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                </svg>
                Premium Ativo
              </span>
            ) : (
              "✨ Desbloquear Acesso Imediato"
            )}
          </Button>
        </div>
      </div>

      {/* Modals */}
      <GenericModal 
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        content={modalConfig.content}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
      />

      <PixModal 
        isOpen={showPixModal}
        onClose={() => setShowPixModal(false)}
        onConfirm={confirmPayment}
        onCopyPix={copyPixCode}
      />
    </div>
  );
}

export default App;
