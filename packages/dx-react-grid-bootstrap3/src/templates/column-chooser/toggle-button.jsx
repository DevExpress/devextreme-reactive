import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class ToggleButton extends React.PureComponent {
  render() {
    const {
      onToggle, className,
      getMessage, ...restProps
    } = this.props;

    return (
      <button
        className={classNames('btn btn-link', className)}
        onClick={onToggle}
        {...restProps}
      >
        <i className="glyphicon glyphicon-eye-close" />
      </button>
    );
  }
}

ToggleButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  className: PropTypes.string,
  getMessage: PropTypes.func,
};

ToggleButton.defaultProps = {
  className: undefined,
  getMessage: undefined,
};
