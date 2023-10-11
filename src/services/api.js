import axios from 'axios';

export const fetchImages = async (query, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=39626229-f4e5e1247236febb01e4fcd41&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
