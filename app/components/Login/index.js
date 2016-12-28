/**
 * Created by oren on 28/12/2016.
 */
import React from 'react';
import { Link } from 'react-router';

import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import * as firebase from 'firebase';
import InstagramLogin from 'react-instagram-login';
import cookie from 'react-cookie';



const twitterProvider = new firebase.auth.TwitterAuthProvider();
const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
        this.props.addUser(user);
        let providerId = user.providerData[0].providerId;
        providerId = providerId.substring(0, providerId.indexOf('.'));
        cookie.save(`${providerId}User`, user, { path: '/' });
        cookie.save(`${providerId}Token`, token, { path: '/' });
        console.log(`${providerId} user details are : ${JSON.stringify(cookie.load(`${providerId}User`))}`);
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
        <Link to="/categories">
          <button onClick={() => this.snAuth(googleProvider)}>
            <img src="https://firebasestorage.googleapis.com/v0/b/picashare-7bc92.appspot.com/o/signInGoogle.png?alt=media&token=e5af818c-1fa6-4bde-8e4b-c1c96a821175" alt="my" />
          </button>
        </Link>
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
      </div>
    );
  }

}

export default Login;
