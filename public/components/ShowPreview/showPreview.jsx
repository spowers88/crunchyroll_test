// Framework
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './showPreview.less';

const ShowPreview = ({
  showIndex,
  showCaption,
  showImageUrl,
  handleShowSelection
}) => (
  <section
    className="preview"
    onClick={() => handleShowSelection(showIndex)}
  >
    {
      showImageUrl
        ? <img className="preview-image" src={showImageUrl} alt={`${showCaption} thumbnail`} />
        : <div className="preview-default">
            <p className="preview-no-image">N/A</p>
          </div>
    }
    <p className="preview-text">{showCaption}</p>
  </section>
);

const { func, string, number } = PropTypes;
ShowPreview.propTypes = {
  showIndex: number.isRequired,
  showCaption: string,
  showImageUrl: string,
  handleShowSelection: func.isRequired
};

ShowPreview.defaultProps = {
  showCaption: 'No title provided'
};

export default ShowPreview;