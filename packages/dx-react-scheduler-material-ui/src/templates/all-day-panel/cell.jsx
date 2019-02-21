import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import RootRef from '@material-ui/core/RootRef';
import { DropTarget } from '@devexpress/dx-react-core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { getBorder } from '../utils';

const styles = theme => ({
  cell: {
    borderLeft: getBorder(theme),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.15),
      outline: 0,
    },
  },
});

class CellBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.cell = React.createRef();
  }

  render() {
    const {
      classes,
      className,
      children,
      startDate,
      endDate,
      ...restProps
    } = this.props;

    return (
      <DropTarget
        sourcePayload={{
          startDate, endDate, cellRef: this.cell, type: 'allDay',
        }}
      >
        <RootRef rootRef={this.cell}>
          <TableCell
            tabIndex={0}
            className={classNames(classes.cell, className)}
            {...restProps}
          >
            {children}
          </TableCell>
        </RootRef>
      </DropTarget>
    );
  }
}

CellBase.propTypes = {
  classes: PropTypes.object.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  children: PropTypes.node,
  className: PropTypes.string,
};

CellBase.defaultProps = {
  children: null,
  startDate: undefined,
  endDate: undefined,
  className: undefined,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
