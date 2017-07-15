import React from 'react';
import PropTypes from 'prop-types';

import { demos } from './demo-registry';
import { ThemeViewer } from './theme-viewer';
import { DemoRenderer } from './demo-renderer';

export const DemoViewer = ({ match: { params: { demo, section } } }) => (
  <ThemeViewer
    avaliableThemes={demos
      .find(demoEntity => demoEntity.section === section && demoEntity.demo === demo)
      .themes.map(themeEntity => themeEntity.name)}
  >
    {({ theme }) => (
      <DemoRenderer
        theme={theme}
        section={section}
        demo={demo}
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
