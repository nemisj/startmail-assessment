import React from 'react';  
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

// Components
import App from './components/app.jsx';

window.render = (selector) => {
  if (selector) {
    // remember the container
    render.selector = selector;
  }

  ReactDOM.render(
    <App />, 
    document.querySelector(render.selector)
  );
}

if (module.hot) {  
  // Renders App every time a change in code happens.
  module.hot.accept('./components/app.jsx', () => render());
}
