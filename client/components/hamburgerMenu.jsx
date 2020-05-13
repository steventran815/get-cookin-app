import React from 'react';
import AppContext from '../lib/context';
import { withRouter } from 'react-router-dom';

class HamburgerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.context.logout();
    this.props.history.push('/login');
  }

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
                <h1 onClick={this.handleLogout}className="logoutButton">LOGOUT</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HamburgerMenu.contextType = AppContext;
export default withRouter(HamburgerMenu);
