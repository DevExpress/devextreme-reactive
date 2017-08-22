import React from 'react';
import { createMount } from 'material-ui/test-utils';
import { GroupPanelLayout } from '@devexpress/dx-react-grid';
import { GroupPanel } from './group-panel';

jest.mock('@devexpress/dx-react-grid', () => ({
  // eslint-disable-next-line react/prop-types
  GroupPanelLayout: ({ groupByColumnText }) => <div>{groupByColumnText}</div>,
}));

describe('GroupPanel', () => {
  let mount;
  beforeAll(() => {
    mount = createMount();
  });
  afterAll(() => {
    mount.cleanUp();
  });

  it('should pass user defined groupByColumnText if is specified', () => {
    const tree = mount(
      <GroupPanel
        groupByColumnText="Test"
      />,
    );

    expect(tree.find(GroupPanelLayout).text())
      .toBe('Test');
  });

  it('should pass default groupByColumnText', () => {
    const tree = mount(
      <GroupPanel />,
    );

    expect(tree.find(GroupPanelLayout).text())
      .toContain('icon in the column header');
  });

  it('should pass correct default groupByColumnText if the "allowDragging" property is true', () => {
    const tree = mount(
      <GroupPanel
        allowDragging
      />,
    );

    expect(tree.find(GroupPanelLayout).text())
      .toContain('Drag a column header here to group by that column');
  });
});
