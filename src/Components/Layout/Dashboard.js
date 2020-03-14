import React, {Component, useEffect, useState} from 'react';
import CardList from "../Card/CardList";


export default class Dashboard extends Component {
    render() {

        return (
                <div className="card-grid-container">
                    <CardList/>
                </div>

        );
    }
}