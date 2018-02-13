import * as React from 'react';
import { createShallow } from 'material-ui/test-utils';
import Input from 'material-ui/Input';
import { SearchPanelInput } from './search-panel-input';

const getMessage = jest.fn().mockReturnValue('placeholder');
const changeSearchValue = jest.fn();
let shallow;

describe('Input search box', () => {
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  it('should render input component', () => {
    const tree = shallow(<SearchPanelInput
      changeSearchValue={changeSearchValue}
      getMessage={getMessage}
    />);
    expect(tree.find(Input).length).toBe(1);
  });

  it('should render input component', () => {
    const tree = shallow(<SearchPanelInput
      changeSearchValue={changeSearchValue}
      searchValue="abc"
      getMessage={getMessage}
    />);
    expect(tree.find(Input).props().value).toBe('abc');
  });

  it('should trigger changeSearchValue when change event fire', () => {
    const tree = shallow(<SearchPanelInput
      changeSearchValue={changeSearchValue}
      getMessage={getMessage}
    />);
    tree.find(Input).simulate('change', { target: { value: 'abc' } });
    expect(changeSearchValue).toBeCalledWith({ searchValue: 'abc' });
  });

  it('should set placeholder', () => {
    const tree = shallow(<SearchPanelInput
      changeSearchValue={changeSearchValue}
      getMessage={getMessage}
    />);

    expect(tree.find(Input).props().placeholder).toBe('placeholder');
  });

  it('should have custom class', () => {
    const tree = shallow(<SearchPanelInput
      changeSearchValue={changeSearchValue}
      getMessage={getMessage}
      className="custom-class"
    />);

    expect(tree.hasClass('custom-class'))
      .toBeTruthy();
  });
});
