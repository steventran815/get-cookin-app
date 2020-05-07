import React from 'react';

export default class RecipeIngredient extends React.Component {

  render() {
    return (
      <li className="ingredientsListItem">{this.props.ingredient}</li>
    );
  }
}
