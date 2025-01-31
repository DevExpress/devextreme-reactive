export default () => {
    return (
      <React.Fragment>
        <Chart dataSource={chartData}>
          <ValueAxis
            name="oil"
          />
          <ValueAxis
            name="price"
            position="right"
          >
            <Label format="currency" />
          </ValueAxis>
          <CommonSeriesSettings
            argumentField="year"
            axis="oil"
            type="stackedbar"
          />
          <Title
            text="Oil production vs Oil price"
          />
          <Series
            name="USA"
            valueField="usa"
          />
          <Series
            name="Saudi Arabia"
            valueField="saudiArabia"
          />
          <Series
            name="Iran"
            valueField="iran"
          />
          <Series
            name="Mexico"
            valueField="mexico"
          />
          <Series
            name="Russia"
            valueField="russia"
          />
          <Series
            name="Oil Price"
            valueField="price"
            axis="price"
            type="line"
          />
        </Chart>
      </React.Fragment>
    );
}