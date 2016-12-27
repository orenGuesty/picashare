/**
 * Created by oren on 15/12/2016.
 */
import React from 'react';
import { Link } from 'react-router';

import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import * as firebase from 'firebase';
import InstagramLogin from 'react-instagram-login';
import ReactPlayer from 'react-player';
import cookie from 'react-cookie';


const config = {
  apiKey: 'AIzaSyDOc48VJls4dUJ26DepEtmQw9JUssWSTw0',
  authDomain: 'picashare-7bc92.firebaseapp.com',
  databaseURL: 'https://picashare-7bc92.firebaseio.com',
  storageBucket: 'picashare-7bc92.appspot.com',
  messagingSenderId: '536716819192',
};
firebase.initializeApp(config);

const twitterProvider = new firebase.auth.TwitterAuthProvider();
const fbProvider = new firebase.auth.FacebookAuthProvider();


class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      user: cookie.load('user') || cookie.load('twitterUser') || cookie.load('facebookUser'),
      token: cookie.load('token') || cookie.load('twitterToken') || cookie.load('facebookToken'),
      providers: [],
      isUserLoggedIn: false,
    };
    this.instaClientId = '0be105da5eec4aaa8e304c7b25f2dd0e';
    this.UriRedirect = 'localhost:3000/';
  }


  componentWillUpdate(nextProps, nextState) {
    if (nextState.user !== this.state.user) {
      console.log(11, nextState.user);
      const instagramUrl = `http://${this.UriRedirect}#access_token=${nextState.user}`;
      axios.get(instagramUrl)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  snAuth = (provider) => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        const token = result.credential.accessToken;
/*
        const secret = result.credential.secret;
*/
        const user = result.user;
        const providerId = user.providerData[0].providerId;
        switch (providerId) {
          case 'twitter.com':
            cookie.save('twitterUser', user, { path: '/' });
            cookie.save('twitterToken', token, { path: '/' });
            console.log(`Twitter user details are : ${JSON.stringify(cookie.load('twitterUser'))}`);
            return;
          case 'facebook.com':
            cookie.save('facebookUser', user, { path: '/' });
            cookie.save('facebookToken', token, { path: '/' });
            console.log(`Facebook user details are : ${JSON.stringify(cookie.load('facebookUser'))}`);
            return;
          default:
            cookie.save('user', user, { path: '/' });
            cookie.save('token', token, { path: '/' });
            console.log(`user details are : ${JSON.stringify(cookie.load('user'))}`);
            return;
        }
      }).catch((error) => {
        const errorCode = error.code;
/*
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
*/
        console.log(`error code : ${errorCode}`);
      });
  }


  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" playing />

        { false && <InstagramLogin
          clientId={this.instaClientId}
          onSuccess={(response) => { this.setState({ user: response }); }}
          onFailure={(response) => { this.setState({ user: response }); }}
        >
          <FontAwesome
            name="instagram"
          />
          <span> Login with Instagram</span>
        </InstagramLogin>}
        <Link to="/categories">
          <button onClick={() => this.snAuth(fbProvider)}>
            <img src="https://firebasestorage.googleapis.com/v0/b/picashare-7bc92.appspot.com/o/signInFB.png?alt=media&token=37bfb887-2167-4760-903c-9b3bcfd985ba" alt="my" />
          </button>
        </Link>
        <Link to="/categories">
          <button onClick={() => this.snAuth(twitterProvider)}>
            <img src="https://firebasestorage.googleapis.com/v0/b/picashare-7bc92.appspot.com/o/signInTwitter.jpg?alt=media&token=b6afc894-fdb9-42e9-a33e-3042b4782101" alt="my" />
          </button>
        </Link>
      </div>
    );
  }

}

export default Header;
