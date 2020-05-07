import React from 'react';
import { Link } from 'react-router-dom';

export default class DoneCooking extends React.Component {

  render() {
    return (
      <div className="doneCookingOpacity">
        <div className="modalDiv container">
          <modal className="doneCookingModal">
            <h3 className="bonApetit">Bon Apétit!</h3>
            <p className="doneCookingText">Don&apos;t forget to update your fridge!</p>
            <div className="getCookinImageDiv">
              <img className="getCookinImage"src="/images/getCookinFridgeHappy.png"/>
            </div>
            <Link to='/fridgeList'>
              <button className="doneCookingButton">GO TO FRIDGE</button>
            </Link>
          </modal>
        </div>
      </div>
    );
  }
}
