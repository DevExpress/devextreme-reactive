import * as React from 'react';
import { createMount, createShallow, getClasses } from '@material-ui/core/test-utils';
import TableCell from '@material-ui/core/TableCell';
import { setupConsole } from '@devexpress/dx-testing';
import { TableGroupCell } from './table-group-row-cell';

describe('TableCell', () => {
  let resetConsole;
  let mount;
  let shallow;
  let classes;
  beforeAll(() => {
    classes = getClasses(<TableGroupCell />);
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
    shallow = createShallow({ dive: true });
    mount = createMount({ context: { table: {} }, childContextTypes: { table: () => null } });
  });

  afterAll(() => {
    resetConsole();
    mount.cleanUp();
  });

  it('should render column title and value', () => {
    const tree = mount((
      <TableGroupCell
        column={{ title: 'Title' }}
        row={{ value: 'Value' }}
      />
    ));

    expect(tree.text())
      .toMatch(/Title.*Value/);
  });

  it('should render children if passed', () => {
    const tree = mount((
      <TableGroupCell>
        <span className="test" />
      </TableGroupCell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should render IconButton', () => {
    const tree = mount((
      <TableGroupCell />
    ));

    expect(tree.find('IconButton').exists())
      .toBeTruthy();
  });

  it('should expand grouped row on click', () => {
    const onToggle = jest.fn();
    const tree = shallow((
      <TableGroupCell
        onToggle={onToggle}
      />
    ));
    tree.find(TableCell).simulate('click');

    expect(onToggle)
      .toHaveBeenCalled();
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableGroupCell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is(`.${classes.cell}`))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableGroupCell data={{ a: 1 }} />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
