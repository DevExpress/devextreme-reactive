import React from 'react';
import PropTypes from 'prop-types';
import { demos } from '../demo-registry';
import { themes } from '../theme-registry';

export const DemoRenderer = ({
  sectionName,
  demoName,
  themeName,
  variantName,
}) => {
  let Demo;
  try {
    Demo = demos[sectionName][demoName][themeName].demo;
  } catch (e) {} // eslint-disable-line no-empty

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
