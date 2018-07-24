import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  fixedCell: {
    backgroundColor: theme.palette.background.paper,
    position: 'sticky',
    zIndex: 500,
  },
  dividerLeft: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  dividerRight: {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
});

class FixedCellBase extends React.PureComponent {
  componentDidMount() {
    const { storeSize } = this.props;
    // eslint-disable-next-line react/no-find-dom-node
    const element = findDOMNode(this);
    if (element) {
      storeSize(element.getBoundingClientRect().width);
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
