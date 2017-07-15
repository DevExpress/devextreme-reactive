import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { demos } from './demo-registry';
import { ThemeViewer } from './theme-viewer';
import { DemoRenderer } from './demo-renderer';

export const SectionViewerBase = ({ match: { params: { section } } }) => (
  <ThemeViewer>
    {({ theme }) => (
      <div>
        {demos
          .filter(demo => demo.section === section)
          .map(demo => (
            <div key={demo.demo}>
              <h4>{demo.title || demo.demo}</h4>
              <DemoRenderer
                theme={theme}
                section={section}
                demo={demo.demo}
              />
            </div>
          ))}
      </div>
    )}
  </ThemeViewer>
);

SectionViewerBase.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      section: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export const SectionViewer = withRouter(SectionViewerBase);
