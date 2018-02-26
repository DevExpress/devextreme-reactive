import * as React from 'react';
import { shallow } from 'enzyme';
import { SearchPanelInput } from './search-panel-input';

let onValueChange;
const getMessage = jest.fn().mockReturnValue('placeholder');

describe('Input search box', () => {
  beforeEach(() => {
    onValueChange = jest.fn();
  });

  it('should render input component', () => {
    const tree = shallow(<SearchPanelInput
      getMessage={getMessage}
      onValueChange={onValueChange}
    />);
    expect(tree.find('input')).toHaveLength(1);
  });

  it('should render input component with Value', () => {
    const tree = shallow(<SearchPanelInput
      value="abc"
      getMessage={getMessage}
      onValueChange={onValueChange}
    />);
    expect(tree.find('input').props().value).toBe('abc');
  });

  it('should trigger onValueChange when change event fire', () => {
    const tree = shallow(<SearchPanelInput
      getMessage={getMessage}
      onValueChange={onValueChange}
    />);
    tree.find('input').simulate('change', { target: { value: 'abc' } });
    expect(onValueChange).toBeCalledWith({ value: 'abc' });
  });

  it('should set placeholder', () => {
    const tree = shallow(<SearchPanelInput
      onValueChange={onValueChange}
      getMessage={getMessage}
    />);

    expect(tree.find('input').props().placeholder).toBe('placeholder');
  });
});
