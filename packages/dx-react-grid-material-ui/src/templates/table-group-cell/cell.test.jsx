import * as React from 'react';
import { createMount, createShallow, getClasses } from '@material-ui/core/test-utils';
import TableCell from '@material-ui/core/TableCell';
import { setupConsole } from '@devexpress/dx-testing';
import { Cell as TableGroupCell } from './cell';

describe('TableGroupCell', () => {
  let resetConsole;
  let mount;
  let shallow;
  let classes;
  const defaultProps = {
    contentComponent: () => null,
    iconComponent: () => null,
    containerComponent: ({ children }) => children,
    expanded: true,
    classes: {},
    column: {},
    row: {},
    position: '13px',
    side: 'left',
  };

  beforeAll(() => {
    classes = getClasses(<TableGroupCell {...defaultProps} />);
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  afterAll(() => {
    resetConsole();
  });

  it('should render children inside content component if passed', () => {
    const tree = mount((
      <TableGroupCell
        {...defaultProps}
        contentComponent={({ children }) => children}
      >
        <span className="test" />
      </TableGroupCell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should render Icon', () => {
    const tree = mount((
      <TableGroupCell {...defaultProps} />
    ));

    expect(tree.find(defaultProps.iconComponent).props())
      .toMatchObject({
        expanded: defaultProps.expanded,
      });
  });

  it('should render Content', () => {
    const tree = mount((
      <TableGroupCell {...defaultProps} />
    ));

    expect(tree.find(defaultProps.contentComponent).props())
      .toMatchObject({
        column: defaultProps.column,
        row: defaultProps.row,
      });
  });

  it('should render Container', () => {
    const tree = mount((
      <TableGroupCell {...defaultProps} />
    ));

    expect(tree.find(defaultProps.containerComponent).props())
      .toMatchObject({
        position: '13px',
        side: 'left',
      });
  });

  it('should expand grouped row on click', () => {
    const onToggle = jest.fn();
    const tree = shallow((
      <TableGroupCell
        {...defaultProps}
        onToggle={onToggle}
      />
    ));
    tree.find(TableCell).simulate('click');

    expect(onToggle)
      .toHaveBeenCalled();
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableGroupCell
        {...defaultProps}
        className="custom-class"
      />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is(`.${classes.cell}`))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableGroupCell
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
