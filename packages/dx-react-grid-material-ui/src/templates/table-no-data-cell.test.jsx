import * as React from 'react';
import { createShallow, getClasses } from '@devexpress/dx-testing';
import { TableNoDataCell } from './table-no-data-cell';

describe('TableNoDataCell', () => {
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<TableNoDataCell getMessage={key => key} />);
  });

  it('should use "noData" text if defined', () => {
    const tree = shallow((
      <TableNoDataCell getMessage={key => key} />
    ));

    expect(tree.find('big').text()).toBe('noData');
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableNoDataCell
        getMessage={key => key}
        className="custom-class"
      />
    ));

    expect(tree.is(`.${classes.cell}`))
      .toBeTruthy();
    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableNoDataCell
        getMessage={key => key}
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  it('should set sticky position for the text container', () => {
    const tree = shallow((
      <TableNoDataCell
        getMessage={key => key}
      />
    ));

    expect(tree.find(`div.${classes.textContainer}`))
      .toBeTruthy();
  });

  it('should align text to the center', () => {
    const tree = shallow((
      <TableNoDataCell
        getMessage={key => key}
      />
    ));

    expect(tree.find('big').is(`.${classes.text}`))
      .toBeTruthy();
  });
});
