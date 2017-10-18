import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { EditCommandHeadingCell, EditCommandCell } from './table-edit-command-cell';

describe('EditCommandCells', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  afterAll(() => {
    resetConsole();
  });

  // eslint-disable-next-line react/prop-types
  const commandTemplate = ({ text }) => (<div className="command-template">{text}</div>);

  describe('EditCommandCell', () => {
    const mountEditCommandCell = ({
      startEditing = () => {},
      deleteRow = () => {},
      cancelEditing = () => {},
      commitChanges = () => {},
      allowEditing = true,
      allowDeleting = true,
      isEditing = false,
      getMessage = () => {},
    }) => mount((
      <EditCommandCell
        startEditing={startEditing}
        deleteRow={deleteRow}
        cancelEditing={cancelEditing}
        commitChanges={commitChanges}
        isEditing={isEditing}
        allowEditing={allowEditing}
        allowDeleting={allowDeleting}
        commandTemplate={commandTemplate}
        getMessage={getMessage}
      />
    ));

    it('should render custom command messages for "edit" & "delete" commands', () => {
      const tree = mountEditCommandCell({
        getMessage: () => 'Command message',
      });
      const commands = tree.find('.command-template');

      expect(commands.at(0).text()).toBe('Command message');
      expect(commands.at(1).text()).toBe('Command message');
    });

    it('should render custom command messages for "save" & "cancel" commands', () => {
      const tree = mountEditCommandCell({
        isEditing: true,
        getMessage: () => 'Command message',
      });
      const commands = tree.find('.command-template');

      expect(commands.at(0).text()).toBe('Command message');
      expect(commands.at(1).text()).toBe('Command message');
    });
  });
  describe('EditCommandHeadingCell', () => {
    const mountEditCommandHeadingCell = ({
      addRow = () => {},
      allowAdding = true,
      getMessage = () => {},
    }) => mount((
      <EditCommandHeadingCell
        addRow={addRow}
        commandTemplate={commandTemplate}
        allowAdding={allowAdding}
        getMessage={getMessage}
      />
    ));

    it('should render command messages', () => {
      const tree = mountEditCommandHeadingCell({
        getMessage: () => 'New',
      });
      const command = tree.find('.command-template');

      expect(command.text()).toBe('New');
    });
  });
});
