import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    return (
      <h1>Hello World</h1>
    );
  }
}
