import * as React from 'react';
import { mount } from 'enzyme';
import { Table } from './table';
import { StyleContext } from './layout';

describe('Table', () => {
  const tableRef = React.createRef();

  it('should pass class to the root element', () => {
    const tree = mount((
      <StyleContext.Provider value={{ backgroundColor: 'white' }}>
        <Table className="custom-class" tableRef={tableRef}>
          <tbody />
        </Table>
      </StyleContext.Provider>
    ));

    expect(tree.find('table').is('.table.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = mount((
      <StyleContext.Provider value={{ backgroundColor: 'white' }}>
        <Table data={{ a: 1 }} tableRef={tableRef}>
          <tbody />
        </Table>
      </StyleContext.Provider>
    ));

    expect(tree.find('table').props().data)
      .toMatchObject({ a: 1 });
  });
});
