import * as React from 'react';
import * as PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';

import { POSITION_CONTEXT } from './constants';
import { PluginIndexer } from './plugin-indexer';

const TestWrapper = (props, { [POSITION_CONTEXT]: position }) => <Test position={position} />;
TestWrapper.contextTypes = {
  [POSITION_CONTEXT]: PropTypes.func.isRequired,
};

const Test = () => null;

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
        <TestWrapper />
      </PluginIndexer>
    ));

    expect(tree.find(Test)
      .map(wrapper => wrapper.props().position()))
      .toEqual([[0]]);
  });

  it('should correctly determine plugin position after children change', () => {
    const Test1 = ({ enableGetter }) => (
      <PluginIndexer>
        {enableGetter && <TestWrapper />}
        <TestWrapper />
      </PluginIndexer>
    );
    Test1.propTypes = {
      enableGetter: PropTypes.bool.isRequired,
    };

    const tree = mount(<Test1 enableGetter={false} />);

    tree.setProps({ enableGetter: true });
    const tests = tree.find(Test);
    expect([tests.at(0), tests.at(1)]
      .map(wrapper => wrapper.props().position()))
      .toEqual([[0], [1]]);
  });

  it('should correctly determine plugin position within another component', () => {
    const tree = mount((
      <PluginIndexer>
        <div>
          <PluginIndexer>
            <TestWrapper />
            <TestWrapper />
          </PluginIndexer>
        </div>
        <TestWrapper />
      </PluginIndexer>
    ));

    const tests = tree.find(Test);
    expect([tests.at(0), tests.at(1), tests.at(2)]
      .map(wrapper => wrapper.props().position()))
      .toEqual([[0, 0], [0, 1], [1]]);
  });
});
