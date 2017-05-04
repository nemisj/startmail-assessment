// import Promise from 'bluebird';
import jsonData from '../../../specs/json/messages.json';

import { getMailBox } from './mailboxes.js';

const LOAD = 'startmail/messages/LOAD';
const LOAD_SUCCESS = 'startmail/messages/SUCESS';
const LOAD_FAIL = 'startmail/messages/FAIL';

const initialState = () => ({
  mailboxes: {}
});

/**
 * Returns skeleton for mailboxItem
 */
const empty = () => ({
  loading: false,
  loaded: false,
  messages: [],
  error: null
});

export function reducer (state = initialState(), action = {}) {
  const mailboxId = action.mailboxId;
  const mailboxData = state.mailboxes[mailboxId] = empty();

  switch (action.type) {
    case LOAD:
      Object.assign(mailboxData, {
        loading: true,
        loaded: false
      });
      break;
    case LOAD_SUCCESS:
      Object.assign(mailboxData, {
        loading: false,
        loaded: true,
        messages: action.result
      });
      break
    case LOAD_FAIL:
      Object.assign(mailboxData, {
        loading: false,
        loaded: true,
        error: action.error
      });
      break;
  }

  return Object.assign({}, state);
}

export function getMailBoxItem(id, globalState) {
  return globalState.messages.mailboxes[id] || empty();
}

export function isLoaded(id, globalState) {
  return getMailBoxItem(id, globalState).loaded;
}

export function getMessagesByMailbox(id, globalState) {
  return getMailBoxItem(id, globalState);
}

export function _filterMailboxMessagses(mailboxId, messages, globalState) {
  if (!Array.isArray(messages)) { return [] }

  const mailboxData = getMailBox(mailboxId, globalState) || {};
  const mailboxMessageIds = mailboxData.messages || [];

  return messages.filter(message => mailboxMessageIds.indexOf(message.id) !== -1);
}

export function load(mailboxId) {
  return (dispatch, getState) => {
    const globalState = getState();
    dispatch({ type: LOAD, mailboxId });

    return new Promise((resolve, reject) => {
      // simulate data loading process
      setTimeout(() => {
        // find messages of mailboxk
        const messages = _filterMailboxMessagses(mailboxId, jsonData, globalState).map((item) => {
          // normalize id's so that we can do strict compare
          return Object.assign(item, {
            id: String(item.id)
          });
        });
        resolve(messages);
      }, 1000);
    })
      .then(json => dispatch({
        type: LOAD_SUCCESS,
        mailboxId,
        result: json
      }), err => dispatch({
        type: LOAD_FAIL,
        mailboxId,
        error: err
      }))
  }
}

export {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL
}
