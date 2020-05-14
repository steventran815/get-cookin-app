import React from 'react';
import { Link } from 'react-router-dom';

export default class SearchListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorited: this.props.recipe.isFavorited
    };
    this.checkIfFav = this.checkIfFav.bind(this);
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

  checkIfFav() {
    return this.state.isFavorited;
  }

  render() {
    const recipe = this.props.recipe;
    const recipeTitle = recipe.recipeTitle;
    const recipePrepTime = recipe.recipePrepTime;
    const recipeImage = recipe.recipeImage;
    const recipeId = recipe.recipeId;
    return (
      <div>
        <div>
          <div>
            <div className="searchLink" >
              <div className="searchItem">
                <Link className="searchLeft" to={`/recipeList/${recipeId}`}>
                  <img className="searchRecipeImage" src={recipeImage}></img>
                  <div className="searchLeftContent pl-3">
                    <h5 className="searchRecipeTitle pt-3 pb-1">{recipeTitle}<br /><span className="searchPrepTime">Prep Time: {recipePrepTime}</span></h5>
                  </div>
                </Link>
                <div>
                  <span className="favoriteIcon">
                    {this.checkIfFav()
                      ? <i onClick={() => { this.remFavClick(recipeId); }} className='fa fa-heart'></i>
                      : <i onClick={() => { this.addFavClick(recipeId); }} className='far fa-heart'></i>
                    }
                  </span>
                </div>
              </div>
            </div>
            <hr className="recipeDivider"></hr>
          </div>
        </div>
      </div>
    );
  }
}
