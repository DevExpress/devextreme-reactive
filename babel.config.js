module.exports = {
  "presets": [
    [ "@babel/preset-env", { "modules": false, "targets": { "browsers": ["last 2 versions"] } } ],
    "@babel/preset-react"
  ],
  "plugins": [
    ["transform-react-remove-prop-types", {
      "mode": "unsafe-wrap"
    }],
  ],
  "env": {
    "test": {
      "presets": [
        ["@babel/preset-env", {"modules": "commonjs"}]
      ]
    }
  }
}
