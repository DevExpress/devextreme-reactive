import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableFilterCell } from './table-filter-cell';

describe('TableFilterCell', () => {
  configure({ adapter: new Adapter() });
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  afterAll(() => {
    resetConsole();
  });

  it('should not set filter with an empty value', () => {
    const setFilterMock = jest.fn();
    const tree = mount(
      <TableFilterCell
        column={{
          name: 'Test',
        }}
        setFilter={setFilterMock}
        value={'abc'}
      />,
    );

    tree.find('input').simulate('change', { target: { value: '' } });
    expect(setFilterMock.mock.calls[0][0]).toBeNull();
  });

  it('should render children if passed', () => {
    const tree = mount(
      <TableFilterCell>
        <span className="test" />
      </TableFilterCell>,
    );

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });
});
