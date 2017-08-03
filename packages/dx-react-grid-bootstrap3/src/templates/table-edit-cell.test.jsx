import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { EditCell } from './table-edit-cell';

describe('EditCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  afterAll(() => {
    resetConsole();
  });

  it('should pass style to the root element', () => {
    const tree = mount(
      <EditCell
        value={'a'}
        onValueChange={() => {}}
        style={{
          width: '40px',
          height: '10px',
        }}
      />,
    );
    expect(tree.find('td').prop('style'))
      .toMatchObject({
        width: '40px',
        height: '10px',
      });
  });
});
