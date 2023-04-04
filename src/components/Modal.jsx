import React, { useEffect } from 'react';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import Style  from 'Styles.module.css';


const Modal = ({ imageSrc, onClose }) => {
  useEffect(() => {
    const instance = basicLightbox.create(`
      <img src="${imageSrc}" alt="">
    `);
    
    instance.show();
    
    const handleClose = (event) => {
      if (event.code === 'Escape' || event.target.classList.contains('basicLightbox')) {
        instance.close();
        onClose();
      }
    }
    
    window.addEventListener('keydown', handleClose);
    window.addEventListener('click', handleClose);
    
    return () => {
      window.removeEventListener('keydown', handleClose);
      window.removeEventListener('click', handleClose);
      instance.close();
    };
  }, [imageSrc, onClose]);
  
  return (
    <div className={Style.Overlay}>
      <div className={Style.Modal_basicLightbox}></div>
    </div>
  );
}

export default Modal;
