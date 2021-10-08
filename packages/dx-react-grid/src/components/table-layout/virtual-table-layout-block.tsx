import * as React from 'react';
import { ColumnGroup } from './column-group';
import { VirtualTableLayoutBlockProps } from '../../types';
import { VirtualRowLayout } from './virtual-row-layout';

// tslint:disable-next-line: max-line-length
export class VirtualTableLayoutBlock extends React.PureComponent<VirtualTableLayoutBlockProps, any> {
  static defaultProps = {
    blockRefsHandler: () => {},
    rowRefsHandler: () => {},
    tableRef: React.createRef(),
  };

  componentDidMount() {
    const { name, tableRef, blockRefsHandler } = this.props;
    blockRefsHandler(name, tableRef!.current);
  }

  render() {
    const {
      tableRef,
      collapsedGrid,
      minWidth,
      rowRefsHandler,
      tableComponent: Table,
      bodyComponent: Body,
      cellComponent,
      rowComponent,
      marginBottom,
    } = this.props;

    return (
      <Table
        forwardedRef={tableRef}
        style={{
          minWidth: `${minWidth}px`,
          ...marginBottom ? { marginBottom: `${marginBottom}px` } : null,
        }}
      >
        <ColumnGroup
          columns={collapsedGrid.columns}
        />
        <Body>
          {collapsedGrid.rows.map((visibleRow) => {
            const { row, cells = [] } = visibleRow;

            return (
              <VirtualRowLayout
                key={row.key}
                forwardedRef={ref => rowRefsHandler(row, ref)}
                row={row}
                cells={cells}
                rowComponent={rowComponent}
                cellComponent={cellComponent}
              />
            );
          })}
        </Body>
      </Table>
    );
  }

}
