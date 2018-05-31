import * as React from 'react';
import { Grid as GridBase } from '@devexpress/dx-react-chart';
import { Line } from '../templates/grid/line';

export class Grid extends React.PureComponent {
  render() {
    return (
      <GridBase
        lineComponent={Line}
        {...this.props}
      />
    );
  }
}

Grid.Line = Line;
