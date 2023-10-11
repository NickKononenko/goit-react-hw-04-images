import css from './Modal.module.css';
import { useEffect } from 'react';

const Modal = ({ onEscape, modalToggle, largeImage }) => {
  useEffect(() => {
    window.addEventListener('keydown', onEscape);
    return () => {
      window.removeEventListener('keydown', onEscape);
    };
  }, []);

  return (
    <div className={css.Overlay} onClick={modalToggle}>
      <div className={css.Modal}>
        <img src={largeImage} alt="" />
      </div>
    </div>
  );
};

export default Modal;
