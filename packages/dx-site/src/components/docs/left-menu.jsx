import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Location } from '@reach/router';
import Link from 'gatsby-link';
import Search from './search';
import RootSection from './root-menu-section';

import styles from './left-menu.module.scss';

const LeftMenu = (props) => {
  const { collapsible } = props;
  return (
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
};

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
      <>
        {section.items ? (
          <Section
            {...section}
            key={section.title}
            itemComponent={Item}
            location={location}
          />
        ) : (
          <SingleItem {...section} />
        )}
        <hr />
      </>
    ))}
  </div>
);

LeftMenu.propTypes = {
  // technologyName: PropTypes.string.isRequired,
  // sectionName: PropTypes.string.isRequired,
};

LeftMenu.defaultProps = {
  menuAddon: null,
};

export default LeftMenu;
