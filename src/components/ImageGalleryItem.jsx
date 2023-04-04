import React from 'react';
import Style  from 'Styles.module.css';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL, onSelectImage }) => {
  const handleImageClick = () => {
    onSelectImage(largeImageURL);
  };

  return (
    <li className={Style.ImageGallery_item}>
      <img
        className={Style.ImageGallery_image}
        src={webformatURL}
        alt={tags}
        data-large-image={largeImageURL}
        onClick={handleImageClick}
      />
    </li>
  );
};

export default ImageGalleryItem;
