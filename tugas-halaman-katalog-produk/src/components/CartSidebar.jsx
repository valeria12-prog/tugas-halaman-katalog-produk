import React from 'react';

const formatRupiah = (angka) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(angka);
};

const CartSidebar = ({ keranjang, onHapus }) => {
  const totalHarga = keranjang.reduce((total, item) => total + (item.harga * item.jumlah), 0);

  return (
    <div style={styles.container}>
      <h3 style={styles.judul}>🛒 Keranjang Belanja ({keranjang.length} item)</h3>
      <p style={styles.total}>Total: <strong>{formatRupiah(totalHarga)}</strong></p>
      <hr style={styles.garis} />
      {keranjang.length === 0 ? (
        <p style={styles.kosong}>Keranjang masih kosong. Yuk pilih produk favoritmu!</p>
      ) : (
        <ul style={styles.daftar}>
          {keranjang.map((item) => (
            <li key={item.id} style={styles.item}>
              <div>
                <span style={styles.namaItem}>{item.nama}</span>
                <span style={styles.jumlah}> × {item.jumlah}</span>
              </div>
              <div style={styles.hargaHapus}>
                <span style={styles.harga}>{formatRupiah(item.harga * item.jumlah)}</span>
                <button onClick={() => onHapus(item.id)} style={styles.tombolHapus}>Hapus</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    padding: '24px',
    margin: '24px 0',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
  },
  judul: {
    fontSize: '20px',
    margin: '0 0 16px 0',
    color: '#2d3748'
  },
  total: {
    fontSize: '17px',
    color: '#2d3748',
    margin: '0 0 12px 0'
  },
  garis: {
    border: 'none',
    borderTop: '1px solid #edf2f7',
    margin: '16px 0'
  },
  kosong: {
    color: '#718096',
    textAlign: 'center',
    padding: '20px',
    fontStyle: 'italic'
  },
  daftar: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #f7fafc'
  },
  namaItem: {
    fontWeight: '500',
    color: '#2d3748'
  },
  jumlah: {
    color: '#718096',
    marginLeft: '6px'
  },
  hargaHapus: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  harga: {
    fontWeight: '500',
    color: '#2b6cb0'
  },
  tombolHapus: {
    border: 'none',
    backgroundColor: '#feb2b2',
    color: '#742a2a',
    padding: '5px 10px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500'
  }
};

export default CartSidebar;