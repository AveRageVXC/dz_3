import React from 'react';
import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';

const UserProfile: React.FC = () => {
    // Заглушка с данными пользователя
    const user = {
        username: 'Иван Иванов',
        email: 'ivan.ivanov@example.com',
        group: 'Студент',
        // Placeholder для аватара (можно заменить на реальный URL)
        avatar: 'https://via.placeholder.com/150',
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Card sx={{ maxWidth: 345, padding: 2 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar
                        alt={user.username}
                        src={user.avatar}
                        sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                        {user.username}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                        {user.email}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {user.group}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserProfile;