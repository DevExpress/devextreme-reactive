import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ThemeColors } from './layout';
import { getStickyPosition } from '../utils/css-fallback-properties';

export class FixedCell extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      stickyPosition: getStickyPosition(),
    };
  }

  componentDidMount() {
    this.setState({ stickyPosition: getStickyPosition() });
  }

  render() {
    const {
      component: CellPlaceholder,
      position,
      selected,
      showLeftDivider,
      showRightDivider,
      side,
      style,
      ...restProps
    } = this.props;
    const { backgroundColor, borderColor } = this.context;
    const { stickyPosition } = this.state;

    return (
      <CellPlaceholder
        style={{
          backgroundClip: 'padding-box',
          backgroundColor: selected ? null : backgroundColor,
          position: stickyPosition,
          zIndex: 300,
          [side]: position,
          ...borderColor ? {
            ...showLeftDivider ? { borderLeft: `1px solid ${borderColor}` } : null,
            ...showRightDivider ? { borderRight: `1px solid ${borderColor}` } : null,
          } : null,
          ...style,
        }}
        {...restProps}
      />
    );
  }
}

FixedCell.contextType = ThemeColors;

FixedCell.propTypes = {
  component: PropTypes.func.isRequired,
  position: PropTypes.number,
  selected: PropTypes.bool,
  showLeftDivider: PropTypes.bool,
  showRightDivider: PropTypes.bool,
  side: PropTypes.string.isRequired,
  style: PropTypes.object,
};

FixedCell.defaultProps = {
  position: undefined,
  selected: false,
  showLeftDivider: false,
  showRightDivider: false,
  style: null,
};
