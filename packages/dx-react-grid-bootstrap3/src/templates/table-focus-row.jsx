import React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

export class FocusRow extends React.PureComponent {
  render() {
    const {
      component: RowPlaceholder,
      focused,
      className,
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
};

FocusRow.defaultProps = {
  focused: undefined,
  className: undefined,
};
