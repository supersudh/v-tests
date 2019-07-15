import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import SearchBar from './components/SearchBar';
import List from './components/List';
import Pagination from './components/Pagination';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      booksResult: {},
      searchTerm: '',
      isFetchingData: false,
      activePage: 1
    };
  }

  onChangeSearchTerm = evt => this.setState({ searchTerm: evt.target.value });

  toggleIsFetchingData = () =>
    this.setState(({ isFetchingData }) => ({
      isFetchingData: !isFetchingData
    }));

  onSearch = async () => {
    try {
      const { activePage, searchTerm, isFetchingData } = this.state;
      if (searchTerm && !isFetchingData) {
        this.toggleIsFetchingData();
        const { data } = await axios.get(
          `http://localhost:8080?q=${searchTerm}&page=${activePage}`
        );
        this.setState({ booksResult: data });
        this.toggleIsFetchingData();
      }
    } catch (e) {
      this.toggleIsFetchingData();
      console.error(e);
    }
  };

  onChangePage = page => this.setState({ activePage: page }, this.onSearch);

  render() {
    const { activePage, booksResult, isFetchingData } = this.state;
    return (
      <div className="container mt-5">
        <SearchBar
          onSearch={this.onSearch}
          onChangeSearchTerm={this.onChangeSearchTerm}
          searchTerm={this.state.searchTerm}
        />

        <List booksResult={booksResult} isFetchingData={isFetchingData} />
        <Pagination
          activePage={activePage}
          onChangePage={this.onChangePage}
          booksResult={booksResult}
          isFetchingData={isFetchingData}
        />
      </div>
    );
  }
}
