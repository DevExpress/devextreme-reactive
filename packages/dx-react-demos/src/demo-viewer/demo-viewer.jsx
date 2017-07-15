import React from 'react';
import PropTypes from 'prop-types';

import { demos } from '../demo-registry';
import { ThemeViewer } from './theme-viewer';
import { DemoRenderer } from './demo-renderer';

export const DemoViewer = ({
  match: { params: { demo: currentDemo, section: currentSection } },
}) => (
  <ThemeViewer
    avaliableThemes={Object.keys(demos[currentSection][currentDemo])}
  >
    {({ theme }) => (
      <DemoRenderer
        theme={theme}
        section={currentSection}
        demo={currentDemo}
      />
    )}
  </ThemeViewer>
);

DemoViewer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      section: PropTypes.string.isRequired,
      demo: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
