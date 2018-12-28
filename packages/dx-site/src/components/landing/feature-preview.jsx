import * as React from 'react';
import * as PropTypes from 'prop-types';

const FeaturePreview = ({ imageLink, title }) => (
  <div className="col-lg-6 col-md-6">
    <img
      alt={title}
      src={imageLink}
    />
  </div>
);

FeaturePreview.propTypes = {
  imageLink: PropTypes.string.isRequired,
  title: PropTypes.string,
};

FeaturePreview.defaultProps = {
  title: undefined,
};

export default FeaturePreview;
