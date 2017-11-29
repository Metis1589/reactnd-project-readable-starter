import * as actionTypes from './actionTypes';

export function fetchComments(comments) {
    return {type: actionTypes.FETCH_COMMENTS, comments};
}

export function createComment(comment) {
    return {type: actionTypes.CREATE_COMMENT, comment};
}

export function updateComment(comment) {
    return {type: actionTypes.UPDATE_COMMENT, comment};
}

export function voteComment(comment) {
    return {type: actionTypes.VOTE_COMMENT, comment};
}

export function deleteComment(comment) {
    return {type: actionTypes.DELETE_COMMENT, comment};
}