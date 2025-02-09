import React, { useState } from 'react';
import { Box, Button, List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CategoryForm from './CategoryForm';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { addCategory, updateCategory, removeCategory, Category } from '../redux/categorySlice';
import { useNavigate } from 'react-router-dom';

const CategoriesPage: React.FC = () => {
    const categories = useSelector((state: RootState) => state.categories.categories);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

    const handleAddClick = () => {
        setCurrentCategory(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (category: Category) => {
        setCurrentCategory(category);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        dispatch(removeCategory(id));
    };

    const handleSave = (name: string) => {
        if (currentCategory) {
            dispatch(updateCategory({ id: currentCategory.id, name }));
        } else {
            dispatch(addCategory({ id: Date.now(), name }));
        }
        setIsModalOpen(false);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <IconButton onClick={handleBackClick} aria-label="назад" sx={{ marginRight: 1 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" gutterBottom>
                    Управление категориями
                </Typography>
            </Box>

            <Button variant="contained" color="primary" onClick={handleAddClick} sx={{ marginBottom: 2 }}>
                Добавить категорию
            </Button>

            <List>
                {categories.map((cat) => (
                    <ListItem
                        key={cat.id}
                        secondaryAction={
                            <>
                                <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(cat)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(cat.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }
                    >
                        <ListItemText primary={cat.name} />
                    </ListItem>
                ))}
            </List>

            {isModalOpen && (
                <CategoryForm
                    initialValue={currentCategory ? currentCategory.name : ''}
                    onSave={handleSave}
                    onClose={handleModalClose}
                />
            )}
        </Box>
    );
};

export default CategoriesPage;