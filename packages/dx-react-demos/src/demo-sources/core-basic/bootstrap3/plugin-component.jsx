import React from 'react';
import PropTypes from 'prop-types';
import {
  PluginHost,
  PluginContainer,
  Template,
} from '@devexpress/dx-react-core';

const Plugin = () => (
  <PluginContainer>
    <Template name="root">
      Plugin content
    </Template>
  </PluginContainer>
);

const PluginBased = ({ children }) => (
  <PluginHost>
    {children}
  </PluginHost>
);
PluginBased.propTypes = {
  children: PropTypes.node,
};
PluginBased.defaultProps = {
  children: null,
};

export default () => (
  <PluginBased>
    <Plugin />
  </PluginBased>
);
