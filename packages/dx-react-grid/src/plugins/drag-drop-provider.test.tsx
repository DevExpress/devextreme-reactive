import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import {
  Getter, PluginHost,
  DragDropProvider as DragDropProviderCore,
} from '@devexpress/dx-react-core';
import { DragDropProvider } from './drag-drop-provider';

// eslint-disable-next-line react/prop-types
const DefaultContainer = ({ clientOffset, children }) => (
  <ul className="container" style={{ top: clientOffset.y, left: clientOffset.x }}>
    {children}
  </ul>
);
// eslint-disable-next-line react/prop-types
const DefaultColumn = ({ column }) => (
  <li className="column">
    {column.title}
  </li>
);

describe('DragDropProvider', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should not render container if dragging is not started', () => {
    const tree = mount((
      <PluginHost>
        <Getter
          name="columns"
          value={[{ name: 'a' }, { name: 'b' }]}
        />
        <DragDropProvider
          containerComponent={DefaultContainer}
          columnComponent={DefaultColumn}
        />
      </PluginHost>
    ));

    expect(tree.find('.container').exists())
      .toBeFalsy();
  });

  it('should render container while dragging', () => {
    const tree = mount((
      <PluginHost>
        <Getter
          name="columns"
          value={[{ name: 'a', title: 'A' }, { name: 'b', title: 'B' }]}
        />
        <DragDropProvider
          containerComponent={DefaultContainer}
          columnComponent={DefaultColumn}
        />
      </PluginHost>
    ));

    const dragDropProvider = tree.find(DragDropProviderCore);
    dragDropProvider.prop('onChange')({
      payload: [{ type: 'column', columnName: 'a' }],
      clientOffset: { x: 10, y: 10 },
    });
    tree.update();

    const container = tree.find('.container');
    expect(container.exists())
      .toBeTruthy();
    expect(container.props().style)
      .toMatchObject({
        top: 10,
        left: 10,
      });
    expect(tree.find('.column').text())
      .toBe('A');
  });
});
