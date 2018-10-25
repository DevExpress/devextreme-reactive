import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Label extends React.PureComponent {
  render() {
    return (
      <text {...this.props} />
    );
  }
}

Label.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};
