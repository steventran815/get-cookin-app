import React from 'react';

export default class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({
      newUser: event.target.value
    });
  }

  render() {
    return (
      <div className="d-flex align-items-center login-background">
        <div className="container">
          <div className="form-input">
            <label className="select-label">Create a new username</label>
            <form id="usersList">
              <input
                required
                id="addIngredient"
                className="form-control"
                type="text"
                onChange={this.handleChange}
                maxLength="20" />
              <button type="submit" className="btn btn-dark btn-block mt-2">Log In</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

}
