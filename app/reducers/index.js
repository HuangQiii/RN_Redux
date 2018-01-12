'use strict';

import { combineReducers } from 'redux';
import Menu from './MenuReducer';

const rootReducer = combineReducers({
    Menu: Menu,
});

export default rootReducer;