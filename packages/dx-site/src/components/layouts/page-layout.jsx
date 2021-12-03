import * as React from 'react';
import * as PropTypes from 'prop-types';
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
            <HeaderAddon link="https://github.com/DevExpress/devextreme-reactive/issues" spanText="Reactive development is not in progress now." linkText="See deteils." />
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
