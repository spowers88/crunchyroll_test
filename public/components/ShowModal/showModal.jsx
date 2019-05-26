// Framework
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './showModal.less';

const ShowModal = ({ image, caption, closeModal }) => (
  <div className="showModal" onClick={closeModal}>
    <section className="show" onClick={(e) => { e.stopPropagation() }}>
      {
        image
          ? <img className="show-poster" src={image} alt={`${caption} full size poster`} />
          : <p className="show-unavailable">No full size image available</p>
      }
      <footer className="show-footer">
        <button className="show-footer-close" onClick={closeModal}>Close</button>
      </footer>
    </section>
  </div>
);

const { func, string } = PropTypes;
ShowModal.propTypes = {
  image: string,
  caption: string,
  closeModal: func.isRequired
};

export default ShowModal;