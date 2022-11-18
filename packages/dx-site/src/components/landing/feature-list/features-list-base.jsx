import * as React from 'react';
import PropTypes from 'prop-types';

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

  return rows.map((rowItems) => {
    const { sectionTitle } = rowItems[0];
    const items = rowItems.map(item => (
      <LayoutItem {...item} md={12 / columns} key={item.title} />
    ));

    return <LayoutRow items={items} title={sectionTitle} key={sectionTitle} />;
  });
};

FeaturesList.propTypes = {
  columns: PropTypes.number,
};
FeaturesList.defaultProps = {
  columns: null,
};

export default FeaturesList;
