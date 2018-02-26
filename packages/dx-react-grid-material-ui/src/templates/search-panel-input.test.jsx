import * as React from 'react';
import { createShallow } from 'material-ui/test-utils';
import { SearchPanelInput } from './search-panel-input';

const getMessage = jest.fn().mockReturnValue('placeholder');
const changeValue = jest.fn();
let shallow;

describe('Input search box', () => {
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  it('should render input component', () => {
    const tree = shallow(<SearchPanelInput
      onValueChange={changeValue}
      getMessage={getMessage}
    />);
    expect(tree).toHaveLength(1);
  });

  it('should render input component with value', () => {
    const tree = shallow(<SearchPanelInput
      onValueChange={changeValue}
      value="abc"
      getMessage={getMessage}
    />);
    expect(tree.props().value).toBe('abc');
  });

  it('should trigger changeValue when change event fire', () => {
    const tree = shallow(<SearchPanelInput
      onValueChange={changeValue}
      getMessage={getMessage}
    />);
    tree.simulate('change', { target: { value: 'abc' } });
    expect(changeValue).toBeCalledWith({ value: 'abc' });
  });

  it('should set placeholder', () => {
    const tree = shallow(<SearchPanelInput
      onValueChange={changeValue}
      getMessage={getMessage}
    />);

    expect(tree.props().placeholder).toBe('placeholder');
  });

  it('should have custom class', () => {
    const tree = shallow(<SearchPanelInput
      onValueChange={changeValue}
      getMessage={getMessage}
      className="custom-class"
    />);

    expect(tree.hasClass('custom-class'))
      .toBeTruthy();
  });
});
