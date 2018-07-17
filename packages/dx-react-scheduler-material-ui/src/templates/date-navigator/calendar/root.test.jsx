import * as React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { Root } from './root';

describe('Calendar', () => {
  const defaultProps = {
    titleComponent: () => null,
    navigationButtonComponent: () => null,
    rowComponent: () => null,
    cellComponent: () => null,
    headerRowComponent: () => null,
    headerCellComponent: () => null,
    navigatorComponent: () => null,
    getHeaderCells: () => [],
    getCells: () => [],
  };

  describe('Root', () => {
    let mount;
    beforeAll(() => {
      mount = createMount();
    });
    afterAll(() => {
      mount.cleanUp();
    });
    it('should pass rest props to the root element', () => {
      const tree = mount((
        <Root
          {...defaultProps}
          data={{ a: 1 }}
        />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render navigator', () => {
      const navigator = mount((
        <Root
          {...defaultProps}
          currentDate="2018-07-16"
        />
      )).find(defaultProps.navigatorComponent);

      const {
        currentDate,
        titleComponent,
        navigationButtonComponent,
      } = navigator.props();

      expect(navigator.exists()).toBeTruthy();
      expect(currentDate).toBe('2018-07-16');
      expect(titleComponent).toBe(defaultProps.titleComponent);
      expect(navigationButtonComponent).toBe(defaultProps.navigationButtonComponent);
    });
    it('should navigate to the prev and next month', () => {
      const tree = mount((
        <Root
          {...defaultProps}
          currentDate="2018-07-16"
        />
      ));
      const { onNavigate } = tree.find(defaultProps.navigatorComponent).props();

      onNavigate({ back: true });
      expect(tree.state().currentDate.toString())
        .toBe(new Date(2018, 5, 16).toString());

      onNavigate({ back: false });
      expect(tree.state().currentDate.toString())
        .toBe(new Date(2018, 6, 16).toString());
    });
  });
});
