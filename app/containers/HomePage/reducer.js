/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  CHANGE_USERNAME,
  ADD_USER,
} from './constants';
import { Record, Map, fromJS } from 'immutable';

// The initial state of the App
const immutableRecord = Record;
const immutableMap = Map;
const initialState = immutableRecord({
  username: '',
  user: immutableMap(),
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      // Delete prefixed '@' from the github username
      return state
        .set('username', action.name.replace(/@/gi, ''));
    case ADD_USER:
      return state.set('user', fromJS(action.data));
    default:
      return state;
  }
}

export default homeReducer;
