import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navigation: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
    return (
        <AppBar
            position="static"
            sx={{ top: 0, left: 0, width: '100%', zIndex: 1200, backgroundColor: '#0D47A1' }}
        >
            <Toolbar>
                <Button onClick={toggleSidebar} color="inherit">
                    Toggle Sidebar
                </Button>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-around' }}>
                    <Button color="inherit" component={Link} to="/">
                        Товары
                    </Button>
                    <Button color="inherit">Склады</Button>
                    <Button color="inherit">О системе</Button>
                    <Button color="inherit" component={Link} to="/profile">
                        Личная страница пользователя
                    </Button>
                    <Button color="inherit" component={Link} to="/categories">
                        Категории
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;