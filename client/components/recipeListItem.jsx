import React from 'react';

export default class RecipeListItem extends React.Component {

  render() {
    return (
      <div>
        <h2 className="recipeTitle p-2 pt-3">Chicken Sandwich</h2>
        <center>
          <div className="recipeImageDiv">
            <img className="recipeImage" src="images/friedChickenImage.png" />
          </div>
        </center>
        <div className="recipeFooter">
          <h2><span className="prepTime">Prep Time: 60</span></h2>
          <div><span className="favoriteIcon"> <i className="fa fa-heart"></i> </span></div>
        </div>
        <hr className="recipeDivider"></hr>
      </div>
    );
  }
}

// INSTALL BOOTSTRAP;
