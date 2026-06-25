import React, { useState, useEffect } from 'react';
import { products } from './data/products';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import CheckoutForm from './components/CheckoutForm';

function App() {
  const [keranjang, setKeranjang] = useState([]);
  const [cari, setCari] = useState('');
  const [filterKategori, setFilterKategori] = useState('Semua');

  useEffect(() => {
    console.log("App loaded ✅");
  }, []);

  useEffect(() => {
    document.title = `Keranjang (${keranjang.length}) | Katalog Produk`;
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
    setKeranjang((lama) => lama.filter(item => item.id !== id));
  };

  const resetKeranjang = () => {
    setKeranjang([]);
  };

  const produkTerfilter = products.filter((item) => {
    const cocokNama = item.nama.toLowerCase().includes(cari.toLowerCase());
    const cocokKategori = filterKategori === 'Semua' || item.kategori === filterKategori;
    return cocokNama && cocokKategori;
  });

  const kategoriUnik = ['Semua', ...new Set(products.map(p => p.kategori))];

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.judulUtama}>🛍️ Mini Product Catalog</h1>

      <input
        type="text"
        placeholder="🔍 Cari nama produk..."
        value={cari}
        onChange={(e) => setCari(e.target.value)}
        style={styles.inputCari}
      />

      <div style={styles.filterKategori}>
        <p style={styles.labelFilter}>Filter Kategori:</p>
        {kategoriUnik.map((kat) => (
          <button
            key={kat}
            onClick={() => setFilterKategori(kat)}
            style={{
              ...styles.tombolKategori,
              backgroundColor: filterKategori === kat ? '#3182ce' : '#f7fafc',
              color: filterKategori === kat ? 'white' : '#2d3748'
            }}
          >
            {kat}
          </button>
        ))}
      </div>

      <ProductList produk={produkTerfilter} onTambah={tambahKeKeranjang} />

      <CartSidebar keranjang={keranjang} onHapus={hapusDariKeranjang} />

      <CheckoutForm keranjang={keranjang} onCheckoutSukses={resetKeranjang} />
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: '950px',
    margin: '0 auto',
    padding: '24px',
    fontFamily: "'Segoe UI', Roboto, sans-serif",
    backgroundColor: '#fafafa',
    minHeight: '100vh'
  },
  judulUtama: {
    textAlign: 'center',
    color: '#1a202c',
    fontSize: '28px',
    marginBottom: '24px'
  },
  inputCari: {
    width: '100%',
    padding: '14px 18px',
    fontSize: '16px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    marginBottom: '20px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border 0.2s ease'
  },
  filterKategori: {
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap'
  },
  labelFilter: {
    margin: 0,
    fontSize: '15px',
    fontWeight: '500',
    color: '#2d3748'
  },
  tombolKategori: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background 0.2s ease'
  }
};

export default App;