import './Modal.css';
import { createPortal } from 'react-dom';
import React, { Component } from 'react';
const modalRoot = document.querySelector('#modalRoot');

export default class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.modalKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.modalKeydown);
  }

  modalKeydown = e => {
    if (e.code === 'Escape') {
      return this.props.togleModal();
    }
  };

  handleOverlay = e => {
    if (e.target === e.currentTarget) {
      return this.props.togleModal();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleOverlay}>
        <div className="Modal">
          <img src={this.props.bigPhoto} alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}
