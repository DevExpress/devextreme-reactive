import * as React from 'react';
import { createShallow } from '@mui/material/test-utils';
import { SearchPanelInput } from './search-panel-input';

const getMessage = jest.fn().mockReturnValue('placeholder');
const changeValue = jest.fn();
let shallow;
const defaultProps = {
  onValueChange: changeValue, getMessage,
};

describe('Input search box', () => {
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  it('should render input component', () => {
    const tree = shallow(<SearchPanelInput {...defaultProps} />);
    expect(tree).toHaveLength(1);
  });

  it('should render input component with value', () => {
    const tree = shallow(<SearchPanelInput
      {...defaultProps}
      value="abc"
    />);
    expect(tree.props().value).toBe('abc');
  });

  it('should trigger changeValue when change event fire', () => {
    const tree = shallow(<SearchPanelInput {...defaultProps} />);
    tree.simulate('change', { target: { value: 'abc' } });
    expect(changeValue).toBeCalledWith('abc');
  });

  it('should set placeholder', () => {
    const tree = shallow(<SearchPanelInput {...defaultProps} />);

    expect(tree.props().placeholder).toBe('placeholder');
  });

  it('should have custom class', () => {
    const tree = shallow(<SearchPanelInput
      {...defaultProps}
      className="custom-class"
    />);

    expect(tree.hasClass('custom-class'))
      .toBeTruthy();
  });
});
