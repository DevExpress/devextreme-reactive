import React from 'react';
import PropTypes from 'prop-types';
import Layout from './layout';
import Link from 'gatsby-link';
import { Location } from '@reach/router';

import navigation from './page-navigation.json';

const Section = ({ section }) => {
  let items = section.items;
  if (section.title === 'API Reference') {
    items = items.sort((a, b) => a.title.localeCompare(b.title))
  }
  return (
    <Location>
      {({ location }) => (
        <React.Fragment key={section.title}>
          <h3>{section.title}</h3>
          <ul className="list-unstyled">
            {items.map((item) => (
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

const PageLayout = ({ technologyName, sectionName, location, children }) => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 order-12">
            {children}
          </div>

          <div className="col-sm-3 order-1">
            {navigation[technologyName][sectionName].map((section) => (
              <Section
                key={section.title}
                section={section}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout;
