/* globals window:true */

import * as React from 'react';
import { mount } from 'enzyme';
import { Root, StyleContext } from './layout';
import { getStickyPosition } from '../utils/css-fallback-properties';

jest.mock('react-dom', () => ({
  findDOMNode: jest.fn(() => null),
}));
jest.mock('../utils/css-fallback-properties', () => ({
  getStickyPosition: jest.fn(),
}));

describe('Layout', () => {
  const { getComputedStyle } = window;
  beforeEach(() => {
    window.getComputedStyle = jest.fn().mockImplementation(() => ({}));
  });
  afterEach(() => {
    window.getComputedStyle = getComputedStyle;
  });

  describe('Root', () => {
    it('should pass className to the root element', () => {
      const tree = mount((
        <Root className="custom-class" rootRef={{}} />
      ));

      expect(tree.find('.panel.panel-default.custom-class').exists())
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = mount((
        <Root data={{ a: 1 }} rootRef={{}} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    describe('StyleContext', () => {
      const backgroundColor = 'backgroundColor';
      const borderColor = 'borderColor';
      const stickyPosition = 'stickyPosition';

      beforeEach(() => {
        window.getComputedStyle.mockReturnValue({
          backgroundColor,
          borderBottomColor: borderColor,
        });
        getStickyPosition.mockReturnValue(stickyPosition);
      });

      const Test = () => null;
      // eslint-disable-next-line react/prefer-stateless-function
      class TestWrapper extends React.Component {
        render() {
          return <Test styleContext={this.context} />;
        }
      }
      TestWrapper.contextType = StyleContext;

      it('should provide correct values', () => {
        const tree = mount((
          <Root rootRef={{}}>
            <TestWrapper />
          </Root>
        ));

        expect(tree.find(Test).prop('styleContext'))
          .toEqual({
            backgroundColor, borderColor, stickyPosition,
          });
      });

      it('should provide panel`s colors', () => {
        let targetElement;
        window.getComputedStyle.mockImplementation((element) => {
          targetElement = element;
          return {};
        });

        mount((
          <Root rootRef={{}}>
            <TestWrapper />
          </Root>
        ));

        expect(targetElement.className)
          .toBe('panel panel-default');
      });
    });
  });
});
