import PluginHostComponent from './basic/plugin-host-component';
import PluginComponent from './basic/plugin-component';
import TemplatePlaceholder from './template/template-placeholder';
import TemplateParameters from './template/template-parameters';
import TemplateOverriding from './template/template-overriding';
import ValueGetter from './getter/value-getter';
import ComputedGetter from './getter/computed-getter';
import SimpleAction from './action/simple-action';
import ParameterizedAction from './action/parameterized-action';

export default {
  render() {
    return (
      <div id="app">
        <h2>PluginHostComponent</h2>
        <PluginHostComponent />

        <h2>PluginComponent</h2>
        <PluginComponent />

        <h2>TemplatePlaceholder</h2>
        <TemplatePlaceholder />

        <h2>TemplateParameters</h2>
        <TemplateParameters />

        <h2>TemplateOverriding</h2>
        <TemplateOverriding />

        <h2>ValueGetter</h2>
        <ValueGetter />

        <h2>ComputedGetter</h2>
        <ComputedGetter />

        <h2>SimpleAction</h2>
        <SimpleAction />

        <h2>ParameterizedAction</h2>
        <ParameterizedAction />
      </div>
    );
  },
};
