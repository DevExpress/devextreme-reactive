import * as React from 'react';
import { shallow } from 'enzyme';
import { SearchPanelInput } from './search-panel-input';

const onValueChange = jest.fn();
const getMessage = jest.fn().mockReturnValue('placeholder');
const defaultProps = {
  getMessage, onValueChange,
};

describe('Input search box', () => {
  it('should render input component', () => {
    const tree = shallow(<SearchPanelInput {...defaultProps} />);
    expect(tree.find('input')).toHaveLength(1);
  });

  it('should render input component with Value', () => {
    const tree = shallow(<SearchPanelInput
      {...defaultProps}
      value="abc"
    />);
    expect(tree.find('input').props().value).toBe('abc');
  });

  it('should trigger onValueChange when change event fire', () => {
    const tree = shallow(<SearchPanelInput {...defaultProps} />);
    tree.find('input').simulate('change', { target: { value: 'abc' } });
    expect(onValueChange).toBeCalledWith('abc');
  });

  it('should set placeholder', () => {
    const tree = shallow(<SearchPanelInput {...defaultProps} />);

    expect(tree.find('input').props().placeholder).toBe('placeholder');
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <SearchPanelInput
        {...defaultProps}
        className="custom-class"
      />
    ));

    expect(tree.is('.form-control.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <SearchPanelInput
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
