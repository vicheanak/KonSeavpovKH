
import { UPDATE_BOOK_CURRENT_CHAPTER, FETCHING_BOOK_CHAPTERS, FETCHING_BOOK_CHAPTERS_SUCCESS, FETCHING_BOOK_CHAPTERS_FAILURE, UPDATE_PLAYER_VISIBILITY, UPDATE_PLAYER_NAVIGATION } from '../redux/constants'

const initialState = {
	chapters: [],
	isFetchingChapters: true,
    currentChapter: {},
    book: {},
    playerVisibility: false,
    playerNavigation: ''
};

export const bookChapter = (state = initialState, action) => {
	if (action === undefined) return state;
	switch (action.type) {
        case FETCHING_BOOK_CHAPTERS:
            return {
                ...state,
                chapters: [],
                isFetchingChapters: true
            }
        case FETCHING_BOOK_CHAPTERS_SUCCESS:
            return {
                ...state,
                chapters: action.data,
                isFetchingChapters: false
            }
        case FETCHING_BOOK_CHAPTERS_FAILURE:
            return {
                ...state,
                isFetchingChapters: false,
                chapters: action.data
            }
        case UPDATE_BOOK_CURRENT_CHAPTER:
            return {
                ...state,
                currentChapter: action.currentChapter,
                book: action.book
            };
        case UPDATE_PLAYER_VISIBILITY: 
            return {
                ...state,
                playerVisibility: action.playerVisibility
            }
        case UPDATE_PLAYER_NAVIGATION: 
            return {
                ...state,
                playerNavigation: action.playerNavigation
            }
		default:
			return state;
	}
};
