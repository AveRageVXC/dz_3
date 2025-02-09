import React, { useState } from 'react';
import {
    TextField,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    Button,
    Box,
    Drawer,
    IconButton,
    InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export interface Category {
    id: number;
    name: string;
}

interface SidebarProps {
    isOpen: boolean;
    onFilter: (filters: { searchText: string; nonZeroQuantity: boolean; category: number | '' }) => void;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onFilter, onClose }) => {
    const [searchText, setSearchText] = useState('');
    const [nonZeroQuantity, setNonZeroQuantity] = useState(false);
    const [category, setCategory] = useState<number | ''>('');

    const categories = useSelector((state: RootState) => state.categories.categories);

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
        <Drawer anchor="left" open={isOpen} onClose={onClose} variant="persistent" sx={{ zIndex: 1 }}>
            <Box sx={{ width: 250, padding: 2, marginTop: '64px' }}>
                <IconButton onClick={onClose} sx={{ float: 'right' }}>
                    <CloseIcon />
                </IconButton>
                <TextField
                    label="Название товара"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleResetSearchText}>
                                    <ClearIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
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
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === '') {
                            setCategory('');
                        } else {
                            setCategory(Number(value));
                        }
                    }}
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
                    {categories.map((cat: Category) => (
                        <MenuItem key={cat.id} value={cat.id}>
                            {cat.name}
                        </MenuItem>
                    ))}
                </Select>
                <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                    <Button variant="contained"
                            color="primary" onClick={handleSearch}>
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