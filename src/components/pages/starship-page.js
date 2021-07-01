import React, { Component } from 'react';
import {StarshipDetails, StarshipList} from "../sw-components";
import Row from "../row";

export default class StarshipPage extends Component {

    state = {
        selectedItem: null
    };

    onItemSelected = (id) => {
        this.setState({ selectedItem: id })
    };

    render() {

        const { selectedItem } = this.state;

        return (
            <Row
                left={ <StarshipList onItemSelected={ this.onItemSelected } /> }
                right={ <StarshipDetails itemId={ selectedItem } /> } />
        );
    };
};