import React, { useState } from 'react';
import ProductCard from './ProductCard.tsx';
import Modal from './Modal.tsx';
import productsData from '../data/products.json';

const ProductList: React.FC = () => {
    const [modalContent, setModalContent] = useState<null | React.ReactNode>(null);
    const [products] = useState(productsData);

    const handleCardClick = (product: any) => {
        setModalContent(
            <div>
                <h3>{product.name}</h3>
                {product.image ? <img src={product.image} alt={product.name} /> : <div className="no-image">No Image</div>}
                <p>{product.description}</p>
                <p>{product.category}</p>
                <p>{product.quantity} {product.unit}</p>
            </div>
        );
    };

    const closeModal = () => setModalContent(null);

    return (
        <div className="product-list">
            {products.map((product, index) => (
                <ProductCard
                    key={index}
                    {...product}
                    onClick={() => handleCardClick(product)}
                />
            ))}
            {modalContent && <Modal content={modalContent} onClose={closeModal} />}
        </div>
    );
};

export default ProductList;