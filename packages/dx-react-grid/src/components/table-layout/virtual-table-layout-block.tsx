import * as React from 'react';
import { VirtualTableLayoutBlockProps } from '../../types';
import { VirtualRowLayout } from './virtual-row-layout';

// tslint:disable-next-line: max-line-length
export class VirtualTableLayoutBlock extends React.PureComponent<VirtualTableLayoutBlockProps, any> {
  static defaultProps = {
    rowRefsHandler: () => {},
  };

  render() {
    const {
      collapsedGrid,
      rowRefsHandler,
      bodyComponent: Body,
      cellComponent,
      rowComponent,
    } = this.props;

    return (
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
    );
  }

}
