import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from './constants'
import getPeople from './api'

export function getData() {
  return {
    type: FETCHING_DATA
  }
}

export function getDataSuccess(data) {
  return {
    type: FETCHING_DATA_SUCCESS,
    data,
  }
}

export function getDataFailure() {
  return {
    type: FETCHING_DATA_FAILURE
  }
}

export function fetchData() {
  console.log('fetch in redux');
  return (dispatch) => {
    dispatch(getData())
    getPeople()
      .then((data) => {
          console.log('data');
          console.log(data);
        dispatch(getDataSuccess(data))
      })
      .catch((err) => console.log('err:', err))
  }
}