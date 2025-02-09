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
    category: number; // Теперь здесь передается id категории
    image?: string;
    quantity: number;
    unit: string;
    onClick: () => void;   // Для открытия увеличенной версии
    onDelete: () => void;  // Для удаления товара
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
    // Получаем список категорий из redux-хранилища
    const categories = useSelector((state: RootState) => state.categories.categories);
    const categoryName =
        categories.find((cat) => cat.id === category)?.name || 'Неизвестная категория';

    return (
        <Tooltip title={description} arrow>
            {/* CardActionArea отвечает за клик по карточке для открытия модального окна */}
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
                {/* Кнопка для удаления товара, расположенная в правом верхнем углу */}
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