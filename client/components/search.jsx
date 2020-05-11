import React from 'react';
import SearchListItem from './searchListItem';

export default class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      search: ''
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

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  render() {
    const filteredRecipes = this.state.recipes.filter(
      recipe => {
        return recipe.recipeTitle.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );
    const recipeList = filteredRecipes.map(recipe => {
      return (
        <SearchListItem key={recipe.recipeId} recipe={recipe} />
      );
    });

    return (
      <div>
        <div className="searchInputDiv">
          <input
            id="searchInput"
            className="form-control add-input searchInput"
            type="text"
            onChange={this.updateSearch.bind(this)}
            placeholder="Search for Recipes"
            maxLength="20" />
        </div>
        <div className="pt-3">
          {recipeList}
          <h5 className="noMoreRecipes">End of Recipes List</h5>
        </div>
      </div>
    );
  }
}
