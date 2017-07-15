import React from 'react';
import PropTypes from 'prop-types';

import { themes, demos } from './demo-registry';

export const DemoRenderer = ({ section, demo, theme }) => {
  const themedDemoEntity = demos
    .find(demoEntity => demoEntity.section === section && demoEntity.demo === demo).themes
    .find(themeEntity => themeEntity.name === theme);

  if (!themedDemoEntity) return <h5>&gt; DEMO NOT AVALIABLE &lt;</h5>;

  const DemoContainer = themes
    .find(themeEntity => themeEntity.name === theme)
    .DemoContainer;
  const Component = themedDemoEntity.Component;

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
