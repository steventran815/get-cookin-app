import React from 'react';
import { Link } from 'react-router-dom';

export default class RecipeListItem extends React.Component {

  render() {
    const recipe = this.props.recipe;
    const recipeTitle = recipe.recipeTitle;
    const recipePrepTime = recipe.recipePrepTime;
    const recipeImage = recipe.recipeImage;
    const recipeId = recipe.recipeId;
    return (
      <div>
        <div>
          <h2 className="recipeTitle pt-3 pb-1"><strong>{recipeTitle}</strong></h2>
          <center>
            <div className="recipeImageDiv">
              <Link to={`/recipeList/${recipeId}`}>
                <img className="recipeImage" src={recipeImage} />
              </Link>
            </div>
          </center>
          <div className="recipeFooter">
            <h2><span className="prepTime">Cooking Time: {recipePrepTime}</span></h2>
            <div><span className="favoriteIcon"><i className="fa fa-heart"></i></span></div>
          </div>
          <hr className="recipeDivider"></hr>
        </div>
      </div>
    );
  }
}
