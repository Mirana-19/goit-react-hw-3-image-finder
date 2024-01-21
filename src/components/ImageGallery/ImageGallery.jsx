import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getImages } from 'api/gallery';
import { Searchbar, ImageGalleryItem, Button } from 'components';
import 'react-toastify/dist/ReactToastify.css';

export class ImageGallery extends Component {
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
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
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
        .catch(() => toast.error('Something went wrong!'));
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

  render() {
    const { images, totalHits } = this.state;
    return (
      <>
        <ToastContainer />
        <Searchbar onFormSubmit={this.onFormSubmit} />

        <ul className="ImageGallery">
          {images.map(({ id, webformatURL, tags }) => (
            <ImageGalleryItem key={id} img={webformatURL} alt={tags} />
          ))}
        </ul>

        {totalHits && images.length < totalHits && (
          <Button onClick={this.onLoadMore} />
        )}
      </>
    );
  }
}
