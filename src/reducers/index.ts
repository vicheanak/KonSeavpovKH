
import { combineReducers } from 'redux';
import appData from './dataReducer';
import { intlData } from './intlReducer';

const rootReducer = combineReducers({
    appData,
    intlData
})

export default rootReducer

