import { create } from 'zustand';

type newListModalState = {
  isOpen: boolean;
  editId: string | null;
  open: (editId: string | null) => void;
  close: () => void;
};

export const useNewListModal = create<newListModalState>((set) => ({
  isOpen: false,
  editId: null,
  open: (editId: string | null) => {
    set({ isOpen: true, editId });
  },
  close: () => {
    set({ isOpen: false, editId: null });
  },
}));
