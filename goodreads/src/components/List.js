import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

export default class List extends Component {
  static propTypes = {
    booksResult: PropTypes.object.isRequired,
    isFetchingData: PropTypes.bool.isRequired
  };

  render() {
    const { booksResult, isFetchingData } = this.props;
    if (isFetchingData) {
      return <p>Loading...</p>;
    }
    if (booksResult.GoodreadsResponse) {
      const search = booksResult.GoodreadsResponse.search[0];
      if (
        typeof search.results[0] === 'object' &&
        'work' in search.results[0]
      ) {
        return (
          <div className="results-container mt-3">
            <strong>Total Results: {search['total-results'][0]}</strong>
            {search.results[0].work.map((book, i) => {
              return <ListItem key={`book-${i}`} book={book} />;
            })}
          </div>
        );
      } else {
        return (
          <div className="results-container mt-3">
            <strong>No Results Found.</strong>
          </div>
        );
      }
    }
    return null;
  }
}
