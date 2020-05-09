
import { combineReducers } from 'redux';
import appData from './dataReducer';
import { intlData } from './intlReducer';
import { bookmarkedBookDetail } from './book-detail.reducer';
import { bookReading } from './book-reading.reducer';

const rootReducer = combineReducers({
    appData,
    intlData,
    bookmarkedBookDetail,
    bookReading
})

export default rootReducer

