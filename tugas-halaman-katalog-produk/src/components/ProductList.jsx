import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ produk, onTambah }) => {
  return (
    <div style={styles.container}>
      {produk.map((item) => (
        <ProductCard
          key={item.id}
          nama={item.nama}
          harga={item.harga}
          stok={item.stok}
          onTambah={() => onTambah(item)}
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