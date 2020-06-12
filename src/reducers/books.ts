import { FETCHING_BOOKS_DATA, FETCHING_BOOKS_DATA_SUCCESS, FETCHING_DATA_FAILURE } from '../redux/constants'
const initialState = {
  data: [],
  dataFetched: false,
  isFetching: false,
  error: false
}

export default function books (state = initialState, action) {
  switch (action.type) {
    case FETCHING_BOOKS_DATA:
      return {
        ...state,
        data: [],
        isFetching: true
      }
    case FETCHING_BOOKS_DATA_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false
      }
    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}