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
      const recipeInstructions = recipe.recipeInstructions.map((instruction, index) => {
        const parsed = JSON.parse(instruction);
        return (
          <RecipeInstruction key={index} instruction={parsed} />
        );
      });
      const recipeTitle = recipe.recipeTitle;
      const recipeImage = recipe.recipeImage;
      const recipePrepTime = recipe.recipePrepTime;

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
            <h5 className="recipeDetailsPrepTime">Prep Time: {recipePrepTime}</h5>
            <div className="favoriteIconDetails">
              <span><i className="fa fa-heart"></i> </span>
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
          <div><h1>END OF RECIPE</h1></div>
        </div>
      );

    }

  }
}
