//reference: https://github.com/lwatson2/react-pokedex
import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import Pokedex from "../Card/Pokedex";
import "./searchbar.css";


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
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
            return this.props.history.push(`/pokemon/${searchQuery}`);
        }
    };

    render() {
        const { searchQuery} = this.state;
        return (
            <div className="Search-bar">
                <form className="Search-form" onSubmit={this.handleSubmit}>
                    <input
                        placeholder="Pokemon"
                        value={searchQuery}
                        onChange={this.handleChange}
                        className="inputField"
                    />
                    <button className="submitButton">
                        <p>Search</p>
                    </button>
                </form>
                <Route exact path="/pokemon/${searchQuery}" component={Pokedex} />
            </div>
        );
    }
}
export default withRouter(SearchBar);