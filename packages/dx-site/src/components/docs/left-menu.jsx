import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Location } from '@reach/router';
import Link from 'gatsby-link';
import Search from './search';
import DocsSection from './docs-menu-section';
import DemosSection from './demos-menu-section';

import styles from './left-menu.module.scss';

const LeftMenu = (props) => {
  const { collapsible } = props;
  return (
    <Location>
      {({ location }) => (
        <LeftMenuBase
          {...props}
          location={location}
          sectionComponent={DocsSection}
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
  <div className={styles.singleItem}>
    <Item {...props} />
  </div>
);

const LeftMenuBase = ({
  sectionComponent: Section, items,
  menuAddon, location,
}) => (
  <div className={styles.leftMenu}>
    {menuAddon}
    {items.map((section, index, arr) => (
      <>
        {section.items ? (
          <Section
            key={section.title}
            section={section}
            itemComponent={Item}
            location={location}
          />
        ) : (
          <SingleItem {...section} />
        )}
        {index < arr.length - 1 ? <hr /> : null}
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
