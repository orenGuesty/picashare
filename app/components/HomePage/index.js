/**
 * Created by oren on 15/12/2016.
 */
import React from 'react';
import ReactPlayer from 'react-player';


class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { };
  }


  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{}}>Welcome to Picashare the home of finance success</h1>
        <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" playing={false} />
      </div>
    );
  }

}

export default Header;
