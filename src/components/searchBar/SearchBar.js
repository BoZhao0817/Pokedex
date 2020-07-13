import React, { Component } from "react";
import Detail from "./../detail/Detail";
import { Route } from "react-router-dom";
import Filter from "./../filter/Filter";
import { withRouter } from "react-router";
import "./SearchBar.css";

class SearchBar extends Component {
  static defaultProps = {
    searchQuery: ''}

  constructor(props) {
    super(props);
    this.state = {
      // searchQuery: "",
      showFilters: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    const inputValue = event.target.value;
    this.setState({ searchQuery: inputValue });

    if (!inputValue) return "";
  };
  handleSubmit = event => {
    const { searchQuery } = this.state;
    event.preventDefault();
    const value = this.state.searchQuery;
    this.setState({ searchQuery: "" });
    if (value) {
      return this.props.history.push(`/detail/${searchQuery}`);
    }
  };
  handleFilter = () => {
    this.setState({ showFilters: false });
  };

  render() {
    const { searchQuery, showFilters } = this.state;
    return (
      <div className="searchBar">
        <form className="searchForm" onSubmit={this.handleSubmit}>
          <input
            placeholder="Search Pokemon"
            value={searchQuery}
            onChange={this.handleChange}
            className="inputField"
          />

          <button className="submitButton">
            <i className="fas fa-search"/>
          </button>
        </form>
        {this.props.location.pathname === "/" && (
          <button
            className="filterButton"
            onClick={() => {
              this.setState({ showFilters: !showFilters });
            }}
          >
            Filter
          </button>
        )}
        {showFilters && (
          <Filter showFilter={this.handleFilter} filter={this.props.filter} />
        )}
        <Route exact path="detail/:name" component={Detail} />
      </div>
    );
  }
}
export default withRouter(SearchBar);
