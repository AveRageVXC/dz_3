import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { updateProduct, Product } from '../redux/productSlice';

interface EditProductFormProps {
    product: Product;
    onClose: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product, onClose }) => {
    // Локальное состояние для полей формы, предзаполненное данными товара
    const [name, setName] = useState(product.name);
    const [description, setDescription] =
        useState(product.description);
    const [category, setCategory] = useState(product.category);
    const [quantity, setQuantity] = useState(product.quantity);
    const [price, setPrice] = useState(product.price);

    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedProduct: Product = {
            ...product,
            name,
            description,
            category,
            quantity,
            price,
        };

        // Обновляем товар в Redux-хранилище
        dispatch(updateProduct(updatedProduct));

        // Закрываем модальное окно
        onClose();
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '400px', padding: 2 }}
        >
            <TextField
                label="Название"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
                label="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <TextField
                label="Категория"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            />
            <TextField
                label="Количество"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
            />
            <TextField
                label="Цена"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button type="submit" variant="contained" color="primary">
                    Сохранить
                </Button>
                <Button variant="outlined" color="secondary" onClick={onClose}>
                    Отмена
                </Button>
            </Box>
        </Box>
    );
};

export default EditProductForm;
