/* globals requestAnimationFrame */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {
  getAnimations,
  filterActiveAnimations,
  evalAnimations,
} from '@devexpress/dx-grid-core';

const TABLE_FLEX_TYPE = 'flex';

const areColumnsChanged = (prevColumns, nextColumns) => {
  if (prevColumns.length !== nextColumns.length) return true;
  const prevKeys = prevColumns.map(column => column.key);
  return nextColumns.find(column =>
    prevKeys.indexOf(column.key) === -1) !== undefined;
};

export class TableLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      animationState: new Map(),
    };

    this.animations = new Map();
    this.tableNode = null;

    this.setRef = (ref) => { if (ref) this.tableNode = ref; };
  }
  componentWillReceiveProps(nextProps) {
    const { columns: nextColumns } = nextProps;
    const { columns } = this.props;

    if (areColumnsChanged(columns, nextColumns)) return;

    // eslint-disable-next-line react/no-find-dom-node
    const tableWidth = findDOMNode(this).scrollWidth;
    this.animations = getAnimations(columns, nextColumns, tableWidth, this.animations);
    this.processAnimationFrame();
  }
  getColumns() {
    const { columns } = this.props;
    const { animationState } = this.state;

    let result = columns;

    const isFixedWidth = columns.filter(column => column.width === undefined).length === 0;
    if (isFixedWidth) {
      result = result.slice();
      result.push({ key: TABLE_FLEX_TYPE, type: TABLE_FLEX_TYPE });
    }

    if (animationState.size) {
      result = result
        .map(column => (animationState.has(column.key)
          ? { ...column, animationState: animationState.get(column.key) }
          : column));
    }

    return result;
  }
  processAnimationFrame() {
    this.animations = filterActiveAnimations(this.animations);

    if (!this.animations.size) {
      if (this.state.animationState.size) {
        this.setState({ animationState: new Map() });
      }
      return;
    }

    const animationState = evalAnimations(this.animations);
    this.setState({ animationState });

    requestAnimationFrame(this.processAnimationFrame.bind(this));
  }
  render() {
    const {
      layoutComponent: Layout,
      minColumnWidth,
      ...restProps
    } = this.props;
    const columns = this.getColumns();
    const minWidth = columns
      .map(column => column.width || (column.type === TABLE_FLEX_TYPE ? 0 : minColumnWidth))
      .reduce((acc, width) => acc + width, 0);

    return (
      <Layout
        {...restProps}
        columns={columns}
        minWidth={minWidth}
      />
    );
  }
}

TableLayout.propTypes = {
  columns: PropTypes.array.isRequired,
  minColumnWidth: PropTypes.number.isRequired,
  layoutComponent: PropTypes.func.isRequired,
};
