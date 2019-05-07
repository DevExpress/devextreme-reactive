import * as React from 'react';
import * as PropTypes from 'prop-types';

const FeaturesList = ({
  data, rowLength,
  layoutItemComponent: LayoutItem,
  layoutRowComponent: LayoutRow,
}) => {
  const rows = data.reduce((acc, item, i) => {
    if (i === 0 || item.sectionTitle !== undefined) {
      acc.push([]);
    }
    acc[acc.length - 1].push(item);

    return acc;
  }, []);

  return rows.map((rowItems) => {
    const sectionTitle = rowItems[0].sectionTitle;
    const items = rowItems.map((item) => <LayoutItem {...item} />);

    return <LayoutRow items={items} title={sectionTitle} />
  });
};

export default FeaturesList;
