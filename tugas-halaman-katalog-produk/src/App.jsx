import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { products as fallbackProducts } from './data/products';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import CheckoutForm from './components/CheckoutForm';
import ProductDetail from './components/ProductDetail';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cariInput, setCariInput] = useState('');
  const [cariDebounced, setCariDebounced] = useState('');
  const [filterKategori, setFilterKategori] = useState('Semua');
  const [produkTerpilih, setProdukTerpilih] = useState(null);
  const [urutkan, setUrutkan] = useState('default');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error('Gagal terhubung ke API');

        const apiData = await res.json();
        const formattedData = apiData.map(item => ({
          id: item.id,
          nama: item.title,
          harga: Math.round(item.price * 15000),
          kategori: item.category,
          deskripsi: item.description,
          gambar: item.image
        }));

        setProducts(formattedData);
        setError(null);
      } catch (err) {
        console.error(err);
        setProducts(fallbackProducts);
        setError('⚠️ Tidak bisa memuat data dari server, menampilkan data cadangan.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCariDebounced(cariInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [cariInput]);

  useEffect(() => {
    document.title = `Katalog | Keranjang (${localStorage.getItem('keranjangBelanja') ? JSON.parse(localStorage.getItem('keranjangBelanja')).length : 0})`;
  }, []);

  const produkTerfilter = products.filter(item => {
    const cocokNama = item.nama.toLowerCase().includes(cariDebounced.toLowerCase());
    const cocokKategori = filterKategori === 'Semua' || item.kategori === filterKategori;
    return cocokNama && cocokKategori;
  });

  const produkTerurut = [...produkTerfilter].sort((a, b) => {
    if (urutkan === 'termurah') return a.harga - b.harga;
    if (urutkan === 'termahal') return b.harga - a.harga;
    if (urutkan === 'nama-az') return a.nama.localeCompare(b.nama);
    if (urutkan === 'nama-za') return b.nama.localeCompare(a.nama);
    return 0;
  });

  const kategoriUnik = ['Semua', ...new Set(products.map(p => p.kategori))];

  if (loading) {
    return (
      <div style={styles.pusat}>
        <p style={styles.teksInfo}>⏳ Memuat produk...</p>
      </div>
    );
  }

  return (
    <CartProvider>
      <div style={styles.wrapper}>
        <h1 style={styles.judulUtama}>🛍️ Katalog Produk</h1>

        {error && <div style={styles.pesanError}>{error}</div>}

        <input
          type="text"
          placeholder="🔍 Cari nama produk..."
          value={cariInput}
          onChange={(e) => setCariInput(e.target.value)}
          style={styles.inputCari}
        />

        <div style={styles.barisFilter}>
          <div style={styles.grupFilter}>
            <p style={styles.labelFilter}>Kategori:</p>
            <div style={styles.tombolKategoriContainer}>
              {kategoriUnik.map(kat => (
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
          </div>

          <div style={styles.grupUrut}>
            <label style={styles.labelFilter}>Urutkan:</label>
            <select
              value={urutkan}
              onChange={(e) => setUrutkan(e.target.value)}
              style={styles.selectUrut}
            >
              <option value="default">Standar</option>
              <option value="termurah">Harga: Termurah</option>
              <option value="termahal">Harga: Termahal</option>
              <option value="nama-az">Nama: A - Z</option>
              <option value="nama-za">Nama: Z - A</option>
            </select>
          </div>
        </div>

        <ProductList produk={produkTerurut} onPilih={setProdukTerpilih} />

        <CartSidebar />
        <CheckoutForm />

        {produkTerpilih && (
          <ProductDetail produk={produkTerpilih} onClose={() => setProdukTerpilih(null)} />
        )}
      </div>
    </CartProvider>
  );
}

const styles = {
  wrapper: {
    maxWidth: '950px',
    margin: '0 auto',
    padding: '24px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fafafa',
    minHeight: '100vh'
  },
  pusat: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fafafa'
  },
  teksInfo: {
    fontSize: '18px',
    color: '#4a5568'
  },
  pesanError: {
    padding: '12px 16px',
    marginBottom: '20px',
    backgroundColor: '#fffbeb',
    color: '#92400e',
    borderRadius: '8px',
    border: '1px solid #fbbf24'
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
    outline: 'none'
  },
  barisFilter: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    marginBottom: '24px'
  },
  grupFilter: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap'
  },
  tombolKategoriContainer: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  labelFilter: {
    margin: 0,
    fontSize: '15px',
    fontWeight: '500',
    color: '#2d3748'
  },
  tombolKategori: {
    padding: '8px 14px',
    border: 'none',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer'
  },
  grupUrut: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  selectUrut: {
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    backgroundColor: 'white',
    cursor: 'pointer'
  }
};

export default App;