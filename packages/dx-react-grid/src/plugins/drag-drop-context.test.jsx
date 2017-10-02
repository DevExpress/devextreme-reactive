import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { mount, configure } from 'enzyme';

import { setupConsole } from '@devexpress/dx-testing';
import {
  Getter, PluginHost,
  DragDropContext as DragDropContextCore,
} from '@devexpress/dx-react-core';

import { DragDropContext } from './drag-drop-context';

describe('DragDropContext', () => {
  configure({ adapter: new Adapter() });
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should not render container if dragging is not started', () => {
    const tree = mount(
      <PluginHost>
        <Getter
          name="columns"
          value={[{ name: 'a' }, { name: 'b' }]}
        />
        <DragDropContext
          containerTemplate={() => <ul className="container" />}
          columnTemplate={() => <li />}
        />
      </PluginHost>,
    );

    expect(tree.find('.container').exists())
      .toBeFalsy();
  });

  it('should render container while dragging', () => {
    const tree = mount(
      <PluginHost>
        <Getter
          name="columns"
          value={[{ name: 'a', title: 'A' }, { name: 'b', title: 'B' }]}
        />
        <DragDropContext
          containerTemplate={({ clientOffset, columns, columnTemplate }) => (
            <ul className="container" style={{ top: clientOffset.y, left: clientOffset.x }}>
              {columns.map(column => React.cloneElement(
                columnTemplate({ column }),
                { key: column.name },
              ))}
            </ul>
          )}
          columnTemplate={({ column }) => (
            <li className="column" >
              {column.title}
            </li>
          )}
        />
      </PluginHost>,
    );

    const dragDropContext = tree.find(DragDropContextCore);
    dragDropContext.prop('onChange')({
      payload: [{ type: 'column', columnName: 'a' }],
      clientOffset: { x: 10, y: 10 },
    });
    tree.update();

    const container = tree.find('.container');
    const containerStyle = container.instance().style;
    expect(container.exists())
      .toBeTruthy();
    expect(containerStyle.top)
      .toBe('10px');
    expect(containerStyle.left)
      .toBe('10px');
    expect(tree.find('.column').text())
      .toBe('A');
  });
});
