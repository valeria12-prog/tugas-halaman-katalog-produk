import React from 'react';

const formatRupiah = (angka) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(angka);
};

const ProductCard = ({ nama, harga, stok, onTambah }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.nama}>{nama}</h3>
      <p style={styles.harga}>{formatRupiah(harga)}</p>
      <span style={stok ? styles.tersedia : styles.habis}>
        {stok ? "Tersedia" : "Stok Habis"}
      </span>
      <button 
        onClick={onTambah} 
        disabled={!stok}
        style={{ ...styles.tombol, opacity: stok ? 1 : 0.6, cursor: stok ? 'pointer' : 'not-allowed' }}
      >
        + Tambah ke Keranjang
      </button>
    </div>
  );
};

const styles = {
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '20px',
    width: '160px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    border: '1px solid #f0f0f0',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'default'
  },
  nama: {
    fontSize: '17px',
    fontWeight: '600',
    margin: '0 0 10px 0',
    color: '#2d3748'
  },
  harga: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2b6cb0',
    margin: '8px 0 12px'
  },
  tersedia: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    backgroundColor: '#f0fff4',
    color: '#22543d',
    border: '1px solid #c6f6d5',
    marginBottom: '14px'
  },
  habis: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    backgroundColor: '#fff5f5',
    color: '#742a2a',
    border: '1px solid #fed7d7',
    marginBottom: '14px'
  },
  tombol: {
    width: '100%',
    padding: '9px 0',
    border: 'none',
    borderRadius: '10px',
    backgroundColor: '#3182ce',
    color: 'white',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background 0.2s ease'
  }
};

export default ProductCard;