import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import Sidebar from './Sidebar';

const ProductsPage: React.FC = () => {
    const products = useSelector((state: RootState) => state.products.products);
    const categories = useSelector((state: RootState) => state.categories.categories);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(products);

    const handleFilter = (filters: { searchText: string; nonZeroQuantity: boolean; category: string }) => {
        const { searchText, nonZeroQuantity, category } = filters;
        const newProducts = products.filter((p) => {
            const
                matchesSearch = p.name.toLowerCase().includes(searchText.toLowerCase());
            const matchesQuantity = nonZeroQuantity ? p.quantity > 0 : true;
            const matchesCategory = category ? p.category === category : true;
            return matchesSearch && matchesQuantity && matchesCategory;
        });
        setFilteredProducts(newProducts);
    };

    return (
        <div>
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onFilter={handleFilter}
                categories={categories}
            />
            <div>
                <button onClick={() => setIsSidebarOpen(true)}>Фильтры</button>
                {filteredProducts.map((p) => (
                    <div key={p.id}>
                        <h3>{p.name}</h3>
                        <p>{p.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
