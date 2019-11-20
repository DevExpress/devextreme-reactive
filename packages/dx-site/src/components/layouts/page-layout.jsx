

import * as React from 'react';
import * as PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Layout from './layout';
import Header from '../header';
import LeftMenu from '../docs/left-menu';
import VersionLink from '../docs/version-link';
import LandingProductLinks from '../landing/product-links';
import ContentContainer from './content-container';

import styles from './page-layout.module.scss';

class PageLayout extends React.PureComponent {
  render() {
    const { technologyName, sectionName, children } = this.props;
    const isDocPage = sectionName === 'docs';
    return (
      <Layout>
        <Header
          links={(
            <React.Fragment>
              {isDocPage ? (<VersionLink />) : null}
              <LandingProductLinks />
            </React.Fragment>
          )}
        />
        <ContentContainer>
          {children}
        </ContentContainer>
      </Layout>
    );
  }
}

PageLayout.propTypes = {
  technologyName: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  children: PropTypes.node,
};

PageLayout.defaultProps = {
  children: undefined,
  technologyName: 'react',
};

export default PageLayout;
