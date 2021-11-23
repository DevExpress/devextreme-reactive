import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { DragDropProvider, DragSource } from '@devexpress/dx-react-core';
import { setupConsole } from '@devexpress/dx-testing';

import { TableHeaderCell } from './table-header-cell';
import { ResizingControl } from './table-header-cell/resizing-control';
import { StyleContext } from './layout';

describe('TableHeaderCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should have correct styles when user interaction disallowed', () => {
    const tree = mount((
      <StyleContext.Provider value={{}}>
        <TableHeaderCell
          column={{}}
        />
      </StyleContext.Provider>
    ));

    expect(tree.find('th').prop('style'))
      .not.toMatchObject({
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
      });

    expect(tree.find('th').prop('style').cursor)
      .toBeUndefined();
  });

  it('should have correct styles when dragging is allowed', () => {
    const getCellWidth = () => {};
    const tree = mount((
      <StyleContext.Provider value={{}}>
        <DragDropProvider>
          <TableHeaderCell
            column={{ name: 'a' }}
            draggingEnabled
            getCellWidth={getCellWidth}
          />
        </DragDropProvider>
      </StyleContext.Provider>
    ));

    expect(tree.find('th').prop('style'))
      .toMatchObject({
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: 'pointer',
      });
  });

  it('should have correct styles when dragging', () => {
    const getCellWidth = () => {};
    const tree = mount((
      <StyleContext.Provider value={{}}>
        <DragDropProvider>
          <TableHeaderCell
            column={{ name: 'a' }}
            draggingEnabled
            getCellWidth={getCellWidth}
          />
        </DragDropProvider>
      </StyleContext.Provider>
    ));

    expect(tree.find('th').prop('style'))
      .not.toMatchObject({
        opacity: 0.3,
      });

    tree.find(DragSource).prop('onStart')();
    tree.update();

    expect(tree.find('th').prop('style'))
      .toMatchObject({
        opacity: 0.3,
      });

    tree.find(DragSource).prop('onEnd')();
    tree.update();

    expect(tree.find('th').prop('style'))
      .not.toMatchObject({
        opacity: 0.3,
      });
  });

  it('should render resize control if resizing is allowed', () => {
    const onWidthChange = () => {};
    const onWidthDraft = () => {};
    const onWidthDraftCancel = () => {};

    const tree = mount((
      <StyleContext.Provider value={{}}>
        <TableHeaderCell
          column={{}}
          resizingEnabled
          onWidthChange={onWidthChange}
          onWidthDraft={onWidthDraft}
          onWidthDraftCancel={onWidthDraftCancel}
        />
      </StyleContext.Provider>
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

  it('should consider the `wordWrapEnabled` property', () => {
    let tree = mount((
      <StyleContext.Provider value={{}}>
        <TableHeaderCell />
      </StyleContext.Provider>
    ));
    expect(tree.find('th').prop('style').whiteSpace)
      .toBe('nowrap');

    tree = mount((
      <StyleContext.Provider value={{}}>
        <TableHeaderCell tableColumn={{ wordWrapEnabled: true }} />
      </StyleContext.Provider>
    ));
    expect(tree.find('th').prop('style').whiteSpace)
      .toBe('normal');
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableHeaderCell
        column={{ title: 'a' }}
        className="custom-class"
      />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should be fixed by default', () => {
    const contextValue = { stickyPosition: 'sticky', backgroundColor: '#ffffff' };
    const tree = mount(
      <StyleContext.Provider value={contextValue}>
        <TableHeaderCell />
      </StyleContext.Provider>,
    );
    const cell = tree.find('th');

    expect(cell.props().style).toHaveProperty('position', contextValue.stickyPosition);
    expect(cell.props().style).toHaveProperty('backgroundColor', contextValue.backgroundColor);
    expect(cell.props().style).toHaveProperty('top', 0);
  });

  it('should be possible to turn off fixed', () => {
    const contextValue = { stickyPosition: 'sticky', backgroundColor: '#ffffff' };
    const tree = mount(
      <StyleContext.Provider value={contextValue}>
        <TableHeaderCell isFixed={false} />
      </StyleContext.Provider>,
    );
    const cell = tree.find('th');

    expect(cell.props().style).toHaveProperty('position', 'relative');
    expect(cell.props().style).not.toHaveProperty('backgroundColor');
    expect(cell.props().style).not.toHaveProperty('top');
  });
});
