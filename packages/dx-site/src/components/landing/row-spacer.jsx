import * as React from 'react';
import PropTypes from 'prop-types';

const RowSpacer = ({ topSize, bottomSize }) => (
  <div className={`row mt-${topSize} mb-${bottomSize}`} />
);

RowSpacer.propTypes = {
  topSize: PropTypes.number.isRequired,
  bottomSize: PropTypes.number.isRequired,
};

export default RowSpacer;
