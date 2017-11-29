import React from 'react';
import { shallow } from 'enzyme';
import { EditCommandHeadingCell, EditCommandCell, CommandButton } from './table-edit-command-cell';

describe('EditCommandCells', () => {
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
      getMessage = key => key,
    }) => shallow((
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
      const tree = mountEditCommandCell({});
      const commands = tree.find('.command-template');

      expect(commands.at(0).text()).toBe('editCommand');
      expect(commands.at(1).text()).toBe('deleteCommand');
    });

    it('should render custom command messages for "save" & "cancel" commands', () => {
      const tree = mountEditCommandCell({
        isEditing: true,
      });
      const commands = tree.find('.command-template');

      expect(commands.at(0).text()).toBe('commitCommand');
      expect(commands.at(1).text()).toBe('cancelCommand');
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <EditCommandCell
          startEditing={() => {}}
          deleteRow={() => {}}
          cancelEditing={() => {}}
          commitChanges={() => {}}
          allowEditing
          allowDeleting
          isEditing={false}
          commandTemplate={() => (<div />)}
          getMessage={key => key}
          className="custom-class"
        />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });
  });

  describe('EditCommandHeadingCell', () => {
    const mountEditCommandHeadingCell = ({
      addRow = () => {},
      allowAdding = true,
      getMessage = key => key,
    }) => shallow((
      <EditCommandHeadingCell
        addRow={addRow}
        commandTemplate={commandTemplate}
        allowAdding={allowAdding}
        getMessage={getMessage}
      />
    ));

    it('should render command messages', () => {
      const tree = mountEditCommandHeadingCell({});
      const command = tree.find('.command-template');

      expect(command.text()).toBe('addCommand');
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <EditCommandHeadingCell
          addRow={() => {}}
          commandTemplate={() => (<div />)}
          allowAdding
          getMessage={key => key}
          className="custom-class"
        />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });
  });

  describe('CommandButton', () => {
    it('should pass the className prop to the root element', () => {
      const tree = shallow((
        <CommandButton
          executeCommand={() => {}}
          text=""
          className="custom-class"
        />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is('.btn'))
        .toBeTruthy();
      expect(tree.is('.btn-link'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <CommandButton
          executeCommand={() => {}}
          text=""
          data={{ a: 1 }}
        />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
