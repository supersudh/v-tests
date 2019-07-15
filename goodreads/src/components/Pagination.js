import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Pagination extends Component {
  static propTypes = {
    activePage: PropTypes.number.isRequired,
    booksResult: PropTypes.object.isRequired,
    onChangePage: PropTypes.func.isRequired,
    isFetchingData: PropTypes.bool.isRequired
  };

  render() {
    const {
      activePage,
      booksResult,
      isFetchingData,
      onChangePage
    } = this.props;
    if (isFetchingData) return null;
    if (booksResult.GoodreadsResponse) {
      const search = booksResult.GoodreadsResponse.search[0];
      if (
        typeof search.results[0] === 'object' &&
        'work' in search.results[0]
      ) {
        const totalPages = Math.ceil(search['total-results'][0] / 20);

        if (totalPages <= 5) {
          return (
            <nav>
              <ul className="pagination">
                {[...Array(totalPages).keys()].map((page, i) => {
                  const thisPage = page + 1;
                  if (thisPage === activePage) {
                    return (
                      <li className="page-item active" key={`pagination-${i}`}>
                        <span className="page-link">{thisPage}</span>
                      </li>
                    );
                  } else {
                    return (
                      <li className="page-item" key={`pagination-${i}`}>
                        <span
                          className="page-link"
                          onClick={onChangePage.bind(this, thisPage)}
                        >
                          {thisPage}
                        </span>
                      </li>
                    );
                  }
                })}
              </ul>
            </nav>
          );
        } else {
          // totalPages > 5
          if (activePage < 5) {
            return (
              <nav>
                <ul className="pagination">
                  {activePage > 1 ? (
                    <li
                      className="page-item"
                      onClick={onChangePage.bind(this, activePage - 1)}
                    >
                      <span className="page-link">Previous</span>
                    </li>
                  ) : (
                    <li className="page-item disabled">
                      <span className="page-link">Previous</span>
                    </li>
                  )}

                  {[...Array(4).keys()].map((page, i) => {
                    const thisPage = page + 1;
                    if (thisPage === activePage) {
                      return (
                        <li
                          className="page-item active"
                          key={`pagination-${i}`}
                        >
                          <span className="page-link">{thisPage}</span>
                        </li>
                      );
                    } else {
                      return (
                        <li className="page-item" key={`pagination-${i}`}>
                          <span
                            className="page-link"
                            onClick={onChangePage.bind(this, thisPage)}
                          >
                            {thisPage}
                          </span>
                        </li>
                      );
                    }
                  })}

                  {activePage === 4 ? (
                    <li className="page-item">
                      <span
                        className="page-link"
                        onClick={onChangePage.bind(this, 5)}
                      >
                        5
                      </span>
                    </li>
                  ) : null}

                  <li className="page-item">...</li>

                  <li className="page-item">
                    <span
                      className="page-link"
                      onClick={onChangePage.bind(this, totalPages)}
                    >
                      {totalPages}
                    </span>
                  </li>

                  {activePage !== totalPages ? (
                    <li
                      className="page-item"
                      onClick={onChangePage.bind(this, activePage + 1)}
                    >
                      <span className="page-link">Next</span>
                    </li>
                  ) : (
                    <li className="page-item disabled">
                      <span className="page-link">Next</span>
                    </li>
                  )}
                </ul>
              </nav>
            );
          } else if (activePage >= 5) {
            let isLastEnd = totalPages - activePage < 5;
            let midArray = [];
            if (isLastEnd) {
              midArray = [activePage - 2, activePage - 1, activePage];
            } else {
              midArray = [activePage - 1, activePage, activePage + 1];
            }
            return (
              <nav>
                <ul className="pagination">
                  <li
                    className="page-item"
                    onClick={onChangePage.bind(this, activePage - 1)}
                  >
                    <span className="page-link">Previous</span>
                  </li>

                  <li className="page-item">
                    <span
                      className="page-link"
                      onClick={onChangePage.bind(this, 1)}
                    >
                      1
                    </span>
                  </li>

                  <li className="page-item">...</li>

                  {midArray.map((page, i) => {
                    const thisPage = page;
                    if (thisPage === activePage) {
                      return (
                        <li
                          className="page-item active"
                          key={`pagination-${i}`}
                        >
                          <span className="page-link">{thisPage}</span>
                        </li>
                      );
                    } else {
                      return (
                        <li className="page-item" key={`pagination-${i}`}>
                          <span
                            className="page-link"
                            onClick={onChangePage.bind(this, thisPage)}
                          >
                            {thisPage}
                          </span>
                        </li>
                      );
                    }
                  })}

                  <li className="page-item">...</li>

                  {isLastEnd ? null : (
                    <li className="page-item">
                      <span
                        className="page-link"
                        onClick={onChangePage.bind(this, totalPages)}
                      >
                        {totalPages}
                      </span>
                    </li>
                  )}

                  {isLastEnd && activePage !== totalPages ? (
                    <li className="page-item">
                      <span
                        className="page-link"
                        onClick={onChangePage.bind(this, totalPages)}
                      >
                        {totalPages}
                      </span>
                    </li>
                  ) : null}

                  {activePage !== totalPages ? (
                    <li
                      className="page-item"
                      onClick={onChangePage.bind(this, activePage + 1)}
                    >
                      <span className="page-link">Next</span>
                    </li>
                  ) : (
                    <li className="page-item disabled">
                      <span className="page-link">Next</span>
                    </li>
                  )}
                </ul>
              </nav>
            );
          }
        }
      }
    }
    return null;
  }
}
