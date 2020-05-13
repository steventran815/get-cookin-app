import React from 'react';
import { Link } from 'react-router-dom';

export default class HamburgerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      menuClicked: false
    });
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
              <Link to='/search'>
                <div className="logoutDiv">
                  <h1 onClick={this.props.toggle} className="logoutButton">LOGOUT</h1>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
