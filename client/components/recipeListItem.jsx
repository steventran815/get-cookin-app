import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../lib/context';

export default class RecipeListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorited: this.props.recipe.isFavorited
    };
    this.favorites = this.props.favorites;
    this.recipe = this.props.recipe;
    this.recipeTitle = this.recipe.recipeTitle;
    this.recipePrepTime = this.recipe.recipePrepTime;
    this.recipeImage = this.recipe.recipeImage;
    this.recipeId = this.recipe.recipeId;
    this.checkIfFav = this.checkIfFav.bind(this);
  }

  checkIfFav() {
    return this.state.isFavorited;
  }

  addFav(recipe) {
    fetch('/api/favoriteRecipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ recipe: recipe })
    })
      .then(res => res.json())
      .then(data => this.setState(() => {
        return {
          isFavorited: true
        };
      }))
      .catch(error => console.error('Error:', error));
  }

  remFav(recipe) {
    fetch(`/api/favoriteRecipes/${recipe}`, {
      method: 'DELETE'
    })
      .then(data => {
        return this.setState(() => {
          return {
            isFavorited: false
          };
        });
      })

      .catch(error => console.error('Error:', error));
  }

  addFavClick(recipeId) {
    this.addFav(recipeId);
  }

  remFavClick(recipeId) {
    this.remFav(recipeId);
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
            <h2><span className="prepTime">Cooking Time: {recipePrepTime}</span></h2>
            <div><span className="favoriteIcon">
              {this.checkIfFav()
                ? <i onClick={() => { this.remFavClick(recipeId); }} className='fa fa-heart'></i>
                : <i onClick={() => { this.addFavClick(recipeId); }} className='far fa-heart'></i>
              }
            </span></div>
          </div>
          <hr className="recipeDivider"></hr>
        </div>
      </div>
    );
  }
}

RecipeListItem.contextType = AppContext;
