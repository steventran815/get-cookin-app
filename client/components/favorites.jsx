import React from 'react';
import FavoriteListItem from './favoriteListItem';

export default class FavoritesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
    this.getFavorites = this.getFavorites.bind(this);
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

  render() {
    const { recipes } = this.state;
    let recipesList = null;
    if (recipes.error) {
      return (
        <div className="noFavorites">
         You do not have any favorite recipes saved
        </div>
      );
    } else {
      recipesList = recipes.map(recipe => {
        return (
          <FavoriteListItem key={recipe.recipeId} recipe={recipe} />
        );
      });

    }
    return (
      <div>
        {recipesList}
        <h5>End of Favorites List</h5>
      </div>
    );
  }
}
