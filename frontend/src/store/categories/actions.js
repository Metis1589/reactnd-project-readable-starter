import * as actionTypes from './actionTypes';

export function fetchCategories(categories) {
    return {type: actionTypes.FETCH_CATEGORIES, categories};
}