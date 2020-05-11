import React from 'react';

export default class CreateUser extends React.Component {
  render() {
    return (
      <div className="d-flex align-items-center login-background">
        <div className="container">
          <div className="form-input">
            <label className="select-label">Create a new username</label>
            <form id="usersList">
              <input type="text" className="form-control"/>
              <button type="submit" className="btn btn-secondary btn-block mt-2">Log In</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

}
