import React from 'react';
import SearchListItem from './searchListItem';

export default class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
    this.getRecipes = this.getRecipes.bind(this);
  }

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes() {
    fetch('/api/recipes/')
      .then(res => res.json())
      .then(recipes => this.setState({
        recipes: recipes
      }))
      .catch(err => console.error(err));
  }

  render() {
    const { recipes } = this.state;
    const searchList = recipes.map(recipe => {
      return (
        <SearchListItem key={recipe.recipeId} recipe={recipe} />
      );
    });

    return (
      <div>
        {searchList}
        <h5 className="noMoreRecipes">End of Recipes List</h5>
      </div>
    );
  }
}
