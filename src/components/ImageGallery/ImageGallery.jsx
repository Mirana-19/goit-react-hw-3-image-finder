import { ImageGalleryItem } from 'components';
import React from 'react';

export const ImageGallery = ({ images, onImgClick }) => {
  return (
    <ul className="ImageGallery">
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          img={webformatURL}
          alt={tags}
          onImgClick={onImgClick}
          largeImageURL={largeImageURL}
        />
      ))}
    </ul>
  );
};
