import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { createMount, createShallow, getClasses, setupConsole } from '@devexpress/dx-testing';
import { TableSelectCell } from './table-select-cell';

describe('TableSelectCell', () => {
  let mount;
  let shallow;
  let classes;
  beforeAll(() => {
    setupConsole({ ignore: ['validateDOMNesting'] });
    mount = createMount();
    shallow = createShallow({ dive: true });
    classes = getClasses(<TableSelectCell />);
  });

  it('should fire the `onToggle` event on cell click if selection is available', () => {
    const onToggle = jest.fn();
    const tree = mount((
      <TableSelectCell
        onToggle={onToggle}
      />
    ));
    tree.find(Checkbox).simulate('click');

    expect(onToggle)
      .toHaveBeenCalledTimes(1);
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableSelectCell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is(`.${classes.cell}`))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableSelectCell data={{ a: 1 }} />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
