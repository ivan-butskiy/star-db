import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from "../error-boundary";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import { SwapiServiceProvider } from "../swapi-service-context";
import StarshipDetails from "../sw-components/starship-details";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {
    PeoplePage,
    PlanetsPage,
    StarshipsPage,
    SecretPage,
    LoginPage
} from '../pages';

import './app.css';

export default class App extends Component {

    state = {
        swapiService: new SwapiService(),
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({isLoggedIn: true});
    };

    onServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;
            return { swapiService: new Service() }
        });
    };

    render() {

        const {isLoggedIn} = this.state;

        return (
            <ErrorBoundary>
                <SwapiServiceProvider value={ this.state.swapiService }>
                    <Router>
                        <div className="container mb-5">
                            <Header onServiceChange={this.onServiceChange} />
                            <RandomPlanet />

                            <Switch>
                                <Route path='/'
                                       render={() => <h2>Welcome to StarDB</h2>}
                                       exact />
                                <Route path='/people/:id?' component={PeoplePage} />
                                <Route path='/planets' component={PlanetsPage} />
                                <Route path='/starships' component={StarshipsPage} exact />
                                <Route path='/starships/:id'
                                       render={({match, location, history}) => {
                                           const {id} = match.params;
                                           return <StarshipDetails itemId={id} />
                                       }}/>
                                <Route
                                    path='/login'
                                    render={() => (
                                        <LoginPage
                                            isLoggedIn={isLoggedIn}
                                            onLogin={this.onLogin} />
                                    )} />
                                <Route
                                    path='/secret'
                                    render={() => (
                                        <SecretPage isLoggedIn={isLoggedIn} />
                                    )} />
                                <Route render={() => <h2>Page not found</h2>} />
                            </Switch>
                        </div>
                    </Router>
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
