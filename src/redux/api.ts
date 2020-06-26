import axios from 'axios';

import { API_SOURCE } from './../app/app-environment';

const people = [
  { name: 'Nader', age: 36 },
  { name: 'Amanda', age: 24 },
  { name: 'Jason', age: 44 }
]

// const API_SOURCE = 'http://10.0.2.2:3002/api';

console.log({API_SOURCE});

export const getPeople = () => {
  return new Promise((resolve, reject) => {
    axios
      // .get(`https://jsonplaceholder.typicode.com/users`)
      .get(`${API_SOURCE}/books`)
      .then(res => {
        console.log('getPeople API ==> ', res);
        return resolve(res.data);
      }).catch((err) => {
        console.log('ERROR getPeople API ===>', err);
      });
  })
}

export const getBooksList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_SOURCE}/books`)
      .then(res => {
        console.log(res);
        return resolve(res.data);
      });
  })
}

export const getBookChapters = (bookId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_SOURCE}/books/${bookId}/chapters`)
      .then(res => {
        return resolve(res.data);
      });
  })
}

export const getFavoriteBooksList = () => {
  let params = {
    pagination: { page: 1, perPage: 5 },
    sort: { field: "title", order: "ASC" },
  }
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_SOURCE}/books`, {params})
      .then(res => {
        return resolve(res.data);
      });
  })
}

export const getBookDetail = () => {
  let params = {
    id: 12,
  }
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_SOURCE}/books`, {params})
      .then(res => {
        return resolve(res.data);
      });
  })
}

export const addPeople = (params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`https://reqres.in/api/users`, { params })
      .then(res => {
        axios.get(`https://reqres.in/api/users`)
          .then(res => {
            return resolve(res.data);
          })
      });
  })
}