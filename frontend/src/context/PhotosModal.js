import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './PhotosModal.css';

const PhotoModalContext = React.createContext();

export function PhotoModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <PhotoModalContext.Provider value={value}>
        {children}
      </PhotoModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function PhotosModal({ onClose, children }) {
  const photoModalNode = useContext(PhotoModalContext);
  if (!photoModalNode) return null;

  return ReactDOM.createPortal(
    <div id="photo-modal">
      <div id="photo-modal-background" onClick={onClose} />
      <div id="photo-modal-content">
        {children}
      </div>
    </div>,
    photoModalNode
  );
}
