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
npm uninstall <package>
npm outdated
npm update
npm search <term>
npm doctor
npm cache
npm ls --depth=0
npm list react
npm list -g
npm list -g --depth=0
npm -g uninstall <name>
npm outdated -g --depth=0
npm update --not react*
npm update lodash axios
npm install -g npm@latest
npm update -g
npm outdated -g --depth=0
npm dedupe
npm ddp
npm install --prefer-offline --no-audit
npm install -g npm@9.6.6
npm install --global prettier

```

### npm-check-updates

```bash
npm install -g npm-check-updates
npx npm-check-updates
ncu -u
ncu -g
ncu -f mocha
ncu react-*
```

```jsx {2} showLineNumbers title=".ncurc.js"
module.exports = {
  reject: '/w*reactw*/',
}
```
