/**
 * Created by oren on 15/12/2016.
 */
import React from 'react';
import FacebookLogin from 'react-facebook-login';


class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.user !== this.state.user) {
      console.log(nextState.user);
    }
  }
  render() {
    return (
      <div>
        <FacebookLogin
          appId="358317097861350"
          autoLoad
          buttonStyle={{ fontSize: 40 }}
          callback={(response) => { this.setState({ user: response }); }}
          icon="fa-facebook"
        />
      </div>
    );
  }
}

export default Header;
