import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "mdi-icons/css/materialdesignicons.min.css";
// font roboto
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// redux


import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

import CartProvider from './contexts/CartProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store =createStore(reducers);
store.subscribe(() => {
  try {
      localStorage.setItem("cart", JSON.stringify(store.getState().cart));
      localStorage.setItem("_lang", JSON.stringify(store.getState().lang))
  } catch (e) {
      console.log(e);
  }
});

root.render(
  <Provider store={store}>
      <CartProvider>
          <App/>
      </CartProvider>
  </Provider>,
  // document.getElementById('root')
);
reportWebVitals();
