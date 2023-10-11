import { fetchImages } from 'services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { useEffect, useState } from 'react';

export const App = () => {
  const [query, setQuery] = useState('ukraine');
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  const modalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEscape = event => {
    if (event.key === 'Escape') {
      setIsModalOpen(false);
    }
  };

  const getLargeImage = id => {
    const clickedImage = images.find(image => image.id === id);
    console.log(clickedImage);
    setLargeImage(clickedImage.largeImageURL);
  };

  const handleSubmit = newQuery => {
    setImages(null);
    setQuery(newQuery);
    setPage(1);
  };
  const loadMore = () => {
    setPage(page + 1);
  };

  const fetchAllImages = async () => {
    try {
      setIsLoading(true);
      const fetchedImages = await fetchImages(query, page);
      if (images) {
        setImages([...images, ...fetchedImages.hits]);
      } else {
        setImages(fetchedImages.hits);
      }
      setTotalHits(fetchedImages.totalHits);
    } catch (error) {
      setError('Помилка при завантаженні зображень');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  const showImages = Array.isArray(images) && images.length;
  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <ImageGallery>
        {showImages &&
          images.map(image => (
            <ImageGalleryItem
              id={image.id}
              key={image.id}
              smallImage={image.webformatURL}
              modalToggle={modalToggle}
              giveLargeImage={getLargeImage}
            />
          ))}
      </ImageGallery>
      {images && images.length > 0 && images.length < totalHits && (
        <Button loadMore={loadMore} />
      )}
      {isModalOpen && (
        <Modal
          largeImage={largeImage}
          modalToggle={modalToggle}
          onEscape={handleEscape}
        />
      )}
    </>
  );
};
