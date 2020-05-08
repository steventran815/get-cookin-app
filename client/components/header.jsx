import React from 'react';

export default class Footer extends React.Component {

  render() {
    return (
      <div>
        <header>
          <div className="headerContent">
            <img src="/images/hamburgerIcon.png" />
            <p className="logo">GET COOKIN&apos;</p>
            <div className="profilePic"></div>
          </div>
        </header>
        <div className="headerSpacing"></div>
      </div >
    );
  }
}
