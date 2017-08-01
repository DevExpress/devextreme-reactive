import React from 'react';
import { Input } from 'material-ui';
import { createMount, getClasses } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { EditCell, styleSheet } from './table-edit-cell';

describe('TableEditCell', () => {
  let resetConsole;
  let mount;

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
    mount = createMount();
  });
  afterAll(() => {
    resetConsole();
    mount.cleanUp();
  });

  it('should render without exceptions', () => {
    const tree = mount(
      <EditCell
        column={{}}
        value={''}
        onValueChange={() => {}}
      />,
    );

    expect(tree.find(EditCell).exists()).toBeTruthy();
  });

  it('should work with editor properly', () => {
    const onValueChange = jest.fn();
    const tree = mount(
      <EditCell
        column={{}}
        value={'test'}
        onValueChange={onValueChange}
      />,
    );

    const input = tree.find(Input);
    expect(input.props()).toMatchObject({
      value: 'test',
    });

    input.find('input').simulate('change', { target: { value: 'changed' } });
    expect(onValueChange.mock.calls).toHaveLength(1);
    expect(onValueChange.mock.calls[0][0]).toBe('changed');
  });

  it('should take column align into account', () => {
    const tree = mount(
      <EditCell
        column={{}}
        value={''}
        onValueChange={() => {}}
      />,
    );
    const classes = getClasses(styleSheet);

    const inputRoot = tree.find(Input);
    const input = inputRoot.find('input');
    expect(inputRoot.hasClass(classes.inputRoot)).toBeTruthy();
    expect(input.hasClass(classes.inputRight)).toBeFalsy();

    tree.setProps({ column: { align: 'right' } });
    expect(inputRoot.hasClass(classes.inputRoot)).toBeTruthy();
    expect(input.hasClass(classes.inputRight)).toBeTruthy();
  });
});
