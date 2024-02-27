import * as React from 'react';
import PropTypes from 'prop-types';
import Layout from './layout';
import Header from '../header';
import VersionLink from '../docs/version-link';
import LandingProductLinks from '../landing/product-links';
import ContentContainer from './content-container';
import HeaderAddon from '../docs/header-addon';

class PageLayout extends React.PureComponent {
  static propTypes = {
    sectionName: PropTypes.string.isRequired,
    children: PropTypes.node,
  };

  static defaultProps = {
    children: undefined,
  };

  render() {
    const { sectionName, children } = this.props;
    const isDocPage = sectionName === 'docs';
    return (
      <Layout>
        <Header
          links={(
            <>
              {isDocPage ? (<VersionLink />) : null}
              <LandingProductLinks />
            </>
          )}
          addon={
            <HeaderAddon link="https://github.com/DevExpress/devextreme-reactive/blob/master/README.md#this-project-is-not-in-development-we-continue-to-support-and-fix-bugs-in-it" spanText="Devextreme Reactive development is not in progress now." linkText="See details." />
          }
        />
        <ContentContainer>
          {children}
        </ContentContainer>
      </Layout>
    );
  }
}

export default PageLayout;
