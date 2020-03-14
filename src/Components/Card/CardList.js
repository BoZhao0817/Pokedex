import React, {Component, useEffect, useState} from "react";
import Card from "./Card";
import {getAllPokemon, getPokemon} from "../../Services/pokemon";

//hooks invalid if use class component
const CardList = () => {
        //data get from pokemon api,initial state pass an array
        const [pokemonData, setPokemonData] = useState([]);
        //store the url of next page
        const [nextpageUrl, setNextPageurl] = useState('');
        const [prevpageUrl, setPrevPageurl] = useState('');
        //set data state when use api
        const [loading, setLoading] = useState(true);
        // string
        const currentUrl = 'https://pokeapi.co/api/v2/pokemon'

        //one function, one array
        useEffect(() =>{
            async function fetchData(){
                let response = await getAllPokemon(currentUrl);
                console.log(response)
                //response is the data get from api, it has previous and next to the other page
                setNextPageurl(response.next);
                setPrevPageurl(response.previous);
                //passing the results array
                let pokemon = await loadingPokemon(response.results);
                //get data back from Api
                setLoading(false);
            }
            //recreate the function
            fetchData();

        },[]);

        const next = async () => {
            setLoading(true);
            let data = await getAllPokemon(nextpageUrl);
            await loadingPokemon(data.results);
            setNextPageurl(data.next);
            setPrevPageurl(data.previous);
            setLoading(false);
        }

        const prev = async () => {
            if (!prevpageUrl) return;
            setLoading(true);
            let data = await getAllPokemon(prevpageUrl);
            await loadingPokemon(data.results);
            setNextPageurl(data.next);
            setPrevPageurl(data.previous);
            setLoading(false);
        }


        const loadingPokemon = async (data) => {
            let _pokemonData = await Promise.all(data.map(async pokemon => {
                let pokemonRecord = await getPokemon(pokemon.url);
                return pokemonRecord
            }))
            setPokemonData(_pokemonData)
        }
        return(
            <div className="Outer-Container">
                <div className="btn">
                    <button onClick={prev}>Prev</button>
                    <button onClick={next}>Next</button>
                </div>
                <div className="card-grid-container">
                    {pokemonData.map((pokemon, i) => {
                        return <Card key ={i} pokemon = {pokemon}/>
                    })
                    }
                </div>
                <div className="btn">
                    <button onClick={prev}>Prev</button>
                    <button onClick={next}>Next</button>
                </div>
            </div>
        )
}

export default CardList
