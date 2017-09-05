import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';

import { PluginHost } from './plugin-host';
import { PluginIndexer } from './plugin-indexer';
import { Getter } from './getter';
import { Template } from './template';

describe('PluginIndexer', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  it('should correctly determine plugin position', () => {
    const Test = ({ enableGetter }) => (
      <PluginHost>
        <Getter name="test" value={1} />
        {enableGetter && <Getter name="test" value={2} />}
        <Getter name="test" computed={({ test }) => `text${test}`} />

        <Template
          name="root"
          connectGetters={getter => ({
            text: getter('test'),
          })}
        >
          {({ text }) => <span>{text}</span>}
        </Template>
      </PluginHost>
    );
    Test.propTypes = {
      enableGetter: PropTypes.bool.isRequired,
    };

    const tree = mount(
      <Test enableGetter={false} />,
    );

    tree.setProps({ enableGetter: true });
    expect(tree.find('span').text()).toBe('text2');
  });

  it('should correctly determine plugin position within another component', () => {
    const Test = ({ enableGetter }) => (
      <PluginHost>
        <div>
          <PluginIndexer>
            <Getter name="test" value={1} />
            {enableGetter && <Getter name="test" value={2} />}
            <Getter name="test" computed={({ test }) => `text${test}`} />
          </PluginIndexer>
        </div>

        <Template
          name="root"
          connectGetters={getter => ({
            text: getter('test'),
          })}
        >
          {({ text }) => <span>{text}</span>}
        </Template>
      </PluginHost>
    );
    Test.propTypes = {
      enableGetter: PropTypes.bool.isRequired,
    };

    const tree = mount(
      <Test enableGetter={false} />,
    );

    tree.setProps({ enableGetter: true });
    expect(tree.find('span').text()).toBe('text2');
  });
});
