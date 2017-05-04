// import Promise from 'bluebird';
import jsonData from '../../../specs/json/messages.json';

import { getMailBox } from './mailboxes.js';

const LOAD = 'startmail/messages/LOAD';
const LOAD_SUCCESS = 'startmail/messages/SUCESS';
const LOAD_FAIL = 'startmail/messages/FAIL';

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
      break;
    case LOAD_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        data: action.result
      });
      break
    case LOAD_FAIL:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        data: [],
        error: action.error
      });
      break;
  }

  return state;
}

export function isLoaded(state) {
  return !!state.messages.loaded;
}

export function getMessagesByMailbox(id, state) {
  if (!isLoaded(state)) {
    return [];
  }

  const mailBox = getMailBox(id, state);
  if (mailBox) {
    const ids = mailBox.messages;
    const result = state.messages.data.filter(message => ids.indexOf(message.id) !== -1);
    return result;
  }

  return [];
}

export function load() {
  return (dispatch) => {
    dispatch({ type: LOAD });
    return new Promise((resolve, reject) => {
      // simulate data loading process
      setTimeout(() => {
        resolve(jsonData);
      }, 1000);
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
