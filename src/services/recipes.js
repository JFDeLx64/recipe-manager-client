import axios from 'axios';

// both front end and back end are at same address so cn leave out declaring the server
const baseUrl = '/api/recipes';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newRecipe) => {
  const request = axios.post(baseUrl, newRecipe);
  return request.then((response) => response.data);
};

const update = (id, updatedRecipe) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedRecipe);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update
};