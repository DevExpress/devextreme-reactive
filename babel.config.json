{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": { "node": "current" }
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    ["transform-react-remove-prop-types", {
      "mode": "unsafe-wrap"
    }],
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining",
  ],
  "env": {
    "test": {
      "presets": [
        ["@babel/preset-env", {"modules": "commonjs"}]
      ],
      "plugins": [
        "@babel/plugin-transform-runtime"
      ]
    }
  }
}
