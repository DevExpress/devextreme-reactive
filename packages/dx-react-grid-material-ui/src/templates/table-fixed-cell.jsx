import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  fixedCell: {
    backgroundColor: theme.palette.background.paper,
    position: 'sticky',
    '&:before': {
      content: '""',
      position: 'absolute',
      background: theme.palette.divider,
      width: 1,
      top: 0,
      bottom: 0,
    },
  },
  fixedCellLeft: {
    '&:before': {
      right: 0,
    },
  },
  fixedCellRight: {
    '&:before': {
      left: 0,
    },
  },
});

class FixedCellBase extends React.PureComponent {
  componentDidMount() {
    // eslint-disable-next-line react/no-find-dom-node
    this.props.storeSize(findDOMNode(this).getBoundingClientRect().width);
  }
  render() {
    const {
      component: CellPlaceholder,
      side,
      className,
      classes,
      style,
      getPosition,
      storeSize,
      ...restProps
    } = this.props;
    const sideClassName = `fixedCell${side.charAt(0).toUpperCase()}${side.slice(1)}`;

    return (
      <CellPlaceholder
        className={classNames(classes.fixedCell, classes[sideClassName], className)}
        style={{
          ...style,
          [side]: getPosition(),
        }}
        {...restProps}
      />
    );
  }
}

FixedCellBase.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  component: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  side: PropTypes.string.isRequired,
  storeSize: PropTypes.func.isRequired,
  getPosition: PropTypes.func.isRequired,
};

FixedCellBase.defaultProps = {
  className: undefined,
  style: {},
};

export const FixedCell = withStyles(styles)(FixedCellBase);
