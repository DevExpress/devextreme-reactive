import React from 'react';
import PropTypes from 'prop-types';
import { Grid as GridBase } from '@devexpress/dx-react-grid';
import { Root, Header, Footer } from './templates/layout';

const rootTemplate = props => <Root {...props} />;
const headerPlaceholderTemplate = props => <Header {...props} />;
const footerPlaceholderTemplate = props => <Footer {...props} />;

export const Grid = ({ children, ...props }) => (
  <GridBase
    rootTemplate={rootTemplate}
    headerPlaceholderTemplate={headerPlaceholderTemplate}
    footerPlaceholderTemplate={footerPlaceholderTemplate}
    {...props}
  >
    {children}
  </GridBase>
);

Grid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

