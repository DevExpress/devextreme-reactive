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
      <div>
        <DemoRenderer
          theme={theme}
          section={currentSection}
          demo={currentDemo}
        />
        <div className="clearfix">
          <a
            className="pull-right"
            style={{
              marginTop: `${theme === 'bootstrap3' ? -10 : 10}px`,
            }}
            href={`https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-demos/src/${theme}/${currentSection}/${currentDemo}.jsx`}
          >
            Source Code
          </a>
        </div>
      </div>
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
