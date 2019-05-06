import * as React from 'react';
import * as PropTypes from 'prop-types';
import LandingChessBoardLayout from './chess-board-layout';

import LandingAlternatedBackground from './alternated-background';
import LandingLayoutItem from './feature-list/layout-item';

const ChessBoardLayoutList = ({ data }) => (
  data.map(({
    items,
    sectionTitle,
  }, i) => {
    const [firstChild, secondChild] = items.map((item) => (
      <LandingLayoutItem {...item} />
    ));

    const itemProps = {
      firstChild,
      secondChild,
      ...sectionTitle ? { title: sectionTitle } : null,
    };
    const key = i.toString();
    return <LandingChessBoardLayout {...itemProps} key={key} />;
  }));

ChessBoardLayoutList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    imageLink: PropTypes.string,
    sectionTitle: PropTypes.string,
  })).isRequired,
};

export default ChessBoardLayoutList;
