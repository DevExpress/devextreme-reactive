import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { DragDropProvider, DragSource } from '@devexpress/dx-react-core';
import { setupConsole } from '@devexpress/dx-testing';

import { TableHeaderCell } from './table-header-cell';
import { ResizingControl } from './table-header-cell/resizing-control';
import { BodyColorContext } from './layout';

describe('TableHeaderCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should have correct classes when user interaction disallowed', () => {
    const tree = mount((
      <BodyColorContext.Provider value={{}}>
        <TableHeaderCell
          column={{}}
        />
      </BodyColorContext.Provider>
    ));

    expect(tree.find('th').is('.dx-g-bs4-user-select-none.dx-g-bs4-cursor-pointer'))
      .toBeFalsy();
  });

  it('should have correct classes when dragging is allowed', () => {
    const getCellWidth = () => {};
    const tree = mount((
      <BodyColorContext.Provider value={{}}>
        <DragDropProvider>
          <TableHeaderCell
            column={{ name: 'a' }}
            draggingEnabled
            getCellWidth={getCellWidth}
          />
        </DragDropProvider>
      </BodyColorContext.Provider>
    ));

    expect(tree.find('th').is('.dx-g-bs4-user-select-none.dx-g-bs4-cursor-pointer.dx-g-bs4-fixed-header-cell'))
      .toBeTruthy();
  });

  it('should have correct classes when dragging', () => {
    const getCellWidth = () => {};
    const tree = mount((
      <BodyColorContext.Provider value={{}}>
        <DragDropProvider>
          <TableHeaderCell
            column={{ name: 'a' }}
            draggingEnabled
            getCellWidth={getCellWidth}
          />
        </DragDropProvider>
      </BodyColorContext.Provider>
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

    const tree = mount((
      <BodyColorContext.Provider value={{}}>
        <TableHeaderCell
          column={{}}
          resizingEnabled
          onWidthChange={onWidthChange}
          onWidthDraft={onWidthDraft}
          onWidthDraftCancel={onWidthDraftCancel}
        />
      </BodyColorContext.Provider>
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
    const tree = mount((
      <BodyColorContext.Provider value={{}}>
        <TableHeaderCell
          column={{ title: 'a' }}
          className="custom-class"
        />
      </BodyColorContext.Provider>
    ));

    expect(tree.find('th').is('.dx-g-bs4-header-cell.dx-g-bs4-fixed-header-cell.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableHeaderCell column={{ title: 'a' }} data={{ a: 1 }} />
    ));
    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  it('should consider the `wordWrapEnabled` property', () => {
    let tree = mount((
      <BodyColorContext.Provider value={{}}>
        <TableHeaderCell />
      </BodyColorContext.Provider>
    ));
    expect(tree.find('th').is('.text-nowrap'))
      .toBeTruthy();

    tree = mount((
      <BodyColorContext.Provider value={{}}>
        <TableHeaderCell tableColumn={{ wordWrapEnabled: true }} />
      </BodyColorContext.Provider>
    ));
    expect(tree.find('th').is('.text-nowrap'))
      .toBeFalsy();
  });

  it('should be fixed by default', () => {
    const contextValue = '#ffffff';
    const tree = mount((
      <BodyColorContext.Provider value={contextValue}>
        <TableHeaderCell />
      </BodyColorContext.Provider>
    ));
    const cell = tree.find('th');

    expect(cell.is('.position-relative')).toBe(false);
    expect(cell.is('.dx-g-bs4-fixed-header-cell')).toBe(true);
    expect(cell.props().style).toHaveProperty('backgroundColor', contextValue);
  });

  it('should be possible to turn off fixed', () => {
    const contextValue = '#ffffff';
    const tree = mount((
      <BodyColorContext.Provider value={contextValue}>
        <TableHeaderCell isFixed={false} />
      </BodyColorContext.Provider>
    ));
    const cell = tree.find('th');

    expect(cell.is('.position-relative')).toBe(true);
    expect(cell.is('.dx-g-bs4-fixed-header-cell')).toBe(false);
    expect(cell.props().style).not.toHaveProperty('backgroundColor');
  });
});
