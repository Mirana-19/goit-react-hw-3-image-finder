export const ImageGalleryItem = ({ img, alt, onImgClick, largeImageURL }) => {
  return (
    <li className="ImageGalleryItem" onClick={() => onImgClick(largeImageURL)}>
      <img className="ImageGalleryItem-image" src={img} alt={alt} />
    </li>
  );
};
