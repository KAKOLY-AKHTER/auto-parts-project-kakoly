import { createContext, useContext, useState, useEffect } from 'react';

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fremont_cart') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('fremont_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product) => {
    setItems(prev => {
      const hit = prev.find(i => i.id === product.id);
      if (hit) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));

  const updateQty = (id, qty) => {
    if (qty < 1) { removeItem(id); return; }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const clearCart = () => setItems([]);

  const count    = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartCtx.Provider value={{ items, addItem, removeItem, updateQty, clearCart, count, subtotal }}>
      {children}
    </CartCtx.Provider>
  );
}

export const useCart = () => useContext(CartCtx);
