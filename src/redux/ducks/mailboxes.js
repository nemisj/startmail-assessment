// import Promise from 'bluebird';
import jsonData from '../../../specs/json/mailboxes.json';

const LOAD = 'startmail/mailboxes/LOAD';
const LOAD_SUCCESS = 'startmail/mailboxes/SUCESS';
const LOAD_FAIL = 'startmail/mailboxes/FAIL';

const initialState = () => ({
  loading: false,
  loaded: false,
  data: [],
  error: null
});

export function reducer (state = initialState(), action = {}) {
  switch (action.type) {
    case LOAD:
      return Object.assign({}, state, {
        loading: true,
        loaded: false
      });
    case LOAD_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        data: action.result
      });
    case LOAD_FAIL:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        data: [],
        error: action.error
      });
  }

  return state;
}

export function isLoaded(globalState) {
  return globalState.mailboxes.loaded;
}

export function getMailBox(id, globalState) {
  let mailbox = null;
  globalState.mailboxes.data.some((m) => {
    if (m.id === id) {
      mailbox = m;
      return true;
    }
  });

  return mailbox;
}

export function load() {
  return (dispatch) => {
    dispatch({ type: LOAD });
    return new Promise((resolve) => {
      // simulate data loading process
      setTimeout(() => {
        resolve(jsonData);
      }, 2000);
    })
      .then(json => dispatch({
        type: LOAD_SUCCESS,
        result: json
      }), err => dispatch({
        type: LOAD_FAIL,
        error: err
      }))
  }
}

export {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL
}
