import React from 'react';
import RecipeListItem from './recipeListItem';
import AppContext from '../lib/context';
import { Link } from 'react-router-dom';

export default class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      isLoading: false
    };
    this.getRecipes = this.getRecipes.bind(this);
    this.loadingScreen = this.loadingScreen.bind(this);
  }

  loadingScreen() {
    this.setState({
      isLoading: true
    });
  }

  componentDidMount() {
    setTimeout(this.loadingScreen, 1500);
    const user = this.context.getUser();
    const favs = this.context.getFavs();
    this.favState(favs);
    this.getRecipes(user.userId);
  }

  favState(favs) {
    return this.setState({
      favorites: favs
    });
  }

  getRecipes(userId) {
    fetch(`/api/availableRecipes/${userId}`)
      .then(res => res.json())
      .then(recipes => this.setState({
        recipes: recipes
      }))
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.isLoading === false) {
      return (
        <div className="loading-screen">
          <div className="loading-screen-content">
            <h2 className="loading-header">LOADING...</h2>
            <img className="loading-image" src="/images/getCookinLoadingGif.gif" />
            <h4 className="finding-available-ingredients">Finding Available Recipes</h4>
          </div>
        </div>
      );
    }
    const { recipes } = this.state;
    let recipesList = null;
    if (recipes.error) {
      return (
        <div className="notEnoughIngredientsDiv">
          <div className="notEnoughIngredientsContent">
            <h3 className="notEnoughIngredienstTitle">Not Enough Ingredients</h3>
            <div className="notEnoughIngredientsImageDiv">
              <img className="notEnoughIngredientsImage" src="/images/getCookinFridgeSad.png" />
            </div>
            <h3 className="notEnoughIngredientsMessage">Time to Stock Up!</h3>
            <Link className="w-100" to='/fridgeList'>
              <button className="notEnoughIngredientsButton">GO TO FRIDGE</button>
            </Link>
          </div>
        </div>
      );
    } else {
      recipesList = recipes.map(recipe => {
        return (
          <RecipeListItem key={recipe.recipeId} favorites={this.state.favorites} recipe={recipe} />
        );
      });
    }
    return (
      <div>
        {recipesList}
        <div className="noMoreIngredients">
        </div>
      </div>
    );
  }
}

RecipeList.contextType = AppContext;
