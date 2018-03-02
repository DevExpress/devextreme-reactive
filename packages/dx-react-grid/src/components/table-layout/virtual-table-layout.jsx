import * as React from 'react';
import { findDOMNode } from 'react-dom';
import * as PropTypes from 'prop-types';
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
      rowHeights: new Map(),
      viewportTop: 0,
    };

    this.rowRefs = new Map();
    this.updateViewport = this.updateViewport.bind(this);
    this.registerRowRef = this.registerRowRef.bind(this);
    this.getRowHeight = this.getRowHeight.bind(this);
  }
  componentDidMount() {
    this.storeRowHeights();
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.headerRows !== nextProps.headerRows ||
      this.props.rows !== nextProps.rows
    ) {
      const { rowHeights: prevRowHeight } = this.state;
      this.setState({
        rowHeights: [...nextProps.headerRows, ...nextProps.rows].reduce(
          (acc, row) => {
            const rowHeight = prevRowHeight.get(row.key);
            if (rowHeight !== undefined) {
              acc.set(row.key, rowHeight);
            }
            return acc;
          },
          new Map(),
        ),
      });
    }
  }
  componentDidUpdate() {
    this.storeRowHeights();
  }
  getRowHeight(row) {
    const storedHeight = this.state.rowHeights.get(row.key);
    if (storedHeight !== undefined) return storedHeight;
    if (row.height) return row.height;
    return this.props.estimatedRowHeight;
  }
  getVisibleRows({ rows, headerRows, height } = this.props, top = this.state.viewportTop) {
    const headHeight = headerRows.reduce((acc, row) => acc + this.getRowHeight(row), 0);
    return getVisibleRows(rows, top, height - headHeight, this.getRowHeight);
  }
  storeRowHeights() {
    const rowsWithChangedHeights = Array.from(this.rowRefs.entries())
      // eslint-disable-next-line react/no-find-dom-node
      .map(([row, ref]) => [row, findDOMNode(ref).getBoundingClientRect().height])
      .filter(([row, height]) => height !== this.getRowHeight(row));

    if (rowsWithChangedHeights.length) {
      const prevVisibleBodyRows = this.getVisibleRows();

      const { rowHeights } = this.state;
      rowsWithChangedHeights
        .forEach(([row, height]) => rowHeights.set(row.key, height));

      this.setState({
        rowHeights,
      });

      const visibleBodyRows = this.getVisibleRows();
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
      this.setState({
        viewportTop: node.scrollTop,
      });
    }
  }
  render() {
    const {
      headerRows, columns,
      minWidth, height,
      containerComponent: Container,
      headTableComponent: HeadTable,
      tableComponent: Table,
      headComponent: Head,
      bodyComponent: Body,
      rowComponent, cellComponent,
    } = this.props;
    const visibleBodyRows = this.getVisibleRows();

    return (
      <Container
        style={{ height: `${height}px` }}
        onScroll={this.updateViewport}
      >
        {!!headerRows.length && (
          <HeadTable
            style={{ minWidth: `${minWidth}px` }}
          >
            <ColumnGroup columns={columns} />
            <Head>
              {headerRows.map(row => (
                <RowLayout
                  key={row.key}
                  ref={ref => this.registerRowRef(row, ref)}
                  row={row}
                  columns={columns}
                  rowComponent={rowComponent}
                  cellComponent={cellComponent}
                />
              ))}
            </Head>
          </HeadTable>
        )}
        <Table
          style={{ minWidth: `${minWidth}px` }}
        >
          <ColumnGroup columns={columns} />
          <Body>
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
                  rowComponent={rowComponent}
                  cellComponent={cellComponent}
                />
              );
            })}
          </Body>
        </Table>
      </Container>
    );
  }
}

VirtualTableLayout.propTypes = {
  minWidth: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  headerRows: PropTypes.array,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  bodyComponent: PropTypes.func.isRequired,
  headComponent: PropTypes.func,
  tableComponent: PropTypes.func.isRequired,
  headTableComponent: PropTypes.func,
  containerComponent: PropTypes.func.isRequired,
  estimatedRowHeight: PropTypes.number.isRequired,
};

VirtualTableLayout.defaultProps = {
  headerRows: [],
  headComponent: () => null,
  headTableComponent: () => null,
};
