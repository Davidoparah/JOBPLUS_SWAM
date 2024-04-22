import React, { useState } from "react";
import Modal from '../components/modal/modal';

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const CustomModal = ({ children, onSuccess }) => {
    const handleSuccuess = () => {
      closeModal();
      onSuccess?.(); // if onSuccess is a function, call it
    };

    if(!isModalOpen) return null;

    return (
      <Modal
        onClose={closeModal}
        onAccept={handleSuccuess}
      >
        {children}
      </Modal>
    );
  };

  return { CustomModal, setIsModalOpen}
};