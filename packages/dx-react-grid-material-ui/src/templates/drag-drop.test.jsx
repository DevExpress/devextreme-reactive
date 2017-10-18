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
        columns={[{
          name: 'Test',
        }]}
        clientOffset={{ x: 10, y: 20 }}
        columnTemplate={() => <div />}
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
        columns={[{
          name: 'Test',
        }]}
        clientOffset={{ x: 10, y: 20 }}
        columnTemplate={() => <div />}
      />
    ));

    expect(tree.find(Paper).hasClass(classes.container))
      .toBeTruthy();
  });
});
