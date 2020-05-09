import { UPDATE_BOOK_CURRENT_CHAPTER, UPDATE_BOOK_TOTOAL_CHAPTERS } from '../redux/constants'

const initialState = {
    currentChapter: 1,
    totalChapters: 1
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
        default:
            return state;
    }
};
