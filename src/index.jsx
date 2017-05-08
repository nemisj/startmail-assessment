import React from 'react';  
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

// global style
import './assets/reset.css';
import './index.global.sass';
import './assets/grid.global.sass';

// Components
import App from './barrels/app.jsx';

// redux
import createReduxStore from './redux/createStore.js';
import { load as loadMailboxes } from './redux/ducks/mailboxes.js';
import { load as loadMessages } from './redux/ducks/messages.js';
import { Provider } from 'react-redux';

const store = createReduxStore({});

store.dispatch(loadMailboxes());

const render = () => {
  const node = document.querySelector('body > div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    node
  );
};

render();

if (module.hot) {  
  // Renders App every time a change in code happens.
  module.hot.accept('./barrels/app.jsx', render);
}
