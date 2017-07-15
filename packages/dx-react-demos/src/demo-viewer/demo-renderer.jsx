import React from 'react';
import PropTypes from 'prop-types';

import { themes, demos } from '../demo-registry';

export const DemoRenderer = ({
  section: currentSection,
  demo: currentDemo,
  theme: currentTheme,
}) => {
  const Component = demos[currentSection][currentDemo][currentTheme];

  if (!Component) return <div>&gt; DEMO NOT AVALIABLE &lt;</div>;

  const DemoContainer = themes
    .find(({ name: theme }) => theme === currentTheme)
    .DemoContainer;

  return (
    <DemoContainer>
      <Component />
    </DemoContainer>
  );
};

DemoRenderer.propTypes = {
  section: PropTypes.string.isRequired,
  demo: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
};
