import React from 'react';
import { createMount } from 'material-ui/test-utils';
import { Table } from 'material-ui';
import { setupConsole } from '@devexpress/dx-testing';
import {
  CommandButton,
  EditCommandHeadingCell,
  EditCommandCell,
} from './table-edit-command-cell';

describe('Table command column', () => {
  let resetConsole;
  let mount;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
    mount = createMount();
  });
  afterAll(() => {
    resetConsole();
    mount.cleanUp();
  });


  describe('EditCommandHeadingCell', () => {
    it('should render without exceptions in view mode', () => {
      const tree = mount(
        <Table>
          <EditCommandHeadingCell
            allowAdding
            addCommandText="CustomAdd"
            commandTemplate={props => <CommandButton {...props} />}
          />
        </Table>,
      );

      const button = tree.find(CommandButton);
      expect(button.exists()).toBeTruthy();
      expect(button.text()).toBe('CustomAdd');
    });

    it('should not render a command button if allowAdding is false', () => {
      const tree = mount(
        <Table>
          <EditCommandHeadingCell
            commandTemplate={props => <CommandButton {...props} />}
          />
        </Table>,
      );

      const button = tree.find(CommandButton);
      expect(button.exists()).toBeFalsy();
    });

    it('should render a command button if allowAdding is true', () => {
      const tree = mount(
        <Table>
          <EditCommandHeadingCell
            commandTemplate={props => <CommandButton {...props} />}
            allowAdding
          />
        </Table>,
      );

      const button = tree.find(CommandButton);
      expect(button.exists()).toBeTruthy();
    });

    it('should use commandTemplate with proper arguments', () => {
      const template = jest.fn();
      const addRow = () => {};

      mount(
        <Table>
          <EditCommandHeadingCell
            addRow={addRow}
            allowAdding
            commandTemplate={template}
          />
        </Table>,
      );

      expect(template.mock.calls).toHaveLength(1);
      expect(template.mock.calls[0][0]).toMatchObject({
        executeCommand: addRow,
        id: 'add',
        text: 'New',
      });
    });
  });

  describe('EditCommandCell', () => {
    it('should render without exceptions in view mode', () => {
      const tree = mount(
        <Table>
          <EditCommandCell
            allowEditing
            allowDeleting
            editCommandText="CustomEdit"
            deleteCommandText="CustomDelete"
            commandTemplate={props => <CommandButton {...props} />}
          />
        </Table>,
      );

      const buttons = tree.find(CommandButton);
      expect(buttons).toHaveLength(2);
      expect(buttons.at(0).text()).toBe('CustomEdit');
      expect(buttons.at(1).text()).toBe('CustomDelete');
    });

    it('should render without exceptions in edit mode', () => {
      const tree = mount(
        <Table>
          <EditCommandCell
            isEditing
            allowEditing
            allowDeleting
            commitCommandText="CustomCommit"
            cancelCommandText="CustomCancel"
            commandTemplate={props => <CommandButton {...props} />}
          />
        </Table>,
      );

      const buttons = tree.find(CommandButton);
      expect(buttons).toHaveLength(2);
      expect(buttons.at(0).text()).toBe('CustomCommit');
      expect(buttons.at(1).text()).toBe('CustomCancel');
    });

    it('should not render command buttons if allowEditing and allowDeleting are false', () => {
      const tree = mount(
        <Table>
          <EditCommandCell
            commandTemplate={props => <CommandButton {...props} />}
          />
        </Table>,
      );

      const buttons = tree.find(CommandButton);
      expect(buttons).toHaveLength(0);
    });

    it('should render a command button if allowEditing is true', () => {
      const tree = mount(
        <Table>
          <EditCommandCell
            commandTemplate={props => <CommandButton {...props} />}
            allowEditing
          />
        </Table>,
      );

      const button = tree.find(CommandButton);
      expect(button.exists()).toBeTruthy();
    });

    it('should render a command button if allowDeleting is true', () => {
      const tree = mount(
        <Table>
          <EditCommandCell
            commandTemplate={props => <CommandButton {...props} />}
            allowDeleting
          />
        </Table>,
      );

      const button = tree.find(CommandButton);
      expect(button.exists()).toBeTruthy();
    });

    it('should use commandTemplate with proper arguments in view mode', () => {
      const template = jest.fn();
      const startEditing = () => {};
      const deleteRow = () => {};

      mount(
        <Table>
          <EditCommandCell
            startEditing={startEditing}
            deleteRow={deleteRow}
            allowEditing
            allowDeleting
            commandTemplate={template}
          />
        </Table>,
      );

      expect(template.mock.calls).toHaveLength(2);
      expect(template.mock.calls[0][0]).toMatchObject({
        executeCommand: startEditing,
        id: 'edit',
        text: 'Edit',
      });
      expect(template.mock.calls[1][0]).toMatchObject({
        executeCommand: deleteRow,
        id: 'delete',
        text: 'Delete',
      });
    });

    it('should use commandTemplate with proper arguments in edit mode', () => {
      const template = jest.fn();
      const commitChanges = () => {};
      const cancelEditing = () => {};

      mount(
        <Table>
          <EditCommandCell
            isEditing
            commitChanges={commitChanges}
            cancelEditing={cancelEditing}
            allowAdding
            allowDeleting
            commandTemplate={template}
          />
        </Table>,
      );

      expect(template.mock.calls).toHaveLength(2);
      expect(template.mock.calls[0][0]).toMatchObject({
        executeCommand: commitChanges,
        id: 'commit',
        text: 'Save',
      });
      expect(template.mock.calls[1][0]).toMatchObject({
        executeCommand: cancelEditing,
        id: 'cancel',
        text: 'Cancel',
      });
    });
  });
});
