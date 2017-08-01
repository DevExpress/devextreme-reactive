import React from 'react';
import { createMount } from 'material-ui/test-utils';
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
        <EditCommandHeadingCell
          allowAdding
          addCommandText="CustomAdd"
          commandTemplate={props => <CommandButton {...props} />}
        />,
      );

      const button = tree.find(CommandButton);
      expect(button.exists()).toBeTruthy();
      expect(button.text()).toBe('CustomAdd');
    });

    it('should take allowAdding into account', () => {
      const tree = mount(
        <EditCommandHeadingCell
          commandTemplate={props => <CommandButton {...props} />}
        />,
      );

      let button = tree.find(CommandButton);
      expect(button.exists()).toBeFalsy();

      tree.setProps({ allowAdding: true });
      button = tree.find(CommandButton);
      expect(button.exists()).toBeTruthy();
    });

    it('should use commandTemplate with proper arguments', () => {
      const template = jest.fn();
      const addRow = () => {};

      mount(
        <EditCommandHeadingCell
          addRow={addRow}
          allowAdding
          commandTemplate={template}
        />,
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
        <EditCommandCell
          allowEditing
          allowDeleting
          editCommandText="CustomEdit"
          deleteCommandText="CustomDelete"
          commandTemplate={props => <CommandButton {...props} />}
        />,
      );

      const buttons = tree.find(CommandButton);
      expect(buttons).toHaveLength(2);
      expect(buttons.at(0).text()).toBe('CustomEdit');
      expect(buttons.at(1).text()).toBe('CustomDelete');
    });

    it('should render without exceptions in edit mode', () => {
      const tree = mount(
        <EditCommandCell
          isEditing
          allowEditing
          allowDeleting
          commitCommandText="CustomCommit"
          cancelCommandText="CustomCancel"
          commandTemplate={props => <CommandButton {...props} />}
        />,
      );

      const buttons = tree.find(CommandButton);
      expect(buttons).toHaveLength(2);
      expect(buttons.at(0).text()).toBe('CustomCommit');
      expect(buttons.at(1).text()).toBe('CustomCancel');
    });

    it('should take allowEditing and allowDeleting into account', () => {
      const tree = mount(
        <EditCommandCell
          commandTemplate={props => <CommandButton {...props} />}
        />,
      );

      let buttons = tree.find(CommandButton);
      expect(buttons).toHaveLength(0);

      tree.setProps({ allowEditing: true });
      buttons = tree.find(CommandButton);
      expect(buttons).toHaveLength(1);

      tree.setProps({ allowDeleting: true });
      buttons = tree.find(CommandButton);
      expect(buttons).toHaveLength(2);
    });

    it('should use commandTemplate with proper arguments in view mode', () => {
      const template = jest.fn();
      const startEditing = () => {};
      const deleteRow = () => {};

      mount(
        <EditCommandCell
          startEditing={startEditing}
          deleteRow={deleteRow}
          allowEditing
          allowDeleting
          commandTemplate={template}
        />,
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
        <EditCommandCell
          isEditing
          commitChanges={commitChanges}
          cancelEditing={cancelEditing}
          allowAdding
          allowDeleting
          commandTemplate={template}
        />,
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

