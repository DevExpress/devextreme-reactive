import React from 'react';
import PropTypes from 'prop-types';
import { Grid as GridBase } from '@devexpress/dx-react-grid';
import { Root, Footer } from './templates/layout';

export const Grid = ({ children, ...props }) => (
  <GridBase
    rootComponent={Root}
    footerPlaceholderComponent={Footer}
    {...props}
  >
    {children}
  </GridBase>
);

Grid.Root = Root;

Grid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

