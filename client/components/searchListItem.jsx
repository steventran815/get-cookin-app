import React from 'react';

export default class SearchListItem extends React.Component {

  render() {
    const recipe = this.props.recipe;
    const recipeTitle = recipe.recipeTitle;
    const recipePrepTime = recipe.recipePrepTime;
    // const recipeImage = recipe.recipeImage;
    // const recipeId = recipe.recipeId;
    return (
      <div>
        <div>
          <div>
            <div className="recipeFooter">
              <h5 className="recipeTitle pt-3 pb-1"><strong>{recipeTitle}</strong></h5>
              <h5><span className="prepTime">Prep Time: {recipePrepTime}</span></h5>
              <div><span className="favoriteIcon"> <i className="fa fa-heart"></i> </span></div>
            </div>
            <hr className="recipeDivider"></hr>
          </div>
        </div>
      </div>
    );
  }
}
