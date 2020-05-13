import React from 'react';
import { withRouter } from 'react-router-dom';
import AppContext from '../lib/context';

export default function requireAuth(Page) {

  class WithAuth extends React.Component {
    componentDidMount() {
      const user = this.context.getUser();
      if (!user.userId) this.props.history.push('/login');
    }

    render() {
      const user = this.context.getUser();
      if (!user.userId) return null;
      return (
        <Page/>
      );
    }
  }

  WithAuth.contextType = AppContext;
  return withRouter(WithAuth);
}
