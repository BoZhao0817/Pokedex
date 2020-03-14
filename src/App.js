import React, {useEffect, useState} from 'react';
import './App.css';
import {getAllPokemon, getPokemon} from "./Services/pokemon";
import Card from "./Components/Card"
import Nav from "./Components/Nav/";
import bg from "./bg.png";
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Pokedex from "./Components/Card/Pokedex";
import SearchBar from "./Components/SearchBar/SearchBar";
import Dashboard from "./Components/Layout/Dashboard";

function App() {
  return (
      <Router>
        <div style={{background:`url(${bg})`}}>
            <div className="Header">
                {/*<Nav/>*/}
                <SearchBar/>
            </div>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/pokemon/:pokemonIndex" component={Pokedex} />
            </Switch>
          </div>
        </div>
      </Router>

  );
}

export default App;
