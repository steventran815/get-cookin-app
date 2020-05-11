import React from 'react';
import FavoriteListItem from './favoriteListItem';
import AppContext from '../lib/context';

export default class FavoritesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  componentDidMount() {
    const favs = this.context.getFavs();
    this.favState(favs);
  }

  favState(favs) {
    return this.setState({
      recipes: favs
    });
  }

  render() {
    const { recipes } = this.state;
    let recipesList = null;
    if (recipes.error) {
      return (
        <div className="noMoreRecipes">
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

FavoritesList.contextType = AppContext;
