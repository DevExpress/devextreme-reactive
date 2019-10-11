import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Location } from '@reach/router';

import styles from './menu-section.module.scss';


const SectionTitle = ({ nested, ...restProps }) => {
  const H3 = props => <h3 {...props} />;
  const H4 = props => <h5 {...props} />;
  const Title = nested ? H4 : H3;
  return <Title {...restProps} />
};

const SectionBase = ({
  title, items, subSectionComponent: SubSection, itemComponent: Item,
  onHeaderClick, classes, nested,
}) => (
  <React.Fragment key={title}>
    <SectionTitle
      nested={nested}
      className={classes.title}
      onClick={onHeaderClick}
    >
      {title}
    </SectionTitle>

    <ul
      className={`list-unstyled ${classes.list} ${styles.menuList}`}
    >
      {items.map(item => (
        item.items ? (
          <SubSection
            nested
            onHeaderClick={onHeaderClick}
            classes={classes}
            section={item}
            itemComponent={Item}
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
  claaes: PropTypes.object,
};

SectionBase.defaultProps = {
  onHeaderClick: () => {},
  classes: {
    title: '',
    list: '',
  },
};

export default SectionBase;
