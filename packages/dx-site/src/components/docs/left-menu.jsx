import * as React from 'react';
import * as PropTypes from 'prop-types';
import Section from './menu-section';
import Search from './search';
import navigation from '../../../page-navigation.json';

import styles from './left-menu.module.scss';

const LeftMenu = ({ technologyName, sectionName }) => (
  <div className={styles.leftMenu}>
    <Search
      technologyName={technologyName}
      sectionName={sectionName}
    />
    {navigation[technologyName][sectionName].map((section, index, arr) => (
      <>
        <Section
          key={section.title}
          section={section}
        />
        {index < arr.length - 1 ? <hr /> : null}
      </>
    ))}
  </div>
);

LeftMenu.propTypes = {
  technologyName: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
};

export default LeftMenu;
