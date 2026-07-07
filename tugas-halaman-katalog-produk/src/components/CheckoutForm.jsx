import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const CheckoutForm = () => {
  const { keranjang, resetKeranjang } = useCart();
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState({});

  const validasi = () => {
    const err = {};
    if (!nama.trim()) err.nama = "Nama tidak boleh kosong";
    else if (nama.trim().length < 3) err.nama = "Nama minimal 3 karakter";
    if (!email.trim()) err.email = "Email tidak boleh kosong";
    else if (!email.includes('@')) err.email = "Email harus mengandung tanda @";
    if (keranjang.length === 0) err.keranjang = "Keranjang tidak boleh kosong";
    setError(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validasi()) {
      alert("✅ Pesanan berhasil dikirim! Terima kasih telah berbelanja.");
      setNama('');
      setEmail('');
      resetKeranjang();
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.judul}>📝 Formulir Pemesanan</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.grupInput}>
          <label style={styles.label}>Nama Lengkap</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            style={{ ...styles.input, border: error.nama ? '1px solid #fc8181' : '1px solid #e2e8f0' }}
            placeholder="Masukkan nama lengkap Anda"
          />
          {error.nama && <p style={styles.teksError}>{error.nama}</p>}
        </div>

        <div style={styles.grupInput}>
          <label style={styles.label}>Alamat Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ ...styles.input, border: error.email ? '1px solid #fc8181' : '1px solid #e2e8f0' }}
            placeholder="contoh: nama@email.com"
          />
          {error.email && <p style={styles.teksError}>{error.email}</p>}
        </div>

        {nama && email && !error.nama && !error.email && (
          <div style={styles.preview}>
            🎉 Halo <strong>{nama}</strong>! Pesanan akan dikirim ke alamat email <strong>{email}</strong>.
          </div>
        )}

        {error.keranjang && <p style={styles.teksError}>{error.keranjang}</p>}

        <button type="submit" style={styles.tombol} disabled={keranjang.length === 0}>
          ✅ Proses Checkout
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '950px',
    margin: '24px auto',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    boxSizing: 'border-box'
  },
  judul: {
    fontSize: '20px',
    margin: '0 0 20px 0',
    color: '#2d3748'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  grupInput: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#2d3748'
  },
  input: {
    padding: '12px 14px',
    borderRadius: '10px',
    fontSize: '15px',
    outline: 'none'
  },
  teksError: {
    margin: '2px 0 0 0',
    fontSize: '13px',
    color: '#c53030'
  },
  preview: {
    padding: '12px',
    borderRadius: '10px',
    backgroundColor: '#f0fff4',
    color: '#22543d',
    fontSize: '14px'
  },
  tombol: {
    marginTop: '8px',
    padding: '13px 0',
    border: 'none',
    borderRadius: '10px',
    backgroundColor: '#38a169',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer'
  }
};

export default CheckoutForm;