import {
    VN, EN
} from '../actions/actionType';

let defaultState = {
    value: "vi"
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case EN:
            return { value: "en" };
        case VN:
            return { value: "vi" };
        default:
            return state;
    }
}