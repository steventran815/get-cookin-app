import React from 'react';
import RecipeIngredient from './recipeIngredients';
import RecipeInstruction from './recipeInstructions';
import DoneCooking from './doneCooking';

export default class RecipeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      recipe: null,
      doneCooking: false
    };
  }

  handleClick() {
    this.setState({
      doneCooking: true
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    fetch(`/api/recipes/${id}`)
      .then(res => res.json())
      .then(recipe => this.setState({
        recipe: recipe
      }))
      .catch(err => console.error(err));
  }

  checkIfFav() {
    return this.state.recipe.isFavorited;
  }

  addFav(recipe) {
    const recipeCopy = Object.assign({}, this.state.recipe);
    fetch('/api/favoriteRecipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ recipe: recipe })
    })
      .then(res => res.json())
      .then(data => this.setState(() => {
        recipeCopy.isFavorited = true;
        return {
          recipe: recipeCopy
        };
      }))
      .catch(error => console.error('Error:', error));
  }

  remFav(recipe) {
    const recipeCopy = Object.assign({}, this.state.recipe);
    fetch(`/api/favoriteRecipes/${recipe}`, {
      method: 'DELETE'
    })
      .then(data => {
        return this.setState(() => {
          recipeCopy.isFavorited = false;
          return {
            recipe: recipeCopy
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
    const { recipe } = this.state;

    if (!recipe) {
      return null;
    } else {
      const recipesIngredients = recipe.recipeIngredients.map((ingredient, index) => {
        return (
          <RecipeIngredient key={index} ingredient={ingredient} />
        );
      });
      const parsedInstructions = JSON.parse(recipe.recipeInstructions);
      const recipeInstructions = parsedInstructions.map((instruction, index) => {
        return (
          <RecipeInstruction key={index} instruction={instruction} />
        );
      });
      const recipeTitle = recipe.recipeTitle;
      const recipeImage = recipe.recipeImage;
      const recipePrepTime = recipe.recipePrepTime;
      const recipeId = recipe.recipeId;

      let doneCooking;
      if (this.state.doneCooking === false) {
        doneCooking = null;
      } else {
        doneCooking = <DoneCooking />;
      }
      return (
        <div>
          {doneCooking}
          <div className="recipeDetailsImageDiv">
            <img className="recipeDetailsImage" src={recipeImage}/>
          </div>
          <div className="recipeTitleDiv">
            <h5 className="recipeDetailsTitle">{recipeTitle}</h5>
            <h5 className="recipeDetailsPrepTime">Cooking Time: {recipePrepTime}</h5>
            <div className="favoriteIconDetails">
              <span>
                {this.checkIfFav()
                  ? <i onClick={() => { this.remFavClick(recipeId); }} className='fa fa-heart'></i>
                  : <i onClick={() => { this.addFavClick(recipeId); }} className='far fa-heart'></i>
                }
              </span>
            </div>
          </div>
          <hr className="recipeDivider"></hr>
          <div className="recipeDetailsIngredients">
            <h5 className="ingredientsHeader">Ingredients</h5>
            <ul className="ingredientsList">
              {recipesIngredients}
            </ul>
          </div>
          <hr className="recipeDivider"></hr>
          <div className="recipeDetailsInstructions">
            <h5 className="ingredientsHeader">Instructions</h5>
            <ol className="instructionsList">
              {recipeInstructions}
            </ol>
          </div>
          <div className="doneCookingDiv">
            <button onClick={this.handleClick} className="doneCookingButton">DONE COOKING</button>
          </div>
          <div className="noMoreIngredients"></div>
        </div>
      );
    }
  }
}
