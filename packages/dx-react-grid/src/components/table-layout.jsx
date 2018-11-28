/* globals requestAnimationFrame cancelAnimationFrame */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {
  getAnimations,
  filterActiveAnimations,
  evalAnimations,
  TABLE_FLEX_TYPE,
} from '@devexpress/dx-grid-core';

export class TableLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      animationState: new Map(),
    };

    this.animations = new Map();
  }

  componentDidUpdate(prevProps) {
    const { columns } = this.props;
    const { columns: prevColumns } = prevProps;

    // eslint-disable-next-line react/no-find-dom-node
    const tableWidth = findDOMNode(this).scrollWidth;
    this.animations = getAnimations(prevColumns, columns, tableWidth, this.animations);
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(this.processAnimationFrame.bind(this));
  }

  getColumns() {
    const { columns } = this.props;
    const { animationState } = this.state;

    let result = columns;

    const isFixedWidth = columns.filter(column => column.width === undefined).length === 0;
    if (isFixedWidth) {
      result = result.slice();
      result.push({ key: TABLE_FLEX_TYPE.toString(), type: TABLE_FLEX_TYPE });
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
    const { animationState: animationComponentState } = this.state;
    this.animations = filterActiveAnimations(this.animations);

    if (!this.animations.size) {
      if (animationComponentState.size) {
        this.setState({ animationState: new Map() });
      }
      return;
    }

    const animationState = evalAnimations(this.animations);
    this.setState({ animationState });
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
        minColumnWidth={minColumnWidth}
      />
    );
  }
}

TableLayout.propTypes = {
  columns: PropTypes.array.isRequired,
  minColumnWidth: PropTypes.number.isRequired,
  layoutComponent: PropTypes.func.isRequired,
};
