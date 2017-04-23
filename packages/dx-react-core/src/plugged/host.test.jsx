import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';

import { PluginHost } from './host';

describe('PluginHost', () => {
  test('pluginHost is provided through context', () => {
    expect.assertions(1);

    const Plugin = (_, { pluginHost }) => {
      expect(pluginHost).not.toBeUndefined();
      return null;
    };
    Plugin.contextTypes = {
      pluginHost: PropTypes.object.isRequired,
    };

    mount(
      <PluginHost>
        <Plugin />
      </PluginHost>,
    );
  });
});
