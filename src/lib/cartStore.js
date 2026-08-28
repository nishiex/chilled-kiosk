import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  addItem: (item) => set(state => {
    const uid = Date.now().toString(36) + Math.random().toString(36).slice(2,8);
    const newItem = { ...item, uid, qty: item.qty ?? 1 };
    return { items: [...state.items, newItem] };
  }),
  updateQty: (uid, qty) => set(state => ({ items: state.items.map(it => it.uid === uid ? { ...it, qty } : it) })),
  removeItem: (uid) => set(state => ({ items: state.items.filter(it => it.uid !== uid) })),
  clear: () => set({ items: [] }),
  getTotalCount: () => get().items.reduce((s,i) => s + (i.qty || 0), 0),
  getTotalPrice: () => get().items.reduce((s,i) => s + (i.price || 0) * (i.qty || 0), 0),
}));
