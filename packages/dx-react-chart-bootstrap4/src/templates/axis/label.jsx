import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export class Label extends React.PureComponent {
  render() {
    const {
      text, x, y, dominantBaseline, textAnchor, className, ...restProps
    } = this.props;

    return (
      <text
        dominantBaseline={dominantBaseline}
        textAnchor={textAnchor}
        x={x}
        y={y}
        className={classNames('dx-c-bs4-fill-current-color', className)}
        {...restProps}
      >
        {text}
      </text>
    );
  }
}

Label.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  dominantBaseline: PropTypes.string.isRequired,
  textAnchor: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Label.defaultProps = {
  className: undefined,
};
