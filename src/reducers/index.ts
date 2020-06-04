
import { combineReducers } from 'redux';
import appData from './dataReducer';
import { intlData } from './intlReducer';
import { bookmarkedBookDetail } from './book-detail.reducer';
import { bookReading } from './book-reading.reducer';
import books from './books';

const rootReducer = combineReducers({
    appData,
    intlData,
    bookmarkedBookDetail,
    bookReading,
    books
})

export default rootReducer

