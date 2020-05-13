import React from 'react';
import HamburgerMenu from './hamburgerMenu';

export default class Header extends React.Component {
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
    let menu;
    if (this.state.menuClicked === false) {
      menu = null;
    } else {
      menu = <HamburgerMenu toggle={this.toggleMenu} />;
    }
    return (
      <div>
        <header>
          {menu}
          <div className="headerContent">
            <img onClick={this.toggleMenu} src="/images/hamburgerIcon.png" />
            <p className="logo">GET COOKIN&apos;</p>
            <div className="profilePic">
            </div>
          </div>
        </header>
        <div className="headerSpacing"></div>
      </div >
    );
  }
}
