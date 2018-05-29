import * as React from 'react';
import * as PropTypes from 'prop-types';

export class Bar extends React.PureComponent {
  render() {
    const { themeColor, ...restProps } = this.props;
    return (
      <rect fill={themeColor} {...restProps} />
    );
  }
}

Bar.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  themeColor: PropTypes.string,
};

Bar.defaultProps = {
  themeColor: undefined,
};
