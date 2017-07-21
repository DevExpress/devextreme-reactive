import React from 'react';
import { mount } from 'enzyme';
import { GroupPanelCell } from './group-panel-cell';

describe('GroupPanelCell', () => {
  it('should use column name if title is not specified', () => {
    const tree = mount(
      <GroupPanelCell
        column={{
          name: 'Test',
        }}
      />,
    );

    expect(tree.find('div > span').text()).toBe('Test');
  });

  it('can render the ungroup button', () => {
    const tree = mount(
      <GroupPanelCell
        column={{
          name: 'test',
        }}
        allowUngroupingByClick
      />,
    );

    expect(tree.find('i.glyphicon-remove').exists())
      .toBeTruthy();
  });
});
