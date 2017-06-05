import React from 'react';
import { mount } from 'enzyme';
import { GroupPanelCell } from './group-panel-cell';

describe('GroupPanelCell', () => {
  test('should use column name if title is not specified', () => {
    const tree = mount(
      <GroupPanelCell
        column={{
          name: 'Test',
        }}
      />,
    );

    expect(tree.find('div > span').text()).toBe('Test');
  });
});
