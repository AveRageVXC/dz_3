import React from 'react';

interface ModalProps {
    content: React.ReactNode;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ content, onClose }) => {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {content}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
