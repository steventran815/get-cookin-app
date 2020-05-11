import React from 'react';

export default class AddARecipe extends React.Component {

  render() {
    return (
      <div className="add-a-recipe-div">
        <form onSubmit={this.handleSubmit} className="add-a-recipe-form">
          <h5 className="add-a-recipe-title">Recipe Name</h5>
          <input input="text" className="add-a-recipe-input"/>
          <h5 className="add-a-recipe-title">Cooking Time</h5>
          <input className="add-a-recipe-input"/>
          <h5 className="add-a-recipe-title">Image URL</h5>
          <input input="text" className="add-a-recipe-input"/>
          <h5 className="add-a-recipe-title">Ingredients</h5>
          <input input="text" className="add-a-recipe-input"/>
          <ul className="add-a-recipe-ingredientsList">
            <li className="added-ingredient">Chicken</li>
            <li className="added-ingredient">Beef</li>
            <li className="added-ingredient">Pork</li>
          </ul>
          <h5 className="add-a-recipe-title">Instructions</h5>
          <input input="text" className="add-a-recipe-input"/>
          <ul className="add-a-recipe-instructionsList">
            <li className="added-instruction">Put Something in a pot or whatever</li>
            <li className="added-instruction">Put the pot in the oven and roast for a really really really really long time</li>
            <li className="added-instruction">Pork</li>
          </ul>
          <button type="submit" className="add-a-recipe-button">SUBMIT RECIPE</button>
        </form>
      </div>
    );
  }
}
