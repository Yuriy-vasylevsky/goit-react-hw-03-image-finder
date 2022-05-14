import axios from 'axios';

function SearchPhoto(value, page) {
  return axios
    .get(
      `https://pixabay.com/api/?q=${value}&page=${page}&key=26121578-e837ffea047e9540b4143728d&image_type=photo&orientation=horizontal&per_page=15`,
    )
    .then(res => res.data.hits);
}

const apiServices = {
  SearchPhoto,
};

export default apiServices;
