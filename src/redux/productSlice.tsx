import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import productsData from '../data/products.json';

export interface Product {
    id: number;               // Уникальный идентификатор товара
    name: string;
    description: string;
    category: number;         // Теперь вместо названия хранится id категории
    quantity: number;
    unit: string;
    image?: string;
}

interface ProductState {
    products: Product[];
}

// Если в JSON-е поле category хранится как строка (название), производим преобразование в number.
// Если данные уже обновлены, и там хранится id, то преобразование не повлияет.
const productsWithId: Product[] = productsData.map((product, index) => ({
    id: index + 1,
    ...product,
    category:
        typeof product.category === 'string'
            ? Number(product.category) // Преобразуем название в число (при условии, что название можно сопоставить с числовым id)
            : product.category,
}));

const initialState: ProductState = {
    products: productsWithId,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<Product>) {
            state.products.push(action.payload);
        },
        updateProduct(state, action: PayloadAction<Product>) {
            const index = state.products.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        removeProduct(state, action: PayloadAction<number>) {
            state.products = state.products.filter(p => p.id !== action.payload);
        },
        // Полная установка массива товаров (например, обновление данных с сервера)
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
        },
    },
});

export const { addProduct, updateProduct, removeProduct, setProducts } = productSlice.actions;
export default productSlice.reducer;