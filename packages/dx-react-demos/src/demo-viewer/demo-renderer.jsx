import React from 'react';
import PropTypes from 'prop-types';
import { demos } from '../demo-registry';
import { themes } from '../theme-registry';

export const DemoRenderer = ({
  section: currentSection,
  demo: currentDemo,
  theme: currentTheme,
}) => {
  const Component = demos[currentSection][currentDemo][currentTheme].demo
    || demos[currentSection][currentDemo][currentTheme];

  if (!Component) return <div>&gt; DEMO IS NOT AVAILABLE &lt;</div>;

  const { DemoContainer } = themes
    .find(({ name: theme }) => theme === currentTheme);

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
