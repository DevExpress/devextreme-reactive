import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import {
  Getter,
  Template,
  TemplatePlaceholder,
  PluginHost,
} from '@devexpress/dx-react-core';
import {
  tableColumnsWithEditing,
  isHeaderEditCommandsTableCell,
  isDataEditCommandsTableCell,
  isEditNewRowCommandsTableCell,
  isEditExistingRowCommandsTableCell,
} from '@devexpress/dx-grid-core';
import { TableEditColumn } from './table-edit-column';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithEditing: jest.fn(),
  isHeaderEditCommandsTableCell: jest.fn(),
  isDataEditCommandsTableCell: jest.fn(),
  isEditNewRowCommandsTableCell: jest.fn(),
  isEditExistingRowCommandsTableCell: jest.fn(),
}));

const defaultPluginProps = {
  cellTemplate: () => null,
  headingCellTemplate: () => null,
  commandTemplate: () => null,
};

describe('TableHeaderRow', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    tableColumnsWithEditing.mockImplementation(() => 'tableColumnsWithEditing');
    isHeaderEditCommandsTableCell.mockImplementation(() => false);
    isDataEditCommandsTableCell.mockImplementation(() => false);
    isEditNewRowCommandsTableCell.mockImplementation(() => false);
    isEditExistingRowCommandsTableCell.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should extend tableColumns', () => {
      let tableColumns = null;
      mount(
        <PluginHost>
          <Getter name="tableColumns" value="tableColumns" />
          <TableEditColumn
            {...defaultPluginProps}
            width={120}
          />
          <Template
            name="root"
            connectGetters={getter => (tableColumns = getter('tableColumns'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(tableColumnsWithEditing)
        .toBeCalledWith('tableColumns', 120);
      expect(tableColumns)
        .toBe('tableColumnsWithEditing');
    });
  });

  it('should render edit commands cell on edit-commands column and header row intersection', () => {
    isHeaderEditCommandsTableCell.mockImplementation(() => true);

    const headingCellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        <Template name="root">
          <TemplatePlaceholder
            name="tableViewCell"
            params={{ row: { original: 'row' }, column: { original: 'column' }, style: {} }}
          />
        </Template>
        <TableEditColumn
          {...defaultPluginProps}
          headingCellTemplate={headingCellTemplate}
        />
      </PluginHost>,
    );

    expect(isHeaderEditCommandsTableCell)
      .toBeCalledWith({ original: 'row' }, { original: 'column' });
    expect(headingCellTemplate)
      .not.toBeCalledWith(expect.objectContaining({
        row: 'row',
        column: 'column',
      }));
    expect(headingCellTemplate)
      .toBeCalledWith(expect.objectContaining({
        style: {},
      }));
  });

  it('should render edit commands cell on edit-commands column and user-defined row intersection', () => {
    isDataEditCommandsTableCell.mockImplementation(() => true);

    const cellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        <Template name="root">
          <TemplatePlaceholder
            name="tableViewCell"
            params={{ row: { original: 'row' }, column: { original: 'column' }, style: {} }}
          />
        </Template>
        <TableEditColumn
          {...defaultPluginProps}
          cellTemplate={cellTemplate}
        />
      </PluginHost>,
    );

    expect(isHeaderEditCommandsTableCell)
      .toBeCalledWith({ original: 'row' }, { original: 'column' });
    expect(cellTemplate)
      .not.toBeCalledWith(expect.objectContaining({
        column: 'column',
      }));
    expect(cellTemplate)
      .toBeCalledWith(expect.objectContaining({
        row: 'row',
        style: {},
        isEditing: false,
      }));
  });

  it('should render edit commands cell on edit-commands column and added row intersection', () => {
    isEditNewRowCommandsTableCell.mockImplementation(() => true);

    const cellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        <Template name="root">
          <TemplatePlaceholder
            name="tableViewCell"
            params={{ row: { original: 'row' }, column: { original: 'column' }, style: {} }}
          />
        </Template>
        <TableEditColumn
          {...defaultPluginProps}
          cellTemplate={cellTemplate}
        />
      </PluginHost>,
    );

    expect(isEditNewRowCommandsTableCell)
      .toBeCalledWith({ original: 'row' }, { original: 'column' });
    expect(cellTemplate)
      .not.toBeCalledWith(expect.objectContaining({
        column: 'column',
      }));
    expect(cellTemplate)
      .toBeCalledWith(expect.objectContaining({
        row: 'row',
        style: {},
        isEditing: true,
      }));
  });

  it('should render edit commands cell on edit-commands column and editing row intersection', () => {
    isEditExistingRowCommandsTableCell.mockImplementation(() => true);

    const cellTemplate = jest.fn(() => null);

    mount(
      <PluginHost>
        <Template name="root">
          <TemplatePlaceholder
            name="tableViewCell"
            params={{ row: { original: 'row' }, column: { original: 'column' }, style: {} }}
          />
        </Template>
        <TableEditColumn
          {...defaultPluginProps}
          cellTemplate={cellTemplate}
        />
      </PluginHost>,
    );

    expect(isEditExistingRowCommandsTableCell)
      .toBeCalledWith({ original: 'row' }, { original: 'column' });
    expect(cellTemplate)
      .not.toBeCalledWith(expect.objectContaining({
        column: 'column',
      }));
    expect(cellTemplate)
      .toBeCalledWith(expect.objectContaining({
        row: 'row',
        style: {},
        isEditing: true,
      }));
  });
});
