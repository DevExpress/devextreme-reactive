import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
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
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { scaleBand } from '@devexpress/dx-chart-core';
import { ArgumentScale, Stack, Animation } from '@devexpress/dx-react-chart';
import withStyles from '@mui/styles/withStyles';
import Typography from '@mui/material/Typography';

import { gaming as data } from '../../../demo-data/data-vizualization';

const rootContainerId = 'widget-container';
const iconButton = 'exportIconButton';
const ANIMATIONS = Symbol('animation');
const filter = node => (node.id !== iconButton);

const exportToImage = async (chart, format, exportFunc) => {
  try {
    const dataUrl = await exportFunc(chart, { filter });
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.download = `chart.${format}`;
    link.href = dataUrl;
    link.click();
    link.remove();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('oops, something went wrong!', err);
  }
};

const exportToJpeg = chart => exportToImage(chart, 'jpeg', domtoimage.toJpeg);

const exportToPng = chart => exportToImage(chart, 'png', domtoimage.toPng);

const exportToPdf = async (chart) => {
  const width = chart.offsetWidth;
  const height = chart.offsetHeight;
  try {
    const dataUrl = await domtoimage.toJpeg(chart, { filter });
    // @ts-ignore
    const doc = new JsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [width, height],
    });
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();
    doc.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    doc.save('chart');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('oops, something went wrong!', err);
  }
};

const print = async (chart) => {
  try {
    const dataUrl = await domtoimage.toJpeg(chart, { filter });
    let html = '<html><head><title></title></head>';
    html += '<body style="width: 100%; padding: 0; margin: 0;"';
    html += ' onload="window.focus(); window.print(); window.close()">';
    html += `<img src="${dataUrl}" /></body></html>`;

    const printWindow = window.open('', 'print');
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('oops, something went wrong!', err);
  }
};

const options = [
  { key: 'Print', action: print, text: 'Print' },
  { key: 'JPEG', action: exportToJpeg, text: 'Save as JPEG' },
  { key: 'PNG', action: exportToPng, text: 'Save as PNG' },
  { key: 'PDF', action: exportToPdf, text: 'Save as PDF' },
];

const styles = {
  button: {
    width: '50px',
    height: '50px',
  },
};

const ITEM_HEIGHT = 48;
const paperProps = {
  style: {
    maxHeight: ITEM_HEIGHT * 4.5,
    width: 150,
  },
};

const addKeyframe = (name, def) => {
  if (typeof document === 'undefined') {
    return;
  }
  const head = document.getElementsByTagName('head')[0];
  let style = Array.from(head.getElementsByTagName('style'))
    .find(node => node.dataset[ANIMATIONS]);
  if (!style) {
    style = document.createElement('style');
    style.type = 'text/css';
    style.dataset[ANIMATIONS] = true;
    head.appendChild(style);
  }
  const content = style.textContent;
  if (!content.includes(name)) {
    style.textContent += `\n@keyframes ${name} ${def}\n`;
  }
};

const getLabelAnimationName = () => {
  const name = 'animation_label_opacity';
  addKeyframe(name, '{ 0% { opacity: 0; } 99% { opacity: 0; } 100% { opacity: 1; } }');
  return name;
};

const ExportBase = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExport = ({ action }) => () => {
    const chart = document.querySelector(`#${rootContainerId}`);
    handleClose();
    action(chart);
  };

  const open = Boolean(anchorEl);
  const { classes } = props;
  return (
    <Plugin name="Export">
      <Template name="top">
        <TemplatePlaceholder />
        <IconButton
          id={iconButton}
          onClick={handleClick}
          className={classes.button}
          size="large"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={paperProps}
        >
          {options.map(option => (
            <MenuItem key={option.key} onClick={handleExport(option)}>
              {option.text}
            </MenuItem>
          ))}
        </Menu>
      </Template>
    </Plugin>
  );
};

const Export = withStyles(styles)(ExportBase);

const BarWithLabel = withStyles({
  label: {
    fill: '#ffffff',
    fontSize: '10px',
    animation: `${getLabelAnimationName()} 1s`,
  },
})(({ classes, value, ...restProps }) => (
  <React.Fragment>
    <BarSeries.Point {...restProps} />
    <Chart.Label
      x={restProps.arg}
      y={(restProps.val + restProps.startVal) / 2}
      dominantBaseline="middle"
      textAnchor="middle"
      className={classes.label}
    >
      {`${value}%`}
    </Chart.Label>
  </React.Fragment>
));
const LegendRoot = withStyles({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
})(({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
));

const LegendItemRoot = withStyles({
  item: {
    flexDirection: 'column',
    marginLeft: '-2px',
    marginRight: '-2px',
  },
})(({ classes, ...restProps }) => (
  <Legend.Item {...restProps} className={classes.item} />
));
const LegendLabelRoot = withStyles({
  label: {
    whiteSpace: 'nowrap',
  },
})(({ classes, ...restProps }) => (
  <Legend.Label {...restProps} className={classes.label} />
));
const Marker = (props) => {
  const { className, color } = props;
  return (
    <svg className={className} fill={color} width="16" height="16">
      <circle cx={8} cy={8} r={8} />
    </svg>
  );
};
const TitleText = withStyles({
  title: {
    textAlign: 'center',
    width: '100%',
    marginBottom: '10px',
  },
})((props) => {
  const { text, classes } = props;
  const [mainText, subText] = text.split('\n');
  return (
    <div className={classes.title}>
      <Typography component="h3" variant="h5">
        {mainText}
      </Typography>
      <Typography variant="subtitle1">{subText}</Typography>
    </div>
  );
});
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
      <Paper id={rootContainerId}>
        <Chart
          data={chartData}
        >
          <Title
            text={'Estimated global gaming software\n(revenue by platform, in 2018)'}
            textComponent={TitleText}
          />
          <Legend
            position="bottom"
            rootComponent={LegendRoot}
            itemComponent={LegendItemRoot}
            labelComponent={LegendLabelRoot}
            markerComponent={Marker}
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
