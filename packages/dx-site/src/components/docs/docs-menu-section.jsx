import * as React from 'react';
import * as PropTypes from 'prop-types';
import SectionBase from './menu-section';

import styles from './docs-menu-section.module.scss';

const DocsSection = ({ section }) => {
  const [collapsed, setCollapsed] = React.useState(false);
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
      items={items}
      title={title}
      onHeaderClick={onClick}
      classes={classes}
    />
  );
};

export default DocsSection;
