import * as React from 'react';
import { mount } from 'enzyme';
import { Table } from './table';

describe('Table', () => {
  it('should pass class to the root element', () => {
    const tree = mount((
      <div className="panel">
        <Table className="custom-class">
          <tbody />
        </Table>
      </div>
    ));

    expect(tree.find('table').is('.custom-class.table'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = mount((
      <div className="panel">
        <Table data={{ a: 1 }}>
          <tbody />
        </Table>
      </div>
    ));

    expect(tree.find('table').props().data)
      .toMatchObject({ a: 1 });
  });
});
