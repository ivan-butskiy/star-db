import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorButton from '../error-button';

import './item-details.css';

const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{ label }:</span>
            <span>{ item[field] }</span>
        </li>
    );
};

export {
    Record
};

export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    loading: true,
    image: null
  };

  componentDidMount() {
    this.updateItem();
  };

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId ||
      this.props.getData !== prevProps.getData ||
      this.props.getImageData !== prevProps.getImageData) {
      this.updateItem();
    };
  };

  updateItem() {
    this.setState({ loading: true });
    const {itemId, getData, getImageUrl} = this.props;
    if (!itemId) {
      return;
    };
    getData(itemId)
      .then((item) => {
        this.setState({
          item: item,
          loading: false,
          image: getImageUrl(item)});
      });
  };

  render() {

    const { item, image, loading } = this.state;

    if (!item) {
      return <div className='mt-3'><span>Select a item from a list</span></div>
    };

    const { name } = item;

    if (loading) {
      return <div className="item-details card"><Spinner /></div>
    };

    return (
      <div className="item-details card border border-secondary">
        <img 
          alt="item"
          className="item-image"
          src={ image } />

        <div className="card-body">
          <h4>{ name }</h4>
          <ul className="list-group list-group-flush">
              {
                  React.Children.map(this.props.children, (child) => {
                      return React.cloneElement(child, { item });
                  })
              }
          </ul>
          <ErrorButton />
        </div>
      </div>
    );
  };
};
