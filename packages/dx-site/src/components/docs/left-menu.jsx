import * as React from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
import Link from 'gatsby-link';
import RootSection from './root-menu-section';

import styles from './left-menu.module.scss';

const LeftMenu = props => (
  <Location>
    {({ location }) => (
      <LeftMenuBase
        {...props}
        location={location}
        sectionComponent={RootSection}
      />
    )}
  </Location>
);

const Item = ({ path, title }) => (
  <li key={path} className={styles.item}>
    <Link
      activeClassName={styles.activeLink}
      to={path}
    >
      {title}
    </Link>
  </li>
);

Item.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const SingleItem = props => (
  <ul className={`list-unstyled ${styles.singleItem}`}>
    <Item {...props} />
  </ul>
);

const LeftMenuBase = ({
  sectionComponent: Section, items,
  menuAddon, location,
}) => (
  <div className={styles.leftMenu}>
    {menuAddon}
    {items.map(section => (
      <React.Fragment key={section.title}>
        {section.items ? (
          <Section
            {...section}
            itemComponent={Item}
            location={location}
          />
        ) : (
          <SingleItem {...section} />
        )}
        <hr />
      </React.Fragment>
    ))}
  </div>
);

LeftMenuBase.propTypes = {
  location: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  sectionComponent: PropTypes.func.isRequired,
  menuAddon: PropTypes.node,
};

LeftMenuBase.defaultProps = {
  menuAddon: null,
};

export default LeftMenu;
