import * as React from 'react';
import { RefHolder } from '@devexpress/dx-react-core';
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
      collapsedGrid,
      blockRefsHandler,
      rowRefsHandler,
      bodyComponent: Body,
      cellComponent,
      rowComponent,
    } = this.props;

    return (
      <RefHolder
        ref={ref => blockRefsHandler(name, ref)}
      >
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
      </RefHolder>
    );
  }

}
