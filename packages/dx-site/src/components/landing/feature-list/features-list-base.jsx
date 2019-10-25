import * as React from 'react';
import * as PropTypes from 'prop-types';
import AlternatedBackground from '../alternated-background';

const FeaturesList = ({
  data,
  columns,
  layoutItemComponent: LayoutItem,
  layoutRowComponent: LayoutRow,
}) => {
  const rows = data.reduce((acc, item, i) => {
    const rowFilled = acc.length > 0 && acc[acc.length - 1].length % columns === 0;
    if (i === 0 || rowFilled || item.sectionTitle !== undefined) {
      acc.push([]);
    }
    acc[acc.length - 1].push(item);

    return acc;
  }, []);

  return rows.map((rowItems, index) => {
    const sectionTitle = rowItems[0].title;
    const items = rowItems.map((item, idx) => <LayoutItem {...item} md={12 / columns} key={idx} />);
    const alternate = index % 2 === 1;

    return (
      (alternate ? (
          <AlternatedBackground key={sectionTitle}>
            <LayoutRow items={items} title={sectionTitle} />
          </AlternatedBackground>
        )
        : <LayoutRow items={items} title={sectionTitle} key={sectionTitle} />
      )
    );
  });
};

FeaturesList.propTypes = {
  columns: PropTypes.number,
};
FeaturesList.defaultProps = {
  columns: null,
};

export default FeaturesList;
