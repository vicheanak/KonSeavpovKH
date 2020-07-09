
import { combineReducers } from 'redux';
import appData from './dataReducer';
import { intlData } from './intlReducer';
import { bookDetail } from './book-detail.reducer';
import { bookChapter } from './book-chapter.reducer';
import { bookReading } from './book-reading.reducer';
import { books } from './books';
import { user } from './user';

const rootReducer = combineReducers({
    appData,
    intlData,
    bookChapter,
    bookDetail,
    bookReading,
    books,
    user
})

export default rootReducer

