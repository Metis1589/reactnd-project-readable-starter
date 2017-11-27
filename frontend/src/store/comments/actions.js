import * as actionTypes from './actionTypes';

export function fetchComments(Comments) {
    return {type: actionTypes.FETCH_COMMENT, comments};
}

export function fetchComment(comment) {
    return {type: actionTypes.FETCH_COMMENT, comment};
}

export function createComment(comment) {
    return {type: actionTypes.CREATE_COMMENT, comment};
}

export function updateComment(comment) {
    return {type: actionTypes.UPDATE_COMMENT, comment};
}