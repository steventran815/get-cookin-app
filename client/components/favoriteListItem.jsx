import React from 'react';
import { Link } from 'react-router-dom';

export default class FavoriteListItem extends React.Component {

  remFavClick(recipeId) {
    this.props.remFav(recipeId);
  }

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
            <div className="searchLink" >
              <div className="searchItem">
                <Link className="searchLeft" to={`/recipeList/${recipeId}`}>
                  <img className="searchRecipeImage" src={recipeImage}></img>
                  <div className="searchLeftContent pl-3">
                    <h5 className="searchRecipeTitle pt-3 pb-1">{recipeTitle}<br /><span className="searchPrepTime">Prep Time: {recipePrepTime}</span></h5>
                  </div>
                </Link>
                <div><span className="favoriteIcon"> <i onClick={() => { this.remFavClick(recipeId); }} className="fa fa-heart"></i> </span></div>
              </div>
            </div>
            <hr className="recipeDivider"></hr>
          </div>
        </div>
      </div>
    );
  }
}
