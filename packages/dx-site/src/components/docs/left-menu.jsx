import * as React from 'react';
import * as PropTypes from 'prop-types';
import Search from './search';
import DocsSection from './docs-menu-section';
import DemosSection from './demos-menu-section';

import styles from './left-menu.module.scss';

const LeftMenu = (props) => {
  const { collapsible } = props;
  // console.log(props.items)
  return (
    <LeftMenuBase
      {...props}
      sectionComponent={collapsible ? DocsSection : DemosSection}
    />
  );
};

const LeftMenuBase = ({
  technologyName, sectionName, showSearch,
  sectionComponent: Section, items,
  menuAddon,
}) => (
  <div className={styles.leftMenu}>
    {menuAddon}
    {items.map((section, index, arr) => (
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
  // technologyName: PropTypes.string.isRequired,
  // sectionName: PropTypes.string.isRequired,
};

LeftMenu.defaultProps = {
  menuAddon: null,
};

export default LeftMenu;
