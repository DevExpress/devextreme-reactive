import React from 'react';
import { Card } from 'reactstrap';
import {
    Chart,
    BarSeries,
    ArgumentAxis,
    ValueAxis,
    Title,
    Legend,
} from '@devexpress/dx-react-chart-bootstrap4';
import { SeriesFamily } from '@devexpress/dx-react-chart';
import { olympicsData as baseData } from '../../../demo-data/data-olympics';

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default class Demo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            season: 'summer',
            data: this.getData(baseData, 'summer'),
        };
    }

    getOlympicData(chartData, currentType) {
        return { year: chartData.year, summUSA: chartData[currentType].usa.summ, summUSSR: chartData[currentType].ussr.summ }
    }

    getData(data, currentType) {
        const newData = [];
        data.forEach((item) => {
            if (!!item[currentType]) {
                const year = this.getOlympicData(item, currentType);
                newData.push(year);
            }
        });
        return newData
    }
    chooseSeason(event) {
        this.setState({
            data: this.getData(baseData, event.target.value),
            season: event.target.value,
        });
    }


    render() {
        const { data } = this.state;
        return (
            <Card>

                <select class="custom-select" id="inputGroupSelect01"
                    onChange={event => this.chooseSeason(event)}>
                    <option value="summer">Summer</option >
                    <option value="winter">Winter</option >
                </select>


                <Chart data={data}>
                    <ArgumentAxis
                        type="band"
                        name="year"
                    />
                    <ValueAxis />
                    <BarSeries
                        valueField='summUSA'
                        argumentField='year'
                        name="USA"
                    />
                    <BarSeries
                        valueField='summUSSR'
                        argumentField='year'
                        name="USSR"
                    />
                    <SeriesFamily />
                    <Legend
                        position="bottom"
                    />
                    <Title
                        text={`${capitalizeFirstLetter(this.state.season)} Olympic Games`}
                        position='bottom'
                        textComponent={({ text }) => <h1 style={{ margin: '0 auto' }}>{text}</h1>}
                    />
                </Chart>
            </Card>
        );
    }
}


