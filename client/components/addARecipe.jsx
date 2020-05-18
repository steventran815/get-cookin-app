import React from 'react';
import RecipeAdded from './recipeAdded';

export default class AddARecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeTitle: '',
      recipePrepTime: 0,
      recipeImage: '',
      ingredients: [],
      instructions: [],
      recipeAdded: false
    };
    this.handleClickIngredients = this.handleClickIngredients.bind(this);
    this.handleClickInstructions = this.handleClickInstructions.bind(this);
    this.handleRecipeTitleChange = this.handleRecipeTitleChange.bind(this);
    this.handlePrepTimeChange = this.handlePrepTimeChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.recipeAdded = this.recipeAdded.bind(this);
  }

  handleRecipeTitleChange(event) {
    this.setState({ recipeTitle: event.target.value });
  }

  handlePrepTimeChange(event) {
    this.setState({ recipePrepTime: parseInt(event.target.value) });
  }

  handleImageChange(event) {
    this.setState({ recipeImage: event.target.value });
  }

  handleClickIngredients() {
    const ingredientValue = document.getElementById('ingredientValue').value.toLowerCase();
    if (ingredientValue === '') { return; }
    const ingredientsClone = this.state.ingredients.slice();
    ingredientsClone.push(ingredientValue);
    this.setState({
      ingredients: ingredientsClone
    });

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
    const instructionObj = {};
    instructionObj.step = this.state.instructions.length + 1;
    instructionObj.displayText = document.getElementById('instructionValue').value;
    const instuctionsClone = this.state.instructions.slice();
    instuctionsClone.push(instructionObj);
    this.setState({
      instructions: instuctionsClone
    });
    const instructionUl = document.getElementById('addAnInstructionUl');
    const instructionListItem = document.createElement('li');
    const instructionTextNode = document.createTextNode(instructionValue);
    instructionListItem.appendChild(instructionTextNode);
    instructionListItem.classList.add('added-instruction');
    instructionUl.appendChild(instructionListItem);
    document.getElementById('instructionValue').value = '';
  }

  addRecipe(newRecipe) {
    fetch('/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRecipe)
    })
      .then(res => res.json())
      .then(data => {
        return <h1>Your Recipe has Been Added!</h1>;
      })
      .catch(error => console.error('Error:', error));
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.ingredients.length === 0 || this.state.instructions.length === 0) {
      return;
    }
    this.recipeAdded();
    const ingredientUl = document.getElementById('addAnIngredientUl');
    const instructionUl = document.getElementById('addAnInstructionUl');
    const newRecipe = {
      recipeTitle: this.state.recipeTitle,
      recipePrepTime: this.state.recipePrepTime,
      recipeImage: this.state.recipeImage,
      ingredients: this.state.ingredients,
      instructions: this.state.instructions
    };
    this.addRecipe(newRecipe);
    this.setState({
      recipeTitle: '',
      recipePrepTime: 0,
      recipeImage: '',
      ingredients: [],
      instructions: []
    });
    document.getElementById('addARecipeForm').reset();
    while (ingredientUl.firstChild) {
      ingredientUl.removeChild(ingredientUl.firstChild);
    }
    while (instructionUl.firstChild) {
      instructionUl.removeChild(instructionUl.firstChild);
    }
  }

  recipeAdded() {
    this.setState({
      recipeAdded: !this.state.recipeAdded
    });
  }

  render() {
    if (this.state.recipeAdded === true) {
      return <RecipeAdded toggle={this.recipeAdded} />;
    } else {
      return (
        <div className="add-a-recipe-div">
          <form id="addARecipeForm" onSubmit={this.handleSubmit} className="add-a-recipe-form">
            <div>
              {/* TITLE */}
              <h6 className="add-a-recipe-title">Recipe Name</h6>
              <input required value={this.state.value} onChange={this.handleRecipeTitleChange} placeholder="eg. Chicken Sandwich" input="text" className="add-a-recipe-input"/>
            </div>
            <div>
              {/* PREP TIME */}
              <h6 className="add-a-recipe-title">Cooking Time <span className="in-minutes">(In Minutes)</span></h6>
              <input type="number" required value={this.state.value} onChange={this.handlePrepTimeChange} placeholder="eg. 60" className="add-a-recipe-input"/>
            </div>
            <div>
              {/* IMAGE */}
              <h6 className="add-a-recipe-title">Image URL</h6>
              <input required value={this.state.value} onChange={this.handleImageChange} placeholder="https://example.com/" input="text" className="add-a-recipe-input"/>
            </div>
            <div>
              {/* INGREDIENTS */}
              <h6 className="add-a-recipe-title">Ingredients</h6>
              <div className="add-a-recipe-input-instruction">
                <input id="ingredientValue" placeholder="eg. Chicken" input="text" className="add-a-recipe-input" />
                <button type="button" className="ingredients-button" onClick={this.handleClickIngredients}><i className="fa fa-plus"></i></button>
              </div>
              <ul id="addAnIngredientUl" className="add-a-recipe-ingredientsList"></ul>
            </div>
            <div>
              {/* INSTRUCTIONS */}
              <h6 className="add-a-recipe-title">Instructions</h6>
              <div className="add-a-recipe-input-ingredient">
                <input id="instructionValue" placeholder="eg. Preheat the oven to 325 deg" input="text" className="add-a-recipe-input"/>
                <button type="button" className="ingredients-button" onClick={this.handleClickInstructions}><i className="fa fa-plus"></i></button>
              </div>
              <ul id="addAnInstructionUl" className="add-a-recipe-instructionsList"></ul>
            </div>
            <button id="submitButton" type="submit" className="add-a-recipe-button">SUBMIT RECIPE</button>
            <div className="noMoreIngredients">
            </div>
          </form>
        </div>
      );
    }
  }
}
