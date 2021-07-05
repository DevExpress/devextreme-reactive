import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { DragDropProvider, DragSource } from '@devexpress/dx-react-core';
import { setupConsole } from '@devexpress/dx-testing';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';

import { TableHeaderCell } from './table-header-cell';
import { ResizingControl } from './table-header-cell/resizing-control';

jest.mock('@devexpress/dx-react-grid', () => ({
  withKeyboardNavigation: jest.fn().mockReturnValue(x => x),
}));

const defaultProps = {
  refObject: { current: {} },
};

describe('TableHeaderCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should have correct classes when user interaction disallowed', () => {
    const tree = shallow((
      <TableHeaderCell
        {...defaultProps}
        column={{}}
      />
    ));

    expect(tree.find('th').is('.dx-g-bs4-user-select-none.dx-g-bs4-cursor-pointer'))
      .toBeFalsy();
  });

  it('should have correct classes when dragging is allowed', () => {
    const getCellWidth = () => {};
    const tree = mount((
      <DragDropProvider>
        <TableHeaderCell
          {...defaultProps}
          column={{ name: 'a' }}
          draggingEnabled
          getCellWidth={getCellWidth}
        />
      </DragDropProvider>
    ));

    expect(tree.find('th').is('.dx-g-bs4-user-select-none.dx-g-bs4-cursor-pointer.position-relative'))
      .toBeTruthy();
  });

  it('should have correct classes when dragging', () => {
    const getCellWidth = () => {};
    const tree = mount((
      <DragDropProvider>
        <TableHeaderCell
          {...defaultProps}
          column={{ name: 'a' }}
          draggingEnabled
          getCellWidth={getCellWidth}
        />
      </DragDropProvider>
    ));

    expect(tree.find('th').is('.dx-g-bs4-inactive'))
      .toBeFalsy();

    tree.find(DragSource).prop('onStart')();
    tree.update();

    expect(tree.find('th').is('.dx-g-bs4-inactive'))
      .toBeTruthy();

    tree.find(DragSource).prop('onEnd')();
    tree.update();

    expect(tree.find('th').is('.dx-g-bs4-inactive'))
      .toBeFalsy();
  });

  it('should render resize control if resizing is allowed', () => {
    const onWidthChange = () => {};
    const onWidthDraft = () => {};
    const onWidthDraftCancel = () => {};

    const tree = shallow((
      <TableHeaderCell
        {...defaultProps}
        column={{}}
        resizingEnabled
        onWidthChange={onWidthChange}
        onWidthDraft={onWidthDraft}
        onWidthDraftCancel={onWidthDraftCancel}
      />
    ));

    expect(tree.find(ResizingControl).exists())
      .toBeTruthy();
    expect(tree.find(ResizingControl).prop('onWidthChange'))
      .toBe(onWidthChange);
    expect(tree.find(ResizingControl).prop('onWidthDraft'))
      .toBe(onWidthDraft);
    expect(tree.find(ResizingControl).prop('onWidthDraftCancel'))
      .toBe(onWidthDraftCancel);
  });

  it('should pass custom class to the root element', () => {
    const tree = shallow((
      <TableHeaderCell
        {...defaultProps}
        column={{ title: 'a' }}
        className="custom-class"
      />
    ));

    expect(tree.find('th').is('.position-relative.dx-g-bs4-header-cell.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableHeaderCell column={{ title: 'a' }} data={{ a: 1 }} {...defaultProps} />
    ));
    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  it('should consider the `wordWrapEnabled` property', () => {
    let tree = shallow(<TableHeaderCell {...defaultProps} />);
    expect(tree.is('.text-nowrap'))
      .toBeTruthy();

    tree = shallow(<TableHeaderCell {...defaultProps} tableColumn={{ wordWrapEnabled: true }} />);
    expect(tree.is('.text-nowrap'))
      .toBeFalsy();
  });

  it('should call withKeyboardNavigation', () => {
    shallow((
      <TableHeaderCell {...defaultProps} />
    ));

    expect(withKeyboardNavigation).toBeCalledWith();
  });

  it('should apply class for keyboard navigation', () => {
    const tree = shallow((
      <TableHeaderCell {...defaultProps} updateRefForKeyboardNavigation={() => {}} />
    ));

    expect(tree.is('.position-relative.dx-g-bs4-header-cell.dx-g-bs4-focus-cell'))
      .toBeTruthy();
  });
});
