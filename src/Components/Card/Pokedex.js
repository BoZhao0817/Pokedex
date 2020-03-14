import React, { Component } from 'react';
import Axios from 'axios';
import pokemonTypes from "./pokemonTypes";
import "./pokedex.css"

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
                <div className="Card-detail">
                    <div className="Pokemon-index">
                        <h3>{this.state.pokemonIndex}</h3>
                    </div>
                    <div className="Card-header">
                            {this.state.types.map(type => (
                                <span key={type} className="badge" style={{backgroundColor:pokemonTypes[type]}}>
                                    {type.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}
                                </span>
                            ))}
                    </div>
                    <div className="Card-content">
                        <img className="card-img" src={this.state.imageUrl}/>
                        <div className="Card-content description name">
                            <h4>{this.state.name.toLowerCase()}</h4>
                            <div className="Progress-bar"></div>
                        </div>
                        <div className="Card-content description properties">
                            <h5>HP</h5>
                        </div>
                        <div className="Card-content description properties">
                            <h5>Attack</h5>
                        </div>
                        <div className="Card-content description properties">
                            <h5>Defense</h5>
                        </div>
                        <div className="Card-content description properties">
                            <h5>Speed</h5>
                        </div>
                        <div className="Card-content description properties">
                            <h5>Special Attack</h5>
                        </div>
                        <div className="Card-content description properties">
                            <h5>Special Defense</h5>
                        </div>
                        <div className="Card-content description detail">
                            <p>{this.state.description}</p>
                        </div>
                    </div>
                    <hr/>
                <div className="Card-body">
                        <div className="Card-title">
                            <h2>Profile</h2>
                        </div>
                        <div className="Card-properties">
                            <p>Height</p>
                            <p>{this.state.height} ft.</p>
                        </div>
                    </div>
                </div>
            </div>





        );
    }
}