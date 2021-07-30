import React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export class FocusRow extends React.PureComponent {
  render() {
    const {
      component: RowPlaceholder,
      focused,
      className,
      style,
      ...restProps
    } = this.props;
    return (
      <RowPlaceholder
        className={classNames(focused ? 'active' : '', className)}
        {...restProps}
      />
    );
  }
}

FocusRow.propTypes = {
  className: PropTypes.string,
  component: PropTypes.func.isRequired,
  focused: PropTypes.bool,
  style: PropTypes.object,
};

FocusRow.defaultProps = {
  focused: undefined,
  style: undefined,
  className: undefined,
};
