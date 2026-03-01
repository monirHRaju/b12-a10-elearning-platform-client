import React from 'react';

const ConfirmModal = ({ open, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', variant = 'primary' }) => {
  if (!open) return null;

  const confirmClass = variant === 'error' ? 'btn btn-error text-white' : 'btn btn-primary text-white';

  return (
    <dialog className="modal modal-open" open={open}>
      <div className="modal-box">
        <h3 className="font-bold text-lg text-accent">{title}</h3>
        <p className="py-4 text-base-content/80">{message}</p>
        <div className="modal-action">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            {cancelText}
          </button>
          <button
            type="button"
            className={confirmClass}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button type="button">close</button>
      </form>
    </dialog>
  );
};

export default ConfirmModal;
