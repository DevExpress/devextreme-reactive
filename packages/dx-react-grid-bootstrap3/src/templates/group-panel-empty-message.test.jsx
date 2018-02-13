import * as React from 'react';
import { shallow } from 'enzyme';
import { GroupPanelEmptyMessage } from './group-panel-empty-message';

const defaultProps = {
  getMessage: () => {},
};

describe('GroupPanelEmptyMessage', () => {
  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <GroupPanelEmptyMessage
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
      <GroupPanelEmptyMessage
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
