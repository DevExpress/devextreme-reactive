import * as React from 'react';
import { shallow } from 'enzyme';
import { SearchPanelInput } from './search-panel-input';

let onChangeSearchValue;
const getMessage = jest.fn().mockReturnValue('placeholder');

describe('Input search box', () => {
  beforeEach(() => {
    onChangeSearchValue = jest.fn();
  });

  it('should render input component', () => {
    const tree = shallow(<SearchPanelInput
      getMessage={getMessage}
      onChangeSearchValue={onChangeSearchValue}
    />);
    expect(tree.find('input').length).toBe(1);
  });

  it('should render input component with searchValue', () => {
    const tree = shallow(<SearchPanelInput
      searchValue="abc"
      getMessage={getMessage}
      onChangeSearchValue={onChangeSearchValue}
    />);
    expect(tree.find('input').props().value).toBe('abc');
  });

  it('should trigger onChangeSearchValue when change event fire', () => {
    const tree = shallow(<SearchPanelInput
      getMessage={getMessage}
      onChangeSearchValue={onChangeSearchValue}
    />);
    tree.find('input').simulate('change', { target: { value: 'abc' } });
    expect(onChangeSearchValue).toBeCalledWith({ searchValue: 'abc' });
  });

  it('should set placeholder', () => {
    const tree = shallow(<SearchPanelInput
      onChangeSearchValue={onChangeSearchValue}
      getMessage={getMessage}
    />);

    expect(tree.find('input').props().placeholder).toBe('placeholder');
  });
});
