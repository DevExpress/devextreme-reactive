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

const gatherDemos = () => {
  return (
  Object.keys(navigation).reduce((acc, productSlug) => {
    if (navigation[productSlug]["demos"]) {
      acc.push({
        title: titles[productSlug],
        items: navigation[productSlug]["demos"].reduce((items, section) => {
          return [...items, ...section['items']];
        }, []),
      })
    }
    return acc;
  }, [])
);
}

export default ({ children }) => {
  // console.log(menuData);
  const menuItems = gatherDemos();
  // menuData.map(({ fieldValue, edges }) => ({
  //   title: fieldValue,
  //   items: edges.map(({ node: { fields, headings } }) =>  ({
  //     title: headings[0].value,
  //     path: fields.slug,
  //   })),
  // }));


  return (
    <Layout>
      <Helmet title="Reactive Demos" />
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
        items={menuItems}
      >
        {children}
      </ContainerWithMenu>
    </Layout>
  );
};
