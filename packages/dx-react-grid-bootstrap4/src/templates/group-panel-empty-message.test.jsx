import * as React from 'react';
import { shallow } from 'enzyme';
import { GroupPanelEmptyMessage } from './group-panel-empty-message';

describe('GroupPanelEmptyMessage', () => {
  const defaultProps = {
    getMessage: () => {},
  };
  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <GroupPanelEmptyMessage
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.prop('data'))
      .toEqual({ a: 1 });
  });

  it('should pass custom class to the root element', () => {
    const tree = shallow((
      <GroupPanelEmptyMessage
        {...defaultProps}
        className="custom-class"
      />
    ));

    expect(tree.is('.dx-g-bs4-group-panel-empty-message.custom-class'))
      .toBeTruthy();
  });
});
