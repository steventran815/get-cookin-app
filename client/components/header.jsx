import React from 'react';
import HamburgerMenu from './hamburgerMenu';

export default class Footer extends React.Component {
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
    if (this.state.menuClicked) {
      return <HamburgerMenu toggle={this.toggleMenu} />;
    } else {
      return (
        <div>
          <header>
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
}
