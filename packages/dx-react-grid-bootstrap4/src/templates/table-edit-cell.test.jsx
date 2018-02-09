import * as React from 'react';
import { shallow } from 'enzyme';
import { EditCell } from './table-edit-cell';

describe('EditCell', () => {
  it('should pass style to the root element', () => {
    const tree = shallow((
      <EditCell
        value="a"
        onValueChange={() => {}}
        style={{
          width: '40px',
          height: '10px',
        }}
      />
    ));
    expect(tree.find('td').prop('style'))
      .toMatchObject({
        width: '40px',
        height: '10px',
      });
  });

  it('should render children if passed', () => {
    const tree = shallow((
      <EditCell
        onValueChange={() => {}}
      >
        <span className="test" />
      </EditCell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <EditCell
        onValueChange={() => {}}
        className="custom-class"
      />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
