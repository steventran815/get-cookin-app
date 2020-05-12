import React from 'react';

export default class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange() {
    this.setState({
      userName: event.target.value
    });
  }

  handleSubmit() {
    event.preventDefault();
    const { userName } = this.state;
    const newUser = {
      userName: userName
    };
    this.props.createNewUser(newUser);
  }

  render() {
    return (
      <div className="d-flex align-items-center login-background">
        <div className="container">
          <div className="form-input">
            <label className="select-label">Create a new username</label>
            <form id="usersList" onSubmit={this.handleSubmit} onReset={() => this.props.setView('login')}>
              <input
                required
                id="addUser"
                className="form-control"
                type="text"
                onChange={this.handleChange}/>
              <button type="submit" className="btn btn-dark btn-block mt-2">Create User</button>
              <button type="reset" className="btn btn-dark btn-block mt-2">Cancel</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
