

import * as React from 'react';
import * as PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Layout from './layout';
import Header from '../header';
import ProductLogo from '../logos/product';
import LeftMenu from '../docs/left-menu';
import VersionLink from '../docs/version-link';
import ContainerWithMenu from './container-with-menu';
import Search from '../docs/search';

import navigation from '../../../page-navigation.json';
import styles from './page-layout.module.scss';

class PageLayout extends React.PureComponent {
  render() {
    const { technologyName, sectionName, children } = this.props;
    const isDocPage = sectionName === 'docs';
    return (
      <Layout>
        <Header
          logo={<ProductLogo link={technologyName} />}
          links={(
            <React.Fragment>
              {isDocPage ? (<VersionLink />) : null}
              <LandingProductLinks
                productInfo={[
                  { title: 'Demos', location: `/${technologyName}/demos/` },
                  { title: 'Docs', location: `/${technologyName}/docs/` },
                ]}
              />
            </React.Fragment>
          )}
        />
        <ContainerWithMenu
          collapsible={isDocPage}
          items={navigation[technologyName][sectionName]}
          menuAddon={isDocPage ? (
            <Search
              technologyName={technologyName}
              sectionName={sectionName}
            />
          ) : null}
        >
          {children}
        </ContainerWithMenu>
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
};

export default PageLayout;
