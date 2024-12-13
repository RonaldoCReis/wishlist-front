import { create } from 'zustand';

type ConfirmModalState = {
  isOpen: boolean;
  title: string | null;
  description: string | null;
  onConfirm: (() => void) | null;
  confirmText: string | null;
  openConfirmModal: ({
    title,
    description,
    onConfirm,
    confirmText,
  }: {
    title: string;
    description: string;
    onConfirm: () => void;
    confirmText: string;
  }) => void;
  close: () => void;
};

export const useConfirmModal = create<ConfirmModalState>((set) => ({
  isOpen: false,
  title: null,
  description: null,
  onConfirm: null,
  confirmText: null,
  openConfirmModal: ({ confirmText, description, onConfirm, title }) => {
    set({
      isOpen: true,
      title,
      description,
      onConfirm,
      confirmText,
    });
  },
  close: () => {
    set({
      isOpen: false,
      title: null,
      description: null,
      onConfirm: null,
      confirmText: null,
    });
  },
}));
