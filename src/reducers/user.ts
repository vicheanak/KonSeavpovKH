
import { UPDATE_USER_DATA, LOGIN_USER_FACEBOOK_DATA_SUCCESS, CREATE_USER_BOOKMARK_DATA, CREATE_USER_BOOKMARK_DATA_SUCCESS, UPDATE_USER_BOOKMARK_DATA, UPDATE_USER_BOOKMARK_DATA_SUCCESS, FETCHING_USER_FAVORITES_DATA, FETCHING_USER_FAVORITES_DATA_SUCCESS, FETCHING_USER_FAVORITE_DATA, FETCHING_USER_FAVORITE_DATA_SUCCESS } from '../redux/constants'
const initialState = {
  favorites: [],
  favorite: {},
  isFavoriteFetching: false,
  isFavoritesFetching: false,
  error: false,
  userData: {}
}

export const user = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_DATA:
      return {
        ...state,
        userData: action.userData
      }
    case LOGIN_USER_FACEBOOK_DATA_SUCCESS:
      return {
        ...state,
        userData: action.data
      }
    case FETCHING_USER_FAVORITES_DATA:
      return {
        ...state,
        isFavoritesFetching: true
      }
    case FETCHING_USER_FAVORITES_DATA_SUCCESS:
      return {
        ...state,
        favorites: action.data,
        isFavoritesFetching: false
      }
    case FETCHING_USER_FAVORITE_DATA:
      return {
        ...state,
        isFavoriteFetching: true
      }
    case FETCHING_USER_FAVORITE_DATA_SUCCESS:
      return {
        ...state,
        favorite: action.data,
        isFavoriteFetching: false
      }
    case CREATE_USER_BOOKMARK_DATA:
      return {
        ...state,
        isFavoriteFetching: true
      }
    case CREATE_USER_BOOKMARK_DATA_SUCCESS:
      return {
        ...state,
        favorite: action.data,
        isFavoriteFetching: false
      }
    case UPDATE_USER_BOOKMARK_DATA:
      return {
        ...state,
        isFavoriteFetching: true
      }
    case UPDATE_USER_BOOKMARK_DATA_SUCCESS:
      return {
        ...state,
        favorite: action.data,
        isFavoriteFetching: false
      }
    default:
      return state
  }
}