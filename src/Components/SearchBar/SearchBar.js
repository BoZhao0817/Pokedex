import React, { Component } from 'react';
import "./searchbar.css";
import axios from 'axios';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query:'',
            results: {},
            loading: false,
            message:''
        }
    }

    fetchSearchResult = (updatedPageNo, query) =>{
        const searchUrl = "https://pokeapi.co/api/v2/type/${pokemonIndex}"

    }

    handleOnInputChange = (event) =>{
        const query = event.target.value;
        this.setState({query:query, loading:true, message:''});
    }

    render() {
        const {query} = this.state;

        return (
            <div className="Search-outer">
                <div className="Search-container">
                    {/*<form>*/}
                    {/*    <input placeholder="Pokemon" className="SearchBar"/>*/}
                    {/*</form>*/}
                    <label className="Search-label" htmlFor={"search-input"}>
                        <input
                            name="query"
                            type="text"
                            value={query}
                            id="search-input"
                            placeholder="Pokemon"
                            onChange={this.handleOnInputChange}
                        />
                        <i className="fas fa-search" aria-hidden="true"/>
                    </label>
                </div>
            </div>

        );
    }
}