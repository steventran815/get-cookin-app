import React from 'react';
import CreateUser from './createUser';
import AppContext from '../lib/context';
import MobileWarning from './mobileWarning.jsx';
import IntroModal from './introModal.jsx';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
      users: [],
      mobileWarning: true,
      introModal: true,
      view: {
        name: 'login'
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.setView = this.setView.bind(this);
    this.handleMobileWarning = this.handleMobileWarning.bind(this);
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

  handleModal() {
    this.setState({
      introModal: false
    });
  }

  handleMobileWarning() {
    this.setState({
      mobileWarning: false
    });
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
    let introModal = null;
    let mobileWarning = null;
    if (this.state.mobileWarning === true) {
      mobileWarning = <MobileWarning handleMobileWarningFunction={this.handleMobileWarning}/>;
    } else {
      mobileWarning = null;
    }
    if (this.state.introModal === true) {
      introModal = <IntroModal handleModalFunction={this.handleModal}/>;
    } else {
      introModal = null;
    }
    const { users, view } = this.state;
    const options = users.map(user => {
      return (
        <option key={user.userId} value={user.userId}>{user.userName}</option>
      );
    });

    if (view.name === 'create') return <CreateUser createNewUser={this.createNewUser} setView={this.setView}/>;

    return (
      <div>
        {mobileWarning}
        {introModal}
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
      </div>
    );
  }
}

Login.contextType = AppContext;
