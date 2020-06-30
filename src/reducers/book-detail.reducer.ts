import {  UPDATE_BOOK_DETAIL } from '../redux/constants'

const initialState = {
	book: {},
};

export const bookDetail = (state = initialState, action) => {
	if (action === undefined) return state;
	switch (action.type) {
		case UPDATE_BOOK_DETAIL:
			return {
				...state,
				book: action.book
			};
		default:
			return state;
	}
};
