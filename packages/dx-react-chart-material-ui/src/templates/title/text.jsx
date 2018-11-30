import * as React from 'react';
import * as PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export class Text extends React.PureComponent {
  render() {
    const { text, ...restProps } = this.props;
    return (
      <Typography component="h3" variant="h5" {...restProps}>
        {text}
      </Typography>
    );
  }
}

Text.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
