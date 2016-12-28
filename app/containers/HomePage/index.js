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

import { addUser } from './actions';
import { selectUser } from './selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';




const config = {
  apiKey: 'AIzaSyDOc48VJls4dUJ26DepEtmQw9JUssWSTw0',
  authDomain: 'picashare-7bc92.firebaseapp.com',
  databaseURL: 'https://picashare-7bc92.firebaseio.com',
  storageBucket: 'picashare-7bc92.appspot.com',
  messagingSenderId: '536716819192',
};
firebase.initializeApp(config);

export class HomePage extends React.PureComponent {
  render() {
    return (
      <h1>
        <Header />
        <Login addUser = {this.props.addUser} selectUser = {this.props.user} />
      </h1>
    );
  }
}

HomePage.propTypes = {
  addUser: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    addUser: (userData) => dispatch(addUser(userData)),
  };
}

const mapStateToProps = createStructuredSelector({
  user: selectUser(),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
