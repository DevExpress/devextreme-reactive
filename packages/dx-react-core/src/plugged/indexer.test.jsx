import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';

import { PluginHost } from './host';
import { PluginIndexer } from './indexer';
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
        <Getter name="test" pureComputed={test => `text${test}`} connectArgs={getter => [getter('test')]} />

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
            <Getter name="test" pureComputed={test => `text${test}`} connectArgs={getter => [getter('test')]} />
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
