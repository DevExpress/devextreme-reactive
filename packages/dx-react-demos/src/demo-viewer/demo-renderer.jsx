import React from 'react';
import PropTypes from 'prop-types';

import { Paper } from 'material-ui';

import { themes, demos } from '../demo-registry';

export const DemoRenderer = ({
  section: currentSection,
  demo: currentDemo,
  theme: currentTheme,
}) => {
  const Component = demos[currentSection][currentDemo][currentTheme];

  if (!Component) return <div>&gt; DEMO IS NOT AVAILABLE &lt;</div>;

  const { DemoContainer } = themes
    .find(({ name: theme }) => theme === currentTheme);

  const demo = (
    <DemoContainer>
      <Component />
    </DemoContainer>
  );
  if (currentTheme === 'material-ui') {
    return (
      <Paper>
        {demo}
      </Paper>
    );
  }
  return demo;
};

DemoRenderer.propTypes = {
  section: PropTypes.string.isRequired,
  demo: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
};
