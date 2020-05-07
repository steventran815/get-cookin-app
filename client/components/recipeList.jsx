import React from 'react';
import RecipeListItem from './recipeListItem';
import { Link } from 'react-router-dom';

export default class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
    // this.getRecipes = this.getRecipes.bind(this);
  }

  // componentDidMount() {
  //   this.getRecipes();
  // }

  // getRecipes() {
  //   fetch('/api/recipes/')
  //     .then(res => res.json())
  //     .then(recipes => this.setState({
  //       recipes: recipes
  //     }))
  //     .catch(err => console.error(err));
  // }

  render() {
    const { recipes } = this.state;
    const recipesList = recipes.map(recipe => {
      return (
        <RecipeListItem key={recipe.recipeId} recipe={recipe} />
      );
    });

    if (this.state.recipes.length === 0) {
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
    }
    return (
      <div>
        {recipesList}
        <h5 className="noMoreRecipes">End of Recipes List</h5>
      </div>
    );
  }
}
