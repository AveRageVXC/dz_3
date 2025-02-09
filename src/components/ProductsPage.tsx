import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
// import { setCategories, Category } from '../redux/categorySlice';
import Sidebar from './Sidebar';
import { v4 as uuidv4 } from 'uuid';

const ProductsPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.products.products);
    const categories = useSelector((state: RootState) => state.categories.categories);

    // Пример состояния и фильтрации товаров (логика фильтрации не детализирована)
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
            {/* Передаем категории из Redux в Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onFilter={handleFilter}
                categories={categories}
            />

            {/* Основной контент */}
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
