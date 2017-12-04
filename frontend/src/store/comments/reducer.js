import * as actionTypes from './actionTypes';

const initialState = {
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_COMMENTS:
            return {
                ...state,
                [action.post_id] : action.payload,
            }
        case actionTypes.CREATE_COMMENT:
            let updatedState = state[action.comment.parentId];
            if(typeof(updatedState) == 'undefined'){
                updatedState = [];
            }
            updatedState.push(action.comment);
            return {
                ...state,
                [action.comment.parentId] : updatedState
            }
        case actionTypes.UPDATE_COMMENT:
            return {
                ...state,
                [action.comment.parentId] : state[action.comment.parentId].map(comment =>
                    (comment.id === action.comment.id)
                        ? action.comment
                        : comment)
            }
        case actionTypes.VOTE_COMMENT:
            return {
                ...state,
                [action.comment.parentId] : state[action.comment.parentId].map(comment =>
                    (comment.id === action.comment.id)
                        ? action.comment
                        : comment)
            }
        case actionTypes.DELETE_COMMENT:
            return {
                ...state,
                [action.comment.parentId] : state[action.comment.parentId].filter((comment) => {
                    return comment.id !== action.comment.id
                })
            }
        default:
            return state;
    }
};

