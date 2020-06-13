import { 
    UPDATE_BOOK_CURRENT_CHAPTER, 
    UPDATE_BOOK_TOTOAL_CHAPTERS,
    UPDATE_BOOK_TEXT_SIZE,
    UPDATE_BOOK_TEXT_SIZE_VISIBILITY,
    FETCHING_BOOK_CHAPTERS,
    FETCHING_BOOK_CHAPTERS_SUCCESS,
    FETCHING_BOOK_CHAPTERS_FAILURE
 } from '../redux/constants'

const initialState = {
    currentChapter: 1,
    totalChapters: 1,
    textSize: 15,
    textSizeVisibility: false,
    data: [],
    dataFetched: false,
    isFetching: false,
    error: false
};

export const bookReading = (state = initialState, action) => {
    if (action === undefined) return state;
    switch (action.type) {
        case UPDATE_BOOK_CURRENT_CHAPTER:
            return {
                ...state,
                currentChapter: action.currentChapter
            };
        case UPDATE_BOOK_TOTOAL_CHAPTERS:
            return {
                ...state,
                totalChapters: action.totalChapters
            };
        case UPDATE_BOOK_TEXT_SIZE:
            return {
                ...state,
                textSize: action.textSize
            };
        case UPDATE_BOOK_TEXT_SIZE_VISIBILITY:
            return {
                ...state,
                textSizeVisibility: action.textSizeVisibility
            };
        case FETCHING_BOOK_CHAPTERS:
            return {
                ...state,
                data: [],
                isFetching: true
            }
        case FETCHING_BOOK_CHAPTERS_SUCCESS:
            return {
                ...state,
                data: action.data,
                isFetching: false
            }
        case FETCHING_BOOK_CHAPTERS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state;
    }
};
