import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';

import { PluginHost } from './host';
import { PluginIndexer } from './indexer';
import { Property } from './property';
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
    const Test = ({ enableProperty }) => (
      <PluginHost>
        <Property name="test" value={1} />
        {enableProperty && <Property name="test" value={2} />}
        <Property name="test" computed={({ test }) => `text${test}`} />

        <Template
          name="root"
          connectProperties={property => ({
            text: property('test'),
          })}
        >
          {({ text }) => <span>{text}</span>}
        </Template>
      </PluginHost>
    );
    Test.propTypes = {
      enableProperty: PropTypes.bool.isRequired,
    };

    const tree = mount(
      <Test enableProperty={false} />,
    );

    tree.setProps({ enableProperty: true });
    expect(tree.find('span').text()).toBe('text2');
  });

  it('should correctly determine plugin position within another component', () => {
    const Test = ({ enableProperty }) => (
      <PluginHost>
        <div>
          <PluginIndexer>
            <Property name="test" value={1} />
            {enableProperty && <Property name="test" value={2} />}
            <Property name="test" computed={({ test }) => `text${test}`} />
          </PluginIndexer>
        </div>

        <Template
          name="root"
          connectProperties={property => ({
            text: property('test'),
          })}
        >
          {({ text }) => <span>{text}</span>}
        </Template>
      </PluginHost>
    );
    Test.propTypes = {
      enableProperty: PropTypes.bool.isRequired,
    };

    const tree = mount(
      <Test enableProperty={false} />,
    );

    tree.setProps({ enableProperty: true });
    expect(tree.find('span').text()).toBe('text2');
  });
});
