import React, { useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Select, MenuItem, Button, Box, Drawer, IconButton, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Clear';

const Sidebar: React.FC<{ isOpen: boolean, onFilter: (filters: { searchText: string, nonZeroQuantity: boolean, category: string }) => void, onClose: () => void, categories: string[] }> = ({ isOpen, onFilter, onClose, categories }) => {
    const [searchText, setSearchText] = useState('');
    const [nonZeroQuantity, setNonZeroQuantity] = useState(false);
    const [category, setCategory] = useState('');

    const handleSearch = () => {
        onFilter({ searchText, nonZeroQuantity, category });
    };

    const handleReset = () => {
        setSearchText('');
        setNonZeroQuantity(false);
        setCategory('');
        onFilter({ searchText: '', nonZeroQuantity: false, category: '' });
    };

    const handleResetSearchText = () => {
        setSearchText('');
        onFilter({ searchText: '', nonZeroQuantity, category });
    };

    const handleResetCategory = () => {
        setCategory('');
        onFilter({ searchText, nonZeroQuantity, category: '' });
    };

    return (
        <Drawer anchor="left" open={isOpen} onClose={onClose} variant="persistent" sx={{ zIndex: 1}}>
            <Box sx={{ width: 250, padding: 2, marginTop: '64px' }}>
                <IconButton onClick={onClose} sx={{ float: 'right' }}>
                    <CloseIcon />
                </IconButton>
                <TextField
                    label="Название товара"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    fullWidth
                    InputAdornment={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleResetSearchText}>
                                    <ClearIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={nonZeroQuantity}
                            onChange={(e) => setNonZeroQuantity(e.target.checked)}
                        />
                    }
                    label="Только с ненулевым количеством"
                />
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    displayEmpty
                    fullWidth
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={handleResetCategory}>
                                <ClearIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                >
                    <MenuItem value="">
                        <em>Выберите категорию</em>
                    </MenuItem>
                    {categories.map((cat, index) => (
                        <MenuItem key={index} value={cat}>{cat}</MenuItem>
                    ))}
                </Select>
                <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleSearch}>
                        Поиск
                    </Button>
                    <Button color="secondary" onClick={handleReset}>
                        Сброс
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default Sidebar;