import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';

import { PluginIndexer, INDEXABLE_COMPONENT } from './plugin-indexer';

const Test = () => null;
Test[INDEXABLE_COMPONENT] = true;

describe('PluginIndexer', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  it('should correctly determine plugin position', () => {
    const tree = mount((
      <PluginIndexer>
        <Test />
      </PluginIndexer>
    ));

    expect(tree.find(Test)
      .map(wrapper => wrapper.prop('position')()))
      .toEqual([[0]]);
  });

  it('should correctly determine plugin position after children change', () => {
    const Test1 = ({ enableGetter }) => (
      <PluginIndexer>
        {enableGetter && <Test />}
        <Test />
      </PluginIndexer>
    );
    Test1.propTypes = {
      enableGetter: PropTypes.bool.isRequired,
    };

    const tree = mount(<Test1 enableGetter={false} />);

    tree.setProps({ enableGetter: true });
    const tests = tree.find(Test);
    expect([tests.at(0), tests.at(1)]
      .map(wrapper => wrapper.prop('position')()))
      .toEqual([[0], [1]]);
  });

  it('should correctly determine plugin position within another component', () => {
    const tree = mount((
      <PluginIndexer>
        <div>
          <PluginIndexer>
            <Test />
            <Test />
          </PluginIndexer>
        </div>
        <Test />
      </PluginIndexer>
    ));

    const tests = tree.find(Test);
    expect([tests.at(0), tests.at(1), tests.at(2)]
      .map(wrapper => wrapper.prop('position')()))
      .toEqual([[0, 0], [0, 1], [1]]);
  });
});
