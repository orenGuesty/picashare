/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = () => (state) => state.get('home');
const selectUser = () => (state) => state.get('user');

const selectUsername = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('username')
);

export {
  selectHome,
  selectUsername,
  selectUser,
};
