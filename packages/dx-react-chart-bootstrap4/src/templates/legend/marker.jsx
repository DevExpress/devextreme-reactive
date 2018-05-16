import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export class Marker extends React.PureComponent {
  render() {
    const { className, ...restProps } = this.props;
    return (<span className={classNames('oi oi-graph mx-1', className)} {...restProps} />);
  }
}

Marker.propTypes = {
  className: PropTypes.string,
};

Marker.defaultProps = {
  className: undefined,
};

