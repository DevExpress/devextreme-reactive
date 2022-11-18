import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

export class FocusRow extends React.PureComponent {
  render() {
    const {
      component: RowPlaceholder,
      className,
      focused,
      ...restProps
    } = this.props;

    return (
      <RowPlaceholder
        className={classNames({
          'bg-light': !!focused,
        }, className)}
        {...restProps}
      />
    );
  }
}

FocusRow.propTypes = {
  className: PropTypes.string,
  component: PropTypes.func.isRequired,
  focused: PropTypes.bool,
};

FocusRow.defaultProps = {
  focused: false,
  className: undefined,
};
