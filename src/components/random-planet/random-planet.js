import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './random-planet.css';

export default class RandomPlanet extends Component {

  static defaultProps = {
    updateInterval: 5000
  };

  static propTypes = {
    updateInterval: PropTypes.number
  };

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  };

  onPlanetLoaded = (planet) => {
    this.setState({
      planet, 
      loading: false, 
      error: false});
  };

  onError = (err) => {
    this.setState({ 
      error: true, 
      loading: false });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 25) + 3;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };

  componentDidMount() {
    const { updateInterval } = this.props;
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, updateInterval);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  };

  render() {

    const {planet, loading, error} = this.state;

    const hasData = !(loading || error);

    const errorIndicator = error ? <ErrorIndicator /> : null
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet bg-dark rounded border border-secondary">
        { errorIndicator }
        { spinner }
        { content }
      </div>
    );
  };

  // static propTypes = {
  //   updateInterval: (props, propName, componentName) => {
  //     const value = props[propName];
  //     if (typeof value === 'number' && !isNaN(value)) {
  //       return null
  //     }
  //     return new TypeError(`${componentName}: ${propName} must be number.`)
  //   }
  // };

};

const PlanetView = ({planet}) => {

  const { name, population, rotationPeriod, diameter, id } = planet;

  return (
  <React.Fragment>
    <img 
      className="planet-image"
      alt="planet name"
      src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
    <div>
      <h4>{name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <span className="term">Population</span>
          <span>{population}</span>
        </li>
        <li className="list-group-item">
          <span className="term">Rotation Period</span>
          <span>{rotationPeriod}</span>
        </li>
        <li className="list-group-item">
          <span className="term">Diameter</span>
          <span>{diameter}</span>
        </li>
      </ul>
    </div>
  </React.Fragment>
  );
};

// RandomPlanet.defaultProps = {
//   updateInterval: 10000
// };

