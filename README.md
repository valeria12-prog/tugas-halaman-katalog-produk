# 🛒 Katalog Belanja Sederhana

Proyek ini adalah aplikasi katalog produk berbasis React yang menampilkan daftar barang, fitur pencarian, filter kategori, keranjang belanja, dan formulir pemesanan. Data produk menggunakan data lokal sendiri tanpa bergantung pada layanan eksternal.

---

## ✨ Fitur Utama
- Menampilkan daftar produk lengkap
- Pencarian produk berdasarkan nama
- Filter produk berdasarkan kategori
- Urutkan produk berdasarkan harga dan nama
- Status ketersediaan stok barang
- Tambah barang ke keranjang belanja
- Lihat isi keranjang dan total harga
- Hapus barang dari keranjang
- Formulir pemesanan dan validasi data
- Tampilan responsif dan lebar penuh layar
- Data tersimpan otomatis di `localStorage`

---

## 📂 Struktur Folder
tugas-halaman-katalog-produk/
├── public/
├── src/
│ ├── context/
│ │ └── CartContext.jsx # Pengelolaan data keranjang
│ ├── data/
│ │ └── products.js # Daftar produk lokal
│ ├── components/
│ │ ├── ProductCard.jsx # Kartu tampilan setiap produk
│ │ ├── ProductList.jsx # Daftar semua produk
│ │ ├── ProductDetail.jsx # Detail produk saat diklik
│ │ ├── CartSidebar.jsx # Tampilan keranjang belanja
│ │ └── CheckoutForm.jsx # Formulir pemesanan
│ ├── App.jsx
│ └── main.jsx
├── index.html
├── package.json
└── README.md
plaintext

---

## 🚀 Cara Menjalankan Proyek
1. **Instal dependensi**
   ```bash
   npm install
