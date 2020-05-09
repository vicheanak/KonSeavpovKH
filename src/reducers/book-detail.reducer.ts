import { UPDATE_BOOKMARK_BOOK_DETAIL } from '../redux/constants'

const initialState = {
	bookmarked: false
};

export const bookmarkedBookDetail = (state = initialState, action) => {
	if (action === undefined) return state;
	switch (action.type) {
		case UPDATE_BOOKMARK_BOOK_DETAIL:
			return {
        ...state,
				bookmarked: action.bookmarked
			};
		default:
			return state;
	}
};
