import * as React from 'react';
import { shallow } from 'enzyme';
import { SearchPanelInput } from './search-panel-input';

let onChangeValue;
const getMessage = jest.fn().mockReturnValue('placeholder');

describe('Input search box', () => {
  beforeEach(() => {
    onChangeValue = jest.fn();
  });

  it('should render input component', () => {
    const tree = shallow(<SearchPanelInput
      getMessage={getMessage}
      onChangeValue={onChangeValue}
    />);
    expect(tree.find('input')).toHaveLength(1);
  });

  it('should render input component with Value', () => {
    const tree = shallow(<SearchPanelInput
      value="abc"
      getMessage={getMessage}
      onChangeValue={onChangeValue}
    />);
    expect(tree.find('input').props().value).toBe('abc');
  });

  it('should trigger onChangeValue when change event fire', () => {
    const tree = shallow(<SearchPanelInput
      getMessage={getMessage}
      onChangeValue={onChangeValue}
    />);
    tree.find('input').simulate('change', { target: { value: 'abc' } });
    expect(onChangeValue).toBeCalledWith({ value: 'abc' });
  });

  it('should set placeholder', () => {
    const tree = shallow(<SearchPanelInput
      onChangeValue={onChangeValue}
      getMessage={getMessage}
    />);

    expect(tree.find('input').props().placeholder).toBe('placeholder');
  });
});
