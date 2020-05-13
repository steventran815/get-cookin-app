import React from 'react';
import CreateUser from './createUser';
import AppContext from '../lib/context';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
      users: [],
      view: {
        name: 'login'
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
    this.setView = this.setView.bind(this);
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
    if (!selectedId) return;
    fetch(`/api/users/${selectedId}`)
      .then(res => res.json())
      .then(user => {
        this.context.onLogin(user);
        this.props.history.push('/');
      });
  }

  createNewUser(newUser) {
    const req =
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON'
      },
      body: JSON.stringify(newUser)
    };

    fetch('/api/newUser', req)
      .then(res => res.json())
      .then(data => {
        this.setState({
          users: this.state.users.concat(data),
          view: {
            name: 'login'
          }
        });
      });
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

    if (view.name === 'create') return <CreateUser createNewUser={this.createNewUser} setView={this.setView}/>;

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
              <button type="submit" className="btn btn-secondary btn-block mt-2 login-button">Log In</button>
            </form>
          </div>
          <p className="text-center pt-3">- or -</p>
          <button type="click" className="btn btn-secondary btn-block mt-2 login-button" onClick={() => this.setView('create')}>Create New User</button>
        </div>

      </div>
    );
  }
}

Login.contextType = AppContext;
