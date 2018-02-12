import * as React from 'react';
import { shallow } from 'enzyme';
import { GroupPanelContainer } from './group-panel-container';

const defaultProps = {
  getMessage: () => {},
};

describe('GroupPanelContainer', () => {
  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <GroupPanelContainer
        {...defaultProps}
        data={{ a: 1 }}
        className="custom-class"
      />
    ));

    expect(tree.prop('data'))
      .toEqual({ a: 1 });
    expect(tree.hasClass('custom-class'))
      .toBeTruthy();
  });

  it('should apply custom styles', () => {
    const tree = shallow((
      <GroupPanelContainer
        {...defaultProps}
        style={{ color: 'red' }}
      />
    ));

    expect(tree.find('div').prop('style'))
      .toMatchObject({
        color: 'red',
      });
  });
});
