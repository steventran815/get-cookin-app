import React from 'react';

export default class RecipeInstruction extends React.Component {

  render() {
    return (
      <li className="instructionListItem">{this.props.instruction.displayText}</li>
    );
  }
}
