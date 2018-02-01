# React Grid - TypeScript

[TypeScript](https://www.typescriptlang.org) is a strict syntactical superset of JavaScript developed by Microsoft. It adds optional static typing to JavaScript and enables catching errors and bugs at build time.

TypeScript became popular and is used in many projects. So we provide React Grid with TypeScript definitions to enable easy and comfortable usage in TypeScript projects.

.embedded-demo(grid-typescript/basic)

## Recommended configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "module": "es6",
    "moduleResolution": "node",
    "jsx": "react"
  }
}
```

See [TypeScript compiler options docs](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for more details.
