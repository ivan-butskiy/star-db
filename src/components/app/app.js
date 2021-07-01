import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from "../error-boundary";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import { SwapiServiceProvider } from "../swapi-service-context";
import { PeoplePage, PlanetPage, StarshipPage } from '../pages';

import './app.css';
export default class App extends Component {

    state = {
        swapiService: new SwapiService()
    };

    onServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;
            return { swapiService: new Service() }
        });
    };

    render() {

        return (
            <ErrorBoundary>
                <SwapiServiceProvider value={ this.state.swapiService } >
                    <div className="container mb-5">
                        <Header onServiceChange={this.onServiceChange} />
                        <RandomPlanet  />
                        <PeoplePage />
                        <PlanetPage />
                        <StarshipPage />
                    </div>
                </SwapiServiceProvider>
            </ErrorBoundary>
        );
    };
};

// toggleRandomPlanet = () => {
//     this.setState((state) => {
//         return {
//             showRandomPlanet: !state.showRandomPlanet
//         };
//     });
// };

// <button
//     className="toggle-planet btn btn-warning btn-lg"
//     onClick={ this.toggleRandomPlanet }
// >
//   Toggle Random Planet
// </button>
// <span className="error-button-span"><ErrorButton /></span>
