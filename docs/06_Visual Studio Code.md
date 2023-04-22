---
slug: /vscode
id: vscode
title: Visual Studio Code
description: Visual Studio Code
keywords: [Visual Studio Code]
sidebar_label: Visual Studio Code
---
### VS Code Tips

- **Remove Blank Lines** : Replace all **^$\n** with blank after selecting Regular Expression in search (Ctrl + H) to remove blank lines.


### VsCode settings.json

```json showLineNumbers title="settings.json"
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.rulers": [80],
  "files.autoSave": "onFocusChange",
  "prettier.singleQuote": true,
  "prettier.jsxSingleQuote": true,
  "npm.enableScriptExplorer": true,
  "explorer.confirmDelete": false,
  "javascript.updateImportsOnFileMove.enabled": "always",
  "editor.inlineSuggest.enabled": true,
  "git.confirmSync": false,
  "git.autofetch": true,
  "workbench.colorTheme": "GitHub Dark",
  "git.enableSmartCommit": true,
  "editor.formatOnPaste": true,
  "[python]": {
    "editor.formatOnType": true
  },
  "window.zoomLevel": -2,
  "editor.largeFileOptimizations": false,
  "workbench.startupEditor": "none",
  "npm.enableRunFromFolder": true,
  "git.path": "C:\\Program Files\\Git\\bin\\git.exe"
}
```

