import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Location } from '@reach/router';
import Link from 'gatsby-link';
import styles from './menu-section.module.scss';

const Section = ({ section }) => {
  let { items } = section;
  if (section.title === 'API Reference') {
    items = items.sort((a, b) => a.title.localeCompare(b.title));
  }
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Location>
      {({ location }) => (
        <React.Fragment key={section.title}>
          <h3
            className={`${styles.title} ${collapsed ? styles.collapsed : ''} `}
            onClick={() => setCollapsed(!collapsed)}
          >
            {section.title}
          </h3>

          <ul
          className={`list-unstyled ${collapsed ? styles.collapsed : '' } ${styles.menuList}`} >
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

export default Section;
