import * as React from 'react';
import * as PropTypes from 'prop-types';
import { StaticQuery, graphql, withPrefix } from 'gatsby';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import Layout from './layout';
import Header from '../header';
import ProductLogo from '../logos/product';
import LandingProductLinks from '../landing/product-links';
import LeftMenu from '../docs/left-menu';
import ContainerWithMenu from './container-with-menu';

import navigation from '../../../page-navigation.json';

const titles = {
  'react/grid': 'Grid',
  'react/chart': 'Chart',
  'react/scheduler': 'Scheduler',
};

const generateMenuItems = (siteSection) => ([
  { title: 'Overview', path: `/${siteSection}`},
  ...Object.keys(navigation).reduce((acc, productSlug) => {
    if (productSlug !== 'react/core' && navigation[productSlug][siteSection]) {
      acc.push({
        title: titles[productSlug],
        items: navigation[productSlug][siteSection].reduce((items, section) => {
          if (navigation[productSlug][siteSection].length === 1) {
            return section['items'];
          }
          return [...items, section];
        }, []),
      })
    }
    return acc;
  }, [])
]);

export default ({ title, section, children }) => (
  <Layout>
    <Helmet title={title} />
    <Header
      logo={<ProductLogo link="react" />}
      links={(
        <LandingProductLinks
          productInfo={[
            { title: 'Demos', location: '/demos' },
            { title: 'Docs', location: '/docs' },
          ]}
        />
      )}
    />

    <ContainerWithMenu
      collapsible
      items={generateMenuItems(section)}
    >
      {children}
    </ContainerWithMenu>
  </Layout>
);
