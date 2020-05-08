import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      users: []
    };
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

  render() {
    const { users } = this.state;
    const options = users.map(user => {
      return (
        <option key={user.userId} value={user.userName}>{user.userName}</option>
      );
    });

    return (
      <form action="">
        <select className="form-control">
          <option>Select User</option>
          {options}
        </select>
      </form>
    );
  }
}
