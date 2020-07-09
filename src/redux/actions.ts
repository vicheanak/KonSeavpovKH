import {
  UPDATE_BOOK_CURRENT_CHAPTER,
  UPDATE_BOOK_TOTOAL_CHAPTERS,
  UPDATE_BOOKMARK_BOOK_DETAIL,
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE,
  UPDATE_LANGUAGE,
  POST_USER,
  POST_USER_SUCCESS,
  POST_USER_FAILURE,
  UPDATE_BOOK_TEXT_SIZE,
  UPDATE_BOOK_TEXT_SIZE_VISIBILITY,
  GET_BOOKS_LIST,
  GET_FAVORITE_BOOKS_LIST,
  GET_BOOK_DETAIL,
  FETCHING_BOOKS_DATA,
  FETCHING_BOOKS_DATA_SUCCESS,
  FETCHING_BOOKS_LIST,
  FETCHING_BOOKS_LIST_SUCCESS,
  FETCHING_BOOKS_LIST_FAILURE,
  FETCHING_BOOK_DETAIL_FAILURE,
  FETCHING_BOOK_DETAIL_SUCCESS,
  FETCHING_BOOK_DETAIL,
  FETCHING_FAVORITE_BOOKS_LIST,
  FETCHING_FAVORITE_BOOKS_LIST_SUCCESS,
  FETCHING_FAVORITE_BOOKS_LIST_FAILURE,
  FETCHING_BOOK_CHAPTERS,
  FETCHING_BOOK_CHAPTERS_SUCCESS,
  FETCHING_BOOK_CHAPTERS_FAILURE,
  UPDATE_BOOK_DETAIL,
  UPDATE_PLAYER_VISIBILITY,
  UPDATE_PLAYER_NAVIGATION,
  FETCHING_USER_FAVORITES_DATA,
  FETCHING_USER_FAVORITES_DATA_SUCCESS,
  FETCHING_USER_FAVORITE_DATA,
  FETCHING_USER_FAVORITE_DATA_SUCCESS
} from './constants'
import { getPeople, addPeople, getBooksList, getUserFavorites, getUserFavorite, getBookDetail, getBookChapters } from './api'

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

export function getBooksData() {
  return {
    type: FETCHING_BOOKS_DATA
  }
}

export function getBooksDataSuccess(data) {
  return {
    type: FETCHING_BOOKS_DATA_SUCCESS,
    data,
  }
}

export function getUserFavoritesData() {
  return {
    type: FETCHING_USER_FAVORITES_DATA
  }
}

export function getUserFavoritesDataSuccess(data) {
  return {
    type: FETCHING_USER_FAVORITES_DATA_SUCCESS,
    data,
  }
}

export function getUserFavoriteData() {
  return {
    type: FETCHING_USER_FAVORITE_DATA
  }
}

export function getUserFavoriteDataSuccess(data) {
  return {
    type: FETCHING_USER_FAVORITE_DATA_SUCCESS,
    data,
  }
}

export const getBookChaptersData = () => {
  return {
    type: FETCHING_BOOK_CHAPTERS
  }
}

export function getBookChaptersSuccess(data) {
  return {
    type: FETCHING_BOOK_CHAPTERS_SUCCESS,
    data,
  }
}

export function getBooksListData() {
  return {
    type: FETCHING_BOOKS_LIST
  }
}

export function getBooksListSuccess(data) {
  return {
    type: FETCHING_BOOKS_LIST_SUCCESS,
    data,
  }
}

export function getBooksListFailure() {
  return {
    type: FETCHING_BOOKS_LIST_FAILURE
  }
}

export function getFavoriteBooksListData() {
  return {
    type: FETCHING_FAVORITE_BOOKS_LIST
  }
}

export function getFavoriteBooksListSuccess(data) {
  return {
    type: FETCHING_FAVORITE_BOOKS_LIST_SUCCESS,
    data,
  }
}

export function getFavoriteBooksListFailure() {
  return {
    type: FETCHING_FAVORITE_BOOKS_LIST_FAILURE
  }
}

export function getBookDetailData() {
  return {
    type: FETCHING_BOOK_DETAIL
  }
}

export function getBookDetailSuccess(data) {
  return {
    type: FETCHING_BOOK_DETAIL_SUCCESS,
    data,
  }
}

export function getBookDetailFailure() {
  return {
    type: FETCHING_BOOK_DETAIL_FAILURE
  }
}

export function postUser() {
  return {
    type: POST_USER
  }
}

export function postUserSuccess(data) {
  return {
    type: POST_USER_SUCCESS,
    data,
  }
}


export function postUserFailure() {
  return {
    type: POST_USER_FAILURE,
  }
}

export function fetchBooksData() {
  return (dispatch) => {
    dispatch(getBooksData())
    getBooksList()
      .then((data) => {
        dispatch(getBooksDataSuccess(data))
      })
      .catch((err) => console.log('err:', err))
  }
}

export function fetchUserFavorites() {
  return (dispatch) => {
    dispatch(getUserFavoritesData())
    getUserFavorites()
      .then((data) => {
        dispatch(getUserFavoritesDataSuccess(data))
      })
      .catch((err) => console.log('err:', err))
  }
}

export function fetchUserFavorite(bookId) {
  return (dispatch) => {
    dispatch(getUserFavoriteData())
    getUserFavorite(bookId)
      .then((data) => {
        dispatch(getUserFavoriteDataSuccess(data))
      })
      .catch((err) => console.log('err:', err))
  }
}

export function fetchBooksChapters(bookId) {
  return (dispatch) => {
    dispatch(getBookChaptersData());
    getBookChapters(bookId)
      .then((data) => {
        dispatch(getBookChaptersSuccess(data))
      })
      .catch((err) => console.log('err fetchBooksChapters ==> ', err))
  };
};

export function fetchData() {
  return (dispatch) => {
    dispatch(getData())
    getPeople()
      .then((data) => {
        dispatch(getDataSuccess(data))
      })
      .catch((err) => console.log('err:', err))
  }
}

export function addUser(params) {
  return (dispatch) => {
    dispatch(postUser());
    addPeople(params)
      .then((data) => {
        dispatch(postUserSuccess(data))
      })
      .catch((err) => dispatch(postUserFailure()))
  };
};

export function updateBookDetail(book) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_BOOK_DETAIL,
      book
    })
  }
}
export function updateLanguage(language) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_LANGUAGE,
      language
    });
  };
};

export const updateBookmarkBookDetail = (bookmarked) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_BOOKMARK_BOOK_DETAIL,
      bookmarked
    });
  };
}

export const updateBookCurrentChapter = (currentChapter) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_BOOK_CURRENT_CHAPTER,
      currentChapter
    })
  }
}

export const updateBookTotalChapters = (totalChapters) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_BOOK_TOTOAL_CHAPTERS,
      totalChapters
    })
  }
}

export const updateBookTextSize = (textSize) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_BOOK_TEXT_SIZE,
      textSize
    })
  }
}

export const updateBookTextSizeVisibility = (textSizeVisibility) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_BOOK_TEXT_SIZE_VISIBILITY,
      textSizeVisibility
    })
  }
}

export const updatePlayerVisibility = (playerVisibility) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_PLAYER_VISIBILITY,
      playerVisibility
    })
  }
}

export const updatePlayerNavigation = (playerNavigation) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_PLAYER_NAVIGATION,
      playerNavigation
    })
  }
}