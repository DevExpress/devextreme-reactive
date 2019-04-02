import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  Legend,
  BarSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Plugin, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';
import domtoimage from 'dom-to-image';
import JsPDF from 'jspdf';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { scaleBand } from '@devexpress/dx-chart-core';
import { ArgumentScale, Stack, Animation } from '@devexpress/dx-react-chart';

import { gaming as data } from '../../../demo-data/data-vizualization';

const options = [
  'Print',
  'PNG',
  'JPEG',
  'PDF',
];

const ITEM_HEIGHT = 48;

const Export = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExport = option => () => {
    const filter = node => (node.id !== 'iconButton');
    const chart = document.body.childNodes[4];
    const width = chart.offsetWidth;
    const height = chart.offsetHeight;
    switch (option) {
      case 'JPEG':
        domtoimage.toJpeg(chart, { filter })
          .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = 'chart.jpeg';
            link.href = dataUrl;
            link.click();
          });
        break;
      case 'PNG':
        domtoimage.toPng(chart, { filter })
          .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = 'chart.png';
            link.href = dataUrl;
            link.click();
          });
        break;
      case 'PDF':
        domtoimage.toJpeg(chart, { filter })
          .then((dataUrl) => {
            const doc = new JsPDF({
              orientation: 'landscape',
              unit: 'px',
              format: [width, height],
            });
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = doc.internal.pageSize.getHeight();
            doc.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            doc.save('chart');
          });
        break;
      default:
        domtoimage.toJpeg(chart, { filter })
          .then((dataUrl) => {
            let html = '<html><head><title></title></head>';
            html += '<body style="width: 100%; padding: 0; margin: 0;"';
            html += ' onload="window.focus(); window.print(); window.close()">';
            html += `<img src="${dataUrl}" /></body></html>`;

            const printWindow = window.open('', 'print');
            printWindow.document.open();
            printWindow.document.write(html);
            printWindow.document.close();
          });
    }
    handleClose();
  };
  const open = Boolean(anchorEl);
  return (
    <Plugin name="Export">
      <Template name="top">
        <TemplatePlaceholder />
        <IconButton
          id="iconButton"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 150,
            },
          }}
        >
          {options.map(option => (
            <MenuItem key={option} onClick={handleExport(option)}>
              {option === 'Print' ? option : `Save as ${option}`}
            </MenuItem>
          ))}
        </Menu>
      </Template>
    </Plugin>
  );
};

const BarWithLabel = ({
  value, ...restProps
}) => (
  <React.Fragment>
    <BarSeries.Point {...restProps} />
    <Chart.Label
      x={restProps.x}
      y={(restProps.y + restProps.y1) / 2}
      dominantBaseline="middle"
      textAnchor="middle"
      style={{ fill: '#ffffff' }}
    >
      {`${value}%`}
    </Chart.Label>
  </React.Fragment>
);

const legendRootStyle = {
  display: 'flex',
  margin: 'auto',
  flexDirection: 'row',
};
const LegendRoot = props => (
  <Legend.Root {...props} style={legendRootStyle} />
);

const legendItemStyle = {
  flexDirection: 'column',
  marginLeft: '-2px',
  marginRight: '-2px',
};
const LegendItem = props => (
  <Legend.Item {...props} style={legendItemStyle} />
);

const legendLabelStyle = {
  whiteSpace: 'nowrap',
};
const LegendLabel = props => (
  <Legend.Label {...props} style={legendLabelStyle} />
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <Title text="Estimated global gaming software revenue by platform in 2018" />
          <Legend
            position="bottom"
            rootComponent={LegendRoot}
            itemComponent={LegendItem}
            labelComponent={LegendLabel}
          />
          <ArgumentScale factory={scaleBand} />
          <ArgumentAxis />
          <ValueAxis showLabels={false} />

          <BarSeries
            name="Mobile Games"
            valueField="mobile"
            argumentField="year"
            pointComponent={BarWithLabel}
          />
          <BarSeries
            name="PC Games"
            valueField="pc"
            argumentField="year"
            pointComponent={BarWithLabel}
          />
          <BarSeries
            name="Console Games"
            valueField="console"
            argumentField="year"
            pointComponent={BarWithLabel}
          />
          <Stack />
          <Animation />
          <Export />
        </Chart>
      </Paper>
    );
  }
}
