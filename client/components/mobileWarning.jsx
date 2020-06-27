import React from 'react';

export default class MobileWarning extends React.Component {

  render() {
    return (
      <div className="mobile-warning">
        <h1 className="warning-text">THIS APPLICATION IS BEST VIEWED ON<br/>MOBILE DEVICES</h1>
        <button id="continue" onClick={() => this.props.handleMobileWarningFunction()} className="continue-to-app">CONTINUE TO APP</button>
      </div>
    );
  }
}
