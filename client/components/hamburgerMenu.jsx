import React from 'react';
import { Link } from 'react-router-dom';

export default class HamburgerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = ({
      menuClicked: false
    });
  }

  toggleMenu() {
    this.setState({
      menuClicked: !this.state.menuClicked
    });
  }

  render() {
    return (
      <div>
        <div onClick={this.props.toggle} className="hamburgerOpacity">
        </div>
        <div className="hamburgerMenuDiv">
          <div className="hamburgerMenu">
            <ul className="headerList">
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
    );
  }
}
