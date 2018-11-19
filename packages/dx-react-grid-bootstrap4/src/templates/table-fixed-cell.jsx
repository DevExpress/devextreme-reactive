import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { BodyColorContext } from './layout';

export class FixedCell extends React.PureComponent {
  render() {
    const {
      component: CellPlaceholder,
      side,
      showLeftDivider,
      showRightDivider,
      className,
      style,
      position,
      ...restProps
    } = this.props;
    const backgroundColor = this.context;

    return (
      <CellPlaceholder
        className={classNames({
          'position-sticky': true,
          'dx-g-bs4-fixed-cell': true,
          'border-left': showLeftDivider,
          'border-right': showRightDivider,
        }, className)}
        style={{
          ...style,
          backgroundColor,
          [side]: position,
        }}
        {...restProps}
      />
    );
  }
}

FixedCell.contextType = BodyColorContext;

FixedCell.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  component: PropTypes.func.isRequired,
  side: PropTypes.string.isRequired,
  position: PropTypes.number,
  showLeftDivider: PropTypes.bool,
  showRightDivider: PropTypes.bool,
};

FixedCell.defaultProps = {
  className: undefined,
  style: null,
  showLeftDivider: false,
  showRightDivider: false,
  position: undefined,
};
