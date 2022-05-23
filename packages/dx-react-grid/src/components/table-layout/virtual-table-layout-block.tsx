import * as React from 'react';
import { VirtualTableLayoutBlockProps } from '../../types';
import { VirtualRowLayout } from './virtual-row-layout';

// tslint:disable-next-line: max-line-length
export class VirtualTableLayoutBlock extends React.PureComponent<VirtualTableLayoutBlockProps, any> {
  render() {
    const {
      collapsedGrid,
      bodyComponent: Body,
      cellComponent,
      rowComponent,
      isFixed,
    } = this.props;

    return (
      <Body isFixed={isFixed}>
        {collapsedGrid.rows.map((visibleRow) => {
          const { row, cells = [] } = visibleRow;

          return (
            <VirtualRowLayout
              key={row.key}
              row={row}
              cells={cells}
              rowComponent={rowComponent}
              cellComponent={cellComponent}
            />
          );
        })}
        </Body>
    );
  }

}
