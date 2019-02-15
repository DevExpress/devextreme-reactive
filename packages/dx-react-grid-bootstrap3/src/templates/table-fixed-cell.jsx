import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ThemeColors } from './layout';

export class FixedCell extends React.PureComponent {
  render() {
    const {
      component: CellPlaceholder,
      side,
      showLeftDivider,
      showRightDivider,
      style,
      position,
      ...restProps
    } = this.props;
    const { backgroundColor, borderColor } = this.context;

    return (
      <CellPlaceholder
        style={{
          ...style,
          position: 'sticky',
          backgroundClip: 'padding-box',
          zIndex: 300,
          backgroundColor,
          [side]: position,
          ...borderColor ? {
            ...showLeftDivider ? { borderLeft: `1px solid ${borderColor}` } : null,
            ...showRightDivider ? { borderRight: `1px solid ${borderColor}` } : null,
          } : null,
        }}
        {...restProps}
      />
    );
  }
}

FixedCell.contextType = ThemeColors;

FixedCell.propTypes = {
  style: PropTypes.object,
  component: PropTypes.func.isRequired,
  side: PropTypes.string.isRequired,
  position: PropTypes.number,
  showLeftDivider: PropTypes.bool,
  showRightDivider: PropTypes.bool,
};

FixedCell.defaultProps = {
  style: null,
  showLeftDivider: false,
  showRightDivider: false,
  position: undefined,
};
