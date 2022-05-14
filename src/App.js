import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

import Searchbar from './Components/Searchbar/Searchbar';
import ImageGalleryItem from './Components/ImageGalleryItem/ImageGalleryItem';
import ImageGallery from './Components/ImageGallery/ImageGallery';
// import Button from './Components/Button/Button';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component {
  state = {
    searchValue: '',
    error: true,
  };

  searchValue = value => {
    this.setState({ searchValue: value });
  };

  render() {
    return (
      <div className="App">
        <Searchbar searchValue={this.searchValue} />
        <ImageGallery>
          <ImageGalleryItem searchValue={this.state.searchValue} />
        </ImageGallery>
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}
