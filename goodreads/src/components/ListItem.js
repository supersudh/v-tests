import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ListItem extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired
  };

  extractAverageRating(val) {
    if (typeof val === 'object') {
      return val._;
    }
    return val;
  }

  render() {
    const { book } = this.props;
    const best_book = book.best_book[0];
    return (
      <div className="card book-card">
        <img
          className="card-img-top book-card-img"
          src={best_book['image_url'][0]}
          alt="book_image"
        />
        <div className="card-body book-card-body">
          <h5 className="card-title">{best_book.title[0]}</h5>
          <div className="card-desc">
            <div className="label-value-section">
              <span className="_label">Author:</span>
              <span className="_value">{best_book.author[0].name[0]}</span>
            </div>

            <div className="label-value-section">
              <span className="_label">Average Rating:</span>
              <span className="_value">
                {this.extractAverageRating(book.average_rating[0])}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
