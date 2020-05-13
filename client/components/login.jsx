import React from 'react';
import CreateUser from './createUser';

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
    const { onLogin } = this.props;
    onLogin(selectedId);
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
          <div className="title mb-3 w-100 text-center">
            <div>
              <img className="login-logo" src="/images/getCookinLogoWhite.png" alt="get_cookin"/>
            </div>
            <h2 className="page-title">
            GET COOKIN&apos;
            </h2>
          </div>

          <div className="form-input w-100">
            <form id="usersList" onSubmit={this.handleSubmit}>
              <select
                className="form-control select-user"
                value={this.state.value}
                onChange={this.handleChange}>
                <option>Select User</option>
                {options}
              </select>
              <button type="submit" className="btn btn-secondary btn-block mt-2 login-button">LOGIN</button>
            </form>
          </div>
          <div className="or-div">
            <hr className="login-hr"></hr>
            <h5 className="text-center p-3 text-white login-or"> OR </h5>
            <hr className="login-hr"></hr>
          </div>
          <button type="click" className="btn btn-secondary btn-block login-button" onClick={() => this.setView('create')}>CREATE NEW USER</button>
        </div>
      </div>
    );
  }
}
