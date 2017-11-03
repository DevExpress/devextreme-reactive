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

  it('should render user-defined text within group panel if it is specified', () => {
    const tree = mount((
      <GroupPanel
        getMessage={key => key}
      />
    ));
    expect(tree.find(GroupPanelLayout).find('span').text())
      .toBe('groupByColumn');
  });

  it('should render default text within group panel', () => {
    const tree = mount((
      <GroupPanel getMessage={() => {}} />
    ));

    expect(tree.find(GroupPanelLayout).text())
      .toBe('Grouping is not available');
  });

  it('should pass correct default text to group panel if the "allowUngroupingByClick" property is true', () => {
    const tree = mount((
      <GroupPanel
        allowUngroupingByClick
        getMessage={() => {}}
      />
    ));

    expect(tree.find(GroupPanelLayout).text())
      .toContain('icon in the column header');
  });

  it('should pass correct default text to group panel if the "allowDragging" property is true', () => {
    const tree = mount((
      <GroupPanel
        allowDragging
        getMessage={() => {}}
      />
    ));

    expect(tree.find(GroupPanelLayout).text())
      .toBe('Drag a column header here to group by that column');
  });

  it('should pass correct default text to group panel if both "allowDragging" and "allowUngroupingByClick" properties are true', () => {
    const tree = mount((
      <GroupPanel
        allowDragging
        allowUngroupingByClick
        getMessage={() => {}}
      />
    ));

    expect(tree.find(GroupPanelLayout).text())
      .toBe('Drag a column header here to group by that column');
  });
});
