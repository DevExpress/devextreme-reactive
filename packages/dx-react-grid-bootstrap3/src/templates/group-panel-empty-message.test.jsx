import * as React from 'react';
import { shallow } from 'enzyme';
import { GroupPanelEmptyMessage } from './group-panel-empty-message';

describe('GroupPanelEmptyMessage', () => {
  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <GroupPanelEmptyMessage
        getMessage={() => {}}
        data={{ a: 1 }}
        className="custom-class"
      />
    ));

    expect(tree.prop('data'))
      .toEqual({ a: 1 });
    expect(tree.hasClass('custom-class'))
      .toBeTruthy();
  });
});
