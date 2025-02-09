import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface CategoryFormProps {
    initialValue?: string;
    onSave: (name: string) => void;
    onClose: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initialValue = '', onSave, onClose }) => {
    const [name, setName] = useState(initialValue);

    const handleSubmit = () => {
        if (name.trim()) {
            onSave(name);
        }
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>{initialValue ? 'Редактировать категорию' : 'Добавить категорию'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Название категории"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button onClick={handleSubmit}>{initialValue ? 'Сохранить' : 'Добавить'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CategoryForm;