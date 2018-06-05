import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export class Tick extends React.PureComponent {
  render() {
    const {
      x1, x2, y1, y2, className, ...restProps
    } = this.props;
    return (
      <path
        d={`M ${x1} ${y1} L ${x2} ${y2}`}
        className={classNames(
          'dx-c-bs4-stroke-current-color dx-c-bs4-crisp-edges dx-c-bs4-axis-opacity',
          className,
        )}
        {...restProps}
      />
    );
  }
}

Tick.propTypes = {
  x1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
  className: PropTypes.string,
};

Tick.defaultProps = {
  className: undefined,
};
