import * as React from 'react';
import { createShallow, getClasses } from '@mui/material/test-utils';
import { GroupPanelEmptyMessage } from './group-panel-empty-message';

describe('GroupPanelEmptyMessage', () => {
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<GroupPanelEmptyMessage getMessage={() => {}} />);
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
