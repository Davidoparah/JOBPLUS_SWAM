import React from 'react';
import './modal.scss'; 

const Modal = ({ onClose, onAccept, children }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        { children }
        <div className="modal-actions">
          <button onClick={onAccept} className="btn-accept">Accept</button>
          <button onClick={onClose} className="btn-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;