import React, { Component } from 'react';

export class Modal extends Component {
  onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal('');
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onEscClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscClick);
  }

  onEscClick = e => {
    console.log(e.code);
    if (e.code === 'Escape') {
      this.props.closeModal('');
    }
  };

  render() {
    return (
      <div onClick={this.onBackdropClick} className="Backdrop">
        <div className="Modal">
          <img src={this.props.img} alt="" />
        </div>
      </div>
    );
  }
}
