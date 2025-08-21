import { useEffect } from 'react';
import css from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}

const Modal = ({ children, closeModal }: ModalProps) => {
  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [closeModal]);

  return (
    <div
      className={css.backdrop}
      onClick={onBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>{children}</div>
    </div>
  );
};

export default Modal;
