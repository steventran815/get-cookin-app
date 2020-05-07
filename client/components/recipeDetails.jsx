import React from 'react';
import RecipeIngredient from './recipeIngredients';
import RecipeInstruction from './recipeInstructions';

export default class RecipeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes:
        {
          recipeId: 1,
          recipeTitle: 'Smothered Pork Chops',
          recipeImage: 'https://www.simplyrecipes.com/wp-content/uploads/2019/12/Skillet_Smothered_Pork_LEAD_2b.jpg',
          recipePrepTime: 40,
          recipeIngredients: [
            'vegetable oil',
            'pork chops',
            'salt',
            'pepper',
            'onion',
            'garlic',
            'flour',
            'beef stock',
            'heavy cream',
            'rosemary'
          ],
          recipeInstructions: [
            {
              step: 1,
              displayText:
                'In a large (12 to 14-inch) skillet set over medium - high heat, add the oil. While the oil is heating, sprinkle one side of the pork chops with salt and pepper. Place the chops into the hot pan, seasoned side down, and sear for 4 minutes, or until they are a dark, golden brown.While the first sides are searing, season the top side with more salt and pepper. Flip the chops over and cook for another 4 minutes.Transfer the chops from the pan to a platter. You may have to do this in batches for a good sear.'
            },
            {
              step: 2,
              displayText:
                'Add the onion and garlic to the pan and cook them over medium heat, stirring frequently for 3 - 4 minutes or until they are softened and become a deep golden color.'
            },
            {
              step: 3,
              displayText:
                'Once the onions and garlic are cooked down but still a little glossy, sprinkle flour over the veggies. If the onions are not glossy, add 1 tablespoon of oil before adding the flour. Cook the flour for one minute to remove the raw, starchy taste from it. Add 1/4 cup of beef stock to the pan and use your spoon to scrape up the browned bits from the bottom of the pan. The mixture will look like a very thick paste at this point.'
            },
            {
              step: 4,
              displayText:
                'Combine the cream with the rest of the beef stock and pour this liquid into the pan. Add the rosemary sprigs and bring the mixture up to a gentle simmer, stirring frequently, until thickened.'
            },
            {
              step: 5,
              displayText:
                'Nestle the pork chops into the simmering gravy, then cover the pan. Allow the chops to simmer in the thickened gravy for 10 minutes, or until their internal temperature reaches at least 145°F and no higher than 165°F.'
            }
          ]
        }
    };
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

    return (
      <div>
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
          <ul className="instructionsList">
            {recipeInstructions}
          </ul>
        </div>
        <div className="doneCookingDiv">
          <button className="doneCookingButton">DONE COOKING</button>
          <button className="doneCookingButton">DONE COOKING</button>
          <button className="doneCookingButton">DONE COOKING</button>
        </div>
        <div><h1>END OF RECIPE</h1></div>
      </div>
    );
  }
}
