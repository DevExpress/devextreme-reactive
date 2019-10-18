import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Location } from '@reach/router';

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
            itemComponent={Item}
            location={location}
          />
        ) : (
          <Item {...item} />
        )
      ))}
    </ul>
  </React.Fragment>
);

SectionBase.propTypes = {
  section: PropTypes.object.isRequired,
  onHeaderClick: PropTypes.function,
  listClassName: PropTypes.string,
  titleClassName: PropTypes.string,
};

SectionBase.defaultProps = {
  onHeaderClick: () => {},
  listClassName: '',
  titleClassName: '',
};

export default SectionBase;
