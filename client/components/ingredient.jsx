import React from 'react';

export default class Ingredient extends React.Component {
  render() {
    const { ingredient } = this.props;

    return (
      <li className="list-group-item d-flex justify-content-between align-items-center background">
        {ingredient.name.toUpperCase()}
        <i className="fas fa-minus-square red"></i>
      </li>
    );
  }
}
