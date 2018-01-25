import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';

import { PluginIndexer, indexableComponent } from './plugin-indexer';

const Test1 = () =>
  null;
const Test2 = () =>
  null;
const Test3 = () =>
  null;

Test1[indexableComponent] = true;
Test2[indexableComponent] = true;
Test3[indexableComponent] = true;

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
        <Test1 />
      </PluginIndexer>
    ));

    expect(tree.find(Test1)
      .map(wrapper => wrapper.prop('position')()))
      .toEqual([[0]]);
  });

  it('should correctly determine plugin position after children change', () => {
    const Test = ({ enableGetter }) => (
      <PluginIndexer>
        {enableGetter && <Test1 />}
        <Test2 />
      </PluginIndexer>
    );
    Test.propTypes = {
      enableGetter: PropTypes.bool.isRequired,
    };

    const tree = mount(<Test enableGetter={false} />);

    tree.setProps({ enableGetter: true });
    expect([tree.find(Test1), tree.find(Test2)]
      .map(wrapper => wrapper.prop('position')()))
      .toEqual([[0], [1]]);
  });

  it('should correctly determine plugin position within another component', () => {
    const tree = mount((
      <PluginIndexer>
        <div>
          <PluginIndexer>
            <Test1 />
            <Test2 />
          </PluginIndexer>
        </div>
        <Test3 />
      </PluginIndexer>
    ));

    expect([tree.find(Test1), tree.find(Test2), tree.find(Test3)]
      .map(wrapper => wrapper.prop('position')()))
      .toEqual([[0, 0], [0, 1], [1]]);
  });
});
