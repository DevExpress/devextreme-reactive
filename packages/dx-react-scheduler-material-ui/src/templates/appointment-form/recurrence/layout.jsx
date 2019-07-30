import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    overflowY: 'auto',
    paddingTop: theme.spacing(3),
    paddingBottom: 0,
  },
});

class LayoutBase extends React.PureComponent {
  render() {
    const {
      recurrenceSwitcherComponent: RecurenceSwitcher,
      radioGroupEditorComponent: RadioGroupEditor,
      labelComponent: Label,
      children,
      classes,
      className,
      recurrenceEditing,
      onRRuleChange,
      rRule,
      style,
      getMessage,
      ...restProps
    } = this.props;
    const layoutStyle = recurrenceEditing === 'Never' ? {
      width: 0,
    } : {
      width: '50%',
    };

    return (
      <div
        className={classNames(classes.root, className)}
        style={{ ...layoutStyle, ...style }}
        {...restProps}
      >
        <Label
          label={getMessage('repeatLabel')}
        />
        <RecurenceSwitcher />
        <Label
          label={getMessage('endRepeatLabel')}
        />

        <RadioGroupEditor />

      </div>
    );
  }
}

LayoutBase.propTypes = {
  recurrenceSwitcherComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  radioGroupEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  recurrenceEditing: PropTypes.bool.isRequired,
  style: PropTypes.object,
  onRRuleChange: PropTypes.func.isRequired,
  rRule: PropTypes.string,
  getMessage: PropTypes.func.isRequired,
};

LayoutBase.defaultProps = {
  className: undefined,
  style: null,
  rRule: undefined,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'Layout' });
