import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ produk, onPilih }) => {
  return (
    <div style={styles.container}>
      {produk.map((item) => (
        <ProductCard
          key={item.id}
          id={item.id}
          nama={item.nama}
          harga={item.harga}
          kategori={item.kategori}
          gambar={item.gambar}
          deskripsi={item.deskripsi}
          onPilih={() => onPilih(item)}
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '18px',
    margin: '24px 0'
  }
};

export default ProductList;