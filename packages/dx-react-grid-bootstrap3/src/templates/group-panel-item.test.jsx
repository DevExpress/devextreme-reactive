import React from 'react';
import { mount } from 'enzyme';
import { GroupPanelItem } from './group-panel-item';

describe('GroupPanelItem', () => {
  it('should use column name if title is not specified', () => {
    const tree = mount((
      <GroupPanelItem
        column={{
          name: 'Test',
        }}
      />
    ));

    expect(tree.find('div').text()).toBe('Test');
  });

  it('can render the ungroup button', () => {
    const tree = mount((
      <GroupPanelItem
        column={{
          name: 'test',
        }}
        allowUngroupingByClick
      />
    ));

    expect(tree.find('i.glyphicon-remove').exists())
      .toBeTruthy();
  });
});
