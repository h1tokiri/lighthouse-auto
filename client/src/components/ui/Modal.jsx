import React from "react";
export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        {title && <h3 className="font-bold text-lg">{title}</h3>}
        <div className="py-4">{children}</div>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
