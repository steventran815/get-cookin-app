import React from 'react';
import Ingredient from './ingredient';

export default class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);

  }

  componentDidMount() {
    this.getIngredients(1); // hard coded userID; to be changed in the future with new users
  }

  getIngredients(userId) {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(ingredients => this.setState({
        ingredients: ingredients
      }))
      .catch(err => console.error(err));
  }


  addIngredients(newIngredient) {
    fetch('/api/ingredients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newIngredient)
    })
      .then(res => res.json())
      .then(data => {
        const newData = this.state.ingredients.concat(data);
        return this.setState(state => ({ ingredients: newData }));
      })
      .catch(error => console.error('Error:', error));
  }

  handleChange(event) {
    this.setState({ newIngredient: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newIngredient = {
      name: this.state.newIngredient
    };
    this.addIngredients(newIngredient);
  }
  
  deleteIngredient(ingredientId) {
    const { ingredients } = this.state;
    const req = {
      method: 'DELETE'
    };
    fetch(`/api/userIngredients/${ingredientId}`, req)
      .then(() => {
        const filtered = ingredients.filter(ingredient => ingredient.ingredientId !== ingredientId);
        this.setState({
          ingredients: filtered
        });
      })
      .catch(err => console.error(err));

  }

  render() {
    const { ingredients } = this.state;

    const userIngredients = ingredients.map(ingredient => {
      return (
        <Ingredient
          key={ingredient.ingredientId}
          ingredient={ingredient}
          deleteIngredient={this.deleteIngredient}
        />
      );
    });

    return (
      <div className="container">
        <div className="input-group my-3 px-2">
          <input
            className="form-control add-input"
            type="text"
            onChange={this.handleChange}
            placeholder="Add an Ingredient"
            maxLength="20"/>
          <div className="input-group-append">
            <button onClick={this.handleSubmit} className="btn btn-info add-input pr-3"><i className="fas fa-plus"></i></button>
          </div>
        </div>
        <ul className="list-group list-group-flush">
          {userIngredients}
        </ul>
        <h5 className="noMoreIngredients">End of Ingredients List!</h5>
      </div>
    );
  }
}
