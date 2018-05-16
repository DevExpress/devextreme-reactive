export const ProgressBarCell = {
  inheritAttrs: false,
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  computed: {
    percent() { return this.value * 100; },
  },
  template: `
    <td
      :style="{ position: 'relative', verticalAlign: 'inherit' }"
    >
      <div
        class="progress"
        :style="{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          margin: 0,
          borderRadius: 0,
        }"
      >
        <div
          class="progress-bar"
          role="progressbar"
          :aria-valuenow="percent.toFixed()"
          aria-valuemin="0"
          aria-valuemax="100"
          :style="{ width: \`\${percent}%\` }"
          :title="\`\${percent.toFixed(1)}%\`"
        />
      </div>
    </td>
  `,
};
