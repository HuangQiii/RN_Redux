'use strict';

import { combineReducers } from 'redux';
import Menu from './MenuReducer';
import SelectProjects from './SelectProjectsReducer';

const rootReducer = combineReducers({
    Menu: Menu,
    SelectProjects: SelectProjects,
});

export default rootReducer;