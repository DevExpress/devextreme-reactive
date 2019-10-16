import * as React from 'react';
import * as PropTypes from 'prop-types';
import { StaticQuery, graphql, withPrefix } from 'gatsby';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import Layout from './layout';
import Header from '../header';
import LandingProductLinks from '../landing/product-links';
import LeftMenu from '../docs/left-menu';
import ContainerWithMenu from './container-with-menu';

import navigation from '../../../page-navigation.json';

const titles = {
  'react/grid': 'Grid',
  'react/chart': 'Chart',
  'react/scheduler': 'Scheduler',
};

const generateMenuItems = (siteSection) => (navigation[siteSection]);

export default ({ title, section, children }) => (
  <Layout>
    <Helmet title={title} />
    <Header
      links={<LandingProductLinks />}
    />

    <ContainerWithMenu
      collapsible
      items={generateMenuItems(section)}
    >
      {children}
    </ContainerWithMenu>
  </Layout>
);
