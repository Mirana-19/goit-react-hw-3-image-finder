import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getImages } from 'api/gallery';
import { Searchbar, Button, Loader, Modal, ImageGallery } from 'components';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  initialState = {
    images: [],
    page: 1,
    error: '',
  };

  state = {
    images: [],
    query: '',
    page: 1,
    error: '',
    totalHits: 0,
    isLoading: false,
    openModal: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ isLoading: true });
      getImages(this.state.query, this.state.page)
        .then(({ hits, totalHits }) => {
          if (!hits.length) {
            return toast.error('No images found');
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            totalHits,
          }));
        })
        .catch(() => toast.error('Sorry, something went wrong!'))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  onFormSubmit = query => {
    if (!query.trim()) {
      return toast.info('Please enter your query!');
    }

    this.setState({ query, ...this.initialState });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  closeModal = str => {
    this.setState({ openModal: str });
  };

  render() {
    const { images, totalHits, isLoading, openModal } = this.state;
    return (
      <>
        <ToastContainer />
        <Searchbar onFormSubmit={this.onFormSubmit} />
        <ImageGallery images={images} onImgClick={this.closeModal} />

        {totalHits && images.length < totalHits && (
          <Button onClick={this.onLoadMore} />
        )}

        {isLoading && <Loader />}
        {openModal && <Modal img={openModal} closeModal={this.closeModal} />}
      </>
    );
  }
}
