import * as React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import Footer from '../footer';
import Cookie from '../cookie';
import favicon from '../images/favicon.ico';

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
        >
          <script>
            {`
              var _mtm = window._mtm = window._mtm || [];
              _mtm.push({ 'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start' });
              var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
              g.async = true; g.src = 'https://matomo.devexpress.com/js/container_foTT0fJ8.js'; g.setAttributeNode(d.createAttribute('data-ot-ignore')); s.parentNode.insertBefore(g, s);
            `}
          </script>
        </Helmet>
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
