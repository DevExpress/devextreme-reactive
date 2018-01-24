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

const Pluggable = ({ children }) => (
  <PluginHost>
    {children}
  </PluginHost>
);
Pluggable.propTypes = {
  children: PropTypes.node,
};
Pluggable.defaultProps = {
  children: null,
};

export default () => (
  <Pluggable>
    <Plugin />
  </Pluggable>
);
