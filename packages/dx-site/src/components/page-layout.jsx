import * as React from 'react';
import * as PropTypes from 'prop-types';
import Link from 'gatsby-link';
import { Location } from '@reach/router';
import Layout from './layout';
import Header from './header';
import MainLogo from './logos/main';

import navigation from './page-navigation.json';
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

const PageLayout = ({ technologyName, sectionName, children }) => (
  <Layout>
    <Header
      logo={<MainLogo />}
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
            {children}
          </div>
          <div className="col-md-3 order-md-1">
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
  </Layout>
);

PageLayout.propTypes = {
  technologyName: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  children: PropTypes.node,
};

PageLayout.defaultProps = {
  children: undefined,
};

export default PageLayout;
