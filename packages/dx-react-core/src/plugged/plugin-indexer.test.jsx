import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';

import { PluginIndexer } from './plugin-indexer';
import { Getter } from './getter';
import { Template } from './template';
import { Action } from './action';

jest.mock('./getter', () => ({
  Getter: () => null,
}));
jest.mock('./action', () => ({
  Action: () => null,
}));
jest.mock('./template', () => ({
  Template: () => null,
}));

describe('PluginIndexer', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  it('should correctly determine plugin position', () => {
    const tree = mount(
      <PluginIndexer>
        <Getter />
        <Action />
        <Template />
      </PluginIndexer>,
    );

    expect(
      [tree.find(Getter), tree.find(Action), tree.find(Template)]
        .map(wrapper => wrapper.prop('position')()),
    )
      .toEqual([[0], [1], [2]]);
  });

  it('should correctly determine plugin position after children change', () => {
    const Test = ({ enableGetter }) => (
      <PluginIndexer>
        {enableGetter && <Getter />}
        <Action />
        <Template />
      </PluginIndexer>
    );
    Test.propTypes = {
      enableGetter: PropTypes.bool.isRequired,
    };

    const tree = mount(
      <Test enableGetter={false} />,
    );

    tree.setProps({ enableGetter: true });
    expect(
      [tree.find(Getter), tree.find(Action), tree.find(Template)]
        .map(wrapper => wrapper.prop('position')()),
    )
      .toEqual([[0], [1], [2]]);
  });

  it('should correctly determine plugin position within another component', () => {
    const tree = mount(
      <PluginIndexer>
        <div>
          <PluginIndexer>
            <Getter />
            <Action />
          </PluginIndexer>
        </div>
        <Template />
      </PluginIndexer>,
    );

    expect(
      [tree.find(Getter), tree.find(Action), tree.find(Template)]
        .map(wrapper => wrapper.prop('position')()),
    )
      .toEqual([[0, 0], [0, 1], [1]]);
  });
});
