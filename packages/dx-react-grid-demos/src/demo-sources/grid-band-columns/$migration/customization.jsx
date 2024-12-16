const BandCell = ({ data: { column } }) => {
  let icon = 0;
  if (column.title === 'Population') icon = 'person';
  if (column.title === 'Nominal GDP') icon = 'bar-chart';
  if (column.title === 'By Sector') icon = 'globe';

  return (
    <div
      className="text-secondary"
    >
      {column.title}
      <span
        className={`ml-2 oi oi-${icon}`}
      />
    </div>
  );
};

const HeaderCell = ({ data: { column } }) => (
  <div className='text-info'>
    {column.title}
  </div>
);

export default () => {
  return (
    <div>
      <DataGrid
        dataSource={rows}
      >
        <Column
          dataField={'country'}
          caption={'Country'}
          headerCellComponent={HeaderCell}
        />
        <Column
          dataField={'area'}
          caption={'Area, sq. km.'}
          width={125}
          alignment='right'
          headerCellComponent={HeaderCell}
        />
        <Column
          caption={'Population'}
          headerCellComponent={BandCell}
        >
          <Column
            dataField={'Population_Total'}
            caption={'Total'}
            width={110}
            alignment='right'
            headerCellComponent={HeaderCell}
          />
          <Column
            dataField={'Population_Urban'}
            caption={'Urban'}
            width={75}
            alignment='right'
            format={'#0.##\'%\''}
            headerCellComponent={HeaderCell}
          />
        </Column>
        <Column
          caption={'Nominal GDP'}
          headerCellComponent={BandCell}
        >
          <Column
            dataField={'GDP_Total'}
            caption={'Total, mln $'}
            width={115}
            alignment='right'
            headerCellComponent={HeaderCell}
          />
          <Column
            caption={'By Sector'}
            headerCellComponent={BandCell}
          >
            <Column
              dataField={'GDP_Agriculture'}
              caption={'Agriculture'}
              width={110}
              alignment='right'
              format={'#0.##\'%\''}
              headerCellComponent={HeaderCell}
            />
            <Column
              dataField={'GDP_Industry'}
              caption={'Industry'}
              width={90}
              alignment='right'
              format={'#0.##\'%\''}
              headerCellComponent={HeaderCell}
            />
            <Column
              dataField={'GDP_Services'}
              caption={'Services'}
              width={90}
              alignment='right'
              format={'#0.##\'%\''}
              headerCellComponent={HeaderCell}
            />
          </Column>
        </Column>
      </DataGrid>
    </div>
  );
};
