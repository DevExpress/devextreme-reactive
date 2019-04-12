import * as React from 'react';
import { RefHolder } from '@devexpress/dx-react-core';
import { ColumnGroup } from './column-group';
import { VirtualTableLayoutBlockProps } from '../../types';

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
      marginBottom,
    } = this.props;
    const Row = this.props.rowComponent as React.ComponentType<any>;
    const Cell = this.props.cellComponent as React.ComponentType<any>;

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
                  <Row
                    tableRow={row}
                    style={row.height !== undefined
                      ? { height: `${row.height}px` }
                      : undefined}
                  >
                    {cells.map((cell) => {
                      const { column } = cell;
                      return (
                        <Cell
                          key={column.key}
                          tableRow={row}
                          tableColumn={column}
                          style={column.animationState}
                          colSpan={cell.colSpan}
                        />
                      );
                    })}
                  </Row>
                </RefHolder>
              );
            })}
          </Body>
        </Table>
      </RefHolder>
    );
  }

}
