import { combineReducers } from 'redux';
import CartReducer from './CartReducer';
import LangReducer from './LangReducer';

const reducer = combineReducers({
    cart: CartReducer,
    lang: LangReducer
})
export default reducer;
