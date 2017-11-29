import React from 'react';
import { createMount, createShallow, getClasses } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import {
  CommandButton,
  EditCommandHeadingCell,
  EditCommandCell,
} from './table-edit-command-cell';

describe('TablCommandColumn', () => {
  describe('EditCommandHeadingCell', () => {
    let resetConsole;
    let mount;
    let shallow;
    let classes;
    beforeAll(() => {
      resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
      mount = createMount({ context: { table: {} }, childContextTypes: { table: () => null } });
      shallow = createShallow({ dive: true });
      classes = getClasses((
        <EditCommandHeadingCell
          getMessage={key => key}
          commandTemplate={() => (<div />)}
        />
      ));
    });
    afterAll(() => {
      resetConsole();
      mount.cleanUp();
    });
    it('should render without exceptions in view mode', () => {
      const tree = mount((
        <EditCommandHeadingCell
          allowAdding
          getMessage={key => key}
          commandTemplate={props => <CommandButton {...props} />}
        />
      ));

      const button = tree.find(CommandButton);
      expect(button.exists()).toBeTruthy();
      expect(button.text()).toBe('addCommand');
    });

    it('should not render a command button if allowAdding is false', () => {
      const tree = mount((
        <EditCommandHeadingCell
          commandTemplate={props => <CommandButton {...props} />}
          getMessage={() => {}}
        />
      ));

      const button = tree.find(CommandButton);
      expect(button.exists()).toBeFalsy();
    });

    it('should render a command button if allowAdding is true', () => {
      const tree = mount((
        <EditCommandHeadingCell
          commandTemplate={props => <CommandButton {...props} />}
          allowAdding
          getMessage={key => key}
        />
      ));

      const button = tree.find(CommandButton);
      expect(button.exists()).toBeTruthy();
    });

    it('should use commandTemplate with proper arguments', () => {
      const template = jest.fn();
      const addRow = () => {};

      mount((
        <EditCommandHeadingCell
          addRow={addRow}
          allowAdding
          commandTemplate={template}
          getMessage={key => key}
        />
      ));

      expect(template.mock.calls).toHaveLength(1);
      expect(template.mock.calls[0][0]).toMatchObject({
        executeCommand: addRow,
        id: 'add',
        text: 'addCommand',
      });
    });

    it('should pass className to the root element', () => {
      const tree = shallow((
        <EditCommandHeadingCell
          addRow={() => {}}
          commandTemplate={() => (<div />)}
          allowAdding
          getMessage={key => key}
          className="custom-class"
        />
      ));

      expect(tree.is(`.${classes.headingCell}`))
        .toBeTruthy();
      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <EditCommandHeadingCell
          addRow={() => {}}
          commandTemplate={() => (<div />)}
          allowAdding
          getMessage={key => key}
          data={{ a: 1 }}
        />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });

  describe('EditCommandCell', () => {
    let resetConsole;
    let mount;
    let shallow;
    let classes;
    beforeAll(() => {
      resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
      mount = createMount({ context: { table: {} }, childContextTypes: { table: () => null } });
      shallow = createShallow({ dive: true });
      classes = getClasses((
        <EditCommandCell
          getMessage={key => key}
          commandTemplate={() => (<div />)}
        />
      ));
    });
    afterAll(() => {
      resetConsole();
      mount.cleanUp();
    });

    it('should render without exceptions in view mode', () => {
      const tree = mount((
        <EditCommandCell
          allowEditing
          allowDeleting
          commandTemplate={props => <CommandButton {...props} />}
          getMessage={key => key}
        />
      ));

      const buttons = tree.find(CommandButton);
      expect(buttons).toHaveLength(2);
      expect(buttons.at(0).text()).toBe('editCommand');
      expect(buttons.at(1).text()).toBe('deleteCommand');
    });

    it('should render without exceptions in edit mode', () => {
      const tree = mount((
        <EditCommandCell
          isEditing
          allowEditing
          allowDeleting
          commandTemplate={props => <CommandButton {...props} />}
          getMessage={key => key}
        />
      ));

      const buttons = tree.find(CommandButton);
      expect(buttons).toHaveLength(2);
      expect(buttons.at(0).text()).toBe('commitCommand');
      expect(buttons.at(1).text()).toBe('cancelCommand');
    });

    it('should not render command buttons if allowEditing and allowDeleting are false', () => {
      const tree = mount((
        <EditCommandCell
          commandTemplate={props => <CommandButton {...props} />}
          getMessage={() => {}}
        />
      ));

      const buttons = tree.find(CommandButton);
      expect(buttons).toHaveLength(0);
    });

    it('should render a command button if allowEditing is true', () => {
      const tree = mount((
        <EditCommandCell
          commandTemplate={props => <CommandButton {...props} />}
          allowEditing
          getMessage={key => key}
        />
      ));

      const button = tree.find(CommandButton);
      expect(button.exists()).toBeTruthy();
    });

    it('should render a command button if allowDeleting is true', () => {
      const tree = mount((
        <EditCommandCell
          commandTemplate={props => <CommandButton {...props} />}
          allowDeleting
          getMessage={key => key}
        />
      ));

      const button = tree.find(CommandButton);
      expect(button.exists()).toBeTruthy();
    });

    it('should use commandTemplate with proper arguments in view mode', () => {
      const template = jest.fn();
      const startEditing = () => {};
      const deleteRow = () => {};

      mount((
        <EditCommandCell
          startEditing={startEditing}
          deleteRow={deleteRow}
          allowEditing
          allowDeleting
          commandTemplate={template}
          getMessage={key => key}
        />
      ));

      expect(template.mock.calls).toHaveLength(2);
      expect(template.mock.calls[0][0]).toMatchObject({
        executeCommand: startEditing,
        id: 'edit',
        text: 'editCommand',
      });
      expect(template.mock.calls[1][0]).toMatchObject({
        executeCommand: deleteRow,
        id: 'delete',
        text: 'deleteCommand',
      });
    });

    it('should use commandTemplate with proper arguments in edit mode', () => {
      const template = jest.fn();
      const commitChanges = () => {};
      const cancelEditing = () => {};

      mount((
        <EditCommandCell
          isEditing
          commitChanges={commitChanges}
          cancelEditing={cancelEditing}
          allowDeleting
          commandTemplate={template}
          getMessage={key => key}
        />
      ));

      expect(template.mock.calls).toHaveLength(2);
      expect(template.mock.calls[0][0]).toMatchObject({
        executeCommand: commitChanges,
        id: 'commit',
        text: 'commitCommand',
      });
      expect(template.mock.calls[1][0]).toMatchObject({
        executeCommand: cancelEditing,
        id: 'cancel',
        text: 'cancelCommand',
      });
    });

    it('should pass className to the root element', () => {
      const tree = shallow((
        <EditCommandCell
          getMessage={key => key}
          commandTemplate={() => (<div />)}
          className="custom-class"
        />
      ));

      expect(tree.is(`.${classes.cell}`))
        .toBeTruthy();
      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <EditCommandCell
          getMessage={key => key}
          commandTemplate={() => (<div />)}
          data={{ a: 1 }}
        />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });

  describe('CommandButton', () => {
    let shallow;
    let classes;
    beforeAll(() => {
      shallow = createShallow({ dive: true });
      classes = getClasses((
        <CommandButton
          executeCommand={() => {}}
          text=""
        />
      ));
    });

    it('should pass the className prop to the root element', () => {
      const tree = shallow((
        <CommandButton
          executeCommand={() => {}}
          text=""
          className="custom-class"
        />
      ));

      expect(tree.is(`.${classes.button}`))
        .toBeTruthy();
      expect(tree.is('.custom-class'))
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
