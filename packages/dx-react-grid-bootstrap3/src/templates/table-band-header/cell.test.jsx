import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { Cell } from './cell';
import { StyleContext } from '../layout';

describe('TableCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should render children if passed', () => {
    const tree = shallow((
      <Cell>
        <span className="test" />
      </Cell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Cell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass styles to the root element', () => {
    const tree = shallow((
      <Cell style={{ color: 'red' }} />
    ));

    expect(tree.find('th').prop('style').color)
      .toBe('red');
    expect(tree.find('th').prop('style').borderTop)
      .toBe('none');
  });

  it('should apply left border if necessary', () => {
    const tree = mount((
      <StyleContext.Provider value={{ borderColor: 'red' }}>
        <Cell className="custom-class" beforeBorder />
      </StyleContext.Provider>
    ));

    tree.setState({ borderColor: 'red' });

    expect(tree.find('.custom-class').last().prop('style').borderRight)
      .toBe('1px solid red');
    expect(tree.find('.custom-class').last().prop('style').borderLeft)
      .toBe('1px solid red');
  });
});
