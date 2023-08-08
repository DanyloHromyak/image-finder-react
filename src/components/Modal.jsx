import { useEffect } from "react";

const Modal = ({ onClose, image }) => {
  const handleKeyDown = e => e.code === "Escape" && onClose();
  const handleOverlayClick = e => e.target === e.currentTarget && onClose();

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
};

export default Modal;
