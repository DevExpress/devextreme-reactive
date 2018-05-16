import * as React from 'react';
import Input from '@material-ui/core/Input';
import TableCell from '@material-ui/core/TableCell';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { EditCell } from './table-edit-cell';

describe('EditCell', () => {
  const defaultProps = {
    onValueChange: () => {},
  };

  let shallow;
  let classes;

  beforeAll(() => {
    classes = getClasses(<EditCell onValueChange={() => {}} />);
    shallow = createShallow({ dive: true });
  });

  it('should render without exceptions', () => {
    const tree = shallow((
      <EditCell
        {...defaultProps}
        value=""
      />
    ));
    expect(tree.find(`.${classes.cell}`).exists()).toBeTruthy();
  });

  it('should work with editor properly', () => {
    const onValueChange = jest.fn();
    const tree = shallow((
      <EditCell
        value="test"
        onValueChange={onValueChange}
      />
    ));

    const input = tree.find(Input);

    expect(input.props()).toMatchObject({
      value: 'test',
    });

    input.simulate('change', { target: { value: 'changed' } });
    expect(onValueChange.mock.calls).toHaveLength(1);
    expect(onValueChange.mock.calls[0][0]).toBe('changed');
  });

  it('should take column align into account', () => {
    const tree = shallow((
      <EditCell
        {...defaultProps}
        value=""
      />
    ));

    const inputRoot = tree.find(Input);
    const input = inputRoot.dive().dive().find('input');

    expect(inputRoot.hasClass(classes.inputRoot)).toBeTruthy();
    expect(input.hasClass(classes.inputRight)).toBeFalsy();
  });

  it('should take column align into account if align is "right"', () => {
    const tree = shallow((
      <EditCell
        {...defaultProps}
        value=""
        tableColumn={{ align: 'right' }}
      />
    ));
    const inputRoot = tree.find(Input);
    const input = inputRoot.dive().dive().find('input');
    expect(inputRoot.hasClass(classes.inputRoot)).toBeTruthy();
    expect(input.hasClass(classes.inputRight)).toBeTruthy();
  });

  it('should take column align into account if align is "center"', () => {
    const tree = shallow((
      <EditCell
        {...defaultProps}
        value=""
        tableColumn={{ align: 'center' }}
      />
    ));
    const inputRoot = tree.find(Input);
    const input = inputRoot.dive().dive().find('input');
    expect(inputRoot.hasClass(classes.inputRoot)).toBeTruthy();
    expect(input.hasClass(classes.inputCenter)).toBeTruthy();
  });

  it('should pass style to the root element', () => {
    const tree = shallow((
      <EditCell
        {...defaultProps}
        value="a"
        style={{
          width: '40px',
          height: '10px',
        }}
      />
    ));
    expect(tree.find(TableCell).prop('style'))
      .toMatchObject({
        width: '40px',
        height: '10px',
      });
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

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <EditCell
        {...defaultProps}
        className="custom-class"
      />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is(`.${classes.cell}`))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <EditCell
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  it('should render disabled editor if editing is not allowed', () => {
    const tree = shallow((
      <EditCell
        {...defaultProps}
        editingEnabled={false}
      />
    ));

    expect(tree.find(Input).prop('disabled'))
      .toBeTruthy();
  });
});
