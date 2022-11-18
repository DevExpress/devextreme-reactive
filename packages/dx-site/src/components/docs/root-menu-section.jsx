import * as React from 'react';
import PropTypes from 'prop-types';
import SectionBase from './menu-section';
import SubSection from './menu-sub-section';

import styles from './root-menu-section.module.scss';

const isActiveSection = (items, path, location) => {
  if (items) {
    // if nested item is active, expand root section
    return items.some(({ items: sectionItems, path: sectionPath }) => (
      isActiveSection(sectionItems, sectionPath, location)
    ));
  }
  return location.pathname.endsWith(path);
};

const RootTitle = ({ title, ...restProps }) => (
  <h3 {...restProps}>
    {title}
  </h3>
);

RootTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

const RootSection = ({
  items, path, location, ...restProps
}) => {
  const defaultCollapsed = !isActiveSection(items, path, location);
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  const onClick = () => setCollapsed(!collapsed);
  const titleClassName = `${styles.title} ${collapsed ? styles.collapsed : ''}`;
  const listClassName = `${styles.list} ${collapsed ? styles.collapsed : ''}`;

  return (
    <SectionBase
      {...restProps}
      items={items}
      location={location}
      onHeaderClick={onClick}
      titleClassName={titleClassName}
      listClassName={listClassName}
      subSectionComponent={SubSection}
      titleComponent={RootTitle}
    />
  );
};

RootSection.propTypes = {
  items: PropTypes.array.isRequired,
  path: PropTypes.string,
  location: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

RootSection.defaultProps = {
  path: undefined,
};

export default RootSection;
