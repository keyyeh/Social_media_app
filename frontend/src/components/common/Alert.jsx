import React from 'react';

const Alert = ({ message, type = 'danger', onClose }) => {
  if (!message) {
    return null;
  }

  const title = type === 'success' ? 'Thành công' : 'Lỗi!';

  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show`}
      role="alert"
      style={{
        position: 'fixed',
        top: '90%',
        left: '14%',
        transform: 'translateX(-50%)',
        zIndex: 999999,
        minWidth: '300px',
        maxWidth: '500px',
      }}
    >
      <span style={{fontSize: '12px'}}><strong>{title}</strong> {message}</span>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default Alert; 