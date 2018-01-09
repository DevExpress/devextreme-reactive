import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { demos } from '../demo-registry';
import { ThemeViewer } from './theme-viewer';
import { DemoRenderer } from './demo-renderer';

export const SectionViewerBase = ({ match: { params: { section } } }) => (
  <ThemeViewer>
    {({ theme }) => (
      <div>
        {Object.keys(demos[section])
          .filter(demo => !demo.startsWith('_'))
          .map(demo => (
            <div key={demo}>
              <h4>
                <Link to={`/demo/${section}/${demo}/${theme}`}>
                  {demo}
                </Link>
              </h4>
              <DemoRenderer
                theme={theme}
                section={section}
                demo={demo}
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
