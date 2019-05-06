import * as React from 'react';
import * as PropTypes from 'prop-types';
import LandingChessBoardLayout from '../chess-board-layout';

const FeaturesList = ({ data, rowLength, layoutItemComponent: LayoutItem }) => {
  const rows = data.reduce((acc, item, i) => {
    if (i % rowLength === 0 || item.sectionTitle !== undefined) {
      acc.push([]);
    }
    acc[acc.length - 1].push(item);

    return acc;
  }, []);


  return rows.map((rowItems) => {
    const sectionTitle = rowItems[0].sectionTitle;
    const items = rowItems.map((item) => <LayoutItem {...item} />);

    return <LandingChessBoardLayout items={items} title={sectionTitle} />
  });
};

export default FeaturesList;
