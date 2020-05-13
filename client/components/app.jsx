import React from 'react';
import RecipeList from './recipeList';
import FridgeList from './fridgeList';
import Search from './search';
import FavoritesList from './favorites';
import AddARecipe from './addARecipe';
import RecipeDetails from './recipeDetails';
import Login from './login';
import AppContext from '../lib/context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './layout';
import requireAuth from './require-auth';

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
    this.contextValue = {
      getUser: this.getUser.bind(this),
      logout: this.logout.bind(this),
      onLogin: this.onLogin.bind(this)
    };
  }

  onLogin(user) {
    this.setState({
      user: user
    });
  }

  getUser() {
    return this.state.user;
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
    return (
      <AppContext.Provider value={this.contextValue}>
        <Router>
          <Layout>
            <Switch>
              <Route path="/" exact component={requireAuth(FridgeList)} />
              <Route path="/login" component={Login} />
              <Route path="/recipeList" exact component={requireAuth(RecipeList)}/>
              <Route path="/recipeList/:id" component={RecipeDetails} />
              <Route path="/favoritesList" component={requireAuth(FavoritesList)} />
              <Route path="/search" component={requireAuth(Search)} />
              <Route path="/addARecipe" component={requireAuth(AddARecipe)} />
            </Switch>
          </Layout>
        </Router>
      </AppContext.Provider>
    );
  }
}
