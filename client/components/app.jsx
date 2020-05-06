import React from 'react';
import Footer from './footer';
import Header from './header';
import RecipeList from './recipeList';
import FridgeList from './fridgeList';
import Search from './search';
import FavoritesList from './favorites';
import ShoppingList from './shoppingList';
import RecipeDetails from './recipeDetails';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      user: {
        userId: 1, // hard coded userId to pass as props
        userName: ''
      }
    };
  }

  render() {
    return (
      <Router>
        <Header />
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
