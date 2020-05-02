import { UPDATE_LANGUAGE } from '../redux/constants'

const setLanguage = language => {
	let messages = {};
	switch (language) {
		case 'kh':
			messages = Object.assign(messages, require(`../../locales/kh.json`));
			break;
		default:
		case 'en':
			messages = Object.assign(messages, require(`../../locales/en.json`));
			break;
	}
	return messages;
};

const initialState = {
	locale: 'kh',
	messages: setLanguage('kh')
};

export const intlData = (state = initialState, action) => {
	if (action === undefined) return state;
	switch (action.type) {
		case UPDATE_LANGUAGE:
			return {
        ...state,
				locale: action.language,
				messages: setLanguage(action.language)
			};
		default:
			return state;
	}
};
