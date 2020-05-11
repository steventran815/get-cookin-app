import React from 'react';
import CreateUser from './createUser';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
      users: [],
      view: {
        name: 'create'
      }
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
    const { onLogin } = this.props;
    onLogin(selectedId);
  }

  setView(name) {
    this.setState({
      view: {
        name: name
      }
    });
  }

  render() {
    const { users, view } = this.state;
    const options = users.map(user => {
      return (
        <option key={user.userId} value={user.userId}>{user.userName}</option>
      );
    });

    if (view.name === 'create') return <CreateUser/>;

    return (
      <div className="d-flex align-items-center login-background">
        <div className="container">
          <div className="title w-100 text-center">
            <div>
              <img src="/images/getCookinLogoWhite.png" alt="get_cookin"/>
            </div>
            <h1 className="page-title">
            Get Cookin&apos;
            </h1>
          </div>

          <div className="form-input w-100">
            <label className="select-label">What&apos;s in your fridge?</label>
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
          <p className="text-center pt-3">- or -</p>
          <button type="click" className="btn btn-secondary btn-block mt-2">Create New User</button>
        </div>

      </div>
    );
  }
}
