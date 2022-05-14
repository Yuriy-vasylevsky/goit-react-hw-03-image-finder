import './ImageGalleryItem.css';
import React, { Component } from 'react';
import apiServices from '../../services/services';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';
// import { Notification } from 'react-pnotify';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import { toast } from 'react-toastify';

export default class imageGalleryItem extends Component {
  state = {
    arrSearchPhoto: [],
    status: 'idel',
    modalOpen: false,
    currentLargeImage: '',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchValue } = this.props;

    if (prevProps.searchValue !== searchValue) {
      this.setState({ status: 'pending' });

      apiServices
        .SearchPhoto(this.props.searchValue)
        .then(res => {
          if (res.length === 0) {
            toast.info('По данному запросу ничего не найдено');
            return this.setState({ status: 'idel' });
          }
          this.setState({ arrSearchPhoto: res, status: 'resolved' });
        })
        .catch(err => this.setState({ status: 'rejected' }));

      this.setState({ page: 1 });
    }
  }

  changePage = () => {
    const { page } = this.state;
    this.setState(prev => ({ page: prev.page + 1 }));

    apiServices
      .SearchPhoto(page)
      .then(res => {
        this.setState(prev => ({
          arrSearchPhoto: [...prev.arrSearchPhoto, ...res],
          status: 'resolved',
        }));
      })
      .catch(err => this.setState({ status: 'rejected' }));
  };

  onClickPhoto = e => {
    this.togleModal();
    return this.setState({
      currentLargeImage: e.currentTarget.dataset.nev,
    });
  };

  togleModal = () => {
    return this.setState(prev => ({
      modalOpen: !prev.modalOpen,
    }));
  };

  render() {
    const { status, arrSearchPhoto, modalOpen, currentLargeImage } = this.state;
    const { changePage, togleModal } = this;
    if (status === 'resolved') {
      return (
        <>
          {arrSearchPhoto.map(el => {
            return (
              <li className="ImageGalleryItem" key={el.webformatURL}>
                <img
                  src={el.webformatURL}
                  data-nev={el.largeImageURL}
                  alt=""
                  className="ImageGalleryItem-image"
                  onClick={this.onClickPhoto}
                />
              </li>
            );
          })}
          {arrSearchPhoto && <Button changePage={changePage} />}
          {modalOpen && (
            <Modal bigPhoto={currentLargeImage} togleModal={togleModal} />
          )}
        </>
      );
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'idel') {
      return (
        <div>
          <p> Введите что-то в поиск</p>
        </div>
      );
    }

    if (status === 'rejected') {
      toast.info('ОЙ');

      // return (
      //   <Notification
      //     type="error"
      //     title="Error"
      //     text="Что-то пошло не так"
      //     animateIn="bounceInLeft"
      //     animateOut="bounceOutRight"
      //     delay={2500}
      //     shadow={true}
      //     hide={true}
      //     nonblock={false}
      //     desktop={false}
      //   />
      // );
    }
  }
}
