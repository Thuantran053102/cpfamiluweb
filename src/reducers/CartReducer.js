import {
    ADDTOCART, REMOVECART
} from '../actions/actionType';

let defaultState = { items: [] };

export default (state = defaultState, action) => {
    switch (action.type) {
        case ADDTOCART:
            return { items: action.data };
        case REMOVECART:
            return { items: action.data };
        default:
            return state;
    }
}