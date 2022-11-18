import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleContext } from '../layout';

export class BandedHeaderCell extends React.PureComponent {
  render() {
    const {
      component: HeaderCellComponent,
      style, beforeBorder,
      ...restProps
    } = this.props;
    const { borderColor } = this.context;

    return (
      <HeaderCellComponent
        style={{
          borderTop: 'none',
          borderRight: `1px solid ${borderColor}`,
          ...beforeBorder ? { borderLeft: `1px solid ${borderColor}` } : null,
          ...style,
        }}
        {...restProps}
      />
    );
  }
}

BandedHeaderCell.contextType = StyleContext;

BandedHeaderCell.propTypes = {
  component: PropTypes.func.isRequired,
  style: PropTypes.object,
  beforeBorder: PropTypes.bool,
};

BandedHeaderCell.defaultProps = {
  style: null,
  beforeBorder: false,
};
