const tooltipCellRender = ({
    row: { data: { phone, birthDate } },
    value,
    columnIndex,
    rowIndex
  }) => {
    return (
      <div>
        <span id={`${columnIndex}_${rowIndex}`}>
          {value}
        </span>
        <Tooltip
          target={`#${columnIndex}_${rowIndex}`}
          showEvent="mouseenter"
          hideEvent="mouseleave"
          hideOnOutsideClick={false}
        >
          {`phone: ${phone}`}
          <br />
          {`birth date: ${birthDate}`}
        </Tooltip>
      </div>
    );
  };
  
  export default () => {
    return (
      <div>
        <DataGrid
          dataSource={rows}
        >
          <Column
            dataField={'firstName'}
            caption={'First Name'}
            cellRender={tooltipCellRender}
          />
          <Column
            dataField={'lastName'}
            caption={'Last Name'}
            cellRender={tooltipCellRender}
          />
          <Column
            dataField={'position'}
            caption={'Position'}
            cellRender={tooltipCellRender}
          />
          <Column
            dataField={'state'}
            caption={'State'}
            cellRender={tooltipCellRender}
          />
        </DataGrid>
      </div>
    );
};