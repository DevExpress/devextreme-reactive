import * as React from 'react';
import * as PropTypes from 'prop-types';
import { mount } from 'enzyme';

import { PluginHost } from './plugin-host';

describe('PluginHost', () => {
  it('is provided through context', () => {
    expect.assertions(1);

    const Plugin = (_, { pluginHost }) => {
      expect(pluginHost).not.toBeUndefined();
      return null;
    };
    Plugin.contextTypes = {
      pluginHost: PropTypes.object.isRequired,
    };

    mount((
      <PluginHost>
        <Plugin />
      </PluginHost>
    ));
  });
});
