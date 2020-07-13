import React, { Component } from "react";
import PokeCalls from "./components/pokecalls/PokeCalls";
import SearchBar from "./components/searchBar/SearchBar";
import Detail from "./components/detail/Detail";
import NavBar from "./components/navbar/NavBar";
import Generations from "./components/generations/Generations";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ErrorMessage from "./components/errorMessage/ErrorMessage";
import Footer from "./components/footer/Footer";
import bg from "./bg.png"
import PokeGrid from "./components/pokegrid/PokeGrid";
import Search from "./components/searchBar/Search";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeFilters: []
        };
    }

    handleFilters = typeFilters => {
        if (!typeFilters) {
            this.setState({ typeFilters: [] });
        }
        this.setState({ typeFilters: typeFilters });
    };

    render() {
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <div>
                    <NavBar />
                    <SearchBar filter={this.handleFilters} />
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => <PokeCalls filterList={this.state.typeFilters} />}
                        />
                        <Route exact path="/detail/:name" component={Detail} />
                        <Route exact path="/generations/:num" component={Generations} />
                        <Route exact path="/search/:name" component={Search} />
                        <Route component={ErrorMessage} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
