import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Grid as GridBase } from '@devexpress/dx-react-grid';
import { Root } from './templates/layout';

export const Grid = ({ children, ...props }) => (
  <GridBase
    rootComponent={Root}
    {...props}
  >
    {children}
  </GridBase>
);

Grid.Root = Root;

Grid.propTypes = {
  children: PropTypes.node.isRequired,
};
