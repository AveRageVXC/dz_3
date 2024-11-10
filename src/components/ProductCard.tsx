import React from 'react';

interface ProductCardProps {
    name: string;
    description: string;
    category: string;
    quantity: number;
    unit: string;
    image?: string;
    onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, category, quantity, unit, image, onClick }) => {
    return (
        <div onClick={onClick} className="product-card">
            <h3>{name}</h3>
            {image ? <img src={image} alt={name} /> : <div className="no-image">No Image</div>}
            <p className="description">{description}</p>
            <p className="category">{category}</p>
            <p className="quantity">{quantity} {unit}</p>
        </div>
    );
};

export default ProductCard;