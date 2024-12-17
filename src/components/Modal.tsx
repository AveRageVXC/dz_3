import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface ModalProps {
    content: React.ReactNode;
    onClose: () => void;
}

const CustomModal: React.FC<ModalProps> = ({ content, onClose }) => {
    return (
        <Dialog
            open={true}
            onClose={onClose}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
        >
            <DialogTitle id="dialog-title" sx={{ backgroundColor: 'white', color: 'black' }}>Details</DialogTitle>
            <DialogContent dividers sx={{ backgroundColor: 'white', color: 'black' }}>
                {content}
            </DialogContent>
            <DialogActions sx={{ backgroundColor: 'white' }}>
                <Button onClick={onClose} sx={{ color: 'black' }}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomModal;