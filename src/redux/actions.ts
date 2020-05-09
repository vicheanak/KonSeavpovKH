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
  UPDATE_BOOK_TEXT_SIZE_VISIBILITY } from './constants'
import { getPeople, addPeople } from './api'

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

export function updateLanguage(language) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_LANGUAGE,
      language
    });
  };
};

export const updateBookmarkBookDetail = (bookmarked) => {
  console.log('Actions', bookmarked);
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