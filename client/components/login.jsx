import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
      users: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => this.setState({
        users: data
      }));
  }

  handleChange(event) {
    this.setState({
      selectedId: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { selectedId } = this.state;
    // eslint-disable-next-line no-console
    console.log(selectedId);
  }

  render() {
    const { users } = this.state;
    const options = users.map(user => {
      return (
        <option key={user.userId} value={user.userId}>{user.userName}</option>
      );
    });

    return (
      <div className="container d-flex flex-wrap align-items-center">
        <div className="title w-100 text-center">
          <div>
            <img src="/images/getCookinLogoRed.png" alt="get_cookin"/>
          </div>
          <h1>
            Get Cookin&apos;
          </h1>
        </div>

        <div className="form-input w-100">
          <label htmlFor="exampleFormControlSelect1">What&apos;s in your fridge?</label>
          <form id="usersList" onSubmit={this.handleSubmit}>
            <select
              className="form-control"
              value={this.state.value}
              onChange={this.handleChange}>
              <option>Select User</option>
              {options}
            </select>
            <button type="submit" className="btn btn-secondary btn-block mt-2">Log In</button>
          </form>
        </div>

      </div>
    );
  }
}
