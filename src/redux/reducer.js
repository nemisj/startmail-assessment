import { combineReducers } from 'redux';

import { reducer as mailboxes } from './ducks/mailboxes.js';

export default combineReducers({
  mailboxes
});
