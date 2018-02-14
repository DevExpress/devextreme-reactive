import * as React from 'react';
import { shallow } from 'enzyme';
import { GroupPanelContainer } from './group-panel-container';

describe('GroupPanelContainer', () => {
  const defaultProps = {
    getMessage: () => {},
  };
  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <GroupPanelContainer
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.prop('data'))
      .toEqual({ a: 1 });
  });

  it('should pass custom class to the root element', () => {
    const tree = shallow((
      <GroupPanelContainer
        {...defaultProps}
        className="custom-class"
      />
    ));

    expect(tree.is('.w-100.custom-class'))
      .toBeTruthy();
  });
});
