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
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { gaming as data } from '../../../demo-data/data-vizualization';

const options = [
  'Print',
  'PNG',
  'JPEG',
  'PDF',
];

const styles = {
  button: {
    width: '50px',
    height: '50px',
  },
};

const ITEM_HEIGHT = 48;
const iconButton = 'exportIconButton';
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
    .find(node => node.dataset[Symbol('animation')]);
  if (!style) {
    style = document.createElement('style');
    style.type = 'text/css';
    style.dataset[Symbol('animation')] = true;
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

  const handleExport = option => () => {
    const filter = node => (node.id !== iconButton);
    const chart = document.body.childNodes[4];
    const width = chart.offsetWidth;
    const height = chart.offsetHeight;
    handleClose();
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
            <MenuItem key={option} onClick={handleExport(option)}>
              {option === 'Print' ? option : `Save as ${option}`}
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
      x={restProps.x}
      y={(restProps.y + restProps.y1) / 2}
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
      <Paper>
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
