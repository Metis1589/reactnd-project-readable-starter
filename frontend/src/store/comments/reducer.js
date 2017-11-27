// import Immutable from 'seamless-immutable';
import * as actionTypes from './actionTypes';


const initialState = {
    list: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_COMMENTS:
            return {
                ...state,
                ['list'] : action.payload,
            }
        case actionTypes.FETCH_COMMENT:
            return {
                ...state,
                [action.comment.id]: action.comment,
            }
        case actionTypes.CREATE_COMMENT:
            return {
                ...state,
                [action.comment.id]: action.comment,
            }
        case actionTypes.UPDATE_COMMENT:
            return {
                ...state,
                ['list'] : state.list.map(post =>
                    (post.id === action.comment.id)
                        ? action.comment
                        : post)
            }

            return state.list.map(post =>
                (post.id === action.comment.id)
                    ? action.comment
                    : post
            )
        default:
            return state;
    }
};

