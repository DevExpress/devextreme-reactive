export const paletteCollection = ['Material', 'Soft Pastel', 'Harmony Light', 'Pastel', 'Bright', 'Soft', 'Ocean', 'Office', 'Vintage', 'Violet', 'Carmine', 'Dark Moon', 'Soft Blue', 'Dark Violet', 'Green Mist'];

export default () => {
  const [paletteName, setPaletteName] = useState('Material');

  const changeScheme = useCallback(e => {
    setPaletteName(paletteCollection[e.target.value]);
  }, []);

  return (
    <React.Fragment>
      <PieChart
        dataSource={chartData}
        palette={paletteName}
      >
        <Series
          valueField="val"
          argumentField="category"
        />
      </PieChart>
      <div className="d-flex justify-content-center mt-3">
        {getPalette(palette).simpleSet.map((color) => <div key={color} style={{ width: '40px', height: '40px', backgroundColor: color }} />)}
      </div>
      <div className="pb-5 pl-5 w-200" style={{ width: '200px' }}>
        <h5>Scheme</h5>
        <select className="custom-select" onChange={changeScheme}>
          {
            paletteCollection.map((palleteName, idx) => <option defaultValue={idx ? false : true} value={idx}>{palleteName}</option>)
          }
        </select>
      </div>
    </React.Fragment>
  );
}