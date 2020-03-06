import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { TableContainer } from './table-container';

describe('TableContainer', () => {
  let resetConsole;
  let shallow;
  let classes;
  beforeAll(() => {
    resetConsole = setupConsole();
    shallow = createShallow({ untilSelector: 'TableContainerBase' });
    classes = getClasses(
      <TableContainer>
        <span />
      </TableContainer>,
    );
  });
  afterAll(() => {
    resetConsole();
    shallow.cleanUp();
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableContainer
        className="custom-class"
      >
        <span />
      </TableContainer>
    ));

    expect(tree.is(`.${classes.root}`))
      .toBeTruthy();
    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableContainer data={{ a: 1 }}>
        <div />
      </TableContainer>
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  it('should render a `div` block as a workaround Safari sticky bug', () => {
    // https://bugs.webkit.org/show_bug.cgi?id=175029
    const tree = shallow((
      <TableContainer>
        <div className="child" />
      </TableContainer>
    ));

    expect(tree.find('div').length)
      .toBe(3);
  });
});
