import React from 'react';
import Ingredient from './ingredient';
import AppContext from '../lib/context';

export default class FridgeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newIngredient: '',
      message: null,
      ingredients: [],
      isLoading: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  componentDidMount() {
    const user = this.context.getUser();
    this.getIngredients(user.userId);
    this.setState({
      isLoading: false
    });
  }

  getIngredients(userId) {
    fetch(`/api/userIngredients/${userId}`)
      .then(res => res.json())
      .then(ingredients => this.setState({
        ingredients: ingredients
      }))
      .catch(err => console.error(err));
  }

  addIngredients(newIngredient, userId) {
    fetch(`/api/ingredients/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newIngredient)
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          return this.setState(state => ({ message: data.message }));
        }
        return this.setState(state => ({ ingredients: data }));
      })
      .catch(error => console.error('Error:', error));
  }

  handleChange(event) {
    this.setState({
      newIngredient: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.context.getUser();
    const newIngredient = {
      name: this.state.newIngredient.toLowerCase(),
      newIngredient: ''
    };
    this.addIngredients(newIngredient, user.userId);
    this.setState({ newIngredient: '' });
    document.getElementById('addIngredient').value = '';
  }

  deleteIngredient(ingredientId) {
    const { ingredients } = this.state;
    const user = this.context.getUser();

    const req = {
      method: 'DELETE'
    };
    fetch(`/api/userIngredients/${user.userId}/${ingredientId}`, req)
      .then(() => {
        const filtered = ingredients.filter(ingredient => ingredient.ingredientId !== ingredientId);
        this.setState({
          ingredients: filtered
        });
      })
      .catch(err => console.error(err));
  }

  closeAlert() {
    this.setState({ message: null });
  }

  render() {
    const { ingredients } = this.state;
    const userIngredients = ingredients.map(ingredient => {
      return (
        <Ingredient
          key={ingredient.ingredientId}
          ingredient={ingredient}
          deleteIngredient={this.deleteIngredient}
        />
      );
    });
    return (
      <div className="container ingredient-list">
        {this.state.message
          ? <div className='alert alert-warning ingredient-exists flex justify-content-center'>
            <div className="d-flex justify-content-end closeButton">
              <span onClick={this.closeAlert}>&times;</span>
            </div>
            <center>
              <img className="ingredients-full-image" src="/images/getCookinFridgeFull.gif"/>
            </center>
            <h5 className="row p-3 text-center">{this.state.message}</h5>
          </div>
          : <form className="input-group my-3 px-2" onSubmit={this.handleSubmit}>
            <input
              required
              id="addIngredient"
              className="form-control add-input"
              type="text"
              onChange={this.handleChange}
              placeholder="Add an Ingredient"
              maxLength="20" />
            <div className="input-group-append">
              <button type="submit" className="btn btn-info add-input pr-3"><i className="fas fa-plus"></i></button>
            </div>
          </form>
        }
        <ul className="list-group list-group-flush">
          {userIngredients}
        </ul>
        <div className="noMoreIngredients">
        </div>
      </div>
    );
  }
}

FridgeList.contextType = AppContext;
