import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Location } from '@reach/router';
import Link from 'gatsby-link';
import styles from './menu-section.module.scss';

const SectionBase = ({ title, items, onHeaderClick, classes }) => (
  <Location>
    {({ location }) => (
      <React.Fragment key={title}>
        <h3
          className={classes.title}
          onClick={onHeaderClick}
        >
          {title}
        </h3>

        <ul
          className={`list-unstyled ${classes.list} ${styles.menuList}`}
        >
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

SectionBase.propTypes = {
  section: PropTypes.object.isRequired,
  onHeaderClick: PropTypes.function,
  claaes: PropTypes.object,
};

SectionBase.defaultProps = {
  onHeaderClick: () => {},
  classes: {
    title: '',
    list: '',
  },
};

export default SectionBase;
