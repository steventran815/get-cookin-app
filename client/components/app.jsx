import React from 'react';
import Footer from './footer';
import Header from './header';
import RecipeList from './recipeList';
import FridgeList from './fridgeList';
import Search from './search';
import FavoritesList from './favorites';
import ShoppingList from './shoppingList';
import RecipeDetails from './recipeDetails';
import Login from './login';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      login: true,
      user: {
        userId: 1,
        userName: ''
      }
    };
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(userId) {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(user => this.setState({
        user: user,
        login: !this.state.login
      }));
  }

  render() {
    if (this.state.login === true) {
      return <Login onLogin={this.onLogin}/>;
    } else {
      return (
        <Router>
          <Header />
          <Route path="/login" component={Login} />
          <Route path="/recipeList" exact component={RecipeList}/>
          <Route path="/recipeList/:id" component={RecipeDetails} />
          <Route path="/fridgeList" component={FridgeList} />
          <Route path="/favoritesList" component={FavoritesList} />
          <Route path="/search" component={Search} />
          <Route path="/shoppingList" component={ShoppingList} />
          <Footer />
        </Router>
      );
    }
  }
}
