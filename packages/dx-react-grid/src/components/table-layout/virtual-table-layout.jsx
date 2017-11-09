import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { TemplateRenderer } from '@devexpress/dx-react-core';
import { ColumnGroup } from './column-group';
import { RowLayout } from './row-layout';
import {
  getVisibleRows,
  firstVisibleRowOffset,
} from './virtual-table-utils';

export class VirtualTableLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visibleBodyRows: [],
    };

    this.rowRefs = new Map();
    this.rowHeights = new Map();
    this.viewportTop = 0;
    this.updateViewport = this.updateViewport.bind(this);
    this.registerRowRef = this.registerRowRef.bind(this);
    this.getRowHeight = this.getRowHeight.bind(this);

    this.state.visibleBodyRows = this.getVisibleRows();
  }
  componentDidMount() {
    this.storeRowHeights();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.headerRows !== nextProps.headerRows ||
      this.props.rows !== nextProps.rows) {
      const { rowHeights: prevRowHeight } = this;
      this.rowHeights = [...nextProps.headerRows, ...nextProps.rows].reduce(
        (acc, row) => {
          const rowHeight = prevRowHeight.get(row.key);
          if (rowHeight !== undefined) {
            acc.set(row.key, rowHeight);
          }
          return acc;
        },
        new Map(),
      );
      this.setState({
        visibleBodyRows: this.getVisibleRows(nextProps, this.viewportTop),
      });
    }
  }
  componentDidUpdate() {
    this.storeRowHeights();
  }
  getRowHeight(row) {
    const storedHeight = this.rowHeights.get(row.key);
    if (storedHeight !== undefined) return storedHeight;
    if (row.height) return row.height;
    return this.props.estimatedRowHeight;
  }
  getVisibleRows({ rows, headerRows, height } = this.props, top = this.viewportTop) {
    const headHeight = headerRows.reduce((acc, row) => acc + this.getRowHeight(row), 0);
    return getVisibleRows(rows, top, height - headHeight, this.getRowHeight);
  }
  storeRowHeights() {
    const rowsWithChangedHeights = Array.from(this.rowRefs.entries())
      // eslint-disable-next-line react/no-find-dom-node
      .map(([row, ref]) => [row, findDOMNode(ref).getBoundingClientRect().height])
      .filter(([row, height]) => height !== this.getRowHeight(row));

    if (rowsWithChangedHeights.length) {
      const { rowHeights } = this;
      rowsWithChangedHeights
        .forEach(([row, height]) => rowHeights.set(row.key, height));

      const { visibleBodyRows: prevVisibleBodyRows } = this.state;
      const visibleBodyRows = this.getVisibleRows();

      this.setState({
        visibleBodyRows,
      });

      const scrollOffset = firstVisibleRowOffset(prevVisibleBodyRows, visibleBodyRows);
      if (scrollOffset !== 0) {
        // eslint-disable-next-line react/no-find-dom-node
        findDOMNode(this).scrollTop += scrollOffset;
      }
    }
  }
  registerRowRef(row, ref) {
    if (ref === null) {
      this.rowRefs.delete(row);
    } else {
      this.rowRefs.set(row, ref);
    }
  }
  updateViewport(e) {
    const node = e.target;

    // NOTE: prevent iOS to flicker in bounces
    if (node.scrollTop < 0 ||
      node.scrollLeft < 0 ||
      node.scrollLeft + node.clientWidth > node.scrollWidth ||
      node.scrollTop + node.clientHeight > node.scrollHeight) {
      return;
    }

    if (this.viewportTop !== node.scrollTop) {
      this.viewportTop = node.scrollTop;
      this.setState({
        visibleBodyRows: this.getVisibleRows(),
      });
    }
  }
  render() {
    const {
      headerRows, columns, minWidth, height,
      containerTemplate, headTableTemplate, tableTemplate, headTemplate, bodyTemplate,
      rowTemplate, cellTemplate,
    } = this.props;
    const {
      visibleBodyRows,
    } = this.state;

    return (
      <TemplateRenderer
        template={containerTemplate}
        params={{
          style: { height: `${height}px` },
          onScroll: this.updateViewport,
        }}
      >
        {!!headerRows.length && (
          <TemplateRenderer
            template={headTableTemplate}
            params={{ style: { minWidth: `${minWidth}px` } }}
          >
            <ColumnGroup columns={columns} />
            <TemplateRenderer
              template={headTemplate}
            >
              {headerRows.map(row => (
                <RowLayout
                  key={row.key}
                  ref={ref => this.registerRowRef(row, ref)}
                  row={row}
                  columns={columns}
                  rowTemplate={rowTemplate}
                  cellTemplate={cellTemplate}
                />
              ))}
            </TemplateRenderer>
          </TemplateRenderer>
        )}
        <TemplateRenderer
          template={tableTemplate}
          params={{ style: { minWidth: `${minWidth}px` } }}
        >
          <ColumnGroup columns={columns} />
          <TemplateRenderer
            template={bodyTemplate}
          >
            {visibleBodyRows.map((visibleRow) => {
              if (visibleRow.type === 'stub') {
                return (
                  <tr key={visibleRow.key} style={{ height: `${visibleRow.height}px` }} />
                );
              }
              const { row } = visibleRow;
              return (
                <RowLayout
                  key={row.key}
                  ref={ref => this.registerRowRef(row, ref)}
                  row={row}
                  columns={columns}
                  rowTemplate={rowTemplate}
                  cellTemplate={cellTemplate}
                />
              );
            })}
          </TemplateRenderer>
        </TemplateRenderer>
      </TemplateRenderer>
    );
  }
}

VirtualTableLayout.propTypes = {
  minWidth: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  headerRows: PropTypes.array,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  cellTemplate: PropTypes.func.isRequired,
  rowTemplate: PropTypes.func.isRequired,
  bodyTemplate: PropTypes.func.isRequired,
  headTemplate: PropTypes.func,
  tableTemplate: PropTypes.func.isRequired,
  headTableTemplate: PropTypes.func,
  containerTemplate: PropTypes.func.isRequired,
  estimatedRowHeight: PropTypes.number.isRequired,
};

VirtualTableLayout.defaultProps = {
  headerRows: [],
  headTemplate: () => null,
  headTableTemplate: () => null,
};
