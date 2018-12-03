import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { ThemeViewer } from './theme-viewer';
import { DemoFrame } from './demo-frame';
import { EmbeddedDemoContext } from '../context';

export const SectionViewerBase = ({
  match: { params: { sectionName } },
}) => (
  <EmbeddedDemoContext.Consumer>
    {({ demoSources }) => (
      <ThemeViewer>
        {({ themeName, variantName }) => (
          Object.keys(demoSources[sectionName])
            .map(demoName => (
              <div key={demoName}>
                <h4>
                  <Link to={`/demo/${sectionName}/${demoName}/${themeName}/${variantName}`}>
                    {demoName}
                  </Link>
                </h4>
                <DemoFrame
                  themeName={themeName}
                  variantName={variantName}
                  sectionName={sectionName}
                  demoName={demoName}
                />
              </div>
            ))
        )}
      </ThemeViewer>
    )}
  </EmbeddedDemoContext.Consumer>
);

SectionViewerBase.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      sectionName: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export const SectionViewer = withRouter(SectionViewerBase);
