import React from 'react';
import { Button } from './Button';
import { PIX_PAYLOAD } from '../constants';

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCopyPix: () => void;
}

export const PixModal: React.FC<PixModalProps> = ({ isOpen, onClose, onConfirm, onCopyPix }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full text-left relative my-8">
        <h3 className="text-2xl font-bold mb-4 text-blue-600 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v2a2 2 0 0 0 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 0 2-2V6Zm3 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-6-5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-6-5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" clipRule="evenodd" />
          </svg>
          Pagamento PIX Premium
        </h3>
        
        <p className="text-gray-700 mb-4">
          Apoie o projeto e libere a <strong className="text-indigo-600">Geração de Citações por IA</strong> por apenas <strong className="text-green-600">R$ 9,90</strong>!
        </p>
        
        <div className="flex flex-col items-center justify-center space-y-4 mb-6">
          <div className="w-40 h-40 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-center p-4 shadow-inner">
             QR Code PIX Simulada
          </div>
          <p className="text-sm text-gray-500">Aponte a câmera do seu app bancário.</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">PIX Copia e Cola:</label>
          <textarea 
            readOnly 
            rows={3} 
            value={PIX_PAYLOAD}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-xs select-all focus:ring-2 focus:ring-blue-500 outline-none resize-none font-mono text-gray-600"
          />
        </div>
        
        <div className="space-y-3">
          <Button onClick={onCopyPix} fullWidth variant="primary" className="bg-blue-500 hover:bg-blue-600">
            Copiar Código PIX
          </Button>
          <Button onClick={onConfirm} fullWidth variant="success">
            ✅ Já Paguei! Desbloquear IA
          </Button>
          <button 
            onClick={onClose} 
            className="w-full text-sm text-gray-500 hover:text-gray-700 py-2 underline decoration-gray-300 hover:decoration-gray-500 transition-colors"
          >
            Cancelar e Voltar
          </button>
        </div>
      </div>
    </div>
  );
};
