import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { DropTarget } from '@devexpress/dx-react-core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
  },
};

export class ContainerBase extends React.PureComponent {
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
    this.onDrop = () => {
      // const { onGroup } = this.props;
      // const { sourceColumnName, targetItemIndex } = this.state;
      // this.resetState();
      // onGroup({
      //   columnName: sourceColumnName,
      //   groupIndex: targetItemIndex,
      // });
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

  resetState() {
    const { onGroupDraftCancel } = this.props;
    onGroupDraftCancel();
    this.setState({
      sourceColumnName: null,
      targetItemIndex: -1,
    });
  }

  render() {
    const {
      classes,
      className,
      children,
      ...restProps
    } = this.props;
    return (
      <DropTarget
        onEnter={args => this.handleDragEvent(this.onEnter, args)}
        onOver={args => this.handleDragEvent(this.onOver, args)}
        onLeave={args => this.handleDragEvent(this.onLeave, args)}
        onDrop={args => this.handleDragEvent(this.onDrop, args)}
      >
        <div
          className={classNames(classes.container, className)}
          {...restProps}
        >
          {children}
        </div>
      </DropTarget>
    );
  }
}

ContainerBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

ContainerBase.defaultProps = {
  className: undefined,
  children: null,
};

export const Container = withStyles(styles, { name: 'Container' })(ContainerBase);
