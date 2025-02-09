import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import CustomModal from './Modal';
import EditProductForm from './EditProductForm.tsx';
import { RootState, AppDispatch } from '../redux/store';
import { removeProduct } from '../redux/productSlice';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const productId = Number(id);

    const product = useSelector((state: RootState) =>
        state.products.products.find((p) => p.id === productId)
    );

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

    if (!product) {
        return <Typography variant="h6">Товар не найден.</Typography>;
    }

    const openEditModal = () => {
        setModalContent(
            <EditProductForm
                product={product}
                onClose={() => setModalContent(null)}
            />
        );
    };

    const handleDelete = () => {
        dispatch(removeProduct(product.id));
        navigate('/products');
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Button
                variant="outlined"
                onClick={() => navigate(-1)}
                sx={{ marginBottom: 2 }}
            >
                Назад
            </Button>

            <Typography variant="h4" gutterBottom>
                {product.name}
            </Typography>

            <Typography variant="body1">
                <strong>Описание:</strong> {product.description}
            </Typography>
            <Typography variant="body1">
                <strong>Категория:</strong> {product.category}
            </Typography>
            <Typography variant="body1">
                <strong>Количество:</strong> {product.quantity}
            </Typography>
            <Typography variant="body1">
                <strong>Цена:</strong> {product.price}
            </Typography>

            <Box sx={{ marginTop: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={openEditModal}
                    sx={{ marginRight: 1 }}
                >
                    Редактировать товар
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDelete}
                >
                    Удалить товар
                </Button>
            </Box>

            {modalContent && (
                <CustomModal content={modalContent} onClose={() => setModalContent(null)} />
            )}
        </Box>
    );
};

export default ProductDetails;