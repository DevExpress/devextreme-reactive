import React from 'react';
import { Input } from 'material-ui';
import { createMount, getClasses } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { EditCell } from './table-edit-cell';

describe('EditCell', () => {
  let resetConsole;
  let mount;
  let classes;

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting', 'SheetsRegistry'] });
    classes = getClasses(<EditCell onValueChange={() => {}} />);
    mount = createMount({ context: { table: {} }, childContextTypes: { table: () => null } });
  });
  afterAll(() => {
    resetConsole();
    mount.cleanUp();
  });

  it('should render without exceptions', () => {
    const tree = mount((
      <EditCell
        value=""
        onValueChange={() => {}}
      />
    ));
    expect(tree.find(EditCell).exists()).toBeTruthy();
  });

  it('should work with editor properly', () => {
    const onValueChange = jest.fn();
    const tree = mount((
      <EditCell
        value="test"
        onValueChange={onValueChange}
      />
    ));

    const input = tree.find(Input);
    expect(input.props()).toMatchObject({
      value: 'test',
    });

    input.find('input').simulate('change', { target: { value: 'changed' } });
    expect(onValueChange.mock.calls).toHaveLength(1);
    expect(onValueChange.mock.calls[0][0]).toBe('changed');
  });

  it('should take column align into account', () => {
    const tree = mount((
      <EditCell
        value=""
        onValueChange={() => {}}
      />
    ));

    const inputRoot = tree.find(Input);
    const input = inputRoot.find('input');
    expect(inputRoot.hasClass(classes.inputRoot)).toBeTruthy();
    expect(input.hasClass(classes.inputRight)).toBeFalsy();
  });

  it('should take column align into account if align is "right"', () => {
    const tree = mount((
      <EditCell
        value=""
        onValueChange={() => {}}
        column={{ align: 'right' }}
      />
    ));
    const inputRoot = tree.find(Input);
    const input = inputRoot.find('input');
    expect(inputRoot.hasClass(classes.inputRoot)).toBeTruthy();
    expect(input.hasClass(classes.inputRight)).toBeTruthy();
  });

  it('should pass style to the root element', () => {
    const tree = mount((
      <EditCell
        value="a"
        onValueChange={() => {}}
        style={{
          width: '40px',
          height: '10px',
        }}
      />
    ));
    expect(tree.find('td').prop('style'))
      .toMatchObject({
        width: '40px',
        height: '10px',
      });
  });

  it('should render children if passed', () => {
    const tree = mount((
      <EditCell
        onValueChange={() => {}}
      >
        <span className="test" />
      </EditCell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });
});
