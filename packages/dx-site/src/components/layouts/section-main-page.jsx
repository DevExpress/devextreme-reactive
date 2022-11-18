import * as React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Layout from './layout';
import Header from '../header';
import LandingProductLinks from '../landing/product-links';
import ContainerWithMenu from './container-with-menu';

import navigation from '../../../page-navigation.json';

const generateMenuItems = siteSection => (navigation[siteSection]);

const SectionMainPage = ({ title, section, children }) => (
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

SectionMainPage.propTypes = {
  title: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SectionMainPage;
