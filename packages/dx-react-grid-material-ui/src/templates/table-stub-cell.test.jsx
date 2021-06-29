import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { TableStubCell } from './table-stub-cell';

jest.mock('@devexpress/dx-react-grid', () => ({
  withKeyboardNavigation: jest.fn().mockReturnValue(x => x),
}));

describe('TableStubCell', () => {
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<TableStubCell />);
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableStubCell className="custom-class" />
    ));

    expect(tree.is(`.${classes.cell}`))
      .toBeTruthy();

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableStubCell data={{ a: 1 }} />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  it('should have focus style', () => {
    let tree = shallow((<TableStubCell />));
    expect(tree.is(`.${classes.focusedCell}`)).toBeFalsy();

    tree = shallow((<TableStubCell updateRefForKeyboardNavigation={() => {}} />));
    expect(tree.is(`.${classes.focusedCell}`)).toBeTruthy();
  });
});
