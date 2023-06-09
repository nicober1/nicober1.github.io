---
slug: /ghaction
id: ghaction
title: GitHub Action
description: GitHub Action
keywords: [GitHub Action]
sidebar_label: GitHub Action
---

### Workflow to Deploy Website built using Docusaurus-React

```yml
name: Deploy FluentBlogs.com

on:
  push:
    branches:
      - main
  schedule:
    - cron: '*/15 4-10 * * *'

jobs:
  deploy:
    name: Deploy FluentBlogs.com
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Cache node modules
        id: cache-npm
        uses: actions/cache@v3
        env:
          cache-name: cache-node-modules
        with:
          # npm cache files are stored in `~/.npm` on Linux/macOS
          path: ~/.npm
          key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-build-${{ env.cache-name }}-
            ${{ runner.os }}-build-
            ${{ runner.os }}-

      - if: ${{ steps.cache-npm.outputs.cache-hit != 'true' }}
        name: List the state of node modules
        continue-on-error: true
        run: npm list

      - name: Install dependencies
        run: npm install

      - name: Build website
        run: npm run build

      - name: Deploy FluentBlogs.com
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

### Workflow to Build and Push Nuget Package

```yml
name: Nuget Publish

on:
  push:
    branches: ['master']
  pull_request:
    branches: ['master']

jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 1

    steps:
      - uses: actions/checkout@v3
      - name: Setup .NET
        uses: actions/setup-dotnet@v2
        with:
          dotnet-version: 6.0.x
      - name: Restore dependencies
        run: dotnet restore
      - name: Build
        run: dotnet build
      - name: Test
        run: dotnet test --no-build --verbosity normal
      - name: Push to NuGet
        run: dotnet nuget push "/home/runner/work/Reusable.Methods.NET/Reusable.Methods.NET/Reusable.Methods.NET/bin/Debug/*.nupkg" ${{secrets.nuget_api_key}}



//////////////////////////




```
