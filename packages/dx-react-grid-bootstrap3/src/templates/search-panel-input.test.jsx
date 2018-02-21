import * as React from 'react';
import { shallow } from 'enzyme';
import { SearchPanelInput } from './search-panel-input';

let changeSearchValue;
const getMessage = jest.fn().mockReturnValue('placeholder');

describe('Input search box', () => {
  beforeEach(() => {
    changeSearchValue = jest.fn();
  });

  it('should render input component', () => {
    const tree = shallow(<SearchPanelInput
      getMessage={getMessage}
      changeSearchValue={changeSearchValue}
    />);
    expect(tree.find('input').length).toBe(1);
  });

  it('should render input component with searchValue', () => {
    const tree = shallow(<SearchPanelInput
      searchValue="abc"
      getMessage={getMessage}
      changeSearchValue={changeSearchValue}
    />);
    expect(tree.find('input').props().value).toBe('abc');
  });

  it('should trigger changeSearchValue when change event fire', () => {
    const tree = shallow(<SearchPanelInput
      getMessage={getMessage}
      changeSearchValue={changeSearchValue}
    />);
    tree.find('input').simulate('change', { target: { value: 'abc' } });
    expect(changeSearchValue).toBeCalledWith({ searchValue: 'abc' });
  });

  it('should set placeholder', () => {
    const tree = shallow(<SearchPanelInput
      changeSearchValue={changeSearchValue}
      getMessage={getMessage}
    />);

    expect(tree.find('input').props().placeholder).toBe('placeholder');
  });
});
