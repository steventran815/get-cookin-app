import React from 'react';
import { Link } from 'react-router-dom';

export default class RecipeListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteIds: []
    };
    this.favorites = this.props.favorites;
    this.recipe = this.props.recipe;
    this.recipeTitle = this.recipe.recipeTitle;
    this.recipePrepTime = this.recipe.recipePrepTime;
    this.recipeImage = this.recipe.recipeImage;
    this.recipeId = this.recipe.recipeId;
    this.favIds = this.state.favoriteIds;
    this.getIds = this.getIds.bind(this);
    this.checkIfFav = this.checkIfFav.bind(this);
  }

  componentDidMount() {
    this.getIds(this.favorites);
  }

  getIds(favorites) {
    const favIds = this.state.favoriteIds.slice();
    for (let i = 0; i < favorites.length; i++) {
      favIds.push(favorites[i].recipeId);
    }
    return this.setState({
      favoriteIds: favIds
    });
  }

  checkIfFav() {
    const favId = this.state.favoriteIds;
    const recipeId = this.recipeId;
    for (let i = 0; i < favId.length; i++) {
      if (favId[i] === recipeId) {
        return true;
      } else if (favId[i] !== recipeId && i === favId.length) {
        return false;
      }
    }
  }

  render() {
    const recipe = this.recipe;
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
            <h2><span className="prepTime">Prep Time: {recipePrepTime}</span></h2>
            {this.checkIfFav()
              ? <div><span className="favoriteIcon"> <i className="fa fa-heart"></i> </span></div>
              : <div><span className="favoriteIcon"> <i className="far fa-heart"></i> </span></div>
            }
          </div>
          <hr className="recipeDivider"></hr>
        </div>
      </div>
    );
  }
}
