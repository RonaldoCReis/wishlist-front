import { create } from 'zustand';

type editUserModal = {
  isOpen: boolean;
  close: () => void;
  openEditUserModal: () => void;
};

export const useEditUserModal = create<editUserModal>((set) => ({
  isOpen: false,
  close: () => {
    set({ isOpen: false });
  },
  openEditUserModal: () => {
    set({ isOpen: true });
  },
}));
