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
    headerCells: [],
    cells: [],
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
      const onNavigateMock = jest.fn();
      const navigator = mount((
        <Root
          {...defaultProps}
          currentDate="2018-07-16"
          onNavigate={onNavigateMock}
        />
      )).find(defaultProps.navigatorComponent);

      const {
        currentDate,
        titleComponent,
        navigationButtonComponent,
        onNavigate,
      } = navigator.props();

      onNavigate();

      expect(navigator.exists()).toBeTruthy();
      expect(currentDate).toBe('2018-07-16');
      expect(titleComponent).toBe(defaultProps.titleComponent);
      expect(navigationButtonComponent).toBe(defaultProps.navigationButtonComponent);
      expect(onNavigateMock).toBeCalled();
    });
  });
});
