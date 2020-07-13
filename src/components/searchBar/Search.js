import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import Loading from "../loading/Loading";
import PokeGrid from "../pokegrid/PokeGrid";
import Pages from "../pages/Pages";

const Search = props => {
    const [data, setData] = useState();
    const [SearchPokemonList, setSearchPokemonList] = useState();
    const [loaded, setLoaded] = useState(false);
    const [arrayLength, setarrayLength] = useState(0);
    //const pokemonId = props.match.params.num;
    const pokeName = props.match.params.name;
    useEffect(() => {
        fetchSearchData();
    }, []);
    useEffect(() => {
        fetchSearchData();
    }, [pokeName]);
    const fetchSearchData = async () => {
        setLoaded(false);
        const res = await axios.get(
            `https://pokeapi.co/api/v2/${pokeName}`
        );
        let pokeData = res.data.pokemon_species;
        setarrayLength(pokeData.length);
        const sortedPokemon = pokeData.sort(sortPokemons);
        setSearchPokemonList(sortedPokemon);
        FetchSearchPokemon(sortedPokemon);
    };
    const sortPokemons = (a, b) => {
        let regexPat = /\/pokemon-species\/(\d+)\//;
        let Aid = a.url.match(regexPat)[1];
        let Bid = b.url.match(regexPat)[1];
        return Aid - Bid;
    };
    const FetchSearchPokemon = async pokemon => {
        let regexPat = /\/pokemon-species\/(\d+)\//;
        let endNum;
        let startNum;
        let cutPokemon;
        let currentUrlParams = new URLSearchParams(window.location.search);
        let currentPageNum = currentUrlParams.get("page");
        if (currentPageNum > 6) {
            props.history.push("/404");
        }
        if (!currentPageNum) {
            endNum = 31;
            startNum = 0;
        } else {
            endNum = currentPageNum * 31;
            startNum = endNum - 31;
        }
        if (pokemon) {
            cutPokemon = pokemon.slice(startNum, endNum);
        } else {
            cutPokemon = SearchPokemonList.slice(startNum, endNum);
        }
        cutPokemon.map(pokemon => {
            let id = pokemon.url.match(regexPat)[1];
            return (pokemon["id"] = id);
        });

        setData(cutPokemon);
        setLoaded(true);
    };
    const handlePageClick = direction => {
        let currentUrlParams = new URLSearchParams(window.location.search);
        let currentPageNum = currentUrlParams.get("page");
        let stopNum = currentPageNum * 31;
        currentPageNum = parseInt(currentPageNum);
        if (!currentPageNum || (stopNum > arrayLength && direction === "next")) {
            currentPageNum = 1;
        }
        if (direction === "next" && stopNum < arrayLength) {
            currentPageNum = currentPageNum + 1;
        } else if (direction === "prev" && currentPageNum !== 1) {
            currentPageNum = currentPageNum - 1;
        } else {
            currentPageNum = 1;
        }
        currentUrlParams.set("page", currentPageNum);
        props.history.push(`?page=${currentPageNum}`);
        setLoaded(false);
        FetchSearchPokemon();
    };
    if (!loaded) {
        return (
            <div className="loadingContainer">
                {" "}
                <Loading />
            </div>
        );
    }
    return (
        <Fragment>
            <PokeGrid pokemonList={data} />
            <Pages handlePagesClick={handlePageClick} />
        </Fragment>
    );
};

export default withRouter(Search);
