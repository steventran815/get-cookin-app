import React from 'react';
import Footer from './footer';
import Header from './header';
import RecipeList from './recipeList';
import FridgeList from './fridgeList';
import Search from './search';
import FavoritesList from './favorites';
import AddARecipe from './addARecipe';
import RecipeDetails from './recipeDetails';
import Login from './login';
import AppContext from '../lib/context';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      user: {
        userId: null,
        userName: ''
      },
      recipes: []
    };
    this.onLogin = this.onLogin.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.contextValue = {
      getUser: this.getUser.bind(this),
      getFavs: this.getFavs.bind(this),
      logout: this.logout.bind(this)
    };
  }

  onLogin(userId) {
    if (!userId) return;
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(user => this.setState({
        user: user,
        login: !this.state.login
      }))
      .then(() => this.getFavorites());

  }

  getFavorites() {
    fetch('/api/favoriteRecipes')
      .then(FavoritesList => FavoritesList.json())
      .then(recipes => this.setState({
        recipes: recipes
      }))
      .catch(err => console.error(err));
  }

  getUser() {
    return this.state.user;
  }

  getFavs() {
    return this.state.recipes;
  }

  logout() {
    this.setState({
      user: {
        userId: null,
        userName: ''
      }
    });
  }

  render() {
    if (!this.state.user.userId) {
      return <Login onLogin={this.onLogin}/>;
    } else {
      return (
        <AppContext.Provider value={this.contextValue}>
          <Router>
            <Header />
            <Route path="/recipeList" exact component={RecipeList}/>
            <Route path="/recipeList/:id" component={RecipeDetails} />
            <Route path="/fridgeList" component={FridgeList} />
            <Route path="/favoritesList" component={FavoritesList} />
            <Route path="/search" component={Search} />
            <Route path="/addARecipe" component={AddARecipe} />
            <Footer />
          </Router>
        </AppContext.Provider>
      );
    }
  }
}
