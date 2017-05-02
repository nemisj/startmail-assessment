import React from 'react';  
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

// global style
import './assets/reset.css';
import './index.sass';

// Components
import App from './components/app.jsx';

const render = () => {
  const node = document.querySelector('body > div');
  ReactDOM.render(<App />, node);
};

render();

if (module.hot) {  
  // Renders App every time a change in code happens.
  module.hot.accept('./components/app.jsx', render);
}
