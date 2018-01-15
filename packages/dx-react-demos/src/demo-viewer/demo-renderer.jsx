import React from 'react';
import PropTypes from 'prop-types';
import { demos } from '../demo-registry.json';
import { themes } from '../theme-registry';

export const DemoRenderer = ({
  sectionName,
  demoName,
  themeName,
  variantName,
}) => {
  const Demo = demos[sectionName][demoName][themeName].demo;

  if (!Demo) return <div>&gt; DEMO IS NOT AVAILABLE &lt;</div>;

  const { DemoContainer } = themes
    .find(({ name }) => name === themeName).variants
    .find(({ name }) => name === variantName);

  const url = `/demo/${sectionName}/${demoName}/${themeName}/${variantName}`;

  return (
    <DemoContainer
      url={url}
    >
      <Demo />
    </DemoContainer>
  );
};

DemoRenderer.propTypes = {
  sectionName: PropTypes.string.isRequired,
  demoName: PropTypes.string.isRequired,
  themeName: PropTypes.string.isRequired,
  variantName: PropTypes.string.isRequired,
};
