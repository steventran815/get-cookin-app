import React from 'react';
import Ingredient from './ingredient';

export default class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: []
    };
  }

  componentDidMount() {
    this.getIngredients(1);
  }

  getIngredients(userId) {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(ingredients => this.setState({
        ingredients: ingredients
      }))
      .catch(err => console.error(err));
  }

  render() {
    const { ingredients } = this.state;

    const userIngredients = ingredients.map(ingredient => {
      return (
        <Ingredient
          key={ingredient.ingredientId}
          ingredient={ingredient}
        />
      );
    });

    return (
      <div className="container">
        <div className="input-group my-3 px-2">
          <input className="form-control" type="text" placeholder="Add To Your Fridge"/>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">Button</button>
          </div>
        </div>
        <ul className="list-group list-group-flush">
          {userIngredients}
        </ul>
      </div>
    );
  }
}
