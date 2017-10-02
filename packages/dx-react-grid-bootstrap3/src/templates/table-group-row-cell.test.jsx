import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableGroupCell } from './table-group-row-cell';

describe('TableCell', () => {
  configure({ adapter: new Adapter() });
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  afterAll(() => {
    resetConsole();
  });

  it('should render column title and value', () => {
    const tree = mount(
      <TableGroupCell
        column={{ title: 'Title' }}
        row={{ value: 'Value' }}
      />,
    );

    expect(tree.text())
      .toMatch(/Title.*Value/);
  });

  it('should render children if passed', () => {
    const tree = mount(
      <TableGroupCell>
        <span className="test" />
      </TableGroupCell>,
    );

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });
});
