import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, Pagination, Select, MenuItem, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import CustomModal from './Modal';
import AddProductForm from './AddProductForm';
import { RootState, AppDispatch } from '../redux/store';
import { Product, removeProduct } from '../redux/productSlice';

interface Filters {
    searchText: string;
    nonZeroQuantity: boolean;
    category: string;
}

interface ProductListProps {
    filters: Filters;
}

const ProductList: React.FC<ProductListProps> = ({ filters }) => {
    const products = useSelector((state: RootState) => state.products.products);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

    // Фильтрация товаров по заданным фильтрам
    const filteredProducts = products.filter((product) => {
        return (
            (filters.searchText === '' ||
                product.name.toLowerCase().includes(filters.searchText.toLowerCase())) &&
            (!filters.nonZeroQuantity || product.quantity > 0) &&
            (filters.category === '' || product.category === filters.category)
        );
    });

    // Пагинация
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    // При клике на карточку товара перенаправляем на страницу /products/:id
    const handleCardClick = (product: Product) => {
        navigate(`/products/${product.id}`)
    };

    const handleDelete = (id: number) => {
        dispatch(removeProduct(id));
    };

    // Открытие модальной формы добавления товара
    const openAddProductModal = () => {
        setModalContent(<AddProductForm onClose={() => setModalContent(null)} />);
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 2,
                }}
            >
                <Select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                </Select>
                <Button variant="contained" color="primary" onClick={openAddProductModal}>
                    Добавить товар
                </Button>
            </Box>
            <Grid container spacing={2} justifyContent="center">
                {paginatedProducts.map((product) => (
                    <Grid item key={product.id}>
                        <ProductCard
                            {...product}
                            onClick={() => handleCardClick(product)}
                            onDelete={() => handleDelete(product.id)}
                        />
                    </Grid>
                ))}
            </Grid>
            {modalContent && <CustomModal content={modalContent} onClose={() => setModalContent(null)} />}
            <Pagination
                count={Math.ceil(filteredProducts.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
            />
        </Box>
    );
};

export default ProductList;