import * as React from 'react';
import { RefHolder } from '@devexpress/dx-react-core';
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

  render() {
    const {
      name,
      tableRef,
      collapsedGrid,
      minWidth,
      blockRefsHandler,
      rowRefsHandler,
      tableComponent: Table,
      bodyComponent: Body,
      cellComponent,
      rowComponent,
      marginBottom,
    } = this.props;

    return (
      <RefHolder
        ref={ref => blockRefsHandler(name, ref)}
      >
        <Table
          tableRef={tableRef}
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
                <RefHolder
                  key={row.key}
                  ref={ref => rowRefsHandler(row, ref)}
                >
                  <VirtualRowLayout
                    row={row}
                    cells={cells}
                    rowComponent={rowComponent}
                    cellComponent={cellComponent}
                  />
                </RefHolder>
              );
            })}
          </Body>
        </Table>
      </RefHolder>
    );
  }

}
