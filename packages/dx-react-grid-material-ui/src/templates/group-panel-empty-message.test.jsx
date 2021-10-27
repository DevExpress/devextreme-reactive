import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { GroupPanelEmptyMessage, classes } from './group-panel-empty-message';

describe('GroupPanelEmptyMessage', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <GroupPanelEmptyMessage
        getMessage={() => {}}
        data={{ a: 1 }}
      />
    ));

    expect(tree.prop('data'))
      .toEqual({ a: 1 });
  });

  it('should add the passed className to the root element', () => {
    const tree = shallow((
      <GroupPanelEmptyMessage
        getMessage={() => {}}
        className="custom-class"
      />
    ));

    expect(tree.hasClass('custom-class'))
      .toBeTruthy();
    expect(tree.hasClass(classes.groupInfo))
      .toBeTruthy();
  });
});
