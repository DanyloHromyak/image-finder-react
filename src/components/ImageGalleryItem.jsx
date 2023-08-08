const ImageGalleryItem = ({ image, onImageClick }) => {
  return (
    <li className="ImageGalleryItem" onClick={() => onImageClick(image)}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className="ImageGalleryItem-image"
      />
    </li>
  );
};
export default ImageGalleryItem;
