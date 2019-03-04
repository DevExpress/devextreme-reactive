import * as React from 'react';
import * as PropTypes from 'prop-types';
import LandingChessBoardLayout from './chess-board-layout';
import LandingFeatureDescription from './feature-description';
import LandingFeaturePreview from './feature-preview';
import LandingAlternatedBackground from './alternated-background';

const ChessBoardLayoutList = ({ data }) => (
  data.map(({
    alternative,
    reversed,
    title,
    description,
    imageLink,
    sectionTitle,
  }, i) => {
    const itemProps = {
      reversed,
      firstChild: (
        <LandingFeatureDescription
          title={title}
          description={description}
        />
      ),
      secondChild: (
        <LandingFeaturePreview
          title={title}
          imageLink={imageLink}
        />
      ),
      ...sectionTitle ? { title: sectionTitle } : null,
    };
    const key = i.toString();
    return (alternative
      ? (
        <LandingAlternatedBackground key={key}>
          <LandingChessBoardLayout {...itemProps} />
        </LandingAlternatedBackground>
      )
      : <LandingChessBoardLayout {...itemProps} key={key} />);
  }));

ChessBoardLayoutList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    alternative: PropTypes.bool,
    reversed: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    imageLink: PropTypes.string,
    sectionTitle: PropTypes.string,
  })).isRequired,
};

export default ChessBoardLayoutList;
