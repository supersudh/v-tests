import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchBar extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired
  };

  onClickSearch = () => {
    const { searchTerm } = this.props;
    if (searchTerm) {
      this.props.onSearch();
    }
  };

  render() {
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Find books by title, author, or ISBN"
          value={this.props.searchTerm}
          onChange={this.props.onChangeSearchTerm}
          onKeyPress={evt => {
            if (evt.charCode === 13) {
              this.onClickSearch();
            }
          }}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={this.onClickSearch}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}
