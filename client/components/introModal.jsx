import React from 'react';

export default class IntroModal extends React.Component {

  render() {
    return (
      <div className="introModalOpacity">
        <div className="modalDiv container">
          <div className="introModal">
            <p className="intro-logo">GET COOKIN&apos;</p>
            <center><div className="intro-divider"></div></center>
            <p className="intro-modal-text">Get Cookin&apos; is a dynamic web application made for home cooks who want to use up the items in their pantry.</p>
            <strong><p className="intro-modal-text">For a video tutorial on how to use Get Cookin&apos;, <a className="demo-link" href="https://www.youtube.com/watch?v=psg8b3aEQso" target="_blank" rel="noopener noreferrer">click here!</a></p></strong>
            <button onClick={() => this.props.handleModalFunction()} className="doneCookingButton">CONTINUE</button>
          </div>
        </div>
      </div>
    );
  }
}
