---
slug: /nodejs
id: NodeJS
title: NodeJS
description: NodeJS
keywords: [NodeJS]
sidebar_label: NodeJS
---

### npm commands

```bash
npm ls --depth=0
npm list react
npm update --not react*
npm update lodash axios
```



```bash
npm install -g npm-check-updates
npx npm-check-updates
ncu -u
ncu -g
ncu -f mocha
ncu react-*
```

```jsx {1,4-6,11} showLineNumbers title="/.ncurc.js"
// highlight-start
   // highlight-next-line
module.exports = {
  reject: '/w*reactw*/',
  // highlight-end
}
```