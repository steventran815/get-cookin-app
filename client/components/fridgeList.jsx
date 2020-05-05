import React from 'react';
import Ingredient from './ingredient';

export default class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: []
    };
  }

  render() {
    const dummy = [
      {
        ingredientId: 1,
        name: 'chicken',
        userId: 1
      },
      {
        ingredientId: 2,
        name: 'beef',
        userId: 1
      },
      {
        ingredientId: 3,
        name: 'pork',
        userId: 1
      },
      {
        ingredientId: 4,
        name: 'onion',
        userId: 1
      },
      {
        ingredientId: 5,
        name: 'carrot',
        userId: 1
      }
    ];

    const ingredients = dummy.map(ingredient => {
      return (
        <Ingredient
          key={ingredient.ingredientId}
          ingredient={ingredient}
        />
      );
    });

    return (
      <div className="container">
        <div className="form my-3 px-3">
          <input className="form-control" type="text" placeholder="Default input"/>
        </div>
        <ul className="list-group list-group-flush">
          {ingredients}
        </ul>
      </div>
    );
  }
}
