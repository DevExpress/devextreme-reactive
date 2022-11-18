import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { BodyColorContext } from './layout';

export class FixedCell extends React.PureComponent {
  render() {
    const {
      className,
      component: CellPlaceholder,
      position,
      selected,
      showLeftDivider,
      showRightDivider,
      side,
      style,
      ...restProps
    } = this.props;
    const backgroundColor = selected ? 'inherit' : this.context;

    return (
      <CellPlaceholder
        className={classNames({
          'border-left': showLeftDivider,
          'border-right': showRightDivider,
          'dx-g-bs4-fixed-cell': true,
          'position-sticky': true,
        }, className)}
        style={{
          backgroundColor,
          [side]: position,
          ...style,
        }}
        {...restProps}
      />
    );
  }
}

FixedCell.contextType = BodyColorContext;

FixedCell.propTypes = {
  className: PropTypes.string,
  component: PropTypes.func.isRequired,
  position: PropTypes.number,
  selected: PropTypes.bool,
  showLeftDivider: PropTypes.bool,
  showRightDivider: PropTypes.bool,
  side: PropTypes.string.isRequired,
  style: PropTypes.object,
};

FixedCell.defaultProps = {
  className: undefined,
  position: undefined,
  selected: false,
  showLeftDivider: false,
  showRightDivider: false,
  style: null,
};
