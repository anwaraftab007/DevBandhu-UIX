import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ConfirmDialogProps {
  title: string;
  message: string;
  onCancel: () => void;
}

export function ConfirmDialog({
  title,
  message,
  onCancel
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gray-800 rounded-lg p-6 w-full max-w-md"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-300 mb-6">{message}</p>
      </motion.div>
    </div>
  );
}

type DialogProps = {
  title: string;
  message: string;
  confirmLabel?: string;
  confirmVariant?: 'primary' | 'danger' | 'secondary';
  onConfirm?: () => void;
  onCancel?: () => void;
};

export function Dialog({
  title,
  message,
  confirmLabel = 'Confirm',
  confirmVariant = 'primary',
  onConfirm,
  onCancel,
}: DialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gray-800 rounded-lg p-6 w-full max-w-md"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-300 mb-6">{message}</p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="text-gray-300 hover:text-white px-4 py-2 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-md text-white ${
              confirmVariant === 'primary'
                ? 'bg-blue-600 hover:bg-blue-700'
                : confirmVariant === 'danger'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-gray-600 hover:bg-gray-700'
            } transition-colors`}
          >
            {confirmLabel}
          </button>
        </div>
      </motion.div>
    </div>
  );
}