export const ImageGalleryItem = ({ img, alt }) => {
  return (
    <li className="ImageGalleryItem">
      <img className="ImageGalleryItem-image" src={img} alt={alt} />
    </li>
  );
};
