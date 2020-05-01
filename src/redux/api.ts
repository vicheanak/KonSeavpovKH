import axios from 'axios';

const people = [
  { name: 'Nader', age: 36 },
  { name: 'Amanda', age: 24 },
  { name: 'Jason', age: 44 }
]

export default () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        return resolve(res.data);
      });
  })
}