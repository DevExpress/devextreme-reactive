

import * as React from 'react';
import * as PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Layout from './layout';
import Header from './header';
import ProductLogo from './logos/product';
import LeftMenu from './docs/left-menu';
import VersionLink from './docs/version-link';

import styles from './page-layout.module.scss';

const PartiallyActiveLink = props => (
  <Link
    partiallyActive
    activeClassName={styles.activeLink}
    {...props}
  />
);

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
              <PartiallyActiveLink to={`/${technologyName}/demos/`}>Demos</PartiallyActiveLink>
              <PartiallyActiveLink to={`/${technologyName}/docs/`}>Docs</PartiallyActiveLink>
            </React.Fragment>
          )}
        />
        <div className={isDocPage ? styles.docsPageLayout : styles.pageLayout}>
          <div className="container">
            <div className="row">
              <div className="col-md-9 order-md-2">
                <div className={styles.content}>
                  {children}
                </div>
              </div>
              <div className="col-md-3 order-md-1">
                <div className={styles.sidebar}>
                  <LeftMenu
                    sectionName={sectionName}
                    technologyName={technologyName}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
