import React from 'react';
import { Button } from './Button';

interface GenericModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

export const GenericModal: React.FC<GenericModalProps> = ({ isOpen, title, content, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full transform transition-all scale-100">
        <h3 className="text-xl font-bold mb-3 text-indigo-600">{title}</h3>
        <p className="text-gray-700 mb-6">{content}</p>
        <Button onClick={onClose} fullWidth variant="primary">
          Ok
        </Button>
      </div>
    </div>
  );
};
