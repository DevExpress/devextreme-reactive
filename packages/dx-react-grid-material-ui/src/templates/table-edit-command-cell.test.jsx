import React from 'react';

import { mountWithStyles, setupConsole } from '../utils/testing';
import {
  CommandButton,
  EditCommandHeadingCell,
  EditCommandCell,
} from './table-edit-command-cell';

describe('Table command column', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  afterAll(() => {
    resetConsole();
  });


  describe('EditCommandHeadingCell', () => {
    test('should render without exceptions in view mode', () => {
      const tree = mountWithStyles(
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

    test('should take allowAdding into account', () => {
      const tree = mountWithStyles(
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

    test('should use commandTemplate with proper arguments', () => {
      const template = jest.fn();
      const addRow = () => {};

      mountWithStyles(
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
    test('should render without exceptions in view mode', () => {
      const tree = mountWithStyles(
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

    test('should render without exceptions in edit mode', () => {
      const tree = mountWithStyles(
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

    test('should take allowEditing and allowDeleting into account', () => {
      const tree = mountWithStyles(
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

    test('should use commandTemplate with proper arguments in view mode', () => {
      const template = jest.fn();
      const startEditing = () => {};
      const deleteRow = () => {};

      mountWithStyles(
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

    test('should use commandTemplate with proper arguments in edit mode', () => {
      const template = jest.fn();
      const commitChanges = () => {};
      const cancelEditing = () => {};

      mountWithStyles(
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

