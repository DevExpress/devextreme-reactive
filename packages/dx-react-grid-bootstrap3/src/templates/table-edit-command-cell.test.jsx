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
    }) => mount(
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
      />,
    );

    it('should render default command messages for "edit" & "delete" commands', () => {
      const tree = mountEditCommandCell({ });
      const commands = tree.find('.command-template');

      expect(commands.at(0).text()).toBe('Edit');
      expect(commands.at(1).text()).toBe('Delete');
    });

    it('should render default command messages for "save" & "cancel" commands', () => {
      const tree = mountEditCommandCell({ isEditing: true });
      const commands = tree.find('.command-template');

      expect(commands.at(0).text()).toBe('Save');
      expect(commands.at(1).text()).toBe('Cancel');
    });

    it('should render custom command messages for "edit" & "delete" commands', () => {
      const tree = mountEditCommandCell({
        getMessage: () => 'Custom message',
      });
      const commands = tree.find('.command-template');

      expect(commands.at(0).text()).toBe('Custom message');
      expect(commands.at(1).text()).toBe('Custom message');
    });

    it('should render custom command messages for "save" & "cancel" commands', () => {
      const tree = mountEditCommandCell({
        isEditing: true,
        getMessage: () => 'Custom message',
      });
      const commands = tree.find('.command-template');

      expect(commands.at(0).text()).toBe('Custom message');
      expect(commands.at(1).text()).toBe('Custom message');
    });
  });
  describe('EditCommandHeadingCell', () => {
    const mountEditCommandHeadingCell = ({
      addRow = () => {},
      allowAdding = true,
      getMessage = () => {},
    }) => mount(
      <EditCommandHeadingCell
        addRow={addRow}
        commandTemplate={commandTemplate}
        allowAdding={allowAdding}
        getMessage={getMessage}
      />,
    );

    it('should render default command messages', () => {
      const tree = mountEditCommandHeadingCell({ });
      const command = tree.find('.command-template');

      expect(command.text()).toBe('New');
    });

    it('should render custom command messages', () => {
      const tree = mountEditCommandHeadingCell({
        getMessage: () => 'Custom message',
      });
      const command = tree.find('.command-template');

      expect(command.text()).toBe('Custom message');
    });
  });
});
