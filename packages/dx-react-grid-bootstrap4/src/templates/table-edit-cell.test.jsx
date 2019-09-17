import * as React from 'react';
import { shallow } from 'enzyme';
import { EditCell } from './table-edit-cell';

describe('EditCell', () => {
  const defaultProps = {
    onValueChange: () => {},
  };
  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <EditCell
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));
    expect(tree.find('td').prop('data'))
      .toEqual({ a: 1 });
  });

  it('should render children if passed', () => {
    const tree = shallow((
      <EditCell
        {...defaultProps}
      >
        <span className="test" />
      </EditCell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should provide additional props to children', () => {
    const tree = shallow((
      <EditCell
        {...defaultProps}
      >
        <span className="test" />
      </EditCell>
    ));

    expect(tree.find('.test').prop('autoFocus'))
      .toBeDefined();
    expect(tree.find('.test').prop('onFocus'))
      .toBeDefined();
    expect(tree.find('.test').prop('onBlur'))
      .toBeDefined();
    expect(tree.find('.test').prop('onKeyDown'))
      .toBeDefined();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <EditCell
        {...defaultProps}
        className="custom-class"
      />
    ));

    expect(tree.is('.align-middle.custom-class.dx-g-bs4-table-edit-cell'))
      .toBeTruthy();
  });

  it('should render readonly editor if editing is not allowed', () => {
    const tree = shallow((
      <EditCell
        {...defaultProps}
        editingEnabled={false}
      />
    ));

    expect(tree.find('input').prop('readOnly'))
      .toBeTruthy();
  });
});
