import React from 'react';
import ReactDOM from 'react-dom';
import { Box, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CustomModalProps {
    content: React.ReactNode;
    onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ content, onClose }) => {
    return ReactDOM.createPortal(
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1300
            }}
            onClick={onClose}
        >
            <Paper
                onClick={(e) => e.stopPropagation()}
                sx={{ position: 'relative', padding: '20px', maxWidth: '500px', width: '100%' }}
            >
                <IconButton
                    sx={{ position: 'absolute', top: 5, right: 5 }}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
                {content}
            </Paper>
        </Box>,
        document.getElementById('modal-root') as HTMLElement // убедитесь, что в index.html есть элемент с id="modal-root"
    );
};

export default CustomModal;