
import { combineReducers } from 'redux';
import appData from './dataReducer';
import { intlData } from './intlReducer';
import { bookDetail } from './book-detail.reducer';
import { bookReading } from './book-reading.reducer';
import books from './books';

const rootReducer = combineReducers({
    appData,
    intlData,
    bookDetail,
    bookReading,
    books
})

export default rootReducer

