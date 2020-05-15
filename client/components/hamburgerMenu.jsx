import React from 'react';
import AppContext from '../lib/context';
import { withRouter } from 'react-router-dom';

class HamburgerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.slideIn = this.slideIn.bind(this);
  }

  handleLogout() {
    this.context.logout();
    this.props.history.push('/login');
  }

  componentDidMount() {
    this.slideInMenu = setInterval(this.slideIn, 0);
  }

  componentWillUnmount() {
    clearInterval(this.slideInMenu);
  }

  slideIn() {
    const menu = document.getElementById('hamburgerMenu');
    menu.classList.add('hamburgerMenu-clicked');
  }

  render() {
    return (
      <div>
        <div onClick={this.props.toggle} className="hamburgerOpacity">
        </div>
        <div id="hamburgerMenu" className="hamburgerMenuDiv">
          <div className="hamburgerMenu">
            <div>
              <ul className="headerList">
                <li className="headerListTitle">GET COOKIN&apos;</li>
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
