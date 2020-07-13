import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./pokegrid.css";
import Detail from "./../detail/Detail";

export default class PokeGrid extends Component {
  render() {
    return (
      <section className="pokeGridContainer">
        {this.props.pokemonList.map(({ name, id }) => (
          <Link key={id} to={`/detail/${name}`}>
            <div className="pokeGridItemContainer" key={id}>
              <img className="pokeImg"
                src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
                alt="pokemon"
              />
              <div className="tag">
                <span className="pokeName">
                  <p>{name}</p>
                  <p>#{id}</p>
                </span>
              </div>
            </div>
          </Link>

        ))}
        <Route exact path="detail/:name" component={Detail} />
      </section>
    );
  }
}
