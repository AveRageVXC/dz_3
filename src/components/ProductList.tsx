import React, { useState, useEffect } from 'react';
import { Box, Grid2, Typography, Pagination, Select, MenuItem } from '@mui/material';
import ProductCard from './ProductCard';
import CustomModal from './Modal';
import productsData from '../data/products.json';

const ProductList: React.FC<{ filters: { searchText: string, nonZeroQuantity: boolean, category: string } }> = ({ filters }) => {
    const [modalContent, setModalContent] = useState<null | React.ReactNode>(null);
    const [products] = useState(productsData);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const handleCardClick = (product: any) => {
        setModalContent(
            <Box>
                <Typography variant="h3" sx={{ color: 'black' }}>{product.name}</Typography>
                {product.image ? <img src={product.image} alt={product.name} /> : <Box className="no-image">No Image</Box>}
                <Typography>{product.description}</Typography>
                <Typography>{product.category}</Typography>
                <Typography>{product.quantity} {product.unit}</Typography>
            </Box>
        );
    };
    const closeModal = () => setModalContent(null);

    const filteredProducts = products.filter(product => {
        return (
            (filters.searchText === '' || product.name.includes(filters.searchText)) &&
            (!filters.nonZeroQuantity || product.quantity > 0) &&
            (filters.category === '' || product.category === filters.category)
        );
    });

    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setItemsPerPage(event.target.value as number);
        setCurrentPage(1); // Reset to first page when items per page change
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ padding: '20px', flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                    <Select
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                    </Select>
                </Box>
                <Grid2 container spacing={2} justifyContent="center">
                    {paginatedProducts.map((product, index) => (
                        <Grid2 item key={index}>
                            <ProductCard
                                {...product}
                                onClick={() => handleCardClick(product)}
                            />
                        </Grid2>
                    ))}
                </Grid2>
                {modalContent && <CustomModal content={modalContent} onClose={closeModal} />}
                <Pagination
                    count={Math.ceil(filteredProducts.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
                />
            </Box>
        </Box>
    );
};

export default ProductList;