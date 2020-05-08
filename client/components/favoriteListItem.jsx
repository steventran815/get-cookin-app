import React from 'react';
import { Link } from 'react-router-dom';

export default class FavoriteListItem extends React.Component {

  render() {
    const recipe = this.props.recipe;
    const recipeTitle = recipe.recipeTitle;
    const recipePrepTime = recipe.recipePrepTime;
    const recipeImage = recipe.recipeImage;
    const recipeId = recipe.recipeId;
    return (
      <div>
        <div>
          <div>
            <Link className="searchLink" to={`/recipeList/${recipeId}`}>
              <div className="searchItem">
                <div className="searchLeft">
                  <img className="searchRecipeImage" src={recipeImage}></img>
                  <div className="searchLeftContent pl-3">
                    <h5 className="searchRecipeTitle pt-3 pb-1">{recipeTitle}<br /><span className="searchPrepTime">Prep Time: {recipePrepTime}</span></h5>
                  </div>
                </div>
                <div><span className="favoriteIcon"> <i className="fa fa-heart"></i> </span></div>
              </div>
            </Link>
            <hr className="recipeDivider"></hr>
          </div>
        </div>
      </div>
    );
  }
}
