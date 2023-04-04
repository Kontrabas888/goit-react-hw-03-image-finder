import React, { useState } from 'react';
import Modal from './Modal';
import ImageGalleryItem from './ImageGalleryItem';
import Style  from 'Styles.module.css';

const ImageGallery = ({ results }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectImage = (largeImageURL) => {
    setSelectedImage(largeImageURL);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={Style.ImageGallery}>
      <ul className={Style.ImageGallery_list}>
        {results.map((result, index) => (
          <ImageGalleryItem
            key={index}
            webformatURL={result.webformatURL}
            tags={result.tags}
            largeImageURL={result.largeImageURL}
            onSelectImage={handleSelectImage}
          />
        ))}
      </ul>
      {selectedImage && <Modal imageSrc={selectedImage} onClose={handleCloseModal} />}
    </div>
  );
};

export default ImageGallery;
