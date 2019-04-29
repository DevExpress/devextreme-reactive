import * as React from 'react';
import * as PropTypes from 'prop-types';
import LandingChessBoardLayout from './chess-board-layout';
import LandingLayoutItem from './layout-item';

const FeaturesList = ({ data, colSize }) => {
  const rowLength = 12 / colSize;
  const rows = data.reduce((acc, item, i) => {
    if (i % rowLength === 0 || item.sectionTitle !== undefined) {
      acc.push([]);
    }
    acc[acc.length - 1].push(item);

    return acc;
  }, []);


  return rows.map((rowItems) => {
    const sectionTitle = rowItems[0].sectionTitle;
    const items = rowItems.map((item) => <LandingLayoutItem {...item} colSize={colSize} />);

    return <LandingChessBoardLayout items={items} title={sectionTitle} />
  });
};

export default FeaturesList;
