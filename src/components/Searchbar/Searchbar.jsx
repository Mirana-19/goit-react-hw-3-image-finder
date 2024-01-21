import React, { Component } from 'react';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  onInputChange = e => {
    this.setState({ query: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.onFormSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmit}>
          <input
            onChange={this.onInputChange}
            value={this.state.query}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />

          <button type="submit" className="Button">
            <span className="button-label">Search</span>
          </button>
        </form>
      </header>
    );
  }
}
