import * as actionTypes from './actionTypes';

export function fetchPosts(posts) {
    return {type: actionTypes.FETCH_POSTS, posts};
}

export function fetchPost(post) {
    return {type: actionTypes.FETCH_POST, post};
}

export function createPost(post) {
    return {type: actionTypes.CREATE_POST, post};
}

export function updatePost(post) {
    return {type: actionTypes.UPDATE_POST, post};
}

export function votePost(post) {
    return {type: actionTypes.VOTE_POST, post};
}

export function deletePost(post_id) {
    return {type: actionTypes.DELETE_POST, post_id};
}