// import Immutable from 'seamless-immutable';
import * as actionTypes from './actionTypes';

const initialState = {
    list: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CATEGORIES:
            const categories  = action.payload
            return {
                ...state,
                ['list']: categories,
            }
        default:
            return state;
    }
};