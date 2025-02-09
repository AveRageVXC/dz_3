import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import ProductList from './components/ProductList';
import ProductDetails from './pages/ProductDetails';
import CategoriesPage from './pages/CategoriesPage';
import UserProfile from './pages/UserProfile';
import { store } from './redux/store';

const App: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [filters, setFilters] = useState({ searchText: '', nonZeroQuantity: false, category: '' });
    const [categories] = useState<string[]>([]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleFilter = (newFilters: { searchText: string; nonZeroQuantity: boolean; category: string }) => {
        setFilters(newFilters);
    };

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Box className="app">
                    <Navigation toggleSidebar={toggleSidebar} />
                    <Box sx={{ display: 'flex' }}>
                        <Sidebar
                            isOpen={isSidebarOpen}
                            onClose={toggleSidebar}
                            onFilter={handleFilter}
                            categories={categories}
                        />
                        <Box
                            className="container"
                            sx={{
                                marginLeft: isSidebarOpen ? '250px' : '0',
                                transition: 'margin-left 0.3s',
                                flexGrow: 1,
                            }}
                        >
                            <Routes>
                                <Route path="/products" element={<ProductList filters={filters} />} />
                                <Route path="/" element={<ProductList filters={filters} />} />
                                <Route path="/products/:id" element={<ProductDetails />} />
                                <Route path="/categories" element={<CategoriesPage />} />
                                <Route path="/profile" element={<UserProfile />} />
                            </Routes>
                        </Box>
                    </Box>
                </Box>
            </BrowserRouter>
        </Provider>
    );
};

export default App;