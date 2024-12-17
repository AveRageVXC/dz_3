import React from 'react';
import { Card, CardContent, CardMedia, Typography, Tooltip } from '@mui/material';

interface ProductCardProps {
    name: string;
    description: string;
    category: string;
    image: string;
    quantity: number;
    unit: string;
    onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, category, image, quantity, unit, onClick }) => {
    return (
        <Tooltip title={description} arrow>
            <Card
                onClick={onClick}
                sx={{
                    maxWidth: 345,
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.1)' },
                    backgroundColor: 'white',
                    color: 'black'
                }}
            >
                <CardContent>
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {category}
                    </Typography>
                </CardContent>
                {image && (
                    <CardMedia
                        component="img"
                        height="140"
                        image={image}
                        alt={name}
                    />
                )}
                <CardContent>
                    <Typography variant="body2" color="text.secondary" sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {quantity} {unit}
                    </Typography>
                </CardContent>
            </Card>
        </Tooltip>
    );
};

export default ProductCard;