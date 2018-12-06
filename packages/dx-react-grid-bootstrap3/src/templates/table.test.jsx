import * as React from 'react';
import { mount } from 'enzyme';
import { Table } from './table';
import { ThemeColors } from './layout';

describe('Table', () => {
  it('should pass class to the root element', () => {
    const tree = mount((
      <ThemeColors.Provider value={{ backgroundColor: 'white' }}>
        <Table className="custom-class">
          <tbody />
        </Table>
      </ThemeColors.Provider>
    ));

    expect(tree.find('table').is('.table.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = mount((
      <ThemeColors.Provider value={{ backgroundColor: 'white' }}>
        <Table data={{ a: 1 }}>
          <tbody />
        </Table>
      </ThemeColors.Provider>
    ));

    expect(tree.find('table').props().data)
      .toMatchObject({ a: 1 });
  });
});
