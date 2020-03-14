import React from "react";
import "./card.css"
import pokemonTypes from "./pokemonTypes"
import {HashRouter as Router, Link} from "react-router-dom";
import styled from 'styled-components';

//reference: https://stackoverflow.com/questions/37669391/how-to-get-rid-of-underline-for-link-component-of-react-router
const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const Card = (props) => {
    return(
        <StyledLink to={`pokemon/${props.pokemon.id}`} >
            <div className="Container">
                <div className="Card">
                    <div className="Card-img">
                            {/*<img src={pokemon.sprites.front_default} alt="" />*/}
                            <img className="img" src={`https://pokeres.bastionbot.org/images/pokemon/${props.pokemon.id}.png`} alt="" />
                    </div>
                    <div className="Card-name">
                        {props.pokemon.name}
                    </div>
                    <div className="Card-types">
                        {props.pokemon.types.map(type =>{
                            return(
                                <div className="Card-type" style={{backgroundColor:pokemonTypes[type.type.name]}}>
                                    {type.type.name}
                                </div>
                            )
                        })}
                    </div>
                    <div className="Card-info">
                        <div className="Card-data Card-data-weight">
                            <p className="title"> weight </p>
                            <p>{props.pokemon.weight}</p>
                        </div>
                        <div className="Card-data Card-data-height">
                            <p className="title"> height </p>
                            <p>{props.pokemon.height}</p>
                        </div>
                        <div className="Card-data Card-data-ability">
                            <p className="title"> ability</p>
                            <p>{props.pokemon.abilities[0].ability.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </StyledLink>
    )

}

export default Card;