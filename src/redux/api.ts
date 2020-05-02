import axios from 'axios';

const people = [
  { name: 'Nader', age: 36 },
  { name: 'Amanda', age: 24 },
  { name: 'Jason', age: 44 }
]

export const getPeople = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        return resolve(res.data);
      });
  })
}


export const addPeople = (params) => {
  return new Promise((resolve, reject) => {
    console.log('addPeople', params)
    axios
      .post(`https://reqres.in/api/users`, { params })
      .then(res => {
        axios.get(`https://reqres.in/api/users`)
          .then(res => {
            console.log('people', res.data);
            return resolve(res.data);
          })
      });
  })
}