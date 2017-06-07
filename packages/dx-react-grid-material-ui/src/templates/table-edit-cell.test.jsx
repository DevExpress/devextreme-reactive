import React from 'react';
import { Input } from 'material-ui';

import { mountWithStyles, setupConsole } from '../utils/testing';
import { EditCell, styleSheet } from './table-edit-cell';

describe('TableEditCell', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  afterAll(() => {
    resetConsole();
  });

  test('should render without exceptions', () => {
    const tree = mountWithStyles(
      <EditCell
        column={{}}
        value={''}
        onValueChange={() => {}}
      />,
    );

    expect(tree.find(EditCell).exists()).toBeTruthy();
  });

  test('should work with editor properly', () => {
    const onValueChange = jest.fn();
    const tree = mountWithStyles(
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

  test('should take column align into account', () => {
    const { tree, classes } = mountWithStyles(
      <EditCell
        column={{}}
        value={''}
        onValueChange={() => {}}
      />,
      styleSheet,
    );

    const input = tree.find(Input);
    expect(input.hasClass(classes.input)).toBeTruthy();
    expect(input.hasClass(classes.right)).toBeFalsy();

    tree.setProps({ column: { align: 'right' } });
    expect(input.hasClass(classes.input)).toBeTruthy();
    expect(input.hasClass(classes.right)).toBeTruthy();
  });
});
