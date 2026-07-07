import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [keranjang, setKeranjang] = useState(() => {
    const tersimpan = localStorage.getItem('keranjangBelanja');
    return tersimpan ? JSON.parse(tersimpan) : [];
  });

  useEffect(() => {
    localStorage.setItem('keranjangBelanja', JSON.stringify(keranjang));
  }, [keranjang]);

  const tambahKeKeranjang = (produk) => {
    setKeranjang((lama) => {
      const ada = lama.find(item => item.id === produk.id);
      if (ada) {
        return lama.map(item =>
          item.id === produk.id ? { ...item, jumlah: item.jumlah + 1 } : item
        );
      } else {
        return [...lama, { ...produk, jumlah: 1 }];
      }
    });
  };

  const hapusDariKeranjang = (id) => {
    setKeranjang(lama => lama.filter(item => item.id !== id));
  };

  const resetKeranjang = () => {
    setKeranjang([]);
  };

  return (
    <CartContext.Provider value={{ keranjang, tambahKeKeranjang, hapusDariKeranjang, resetKeranjang }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}