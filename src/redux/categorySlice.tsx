import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Импортируем подготовленный список категорий из JSON
import categoriesData from '../data/categories.json';

export interface Category {
    id: number;
    name: string;
}

interface CategoryState {
    categories: Category[];
}

const initialState: CategoryState = {
    // Изначальное состояние категорий берётся из categories.json
    categories: categoriesData as Category[],
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory(state, action: PayloadAction<Category>) {
            state.categories.push(action.payload);
        },
        updateCategory(state, action: PayloadAction<Category>) {
            const index = state.categories.findIndex(cat => cat.id === action.payload.id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        },
        removeCategory(state, action: PayloadAction<number>) {
            state.categories = state.categories.filter(cat => cat.id !== action.payload);
        },
        // Полная установка списка категорий (например, после обновления)
        setCategories(state, action: PayloadAction<Category[]>) {
            state.categories = action.payload;
        },
    },
});

export const { addCategory, updateCategory, removeCategory, setCategories } = categorySlice.actions;
export default categorySlice.reducer;