'use strict';
import * as types from '../constants/MenuTypes';

const PRE_PRO = ['A', 'B', 'C', 'D', 'E', 'F'];

export function getProjects() {
    return dispatch => {
        dispatch(getProjectsIng());
        setTimeout(() => {
            dispatch(getProjectsSuccess(PRE_PRO));
        }, 2000);
        // dispatch(requestPosts());
        // return fetch(`url`)
        //     .then(response => response.json())
        //     .then(json => dispatch(receievePosts(josn)))
    }
}

function getProjectsIng() {
    return {
        type: types.GET_PROJECTS_ING
    }
}

function getProjectsSuccess(projects) {
    return {
        type: types.GET_PROJECTS_Success,
        projects: projects
    }
}