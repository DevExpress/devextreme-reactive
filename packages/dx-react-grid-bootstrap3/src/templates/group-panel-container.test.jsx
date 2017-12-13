import React from 'react';
import { shallow } from 'enzyme';
import { GroupPanelContainer } from './group-panel-container';

describe('GroupPanelContainer', () => {
  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <GroupPanelContainer
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
