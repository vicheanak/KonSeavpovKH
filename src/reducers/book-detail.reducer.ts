import { UPDATE_BOOK_CURRENT_CHAPTER, FETCHING_BOOK_CHAPTERS, FETCHING_BOOK_CHAPTERS_SUCCESS, FETCHING_BOOK_CHAPTERS_FAILURE, UPDATE_BOOKMARK_BOOK_DETAIL, UPDATE_BOOK_DETAIL } from '../redux/constants'

const initialState = {
	bookmarked: false,
	book: {},
	chapters: [],
	isFetchingChapters: true,
	error: false,
	currentChapter: {
        chapterNumber: 1
    }
};

export const bookDetail = (state = initialState, action) => {
	if (action === undefined) return state;
	switch (action.type) {
        case UPDATE_BOOK_CURRENT_CHAPTER:
            return {
                ...state,
                currentChapter: action.currentChapter
            };
		case UPDATE_BOOKMARK_BOOK_DETAIL:
			return {
				...state,
				bookmarked: action.bookmarked
			};
		case UPDATE_BOOK_DETAIL:
			return {
				...state,
				book: action.book
			};
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
                error: true
            }
		default:
			return state;
	}
};
