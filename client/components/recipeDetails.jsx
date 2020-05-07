import React from 'react';
import RecipeIngredient from './recipeIngredients';
import RecipeInstruction from './recipeInstructions';
import DoneCooking from './doneCooking';

export default class RecipeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      recipes: {
        recipeId: 5,
        recipeTitle: 'Nashville Hot Chicken',
        recipeImage: 'https://images.media-allrecipes.com/userphotos/3778321.jpg',
        recipePrepTime: 20,
        recipeIngredients: [
          'Buttermilk',
          'Hot Sauce',
          'Chicken',
          'All - purpose flour',
          'Salt',
          'Pepper',
          'Paprika',
          'Cayenne pepper',
          'Brown sugar',
          'Garlic powder',
          'Chili powder',
          'Red pepper flakes',
          'Vegetable oil'
        ],
        recipeInstructions: [
          {
            step: 1,
            displayText:
            'In a large bowl put the buttermilk, hot sauce, salt, pepper and paprika – whisk well to combine and add the chicken and make sure it’s well covered.Refrigerate up to 4 hours, even overnight is fine.'
          },
          {
            step: 2,
            displayText:
            'In a large bowl, whisk together flour, salt, pepper, and paprika until well combined to make flour dredge.'
          },
          {
            step: 3,
            displayText:
            'Remove the chicken pieces one by one from the buttermilk and let any excess drip off.'
          },
          {
            step: 4,
            displayText:
            'Put the pieces, one by one into the flour making sure each is well coated, shake off excess then back into the buttermilk and then into the flour again and put on a plate or a rack on a baking sheet – repeat with al the chicken.'
          },
          {
            step: 5,
            displayText:
            'Fill either a deep fryer with oil, or a large cast iron pan about 1/3 of the way up the sides and heat to 325 degrees.'
          },
          {
            step: 6,
            displayText:
            'Slowly add 3 or 4 pieces of chicken at a time and cook until golden brown and crisp on both sides(turning pieces over about halfway through) and the chicken reaches 160 to165 degrees, approximately 12-14 minutes.'
          },
          {
            step: 7,
            displayText:
            'When done, move the chicken pieces to a rack covered baking sheet and place in a 250 degree oven while you finish cooking the remaining pieces.'
          },
          {
            step: 8,
            displayText:
            'When all the frying is done, combine the cayenne pepper, brown sugar, garlic powder, paprika, chili powder, red pepper flakes in a medium bowl and add 1 cup of the hot frying oil – stir well to combine.'
          },
          {
            step: 9,
            displayText:
            'To serve, brush the cooked chicken well with the sauce, or dunk the pieces - serve hot.'
          }
        ]
      },
      doneCooking: false
    };
  }

  handleClick() {
    this.setState(
      {
        doneCooking: true
      }
    );
  }

  getIngredients(userId) {
    fetch(`/api/userIngredients/${userId}`)
      .then(res => res.json())
      .then(ingredients => this.setState({
        ingredients: ingredients
      }))
      .catch(err => console.error(err));
  }

  render() {
    const recipes = this.state.recipes;
    const recipesIngredients = recipes.recipeIngredients.map((ingredient, index) => {
      return (
        <RecipeIngredient key={index} ingredient={ingredient} />
      );
    });
    const recipeInstructions = recipes.recipeInstructions.map((instruction, index) => {
      return (
        <RecipeInstruction key={index} instruction={instruction} />
      );
    });
    const recipeTitle = this.state.recipes.recipeTitle;
    const recipeImage = this.state.recipes.recipeImage;
    const recipePrepTime = this.state.recipes.recipePrepTime;

    let doneCookingTest;
    if (this.state.doneCooking === false) {
      doneCookingTest = null;
    } else {
      doneCookingTest = <DoneCooking />;
    }

    return (
      <div>
        {doneCookingTest}
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
