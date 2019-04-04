/* globals docsearch:true */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { Location } from '@reach/router';
import { StaticQuery, graphql } from 'gatsby';
import Layout from './layout';
import Header from './header';
import ProductLogo from './logos/product';

import navigation from '../../page-navigation.json';
import styles from './page-layout.module.scss';

const Section = ({ section }) => {
  let { items } = section;
  if (section.title === 'API Reference') {
    items = items.sort((a, b) => a.title.localeCompare(b.title));
  }
  return (
    <Location>
      {({ location }) => (
        <React.Fragment key={section.title}>
          <h3>{section.title}</h3>
          <ul className="list-unstyled">
            {items.map(item => (
              <li key={item.path}>
                {location.pathname.endsWith(item.path)
                  ? item.title
                  : <Link to={item.path}>{item.title}</Link>
                }
              </li>
            ))}
          </ul>
        </React.Fragment>
      )}
    </Location>
  );
};

Section.propTypes = {
  section: PropTypes.object.isRequired,
};

class PageLayout extends React.PureComponent {
  componentDidMount() {
    this.setupSearch();
  }

  componentDidUpdate() {
    this.setupSearch();
  }

  setupSearch() {
    const { technologyName, sectionName } = this.props;
    if (sectionName === 'demos') return;
    const [techno, tool] = technologyName.split('/');
    docsearch({
      apiKey: '4cd7a76d4bc286ae69fe26182a8d4b18',
      indexName: 'devextreme_reactive',
      inputSelector: '#docsearch',
      algoliaOptions: { facetFilters: [`techno:${techno}`, `tool:${tool}`] },
      debug: false,
    });
  }

  render() {
    const { technologyName, sectionName, children } = this.props;
    return (
      <Layout>
        <Header
          logo={<ProductLogo link={technologyName} />}
          links={(
            <React.Fragment>
              <Link to={`/${technologyName}/demos/`}>Demos</Link>
              <Link to={`/${technologyName}/docs/`}>Docs</Link>
            </React.Fragment>
          )}
        />
        <div className={styles.pageLayout}>
          <div className="container">
            <div className="row">
              <div className="col-md-9 order-md-2">
                <div className={styles.content}>
                  {children}
                </div>
              </div>
              <div className="col-md-3 order-md-1">
                <div className={styles.sidebar}>
                  {sectionName === 'docs' ? (
                    <React.Fragment>
                      <StaticQuery
                        query={graphql`
                          query {
                            site {
                              siteMetadata {
                                version
                              }
                            }
                          }
                        `}
                        render={data => (
                          <div className={styles.versionLink}>
                            <a
                              href={`https://github.com/DevExpress/devextreme-reactive/tree/master/CHANGELOG.md#${data.site.siteMetadata.version}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Version
                              {' '}
                              <span className={styles.version}>
                                {data.site.siteMetadata.version}
                              </span>
                            </a>
                          </div>
                        )}
                      />
                      <input
                        id="docsearch"
                        className={`form-control ${styles.search}`}
                        placeholder="Search..."
                      />
                    </React.Fragment>
                  ) : null}
                  {navigation[technologyName][sectionName].map(section => (
                    <Section
                      key={section.title}
                      section={section}
                    />
                  ))}
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
