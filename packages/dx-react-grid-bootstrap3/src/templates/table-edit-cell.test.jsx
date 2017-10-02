import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { EditCell } from './table-edit-cell';

describe('EditCell', () => {
  configure({ adapter: new Adapter() });
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

  it('should render children if passed', () => {
    const tree = mount(
      <EditCell
        onValueChange={() => {}}
      >
        <span className="test" />
      </EditCell>,
    );

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });
});
