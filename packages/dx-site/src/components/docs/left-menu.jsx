import * as React from 'react';
import * as PropTypes from 'prop-types';
import Section from './menu-section';
import Search from './search';
import navigation from '../../../page-navigation.json';
import DocsSection from './docs-menu-section';
import DemosSection from './demos-menu-section';

import styles from './left-menu.module.scss';

const LeftMenu = (props) => {
  const { sectionName } = props;
  const isDocs = sectionName === 'docs';
  return (
    <LeftMenuBase
      {...props}
      showSearch={isDocs}
      sectionComponent={isDocs ? DocsSection : DemosSection}
    />
  );
};

const LeftMenuBase = ({
  technologyName, sectionName, showSearch,
  sectionComponent: Section,
}) => (
  <div className={styles.leftMenu}>
    {showSearch ? (
      <Search
        technologyName={technologyName}
        sectionName={sectionName}
      />
      ) : null
    }
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
