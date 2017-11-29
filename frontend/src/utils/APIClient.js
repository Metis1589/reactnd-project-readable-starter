import axios from 'axios'

const api = "http://localhost:3001"
const token = 'ea8cniliakt7csva7349pj60i4'

// Generate a unique token for storing your bookshelf data on the backend server.
const headers = {
    'Accept': 'application/json',
    'Authorization': token,
    'method' : 'GET'
}

export const getCategoriesList = () =>
    axios.get(`${api}/categories`, {'headers' : headers})
        .then(function (response) {
            return response.data.categories;
        })
        .catch(function (error) {
            console.error(error);
        });

export const getPostsList = () =>
    axios.get(`${api}/posts`, {'headers' : headers})
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.error(error);
        });

export const getPost = (postId) =>
    axios.get(`${api}/posts/${postId}`, {'headers' : headers})
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.error(error);
        });

export const createPost = (post) =>
    axios.post(`${api}/posts`, post, {'headers' : headers})
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.error(error);
        });

export const updatePost = (postId, post) =>
    axios.put(`${api}/posts/${postId}`, post, {'headers' : headers})
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.error(error);
        });

export const votePost = (postId, voteOption) =>
    axios.post(`${api}/posts/${postId}`, {option: voteOption}, {'headers' : headers})
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.error(error);
        });

export const deletePost = (postId) =>
    axios.delete(`${api}/posts/${postId}`, {'headers' : headers})
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.error(error);
        });

export const getCommentsList = (postId) =>
    axios.get(`${api}/posts/${postId}/comments`, {'headers' : headers})
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.error(error);
        });

export const createComment = (comment) =>
    axios.post(`${api}/comments`, comment, {'headers' : headers})
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.error(error);
        });

export const updateComment = (commentId, comment) =>
    axios.put(`${api}/comments/${commentId}`, comment, {'headers' : headers})
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.error(error);
        });

export const deleteComment = (commentId) =>
    axios.delete(`${api}/comments/${commentId}`, {'headers' : headers})
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.error(error);
        });

export const voteComment = (commentId, voteOption) =>
    axios.post(`${api}/comments/${commentId}`, {option: voteOption}, {'headers' : headers})
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.error(error);
        });

