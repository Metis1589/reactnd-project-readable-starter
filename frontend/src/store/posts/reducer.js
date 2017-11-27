// import Immutable from 'seamless-immutable';
import * as actionTypes from './actionTypes';


const initialState = {
    list: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_POSTS:
            return {
                ...state,
                ['list'] : action.payload,
            }
        case actionTypes.FETCH_POST:
            return {
                ...state,
                [action.post.id]: action.post,
            }
        case actionTypes.CREATE_POST:
            let updatedState = state.list;
            updatedState.push(action.post);
            return {
                ...state,
                ['list'] : updatedState
            }
        case actionTypes.UPDATE_POST:
            return {
                ...state,
                ['list'] : state.list.map(post =>
                    (post.id === action.post.id)
                        ? action.post
                        : post)
            }
        case actionTypes.VOTE_POST:
            console.log('VOTE_POST', action);
            return {
                ...state,
                ['list'] : state.list.map(post =>
                    (post.id === action.post.id)
                        ? action.post
                        : post)
            }
        case actionTypes.DELETE_POST:
            return {
                ...state,
                ['list'] : state.list.filter((post) => {
                    return post.id !== action.post_id
                })
            }
        default:
            return state;
    }
};

