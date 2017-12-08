import React from 'react';
import { Paper } from 'material-ui';
import { createMount, getClasses } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { Container } from './drag-drop';

describe('Container', () => {
  let mount;
  let classes;
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['SheetsRegistry'] });
    mount = createMount();
    classes = getClasses((
      <Container
        clientOffset={{ x: 10, y: 20 }}
      />
    ));
  });
  afterAll(() => {
    mount.cleanUp();
    resetConsole();
  });

  it('should have correct styles', () => {
    const tree = mount((
      <Container
        clientOffset={{ x: 10, y: 20 }}
      />
    ));

    expect(tree.find(Paper).hasClass(classes.container))
      .toBeTruthy();
  });
});
