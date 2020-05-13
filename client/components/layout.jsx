import React from 'react';
import Header from './header';
import Footer from './footer';
import AppContext from '../lib/context';

export default class Layout extends React.Component {
  render() {
    const user = this.context.getUser();

    return (
      <>
        { user.userId && <Header /> }
        { this.props.children }
        { user.userId && <Footer /> }
      </>
    );
  }
}

Layout.contextType = AppContext;
