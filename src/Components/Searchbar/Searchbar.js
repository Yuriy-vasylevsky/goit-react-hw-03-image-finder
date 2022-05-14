// import { Notification } from 'react-pnotify';
import './Searchbar.css';
import React, { Component } from 'react';
import { toast } from 'react-toastify';

export default class Searchbar extends Component {
  state = {
    searchValue: '',
    // notifi: false,
  };

  // togleNotifi = () => {
  //   return this.setState(prev => ({ notifi: !prev.notifi }));
  // };

  onChange = e => {
    this.setState({ searchValue: e.target.value.toLowerCase() });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.searchValue.trim('') === '') {
      // this.togleNotifi();
      // return setTimeout(() => {
      //   return this.togleNotifi();
      // }, 100);
      return toast.error('Введите что-то в поиск');
    }

    this.props.searchValue(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="Form" onSubmit={this.onSubmit}>
          <button type="submit" className="Button">
            <span className="Button-label">Search</span>
          </button>

          <input
            className="Input"
            type="text"
            value={this.state.searchValue}
            autoComplete="off"
            placeholder="Search images and photos"
            onChange={this.onChange}
          />
        </form>
        {/* {this.state.notifi && (
          <Notification
            type="error"
            title="Error"
            text="Что-то пошло не так"
            animateIn="bounceInLeft"
            animateOut="bounceOutRight"
            delay={2500}
            shadow={true}
            hide={true}
            nonblock={false}
            desktop={false}
          />
        )} */}
      </header>
    );
  }
}
