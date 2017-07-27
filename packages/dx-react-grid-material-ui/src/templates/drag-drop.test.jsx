import React from 'react';
import { Paper } from 'material-ui';
import { mountWithStyles } from '../utils/testing';
import { Container, styleSheet } from './drag-drop';

describe('Container', () => {
  it('should have correct styles', () => {
    const { tree, classes } = mountWithStyles(
      <Container
        columns={[{
          name: 'Test',
        }]}
        clientOffset={{ x: 10, y: 20 }}
        columnTemplate={() => <div />}
      />,
      styleSheet,
    );

    expect(tree.find(Paper).hasClass(classes.container))
      .toBeTruthy();
  });
});
