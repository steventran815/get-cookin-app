import React from 'react';

export default class RecipeListItem extends React.Component {

  render() {
    const recipe = this.props.recipe;
    const recipeTitle = recipe.recipeTitle;
    const recipePrepTime = recipe.recipePrepTime;
    const recipeImage = recipe.recipeImage;
    return (
      <div>
        <div>
          <h2 className="recipeTitle p-2 pt-3">{recipeTitle}</h2>
          <center>
            <div className="recipeImageDiv">
              <img className="recipeImage" src={recipeImage} />
            </div>
          </center>
          <div className="recipeFooter">
            <h2><span className="prepTime">Prep Time: {recipePrepTime}</span></h2>
            <div><span className="favoriteIcon"> <i className="fa fa-heart"></i> </span></div>
          </div>
          <hr className="recipeDivider"></hr>
        </div>
      </div>
    );
  }
}

// INSTALL BOOTSTRAP;
