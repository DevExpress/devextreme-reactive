import React from 'react';
import { Card, Jumbotron, Container, Button, ButtonGroup } from 'reactstrap';
import {
    Chart,
    BarSeries,
    ArgumentAxis,
    ValueAxis,
    Title,
    Legend,
    Grid
} from '@devexpress/dx-react-chart-bootstrap4';
import { Stack } from '@devexpress/dx-react-chart';
import { olympicsData as baseData } from '../../../demo-data/data-olympics';


const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default class Demo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            season: 'summer',
            credit: 'summ',
            data: this.getData(baseData, 'summer', 'summ'),
            rSelected: 'summer',
            dSelected: 'summ',
        };
    }

    getOlympicData(chartData, currentType, currentCredit) {
        return { year: chartData.year, summUSA: chartData[currentType].usa[currentCredit], summUSSR: chartData[currentType].ussr[currentCredit] }
    }

    getData(data, currentType, currentCredit) {
        const newData = [];
        data.forEach((item) => {
            if (!!item[currentType]) {
                const year = this.getOlympicData(item, currentType, currentCredit);
                newData.push(year);
            }
        });
        return newData
    }
    chooseSeason(event) {
        this.setState({
            data: this.getData(baseData, event.target.value, this.state.credit),
            season: event.target.value,
            rSelected: event.target.value
        });
    }
    chooseCredit(event) {
        this.setState({
            data: this.getData(baseData, this.state.season, event.target.value),
            credit: event.target.value,
            dSelected: event.target.value
        });
    }


    render() {
        const { data } = this.state;
        return (
            <div>

                <Card>
                    <Chart data={data}>
                        <ArgumentAxis
                            type="band"
                            name="year"
                            tickComponent={() => null}
                        />
                        <ValueAxis
                            tickComponent={() => null}
                            lineComponent={() => null} />
                        <Grid strokeDasharray="10 5"/>
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
                        <Stack />
                        <Legend />
                        <Title
                            text={`${capitalizeFirstLetter(this.state.season)} Olympic Games (${capitalizeFirstLetter(this.state.credit)})`}
                            position='top'
                            textComponent={({ text }) => <h1 style={{ margin: '10px auto' }}>{text}</h1>}
                        />
                        <Grid strokeDasharray="10 5" />

                    </Chart>

                </Card>
                <div style={{ marginTop: '20px' }}>
                    <Jumbotron style={{ padding: '1rem 2rem' }}>
                        <h3>Choose the season of the Olympic Games</h3>
                        <Button style={{ marginRight: '5px' }} color="secondary" value='summer' onClick={(event) => this.chooseSeason(event)} active={this.state.rSelected === 'summer'}>Summer</Button>{' '}
                        <Button color="secondary" value='winter' onClick={(event) => this.chooseSeason(event)} active={this.state.rSelected === 'winter'}>Winter</Button>{' '}
                        <h3>Choose the type of medal credit</h3>
                        <Button style={{ marginRight: '5px' }} color="secondary" value='summ' onClick={(event) => this.chooseCredit(event)} active={this.state.dSelected === 'summ'}>Summ</Button>{' '}
                        <Button style={{ marginRight: '5px' }} color="secondary" value='gold' onClick={(event) => this.chooseCredit(event)} active={this.state.dSelected === 'gold'}>Gold</Button>{' '}
                        <Button style={{ marginRight: '5px' }} color="secondary" value='silver' onClick={(event) => this.chooseCredit(event)} active={this.state.dSelected === 'silver'}>Silver</Button>{' '}
                        <Button color="secondary" value='bronze' onClick={(event) => this.chooseCredit(event)} active={this.state.dSelected === 'bronze'}>Bronze</Button>{' '}
                    </Jumbotron>
                </div>
            </div>
        );
    }
}
