import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'

export default function createReduxStore(initialState) {

  const composedMiddelwares = applyMiddleware(thunkMiddleware);

  const reducer = require('./reducer.js').default;
  const store = createStore(reducer, initialState, composedMiddelwares);

  if (module.hot) {
    module.hot.accept('./reducer.js', () => {
      store.replaceReducer(require('./reducer.js').default);
    });
  }

  return store;
}
