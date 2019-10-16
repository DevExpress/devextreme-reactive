import * as React from 'react';
import * as PropTypes from 'prop-types';
import SectionBase from './menu-section';

import styles from './docs-menu-section.module.scss';

const isActiveSection = (section, location) => {
  const { items, path } = section;

  if (items) {
    return items.some(i => isActiveSection(i, location));
  }
  return location.pathname.endsWith(section.path)
}

const DocsSection = ({ section, location, ...restProps }) => {
  const defaultCollapsed = !isActiveSection(section, location);

  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  let { items, title } = section;
  if (section.title === 'API Reference') {
    items = items.sort((a, b) => a.title.localeCompare(b.title));
  }
  const onClick = () => setCollapsed(!collapsed);
  const classes = {
    title: `${styles.title} ${collapsed ? styles.collapsed : ''}`,
    list: collapsed ? styles.collapsedList : '',
  };

  return (
    <SectionBase
      {...restProps}
      location={location}
      items={items}
      title={title}
      onHeaderClick={onClick}
      classes={classes}
      subSectionComponent={DocsSection}
    />
  );
};

export default DocsSection;
