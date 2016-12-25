/**
 * Created by oren on 15/12/2016.
 */
import React from 'react';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import FacebookLogin from 'react-facebook-login';
import * as firebase from 'firebase';
import InstagramLogin from 'react-instagram-login';
import ReactPlayer from 'react-player';


const responseFacebook = (response) => {
  console.log(response);
};

const config = {
  apiKey: 'AIzaSyDOc48VJls4dUJ26DepEtmQw9JUssWSTw0',
  authDomain: 'picashare-7bc92.firebaseapp.com',
  databaseURL: 'https://picashare-7bc92.firebaseio.com',
  storageBucket: 'picashare-7bc92.appspot.com',
  messagingSenderId: '536716819192',
};
firebase.initializeApp(config);

const twitterProvider = new firebase.auth.TwitterAuthProvider();


class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      user: {},
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
  twitterAuth = () => {
    firebase.auth()
      .signInWithPopup(twitterProvider)
      .then((result) => {
/*
        const token = result.credential.accessToken;
        const secret = result.credential.secret;
*/
        const user = result.user;
        console.log(`twitter user detials are : ${JSON.stringify(user)}`);
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
        <FacebookLogin
          appId="358317097861350"
          autoLoad
          buttonStyle={{ fontSize: 12 }}
          callback={responseFacebook}
          icon="fa-facebook"
        />
        <InstagramLogin
          clientId={this.instaClientId}
          onSuccess={(response) => { this.setState({ user: response }); }}
          onFailure={(response) => { this.setState({ user: response }); }}
        >
          <FontAwesome
            name="instagram"
          />
          <span> Login with Instagram</span>
        </InstagramLogin>
        <button onClick={this.twitterAuth}>
          <img src="https://g.twimg.com/dev/sites/default/files/images_documentation/sign-in-with-twitter-gray.png" alt="my" />
        </button>
      </div>
    );
  }
}

export default Header;
