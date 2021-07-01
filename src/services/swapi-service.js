export default class SwapiService {

    _apiBase = 'https://swapi.dev/api/';
    _imgBase = 'https://starwars-visualguide.com/assets/img/';
  
    getResource = async (url) => {
      const res = await fetch(`${this._apiBase}${url}`);
      if (!res.ok) {
        throw new Error(`Could not fetch ${this._apiBase + url}, recieved ${res.status}`)
      };
      return await res.json();
    };
    
    getAllPeople = async () => {
      const res = await this.getResource(`people/`);
      return res.results.map(this._transformPerson);
    };
  
    getPerson = async (id) => {
      const res = await this.getResource(`people/${id}/`);
      return this._transformPerson(res);
    };
    
    getAllPlanets = async () => {
      const res = await this.getResource(`planets/`);
      return res.results.map(this._transformPlanet);
    };
  
    getPlanet = async (id) => {
      const planet = await this.getResource(`planets/${id}/`);
      return this._transformPlanet(planet);
    };
    
    getAllStarships = async () => {
      const res = await this.getResource(`starships/`);
      return res.results.map(this._transformStarhip);
    };
  
    getStarship = async (id) => {
      const res = await this.getResource(`starships/${id}/`);
      return this._transformStarhip(res);
    };

    _extractId = (item) => {
      const idRexExp = /\/([0-9]*)\/$/;
      const id = item.url.match(idRexExp)[1];
      return id
    };

    _transformPlanet = (planet) => {
      return {
        id: this._extractId(planet),
        name: planet.name,
        population: planet.population,
        rotationPeriod: planet.rotation_period,
        diameter: planet.diameter
      };
    };

    _transformStarhip = (starship) => {
      return {
        id: this._extractId(starship),
        name: starship.name,
        model: starship.model,
        manufacturer: starship.manufacturer,
        costInCredits: starship.cost_in_credits,
        length: starship.length,
        crew: starship.crew,
        passengers: starship.passengers,
        cargoCapacity: starship.cargo_capacity
      };
    };

    _transformPerson = (person) => {
      return {
        id: this._extractId(person),
        name: person.name,
        gender: person.gender,
        birthYear: person.birth_year,
        eyeColor: person.eye_color
      };
    };

    getPersonImage = ({ id }) => {
        return `${this._imgBase}characters/${id}.jpg`
    };
    getStarshipImage = ({ id }) => {
        return `${this._imgBase}starships/${id}.jpg`
    };
    getPlanetImage = ({ id }) => {
        return `${this._imgBase}planets/${id}.jpg`
    };
  
  };
  