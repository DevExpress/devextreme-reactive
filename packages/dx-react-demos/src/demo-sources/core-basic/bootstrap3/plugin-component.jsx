import React from 'react';
import PropTypes from 'prop-types';
import {
  PluginHost,
  Plugin,
  Template,
} from '@devexpress/dx-react-core';

const Plugin1 = () => (
  <Plugin>
    <Template name="root">
      Plugin content
    </Template>
  </Plugin>
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
    <Plugin1 />
  </PluginBased>
);
