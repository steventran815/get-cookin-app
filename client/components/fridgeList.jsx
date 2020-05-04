import React from 'react';

export default class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: []
    };
  }

  render() {
    return (
      <h1 className='testing'>FRIDGE PAGE</h1>
    );
  }
}
