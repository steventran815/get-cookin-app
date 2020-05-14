import React from 'react';

export default class RecipeAdded extends React.Component {

  render() {
    return (
      <div className="doneCookingOpacity">
        <div className="modalDiv container">
          <div className="doneCookingModal">
            <h3 className="bonApetit">Congrats!</h3>
            <p className="doneCookingText">Your Recipe has been added</p>
            <div className="getCookinImageDiv">
              <img className="getCookinImage" src="/images/getCookinFridgeHappy.gif" />
            </div>
            <button onClick={this.props.toggle} className="doneCookingButton">CONTINUE</button>
          </div>
        </div>
      </div>
    );
  }
}
