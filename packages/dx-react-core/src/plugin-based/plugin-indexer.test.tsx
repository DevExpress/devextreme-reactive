import * as React from 'react';
import { mount } from 'enzyme';

import { PluginIndexer } from './plugin-indexer';
import { PositionContext } from './contexts';

class TestWrapper extends React.Component {
  render() {
    return <Test position={this.context} />;
  }
}
TestWrapper.contextType = PositionContext;

const Test: React.FunctionComponent<{ position: any }> = () => null;

describe('PluginIndexer', () => {
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

  it('should memoize position context function', () => {
    const Test1 = ({ enableGetter }) => (
      <PluginIndexer>
        <TestWrapper />
        {enableGetter && <TestWrapper />}
      </PluginIndexer>
    );

    const tree = mount(<Test1 enableGetter={false} />);
    const { position } = tree.find(Test).at(0).props();

    tree.setProps({ enableGetter: true });

    expect(tree.find(Test).at(0).props().position)
      .toBe(position);
  });
});
