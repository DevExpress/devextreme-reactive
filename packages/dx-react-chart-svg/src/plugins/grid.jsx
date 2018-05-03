import * as React from 'react';
import { Grid as GridBase } from '@devexpress/dx-react-chart';
import { Root } from '../templates/grid/root';
import { Line } from '../templates/grid/line';

export class Grid extends React.PureComponent {
  render() {
    return (
      <GridBase
        rootComponent={Root}
        lineComponent={Line}
        {...this.props}
      />
    );
  }
}

Grid.Root = Root;
Grid.Line = Line;
