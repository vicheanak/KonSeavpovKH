import axios from 'axios';

const people = [
  { name: 'Nader', age: 36 },
  { name: 'Amanda', age: 24 },
  { name: 'Jason', age: 44 }
]

const apiSource = 'http://10.0.2.2:3002/api';

export const getPeople = () => {
  return new Promise((resolve, reject) => {
    axios
      // .get(`https://jsonplaceholder.typicode.com/users`)
      .get(`${apiSource}/books`)
      .then(res => {
        console.log('getPeople API ==> ', res);
        return resolve(res.data);
      }).catch((err) => {
        console.log('ERROR getPeople API ===>', err);
      });
  })
}

export const getBooksList = () => {
  console.log('getBooksList');
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiSource}/books`)
      .then(res => {
        console.log(res);
        return resolve(res.data);
      });
  })
}

// export const getBooksList = () => {
//   return new Promise((resolve, reject) => {
//     axios
//       // .get(`${apiSource}/books`)
//       .get(`https://jsonplaceholder.typicode.com/users`)
//       .then(res => {
//         console.log('API RES', res);
//         return resolve(res.data);
//       });
//   })
// }

// export const getBooksList = () => {
//   console.log('get book list');
//   let params = {
//     pagination: { page: 1, perPage: 5 },
//     sort: { field: "title", order: "ASC" },
//   }
//   console.log('getBookList');
//   return new Promise((resolve, reject) => {
//       axios.get(`${apiSource}/books`, {params}).then((res) => {
//         return resolve(res.data);
//       }).catch((err) => {
//         reject(err);
//         console.log('err ===> ', err);
//       });
//   })
// }

export const getFavoriteBooksList = () => {
  let params = {
    pagination: { page: 1, perPage: 5 },
    sort: { field: "title", order: "ASC" },
  }
  return new Promise((resolve, reject) => {
    axios
      .get(`${apiSource}/books`, {params})
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
      .get(`${apiSource}/books`, {params})
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