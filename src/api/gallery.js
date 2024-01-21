import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

axios.defaults.params = {
  key: '27366068-7f092b690db13a9a2c4fde80b',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: '12',
};

export async function getImages(query, page) {
  const response = await axios.get('', {
    params: {
      q: query,
      page,
    },
  });

  return response.data;
}
