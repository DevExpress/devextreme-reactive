import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  fixedCell: {
    backgroundColor: theme.palette.background.paper,
    position: 'sticky',
    zIndex: 200,
  },
  divider: {
    '&:after': {
      content: '""',
      position: 'absolute',
      background: theme.palette.divider,
      width: 1,
      top: 0,
      bottom: 0,
    },
  },
  dividerLeft: {
    '&:after': {
      right: 0,
    },
  },
  dividerRight: {
    '&:after': {
      left: 0,
    },
  },
});

class FixedCellBase extends React.PureComponent {
  componentDidMount() {
    // eslint-disable-next-line react/no-find-dom-node
    const element = findDOMNode(this);
    if (element) {
      this.props.storeSize(element.getBoundingClientRect().width);
    }
  }
  render() {
    const {
      component: CellPlaceholder,
      side,
      showDivider,
      className,
      classes,
      style,
      getPosition,
      storeSize,
      ...restProps
    } = this.props;
    const dividerSideClassName = `divider${side.charAt(0).toUpperCase()}${side.slice(1)}`;

    return (
      <CellPlaceholder
        className={classNames({
          [classes.fixedCell]: true,
          [classes.divider]: showDivider,
          [classes[dividerSideClassName]]: showDivider,
        }, className)}
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
  showDivider: PropTypes.bool,
};

FixedCellBase.defaultProps = {
  className: undefined,
  style: {},
  showDivider: false,
};

export const FixedCell = withStyles(styles)(FixedCellBase);
