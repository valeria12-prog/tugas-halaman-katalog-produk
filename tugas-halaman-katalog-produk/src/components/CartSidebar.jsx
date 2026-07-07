import React from 'react';
import { useCart } from '../context/CartContext';

const formatRupiah = (angka) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(angka);
};

const CartSidebar = () => {
  const { keranjang, hapusDariKeranjang } = useCart();
  const totalHarga = keranjang.reduce((total, item) => total + (item.harga * item.jumlah), 0);

  return (
    <div style={styles.sidebar}>
      <h3 style={styles.judul}>🛒 Keranjang Belanja</h3>
      {keranjang.length === 0 ? (
        <p style={styles.kosong}>Keranjang masih kosong</p>
      ) : (
        <>
          {keranjang.map(item => (
            <div key={item.id} style={styles.item}>
              <div>
                <p style={styles.nama}>{item.nama}</p>
                <p style={styles.info}>{formatRupiah(item.harga)} × {item.jumlah}</p>
              </div>
              <button onClick={() => hapusDariKeranjang(item.id)} style={styles.tombolHapus}>×</button>
            </div>
          ))}
          <div style={styles.total}>
            <strong>Total: {formatRupiah(totalHarga)}</strong>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  // ✅ Ubah posisi agar tidak menutupi konten, jadi di dalam alur halaman
  sidebar: {
    width: '100%',
    maxWidth: '950px',
    margin: '32px auto 0',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    padding: '20px',
    boxSizing: 'border-box'
  },
  judul: {
    fontSize: '20px',
    margin: '0 0 20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee'
  },
  kosong: {
    color: '#888',
    textAlign: 'center',
    padding: '30px 0'
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #f0f0f0'
  },
  nama: {
    fontSize: '15px',
    margin: '0 0 4px'
  },
  info: {
    fontSize: '14px',
    color: '#555',
    margin: 0
  },
  tombolHapus: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#ef4444',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  total: {
    marginTop: '20px',
    paddingTop: '15px',
    borderTop: '2px solid #eee',
    fontSize: '18px',
    textAlign: 'right'
  }
};

export default CartSidebar;