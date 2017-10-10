import React from 'react';
import { mount } from 'enzyme';
import { GroupPanelLayout } from '@devexpress/dx-react-grid';
import { GroupPanel } from './group-panel';

jest.mock('@devexpress/dx-react-grid', () => ({
  // eslint-disable-next-line react/prop-types
  GroupPanelLayout: ({ groupByColumnText }) => <div>{groupByColumnText}</div>,
}));

describe('GroupPanel', () => {
  it('should render user defined text withih group panel', () => {
    const tree = mount(
      <GroupPanel
        getMessage={() => 'Test'}
      />,
    );

    expect(tree.find(GroupPanelLayout).find('span').text())
      .toBe('Test');
  });

  it('should render default text withih group panel', () => {
    const tree = mount(
      <GroupPanel />,
    );

    expect(tree.find(GroupPanelLayout).text())
      .toBe('Grouping is not available');
  });

  it('should render default text withih group panel if user-defined function returns nothing', () => {
    const tree = mount(
      <GroupPanel
        getMessage={() => undefined}
      />,
    );

    expect(tree.find(GroupPanelLayout).text())
      .toBe('Grouping is not available');
  });

  it('should pass correct text to group panel if the "allowUngroupingByClick" property is true', () => {
    const tree = mount(
      <GroupPanel
        allowUngroupingByClick
      />,
    );

    expect(tree.find(GroupPanelLayout).text())
      .toContain('icon in the column header');
  });

  it('should pass correct text to group panel if the "allowDragging" property is true', () => {
    const tree = mount(
      <GroupPanel
        allowDragging
      />,
    );

    expect(tree.find(GroupPanelLayout).text())
      .toBe('Drag a column header here to group by that column');
  });

  it('should pass correct text to group panel if both "allowDragging" and "allowUngroupingByClick" properties are true', () => {
    const tree = mount(
      <GroupPanel
        allowDragging
        allowUngroupingByClick
      />,
    );

    expect(tree.find(GroupPanelLayout).text())
      .toBe('Drag a column header here to group by that column');
  });
});
