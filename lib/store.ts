import { create } from "zustand";

type Store = {
  count: number;
  open: boolean;
  toggleCart: () => void;
  inc: () => void;
};

export const useStore = create<Store>()((set) => ({
  count: 1,
  open: false,
  toggleCart: () => set((state) => ({ open: !state.open })),
  inc: () => set((state) => ({ count: state.count + 1 }))
}));
