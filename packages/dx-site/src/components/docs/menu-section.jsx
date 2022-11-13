import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './menu-section.module.scss';

const SectionBase = ({
  title, items, location,
  onHeaderClick, listClassName, titleClassName,
  subSectionComponent: SubSection,
  itemComponent: Item,
  titleComponent: Title,
}) => (
  <React.Fragment key={title}>
    <Title
      className={titleClassName}
      onClick={onHeaderClick}
      title={title}
    />

    <ul
      className={`list-unstyled ${listClassName} ${styles.menuList}`}
    >
      {items.map(item => (
        item.items ? (
          <SubSection
            {...item}
            key={item.title}
            itemComponent={Item}
            location={location}
          />
        ) : (
          <Item {...item} key={item.title} />
        )
      ))}
    </ul>
  </React.Fragment>
);

SectionBase.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  subSectionComponent: PropTypes.func.isRequired,
  itemComponent: PropTypes.func.isRequired,
  titleComponent: PropTypes.func.isRequired,
  onHeaderClick: PropTypes.func,
  listClassName: PropTypes.string,
  titleClassName: PropTypes.string,
};

SectionBase.defaultProps = {
  onHeaderClick: () => {},
  listClassName: '',
  titleClassName: '',
};

export default SectionBase;
