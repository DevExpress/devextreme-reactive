import * as React from 'react';
import * as PropTypes from 'prop-types';
import AlternatedBackground from '../alternated-background';

const FeaturesList = ({
  data,
  columns,
  layoutItemComponent: LayoutItem,
  layoutRowComponent: LayoutRow,
}) => {
  console.log('cols', columns)
  const rows = data.reduce((acc, item, i) => {
    const rowFilled = acc.length > 0 && acc[acc.length - 1].length % columns === 0;
    if (i === 0 || rowFilled || item.sectionTitle !== undefined) {
      acc.push([]);
    }
    acc[acc.length - 1].push(item);

    return acc;
  }, []);

  return rows.map((rowItems, index) => {
    const sectionTitle = rowItems[0].sectionTitle;
    const items = rowItems.map((item) => <LayoutItem {...item} md={12 / columns} />);
    const alternate = index % 2 === 1;

    return (
      <>
        {(alternate ? (
            <AlternatedBackground>
              <LayoutRow items={items} title={sectionTitle} />
            </AlternatedBackground>
          )
          : <LayoutRow items={items} title={sectionTitle} />
        )}
      </>
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
