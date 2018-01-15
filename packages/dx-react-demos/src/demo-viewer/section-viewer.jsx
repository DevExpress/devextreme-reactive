import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { demos } from '../demo-registry.json';
import { ThemeViewer } from './theme-viewer';
import { DemoRenderer } from './demo-renderer';

export const SectionViewerBase = ({ match: { params: { sectionName } } }) => (
  <ThemeViewer>
    {({ themeName, variantName }) => (
      Object.keys(demos[sectionName])
        .map(demoName => (
          <div key={demoName}>
            <h4>
              <Link to={`/demo/${sectionName}/${demoName}/${themeName}/${variantName}`}>
                {demoName}
              </Link>
            </h4>
            <DemoRenderer
              themeName={themeName}
              variantName={variantName}
              sectionName={sectionName}
              demoName={demoName}
            />
          </div>
        ))
    )}
  </ThemeViewer>
);

SectionViewerBase.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      sectionName: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export const SectionViewer = withRouter(SectionViewerBase);
