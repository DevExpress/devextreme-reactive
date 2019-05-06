import * as React from 'react';
import * as PropTypes from 'prop-types';

const FeaturePreview = ({ imageLink, title }) => <img alt={title} src={imageLink} />;

FeaturePreview.propTypes = {
  imageLink: PropTypes.string.isRequired,
  title: PropTypes.string,
};

FeaturePreview.defaultProps = {
  title: undefined,
};

export default FeaturePreview;
