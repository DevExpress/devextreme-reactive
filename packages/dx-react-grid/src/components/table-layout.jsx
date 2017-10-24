/* globals requestAnimationFrame */

import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { TemplateRenderer } from '@devexpress/dx-react-core';
import {
  getAnimations,
  filterActiveAnimations,
  evalAnimations,
} from '@devexpress/dx-grid-core';
import { RowsBlockLayout } from './table-layout/rows-block-layout';

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
    const tableRect = findDOMNode(this.tableNode)
      .getBoundingClientRect();
    this.animations = getAnimations(columns, nextColumns, tableRect.width, this.animations);
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
      headerRows,
      rows,
      minColumnWidth,
      tableTemplate,
      headTemplate,
      bodyTemplate,
      rowTemplate,
      cellTemplate,
      className,
      style,
    } = this.props;
    const columns = this.getColumns();
    const minWidth = columns
      .map(column => column.width || (column.type === TABLE_FLEX_TYPE ? 0 : minColumnWidth))
      .reduce((acc, width) => acc + width, 0);

    const table = (
      <TemplateRenderer
        template={tableTemplate}
        params={{
          ref: this.setRef,
          style: {
            tableLayout: 'fixed',
            minWidth: `${minWidth}px`,
          },
        }}
      >
        {[
          ...(!headerRows.length
            ? []
            : [(
              <RowsBlockLayout
                key="head"
                rows={headerRows}
                columns={columns}
                blockTemplate={headTemplate}
                rowTemplate={rowTemplate}
                cellTemplate={cellTemplate}
              />
            )]
          ),
          <RowsBlockLayout
            key="body"
            rows={rows}
            columns={columns}
            blockTemplate={bodyTemplate}
            rowTemplate={rowTemplate}
            cellTemplate={cellTemplate}
          />,
        ]}
      </TemplateRenderer>
    );

    return (
      <div
        className={className}
        style={{
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          ...style,
        }}
      >
        {table}
      </div>
    );
  }
}

TableLayout.propTypes = {
  headerRows: PropTypes.array,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  minColumnWidth: PropTypes.number,
  tableTemplate: PropTypes.func.isRequired,
  headTemplate: PropTypes.func,
  bodyTemplate: PropTypes.func.isRequired,
  rowTemplate: PropTypes.func.isRequired,
  cellTemplate: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

TableLayout.defaultProps = {
  headerRows: [],
  headTemplate: () => null,
  minColumnWidth: 120,
  className: undefined,
  style: undefined,
};
