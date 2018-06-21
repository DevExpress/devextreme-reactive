import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
// import { findDOMNode } from 'react-dom';
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
  constructor(props) {
    super(props);
    this.state = { position: 0 };
  }
  componentDidMount() {
    this.storePosition();
  }
  storePosition() {
    setTimeout(() => {
      this.setState({
        position: this.props.getCellPosition(),
      });
    }, 0);
  }
  render() {
    const {
      component: CellPlaceholder,
      side,
      className,
      classes,
      style,
      getCellPosition,
      ...restProps
    } = this.props;
    const sideProperty = side === 'before' ? 'left' : 'right';

    return (
      <CellPlaceholder
        className={classNames({
          [classes.fixedCell]: true,
          [classes.fixedCellLeft]: side === 'before',
          [classes.fixedCellRight]: side === 'after',
        }, className)}
        style={{
          ...style,
          [sideProperty]: this.state.position,
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
};

FixedCellBase.defaultProps = {
  className: undefined,
  style: {},
};

export const FixedCell = withStyles(styles)(FixedCellBase);
