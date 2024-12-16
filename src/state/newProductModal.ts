import { List, Product } from '@ronaldocreis/wishlist-schema';
import { create } from 'zustand';

export type EditingProduct = List['products'][number] | Product | null;

type newListModalState = {
  isOpen: boolean;
  editingProduct: EditingProduct;
  openNewProductModal: (editingProduct: EditingProduct) => void;
  close: () => void;
};

export const useNewProductModal = create<newListModalState>((set) => ({
  isOpen: false,
  editingProduct: null,
  openNewProductModal: (editingProduct: EditingProduct) => {
    set({ isOpen: true, editingProduct });
  },
  close: () => {
    set({ isOpen: false, editingProduct: null });
  },
}));
