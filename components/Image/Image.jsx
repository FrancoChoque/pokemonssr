import React, { Fragment } from 'react';
import ProgressiveImage from 'react-progressive-image';
import PropTypes from 'prop-types';

const Image = ({ src, alt, className }) => (
  <ProgressiveImage
    src={src}
    placeholder="unknown"
  >
    {(currentSrc, loading) => (
      <Fragment>
        <img style={{ opacity: loading ? 0.5 : 1 }} src={currentSrc} alt="pokemon" />
        <noscript>
          <img src={src} alt={alt} className={className} />
        </noscript>
      </Fragment>
    )}
  </ProgressiveImage>
);

Image.defaultProps = {
  src: '',
  alt: '',
  className: '',
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default Image;
