import React from 'react';

export default class AddARecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeTitle: '',
      recipePrepTime: 0,
      recipeImage: '',
      recipeIngredients: [],
      recipeInstructions: []
    };
    this.handleClickIngredients = this.handleClickIngredients.bind(this);
    this.handleClickInstructions = this.handleClickInstructions.bind(this);
    this.handleRecipeTitleChange = this.handleRecipeTitleChange.bind(this);
    this.handlePrepTimeChange = this.handlePrepTimeChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleRecipeTitleChange(event) {
    this.setState({ recipeTitle: event.target.value });
  }

  handlePrepTimeChange(event) {
    this.setState({ recipePrepTime: event.target.value });
  }

  handleImageChange(event) {
    this.setState({ recipeImage: event.target.value });
  }

  handleClickIngredients() {
    const ingredientsclone = this.state.recipeIngredients.slice();
    ingredientsclone.push(document.getElementById('ingredientValue').value);
    this.setState({
      recipeIngredients: ingredientsclone
    });
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
    const instructionObj = {};
    instructionObj.step = this.state.recipeInstructions.length + 1;
    instructionObj.textContent = document.getElementById('instructionValue').value;
    const instuctionsClone = this.state.recipeInstructions.slice();
    instuctionsClone.push(instructionObj);
    this.setState({
      recipeInstructions: instuctionsClone
    });

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
          <div>
            {/* TITLE */}
            <h5 className="add-a-recipe-title">Recipe Name</h5>
            <input required value={this.state.value} onChange={this.handleRecipeTitleChange} placeholder="eg. Chicken Sandwich" input="text" className="add-a-recipe-input"/>
          </div>
          <div>
            {/* PREP TIME */}
            <h5 className="add-a-recipe-title">Cooking Time <span className="in-minutes">(In Minutes)</span></h5>
            <input required value={this.state.value} onChange={this.handlePrepTimeChange} placeholder="eg. 60" className="add-a-recipe-input"/>
          </div>
          <div>
            {/* IMAGE */}
            <h5 className="add-a-recipe-title">Image URL</h5>
            <input required value={this.state.value} onChange={this.handleImageChange} placeholder="https://example.com/" input="text" className="add-a-recipe-input"/>
          </div>
          <div>
            {/* INGREDIENTS */}
            <h5 className="add-a-recipe-title">Ingredients</h5>
            <div className="add-a-recipe-input-instruction">
              <input required id="ingredientValue" placeholder="eg. Chicken" input="text" className="add-a-recipe-input" />
              <button type="button" className="ingredients-button" onClick={this.handleClickIngredients}><i className="fa fa-plus"></i></button>
            </div>
            <ul id="addAnIngredientUl" className="add-a-recipe-ingredientsList"></ul>
          </div>
          <div>
            {/* INSTRUCTIONS */}
            <h5 className="add-a-recipe-title">Instructions</h5>
            <div className="add-a-recipe-input-ingredient">
              <input required id="instructionValue" placeholder="eg. Preheat the oven to 325 deg" input="text" className="add-a-recipe-input"/>
              <button type="button" className="ingredients-button" onClick={this.handleClickInstructions}><i className="fa fa-plus"></i></button>
            </div>
            <ul id="addAnInstructionUl" className="add-a-recipe-instructionsList"></ul>
          </div>
          <button type="submit" className="add-a-recipe-button">SUBMIT RECIPE</button>
        </form>
      </div>
    );
  }
}
