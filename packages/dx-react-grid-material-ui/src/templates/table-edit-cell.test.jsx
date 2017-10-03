import React from 'react';
import { Input, Table } from 'material-ui';
import { createMount, getClasses } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { EditCell } from './table-edit-cell';

describe('EditCell', () => {
  let resetConsole;
  let mount;
  let classes;

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
    mount = createMount();
    classes = getClasses(<EditCell onValueChange={() => {}} />);
  });
  afterAll(() => {
    resetConsole();
    mount.cleanUp();
  });

  it('should render without exceptions', () => {
    const tree = mount(
      <Table>
        <EditCell
          value={''}
          onValueChange={() => {}}
        />
      </Table>,
    );
    expect(tree.find(EditCell).exists()).toBeTruthy();
  });

  it('should work with editor properly', () => {
    const onValueChange = jest.fn();
    const tree = mount(
      <Table>
        <EditCell
          value={'test'}
          onValueChange={onValueChange}
        />
      </Table>,
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
      <Table>
        <EditCell
          value={''}
          onValueChange={() => {}}
        />
      </Table>,
    );

    const inputRoot = tree.find(Input);
    const input = inputRoot.find('input');
    expect(inputRoot.hasClass(classes.inputRoot)).toBeTruthy();
    expect(input.hasClass(classes.inputRight)).toBeFalsy();
  });

  it('should take column align into account if align is "right"', () => {
    const tree = mount(
      <Table>
        <EditCell
          value={''}
          onValueChange={() => {}}
          column={{ align: 'right' }}
        />
      </Table>,
    );
    const inputRoot = tree.find(Input);
    const input = inputRoot.find('input');
    expect(inputRoot.hasClass(classes.inputRoot)).toBeTruthy();
    expect(input.hasClass(classes.inputRight)).toBeTruthy();
  });

  it('should pass style to the root element', () => {
    const tree = mount(
      <Table>
        <EditCell
          value={'a'}
          onValueChange={() => {}}
          style={{
            width: '40px',
            height: '10px',
          }}
        />
      </Table>,
    );
    expect(tree.find('td').prop('style'))
      .toMatchObject({
        width: '40px',
        height: '10px',
      });
  });

  it('should render children if passed', () => {
    const tree = mount(
      <Table>
        <EditCell
          onValueChange={() => {}}
        >
          <span className="test" />
        </EditCell>
      </Table>,
    );

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });
});
