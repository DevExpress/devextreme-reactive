import * as React from 'react';
import * as PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import Footer from '../footer';
import Cookie from '../cookie';
import favicon from '../images/favicon.ico';
import SurveyHeaderAddon from '../docs/survey-header-addon';

const faviconLink = [{
  rel: 'icon',
  type: 'image/png',
  href: `${favicon}`,
  sizes: '16x16',
}];

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div style={{ overflow: 'hidden' }}>
        <Helmet
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
          defaultTitle={data.site.siteMetadata.title}
          link={faviconLink}
        />
        <SurveyHeaderAddon />
        {children}
        <Footer />
        <Cookie />
      </div>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: undefined,
};

export default Layout;
