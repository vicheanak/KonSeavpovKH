
import {
  UPDATE_PRICING_MODAL_VISIBILITY,
  GET_USER_LATEST_INVOICE_SUCCESS,
  UPDATE_USER_DATA,
  LOGIN_USER_FACEBOOK_DATA_SUCCESS,
  CREATE_USER_BOOKMARK_DATA,
  CREATE_USER_BOOKMARK_DATA_SUCCESS,
  UPDATE_USER_BOOKMARK_DATA,
  UPDATE_USER_BOOKMARK_DATA_SUCCESS,
  FETCHING_USER_FAVORITES_DATA,
  FETCHING_USER_FAVORITES_DATA_SUCCESS,
  FETCHING_USER_FAVORITE_DATA,
  FETCHING_USER_FAVORITE_DATA_SUCCESS,
  LOGIN_USER_DATA_SUCCESS,
  SET_IS_DONE_LOGIN,
  FETCHING_USER_DATA_SUCCESS
} from '../redux/constants'
const initialState = {
  favorites: [],
  favorite: {},
  isFavoriteFetching: false,
  isFavoritesFetching: false,
  error: false,
  userData: {},
  invoice: {},
  isDoneLogin: false,
  isPricingModalVisible: false
}

export const user = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRICING_MODAL_VISIBILITY:
      return {
        ...state,
        isPricingModalVisible: action.isVisible
      }
    case GET_USER_LATEST_INVOICE_SUCCESS:
      return {
        ...state,
        invoice: action.data
      }
    case UPDATE_USER_DATA:
      return {
        ...state,
        userData: action.userData
      }
    case LOGIN_USER_FACEBOOK_DATA_SUCCESS:
      return {
        ...state,
        userData: action.data,
        isDoneLogin: true
      }
    case SET_IS_DONE_LOGIN:
      return {
        ...state,
        isDoneLogin: action.isDone
      }
    case LOGIN_USER_DATA_SUCCESS:
      return {
        ...state,
        userData: action.data,
        isDoneLogin: true,
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
    case FETCHING_USER_DATA_SUCCESS:
      return {
        ...state,
        userData: action.data,
        isDoneLogin: true
      }
    default:
      return state
  }
}