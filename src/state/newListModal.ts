import { List, User } from '@ronaldocreis/wishlist-schema';
import { create } from 'zustand';

export type EditingList = User['lists'][number] | List | null;

type newListModalState = {
  isOpen: boolean;
  editingList: EditingList;
  openNewListModal: (editingList: EditingList) => void;
  close: () => void;
};

export const useNewListModal = create<newListModalState>((set) => ({
  isOpen: false,
  editingList: null,
  openNewListModal: (editingList: EditingList) => {
    set({ isOpen: true, editingList });
  },
  close: () => {
    set({ isOpen: false, editingList: null });
  },
}));
