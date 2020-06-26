import React from 'react';

export default class IntroModal extends React.Component {

  render() {
    return (
      <div className="introModalOpacity">
        <div className="modalDiv container">
          <div className="introModal">
            <h3 className="bonApetit">Welcome to Get Cookin&apos;!</h3>
            <p className="doneCookingText">This application is best viewed on a mobile device</p>

            <a href="https://www.youtube.com/watch?v=psg8b3aEQso" target="_blank" rel="noopener noreferrer"><button className="doneCookingButton">View Demo</button></a>
            <button onClick={() => this.props.handleModalFunction()} className="doneCookingButton">Continue</button>
          </div>
        </div>
      </div>
    );
  }
}
