import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addProduct, Product } from '../redux/productSlice';
import { AppDispatch } from '../redux/store';

interface AddProductFormProps {
    onClose: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onClose }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState<number>(0);
    const [unit, setUnit] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct: Product = {
            id: Date.now(),
            name,
            description,
            category,
            quantity,
            unit,
            image: image.trim() !== '' ? image : undefined,
        };

        dispatch(addProduct(newProduct));
        onClose();
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            <Typography variant="h4" component="h2" sx={{ mb: 1 }}>Добавить товар</Typography>
            <TextField
                label="Название товара"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
                label="Описание"
                variant="outlined"
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <TextField
                label="id Категории"
                variant="outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            />
            <TextField
                label="Количество"
                variant="outlined"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
            />
            <TextField
                label="Единица измерения"
                variant="outlined"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                required
            />
            <TextField
                label="URL изображения (опционально)"
                variant="outlined"
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
                Добавить товар
            </Button>
        </Box>
    );
};

export default AddProductForm;