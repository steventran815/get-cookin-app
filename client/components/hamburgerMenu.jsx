import React from 'react';
import AppContext from '../lib/context';

export default class HamburgerMenu extends React.Component {
  render() {
    return (
      <div>
        <div onClick={this.props.toggle} className="hamburgerOpacity">
        </div>
        <div className="hamburgerMenuDiv">
          <div className="hamburgerMenu">
            <div>
              <ul className="headerList">
                <li className="headerListTitle">Get Cookin&apos;</li>
                <div className="recipeDivider"></div>
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Terms</li>
              </ul>
              <div className="logoutDiv">
                <h1 onClick={this.context.logout}className="logoutButton">LOGOUT</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HamburgerMenu.contextType = AppContext;
