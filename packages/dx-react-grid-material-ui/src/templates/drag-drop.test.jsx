import React from 'react';
import { Paper } from 'material-ui';
import { createMount, getClasses } from 'material-ui/test-utils';
import { Container, styleSheet } from './drag-drop';

describe('Container', () => {
  let mount;
  beforeAll(() => {
    mount = createMount();
  });
  afterAll(() => {
    mount.cleanUp();
  });

  it('should have correct styles', () => {
    const tree = mount(
      <Container
        columns={[{
          name: 'Test',
        }]}
        clientOffset={{ x: 10, y: 20 }}
        columnTemplate={() => <div />}
      />,
      styleSheet,
    );
    const classes = getClasses(styleSheet);

    expect(tree.find(Paper).hasClass(classes.container))
      .toBeTruthy();
  });
});
