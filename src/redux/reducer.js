import { combineReducers } from 'redux';

import { reducer as mailboxes } from './ducks/mailboxes.js';
import { reducer as messages } from './ducks/messages.js';

export default combineReducers({
  mailboxes,
  messages
});
