import React from 'react';
import FavoriteListItem from './favoriteListItem';
import AppContext from '../lib/context';

export default class FavoritesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
    this.remFav = this.remFav.bind(this);
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites() {
    fetch('/api/favoriteRecipes')
      .then(FavoritesList => FavoritesList.json())
      .then(recipes => this.setState({
        recipes: recipes
      }))
      .catch(err => console.error(err));
  }

  remFav(recipe) {
    const favorites = this.state.recipes.slice();
    fetch(`/api/favoriteRecipes/${recipe}`, {
      method: 'DELETE'
    })
      .then(deletedRecipe => {
        for (let i = 0; i < favorites.length; i++) {
          if (favorites[i].recipeId === recipe) {
            favorites.splice(i, 1);
            return favorites;
          }
        }
      })
      .then(newArray => {
        return this.setState(state => ({ recipes: newArray }));
      })
      .catch(error => console.error('Error:', error));
  }

  render() {
    const { recipes } = this.state;
    let recipesList = null;
    if (recipes.error || recipes.length === 0) {
      return (
        <div className="noMoreRecipes">
          <div className="notEnoughIngredientsDiv">
            <div className="notEnoughIngredientsContent">
              <h2 className="loading-header">No Favorite Recipes</h2>
              <div className="notEnoughIngredientsImageDiv">
                <img className="notEnoughIngredientsImage" src="/images/getCookinFridgeNoFavorites.png" />
              </div>
              <h3 className="notEnoughIngredientsMessage">Click a Heart to <br /><strong>Favorite a Recipe!</strong></h3>
            </div>
          </div>
        </div>
      );
    } else {
      recipesList = recipes.map(recipe => {
        return (
          <FavoriteListItem key={recipe.recipeId} remFav={this.remFav} recipe={recipe} />
        );
      });
    }
    return (
      <div className="pt-3">
        {recipesList}
        <div className="noMoreIngredients"></div>
      </div>
    );
  }
}

FavoritesList.contextType = AppContext;
