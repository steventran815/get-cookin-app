import React from 'react';

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
                'In a large(12 to 14- inch) skillet set over medium - high heat, add the oil. While the oil is heating, sprinkle one side of the pork chops with salt and pepper.Place the chops into the hot pan, seasoned side down, and sear for 4 minutes, or until they are a dark, golden brown.While the first sides are searing, season the top side with more salt and pepper.Flip the chops over and cook for another 4 minutes.Transfer the chops from the pan to a platter.You may have to do this in batches for a good sear.'
            },
            {
              step: 2,
              displayText:
                'Add the onion and garlic to the pan and cook them over medium heat, stirring frequently for 3 - 4 minutes or until they are softened and become a deep golden color.'
            },
            {
              step: 3,
              displayText:
                'Once the onions and garlic are cooked down but still a little glossy, sprinkle flour over the veggies. If the onions are not glossy, add 1 tablespoon of oil before adding the flour. Cook the flour for one minute to remove the raw, starchy taste from it.Add 1/4 cup of beef stock to the pan and use your spoon to scrape up the browned bits from the bottom of the pan. The mixture will look like a very thick paste at this point.'
            },
            {
              step: 4,
              displayText:
                'Combine the cream with the rest of the beef stock and pour this liquid into the pan.Add the rosemary sprigs and bring the mixture up to a gentle simmer, stirring frequently, until thickened.'
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
    const recipeTitle = this.state.recipes.recipeTitle;
    const recipeImage = this.state.recipes.recipeImage;
    const recipePrepTime = this.state.recipes.recipePrepTime;

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-1">
              <div className="recipeDetailsImageDiv">
                <img className="recipeDetailsImage" src={recipeImage}/>
              </div>
            </div>
            <div className="col-md-1">
              <h5>{recipeTitle}</h5>
              <h3>Prep Time: {recipePrepTime}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
