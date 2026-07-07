import React from 'react';

const formatRupiah = (angka) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(angka);
};

const ProductDetail = ({ produk, onClose }) => {
  if (!produk) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.tombolTutup}>×</button>
        <img src={produk.gambar} alt={produk.nama} style={styles.gambar} />
        <h2 style={styles.nama}>{produk.nama}</h2>
        <p style={styles.kategori}>{produk.kategori}</p>
        <p style={styles.harga}>{formatRupiah(produk.harga)}</p>
        <p style={styles.deskripsi}>{produk.deskripsi}</p>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '30px',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative'
  },
  tombolTutup: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#ef4444',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer'
  },
  gambar: {
    width: '100%',
    height: '250px',
    objectFit: 'contain',
    marginBottom: '20px'
  },
  nama: {
    fontSize: '22px',
    margin: '0 0 10px'
  },
  kategori: {
    fontSize: '14px',
    color: '#718096',
    textTransform: 'capitalize',
    margin: '0 0 15px'
  },
  harga: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#2b6cb0',
    margin: '0 0 15px'
  },
  deskripsi: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#2d3748'
  }
};

export default ProductDetail;