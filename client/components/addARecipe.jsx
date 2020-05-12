import React from 'react';

export default class AddARecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
    this.handleClickIngredients = this.handleClickIngredients.bind(this);
    this.handleClickInstructions = this.handleClickInstructions.bind(this);
  }

  handleClickIngredients() {
    const ingredientValue = document.getElementById('ingredientValue').value;
    if (ingredientValue === '') { return; }
    const ingredientUl = document.getElementById('addAnIngredientUl');
    const ingredientListItem = document.createElement('li');
    const ingredientTextNode = document.createTextNode(ingredientValue);
    ingredientListItem.appendChild(ingredientTextNode);
    ingredientListItem.classList.add('added-ingredient');
    ingredientUl.appendChild(ingredientListItem);
    document.getElementById('ingredientValue').value = '';
  }

  handleClickInstructions() {
    const instructionValue = document.getElementById('instructionValue').value;
    if (instructionValue === '') { return; }
    const instructionUl = document.getElementById('addAnInstructionUl');
    const instructionListItem = document.createElement('li');
    const instructionTextNode = document.createTextNode(instructionValue);
    instructionListItem.appendChild(instructionTextNode);
    instructionListItem.classList.add('added-instruction');
    instructionUl.appendChild(instructionListItem);
    document.getElementById('instructionValue').value = '';
  }

  render() {
    return (
      <div className="add-a-recipe-div">
        <form id="addARecipeForm" onSubmit={this.handleSubmit} className="add-a-recipe-form">
          <h5 className="add-a-recipe-title">Recipe Name</h5>
          <input placeholder="eg. Chicken Sandwich" input="text" className="add-a-recipe-input"/>
          <h5 className="add-a-recipe-title">Cooking Time <span className="in-minutes">(In Minutes)</span></h5>
          <input placeholder="eg. 60" className="add-a-recipe-input"/>
          <h5 className="add-a-recipe-title">Image URL</h5>
          <input placeholder="https://example.com/" input="text" className="add-a-recipe-input"/>
          <h5 className="add-a-recipe-title">Ingredients</h5>
          <input id="ingredientValue" placeholder="eg. Chicken" input="text" className="add-a-recipe-input"/>
          <button type="button" className="ingredients-button" onClick={this.handleClickIngredients}>BIG BUTTON</button>
          <ul id="addAnIngredientUl" className="add-a-recipe-ingredientsList">
          </ul>
          <h5 className="add-a-recipe-title">Instructions</h5>
          <input id="instructionValue" placeholder="eg. Preheat the oven to 325 deg" input="text" className="add-a-recipe-input"/>
          <button type="button" className="ingredients-button" onClick={this.handleClickInstructions}>BIG BUTTON</button>
          <ul id="addAnInstructionUl" className="add-a-recipe-instructionsList">
          </ul>
          <button type="submit" className="add-a-recipe-button">SUBMIT RECIPE</button>
        </form>
      </div>
    );
  }
}
