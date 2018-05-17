import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Bar extends React.PureComponent {
  render() {
    return (
      <rect {...this.props} />
    );
  }
}

Bar.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
