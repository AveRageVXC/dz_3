import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Tooltip,
    CardActionArea,
    IconButton,
    Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface ProductCardProps {
    id: number;
    name: string;
    description: string;
    category: number;
    image?: string;
    quantity: number;
    unit: string;
    onClick: () => void;
    onDelete: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
                                                     id,
                                                     name,
                                                     description,
                                                     category,
                                                     image,
                                                     quantity,
                                                     unit,
                                                     onClick,
                                                     onDelete,
                                                 }) => {
    const categories = useSelector((state: RootState) => state.categories.categories);
    const categoryName =
        categories.find((cat) => cat.id === category)?.name || 'Неизвестная категория';

    return (
        <Tooltip title={description} arrow>
            <Card sx={{ maxWidth: 345, position: 'relative', backgroundColor: 'white', color: 'black' }}>
                <CardActionArea onClick={onClick}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {categoryName}
                        </Typography>
                    </CardContent>
                    {image && <CardMedia component="img" height="140" image={image} alt={name} />}
                    <CardContent>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                        >
                            {description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {quantity} {unit}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                    <IconButton
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                    >
                        <DeleteIcon color="error" />
                    </IconButton>
                </Box>
            </Card>
        </Tooltip>
    );
};

export default ProductCard;