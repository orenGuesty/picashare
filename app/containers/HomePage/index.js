/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Header from '../../components/HomePage/index';
import Login from '../../components/Login/index';
import * as firebase from 'firebase';


const config = {
  apiKey: 'AIzaSyDOc48VJls4dUJ26DepEtmQw9JUssWSTw0',
  authDomain: 'picashare-7bc92.firebaseapp.com',
  databaseURL: 'https://picashare-7bc92.firebaseio.com',
  storageBucket: 'picashare-7bc92.appspot.com',
  messagingSenderId: '536716819192',
};
firebase.initializeApp(config)

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <h1>
        <Header />
        <Login />
      </h1>
    );
  }
}


