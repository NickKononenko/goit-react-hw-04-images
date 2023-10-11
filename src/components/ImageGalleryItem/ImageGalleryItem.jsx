import css from './ImageGalleryItem.module.css';
import { nanoid } from 'nanoid';

const ImageGalleryItem = ({ id, smallImage, modalToggle, giveLargeImage }) => {
  return (
    <li className={css.ImageGalleryItem} key={nanoid(5)}>
      <img
        className={css.ImageGalleryItemImage}
        src={smallImage}
        alt=""
        id={id}
        onClick={() => {
          modalToggle();
          giveLargeImage(id);
        }}
      />
    </li>
  );
};

export default ImageGalleryItem;
