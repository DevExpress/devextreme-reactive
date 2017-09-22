import React from 'react';
import PropTypes from 'prop-types';
import { PluginHost } from '@devexpress/dx-react-core';
import { GridCore } from './plugins/grid-core';

export class Grid extends React.PureComponent {
  render() {
    const {
      rows,
      columns,
      getRowId,
      getCellData,
      rootTemplate,
      headerPlaceholderTemplate,
      footerPlaceholderTemplate,
      children,
    } = this.props;

    return (
      <PluginHost>
        <GridCore
          rows={rows}
          columns={columns}
          getRowId={getRowId}
          getCellData={getCellData}
          rootTemplate={rootTemplate}
          headerPlaceholderTemplate={headerPlaceholderTemplate}
          footerPlaceholderTemplate={footerPlaceholderTemplate}
        />
        {children}
      </PluginHost>
    );
  }
}

Grid.propTypes = {
  rows: PropTypes.array.isRequired,
  getRowId: PropTypes.func,
  getCellData: PropTypes.func,
  columns: PropTypes.array.isRequired,
  rootTemplate: PropTypes.func.isRequired,
  headerPlaceholderTemplate: PropTypes.func,
  footerPlaceholderTemplate: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Grid.defaultProps = {
  getRowId: null,
  getCellData: null,
  headerPlaceholderTemplate: null,
  footerPlaceholderTemplate: null,
  children: null,
};
