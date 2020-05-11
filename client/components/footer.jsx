import React from 'react';
import { Link } from 'react-router-dom';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true
    };
  }

  render() {
    return (
      <footer>
        <Link to='/recipeList'>
          <img className="footerIcon" src="/images/recipesIcon.png" />
        </Link>
        <Link to='/favoritesList'>
          <img className="footerIcon" src="/images/favoritesIcon.png" />
        </Link>
        <Link to='/fridgeList'>
          <img className="footerIcon" src="/images/fridgeIcon.png" />
        </Link>
        <Link to='/search'>
          <img className="footerIcon" src="/images/searchIcon.png" />
        </Link>
        <Link to='/addARecipe'>
          <img className="footerIcon" src="/images/shoppingListIcon.png" />
        </Link>
      </footer>
    );
  }
}
