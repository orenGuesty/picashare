/**
 * Created by oren on 15/12/2016.
 */
import React from 'react';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
  console.log(response);
};


class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <FacebookLogin
          appId="358317097861350"
          autoLoad
          buttonStyle={{ fontSize: 40 }}
          callback={responseFacebook}
          icon="fa-facebook"
        />
      </div>
    );
  }
}

export default Header;
