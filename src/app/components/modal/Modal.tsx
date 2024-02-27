// src/app/components/modal/Modal.tsx
"use client";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <button className=" " onClick={onClose}>
        <img
          src="/cancleee.svg"
          alt="Delete Icon"
          className="h-16 w-16 hover:bg-red-700 hover:rounded-full"
        />
      </button>
      <div className="modal-content">
        {children}
        <div className="modal-actions"></div>
      </div>
      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
          width: 80%; /* Increased width */
          height: 90%; /* Increased height */
          max-width: 1000px; /* Adjusted maximum width */
          max-height: 800px; /* Adjusted maximum height */
          overflow-y: auto;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
        }

        .cancel-button {
          background-color: #ff5f57; /* Red color for cancel button */
          color: white;
          border: none;
          padding: 10px 20px;
          margin: 0 10px;
          border-radius: 5px;
          cursor: pointer;
        }

        .cancel-button:hover {
          background-color: #ff1e00; /* Darker shade for hover state */
        }
      `}</style>
    </div>
  );
};

export default Modal;
