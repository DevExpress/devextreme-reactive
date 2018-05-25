import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export class Label extends React.PureComponent {
  render() {
    const { text, className, ...restProps } = this.props;
    return (
      <span className={classNames('text-body', className)}{...restProps}>{text}</span>
    );
  }
}

Label.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  className: PropTypes.string,
};

Label.defaultProps = {
  className: undefined,
};
