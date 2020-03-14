import React, { Component } from 'react';
import Axios from 'axios';
import pokemonTypes from "./pokemonTypes";
import "./pokedex.css"
import ProgressBar from "./ProgressBar";
import { Route } from "react-router-dom";

export default class Pokedex extends Component {
    state = {
        name: '',
        pokemonIndex: '',
        imageUrl: '',
        types: [],
        description: '',
        stats: {
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            specialAttack: '',
            specialDefense: ''
        },
        height: '',
        weight: '',
        eggGroups: '',
        catchRate: '',
        abilities: '',
        genderRatioMale: '',
        genderRatioFemale: '',
        evs: '',
        hatchSteps: '',
    };

    async componentDidMount() {
        const { pokemonIndex } = this.props.match.params;
        //set up url for pokemon info
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

        //get pokemon info
        const pokemonResult = await Axios.get(pokemonUrl);
        const name = pokemonResult.data.name;
        const imageUrl = pokemonResult.data.sprites.front_default;
        let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

        // map all poke info
        pokemonResult.data.stats.map(stat => {
            switch (stat.stat.name) {
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat['base_stat'];
                    break;
                case 'defense':
                    defense = stat['base_stat'];
                    break;
                case 'speed':
                    speed = stat['base_stat'];
                    break;
                case 'special-attack':
                    specialAttack = stat['base_stat'];
                    break;
                case 'special-defense':
                    specialDefense = stat['base_stat'];
                    break;
                default:
                    break;
            }
        });

        // reformat the data to ..decimal
        const height = Math.round((pokemonResult.data.height * 0.328084 + 0.00001) * 100) / 100;
        const weight = Math.round((pokemonResult.data.weight * 0.220462 + 0.00001) * 100) / 100;

        // map all the types
        const types = pokemonResult.data.types.map(type => type.type.name);

        const abilities = pokemonResult.data.abilities
            .map(ability => {
                return ability.ability.name.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
            })
            .join(', ');
        //filter only pass what we declare, different from map
        const evs = pokemonResult.data.stats.filter(stat => {
                if (stat.effort > 0) {
                    return true;
                }
                return false;
            })
            .map(stat => {
                return `${stat.effort} ${stat.stat.name
                    .toLowerCase()
                    .split('-')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ')}`;
            })
            .join(', ');

        // get pokemon information
        await Axios.get(pokemonSpeciesUrl).then(res => {
            let description = '';
            res.data.flavor_text_entries.some(flavor => {
                if (flavor.language.name === 'en') {
                    description = flavor.flavor_text;
                    return;
                }
            });
            // this data can be found in poke api and easy to calculate
            const femaleRate = res.data['gender_rate'];
            const genderRatioFemale = 12.5 * femaleRate;
            const genderRatioMale = 12.5 * (8 - femaleRate);
            const catchRate = Math.round((100 / 255) * res.data['capture_rate']);

            const eggGroups = res.data['egg_groups'].map(group => {
                    return group.name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
                })
                .join(', ');

            const hatchSteps = 255 * (res.data['hatch_counter'] + 1);

            this.setState({
                description,
                genderRatioFemale,
                genderRatioMale,
                catchRate,
                eggGroups,
                hatchSteps
            });
        });

        this.setState({
            imageUrl,
            pokemonIndex,
            name,
            types,
            stats: {
                hp,
                attack,
                defense,
                speed,
                specialAttack,
                specialDefense
            },
            height,
            weight,
            abilities,
            evs
        });
    }

    render() {
        return (
            <div className="Outer">
                <div className="Content">
                    <div className="Card-detail">
                        <div className="Card-info">
                            <div className="Pokemon-index">
                                <h3>No.{this.state.pokemonIndex}</h3>
                            </div>
                            <div className="Card-info-upper">
                                <div className="Pokemon-img">
                                    <img className="card-img" src={this.state.imageUrl}/>
                                </div>
                                <div className="pokemon-type">
                                    {this.state.types.map(type => (
                                        <span key={type} className="badge" style={{backgroundColor:pokemonTypes[type]}}>
                                    {type.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
                                </span>
                                    ))}
                                </div>
                            </div>
                            <div className="Card-content">
                                <div className="Card-content description name">
                                    <h2>{this.state.name.toLowerCase()}</h2>
                                </div>
                                <div className="Card-content description properties">
                                    <h5>HP:{this.state.stats.hp}</h5>
                                    <ProgressBar percentage = {this.state.stats.hp}/>
                                </div>
                                <div className="Card-content description properties">
                                    <h5>Attack: {this.state.stats.attack}</h5>
                                    <ProgressBar percentage = {this.state.stats.attack}/>
                                </div>
                                <div className="Card-content description properties">
                                    <h5>Defense: {this.state.stats.defense}</h5>
                                    <ProgressBar percentage = {this.state.stats.defense}/>
                                </div>
                                <div className="Card-content description properties">
                                    <h5>Speed: {this.state.stats.speed}</h5>
                                    <ProgressBar percentage = {this.state.stats.speed}/>
                                </div>
                                <div className="Card-content description properties">
                                    <h5>Special Attack: {this.state.stats.specialAttack}</h5>
                                    <ProgressBar percentage = {this.state.stats.specialAttack}/>
                                </div>
                                <div className="Card-content description properties">
                                    <h5>Special Defense: {this.state.stats.specialDefense}</h5>
                                    <ProgressBar percentage = {this.state.stats.specialDefense}/>
                                </div>
                                <div className="Card-content description detail">
                                    <p className="pokemon-description-detail">{this.state.description}</p>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <hr/>
                        <div className="Card-body">
                            <div className="Card-body-content">
                                <div className="Card-title">
                                    <h2>Profile</h2>
                                </div>
                                <div className="Card-properties">
                                    <p>Height: {this.state.height} ft</p>
                                </div>
                                <div className="Card-properties">
                                    <p>Weight: {this.state.weight} lbs</p>
                                </div>
                                <div className="Card-properties">
                                    <p>Egg group: {this.state.eggGroups} </p>
                                </div>
                                <div className="Card-properties">
                                    <p>Hatch Step: {this.state.hatchSteps} </p>
                                </div>
                                <div className="Card-properties">
                                    <p>Abilities: {this.state.abilities} </p>
                                </div>
                                <div className="Card-properties">
                                    <p>EVs: {this.state.evs} </p>
                                </div>
                                <div className="Card-properties">
                                    <p>Gender Ratio: {this.state.genderRatioFemale}f/{this.state.genderRatioMale}m</p>
                                    {/*<ProgressBar percentage = {this.state.genderRatioFemale}/>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>





        );
    }
}