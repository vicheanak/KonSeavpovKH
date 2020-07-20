import axios from 'axios';

import { API_SOURCE } from './../app/app-environment';

const people = [
  { name: 'Nader', age: 36 },
  { name: 'Amanda', age: 24 },
  { name: 'Jason', age: 44 }
]

// const API_SOURCE = 'http://10.0.2.2:3002/api';


export const getPeople = () => {
  return new Promise((resolve, reject) => {
    axios
      // .get(`https://jsonplaceholder.typicode.com/users`)
      .get(`${API_SOURCE}/books`)
      .then(res => {
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
        return resolve(res.data);
      });
  })
}

export const getBookChapters = (bookUuid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_SOURCE}/books/${bookUuid}/chapters`)
      .then(res => {
        return resolve(res.data);
      }).catch((error) => {
        console.log('erorr ', error);
        return resolve(error);
      });
  })
}

export const getUserFavorites = () => {
  let params = {
    pagination: { page: 1, perPage: 100 },
    // sort: { field: "title", order: "ASC" },
  }
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_SOURCE}/users/1/favorites`, {params})
      .then(res => {
        return resolve(res.data);
      }).catch((error) => {
        console.log('erorr ', error);
        return resolve(error);
      });
  })
}

export const getUserFavorite = (params) => {
  const { bookUuid, userUuid } = params;
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_SOURCE}/users/${userUuid}/favorites/${bookUuid}`)
      .then(res => {
        let result;
        if (res.data.books.length){
          result = res.data.books[0].favorite; 
        }
        return resolve(result);
      }).catch((error) => {
        console.error('error user favorite ==> ', error);
        return resolve(error);
      });
  })
}

export const createBookmark = (params) => {
  let bookUuid = params.bookUuid;
  let userUuid = params.userUuid;
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_SOURCE}/users/${userUuid}/favorites/${bookUuid}`, params)
      .then(res => {
        return resolve(res.data);
      }).catch((error) => {
        console.error(error);
        return resolve(error);
      });
  })
}

export const updateBookmark = (params) => {
  let bookUuid = params.bookUuid;
  let userUuid = params.userUuid;
  return new Promise((resolve, reject) => {
    axios
      .put(`${API_SOURCE}/users/${userUuid}/favorites/${bookUuid}`, params)
      .then(res => {
        return resolve(res.data);
      }).catch((error) => {
        console.error(error);
        return resolve(error);
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
      }).catch((error) => {
        console.log('erorr ', error);
        return resolve(error);
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
          }).catch((error) => {
            console.log('erorr ', error);
            return resolve(error);
          });
      }).catch((error) => {
        console.log('erorr ', error);
        return resolve(error);
      });
  })
}