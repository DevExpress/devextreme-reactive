import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { DropTarget } from '@devexpress/dx-react-core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from '../../../utils';

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

    this.state = {
      sourceColumnName: null,
      targetItemIndex: -1,
    };

    this.handleDragEvent = (eventHandler, { payload, ...restArgs }) => {
      // const { isColumnGroupingEnabled } = this.props;
      // const { columnName } = payload[0];

      // if (isColumnGroupingEnabled(columnName)) {
      eventHandler({ payload, ...restArgs });
      // }
    };
    this.onEnter = ({ payload }) => {
      // this.setState({
      //   sourceColumnName: payload[0].columnName,
      // });
      console.log('on enter!');
    };
    this.onOver = ({ clientOffset }) => {
      // const { onGroupDraft, items } = this.props;
      // const { sourceColumnName, targetItemIndex: prevTargetItemIndex } = this.state;
      // // eslint-disable-next-line react/no-find-dom-node
      // const itemGeometries = this.itemRefs.map(ref => findDOMNode(ref).getBoundingClientRect());
      // const sourceItemIndex = items.findIndex(({ column }) => column.name === sourceColumnName);
      // const targetItemIndex = getGroupCellTargetIndex(
      //   itemGeometries,
      //   sourceItemIndex,
      //   clientOffset,
      // );

      // console.log(clientOffset);

      // if (prevTargetItemIndex === targetItemIndex) return;

      // onGroupDraft({
      //   columnName: sourceColumnName,
      //   groupIndex: targetItemIndex,
      // });
      // this.setState({ targetItemIndex });
      console.log('on over!');
    };
    this.onLeave = () => {
      // const { onGroupDraft } = this.props;
      // const { sourceColumnName } = this.state;
      // if (!this.draggingColumnName) {
      //   this.resetState();
      //   return;
      // }
      // onGroupDraft({
      //   columnName: sourceColumnName,
      //   groupIndex: -1,
      // });
      // this.setState({
      //   targetItemIndex: -1,
      // });
      console.log('on leave!');
    };
    this.onDrop = (args) => {
      // const { onGroup } = this.props;
      // const { sourceColumnName, targetItemIndex } = this.state;
      // this.resetState();
      // onGroup({
      //   columnName: sourceColumnName,
      //   groupIndex: targetItemIndex,
      // });
      console.log(args);
      console.log(this.props.startDate);
      console.log('on drop!');
    };
    this.onDragStart = (columnName) => {
      this.draggingColumnName = columnName;
    };
    this.onDragEnd = () => {
      this.draggingColumnName = null;
      const { sourceColumnName, targetItemIndex } = this.state;
      const { onGroup } = this.props;
      if (sourceColumnName && targetItemIndex === -1) {
        onGroup({
          columnName: sourceColumnName,
        });
      }
      this.resetState();
    };
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
        onEnter={args => this.handleDragEvent(this.onEnter, args)}
        onOver={args => this.handleDragEvent(this.onOver, args)}
        onLeave={args => this.handleDragEvent(this.onLeave, args)}
        onDrop={args => this.handleDragEvent(this.onDrop, args)}
      >
        <TableCell
          tabIndex={0}
          className={classNames(classes.cell, className)}
          {...restProps}
        >
          {children}
        </TableCell>
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
  className: undefined,
  startDate: undefined,
  endDate: undefined,
};

export const Cell = withStyles(styles, { name: 'Cell' })(CellBase);
