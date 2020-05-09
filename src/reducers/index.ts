
import { combineReducers } from 'redux';
import appData from './dataReducer';
import { intlData } from './intlReducer';
import { bookmarkedBookDetail } from './book-detail.reducer';

const rootReducer = combineReducers({
    appData,
    intlData,
    bookmarkedBookDetail
})

export default rootReducer

