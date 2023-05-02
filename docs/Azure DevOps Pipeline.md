---
keywords: [Azure DevOps Pipeline]
---

### Workflow to Deploy Website built using Docusaurus-React

```yml
trigger:
  - master

pool:
  vmImage: 'ubuntu-latest'

variables:
  azureSubscription: 'your-azure-subscription-name'

steps:
  - task: UseDotNet@2
    displayName: 'Install .NET Core SDK'
    inputs:
      version: '3.1.x'

  - task: DotNetCoreCLI@2
    displayName: 'Restore'
    inputs:
      command: 'restore'
      projects: '**/*.csproj'

  - task: DotNetCoreCLI@2
    displayName: 'Build'
    inputs:
      command: 'build'
      projects: '**/*.csproj'
      arguments: '--configuration $(BuildConfiguration)'

  - task: DotNetCoreCLI@2
    displayName: 'Publish'
    inputs:
      command: 'publish'
      projects: '**/*.csproj'
      arguments: '--configuration $(BuildConfiguration) --output $(Build.ArtifactStagingDirectory)'

  - task: PublishPipelineArtifact@1
    displayName: 'Publish pipeline artifact'
    inputs:
      targetPath: '$(Build.ArtifactStagingDirectory)'
      artifact: 'drop'

  - task: AzureWebApp@1
    displayName: 'Deploy to Azure Web App'
    inputs:
      azureSubscription: $(azureSubscription)
      appType: 'webAppLinux'
      appName: 'your-web-app-name'
      package: '$(Build.ArtifactStagingDirectory)/**/*.zip's


//////////////////////////////////////////////////////////////


- task: PublishBuildArtifacts@1
    inputs:
      PathtoPublish: "$(System.DefaultWorkingDirectory)"
      ArtifactName: "drop"
      publishLocation: "Container"


      ////////////////////////

      name: 1.0.$(Rev:r)
variables:

  - name: BuildPlatform
    value: any cpu

  #used by prerelease:
  - name: PrereleaseMajorVersion
    value: 0
  - name: PrereleaseMinorVersion
    value: 1
  - name: PrereleasePatchVersion
    value: 1

  #used by stable release when 'byEnvVar' set for variable VersioningScheme
  - name: StablePackageVersion
    value: 1.0.0

  #used by stable release when 'byBuildNumber' is set for variable VersioningScheme
  - name: BUILD.BUILDNUMBER
    value: 1.0.$(Rev:r)

  - name: BuildConfiguration
    ${{ if eq( variables['Build.SourceBranchName'], 'master' ) }}:
     value: Release
    ${{ if ne( variables['Build.SourceBranchName'], 'master' ) }}:
     value: Debug

  - name: VersioningScheme
    ${{ if eq( variables['Build.SourceBranchName'], 'master' ) }}:
     value: byEnvVar
    ${{ if ne( variables['Build.SourceBranchName'], 'master' ) }}:
     value: byPrereleaseNumber


trigger:
  batch: true
  branches:
    include:
    - master
    - main

# disable PR builds entirely
pr: none

pool:
  vmImage: 'windows-latest'

steps:

- task: NuGetToolInstaller@1
  displayName: 'Use Nuget 6.x'
  inputs:
    versionSpec: '6.x'
    checkLatest: true

- task: NuGetCommand@2
  displayName: 'Nuget Restore'
  inputs:
    command: 'restore'
    restoreSolution: '**/*.sln'
    feedsToUse: 'select'
    vstsFeed: ''

- task: VSBuild@1
  inputs:
    solution: '**\*.sln'
    platform: '$(BuildPlatform)'
    configuration: '$(BuildConfiguration)'
    clean: true



- task: VSTest@2
  displayName: 'Test .NET Assemblies'
  inputs:
    testSelector: 'testAssemblies'
    testAssemblyVer2: |
     **\*.Tests.dll
     !**\obj\**
     !**\bin\**\ref\**
    searchFolder: '$(System.DefaultWorkingDirectory)'
    platform: '$(BuildPlatform)'
    configuration: '$(BuildConfiguration)'
    publishRunAttachments: false


- task: PublishSymbols@2
  condition: and(succeeded(), eq(variables['BuildConfiguration'], 'Debug'))
  displayName: 'PublishSymbols when BuildConfiguration is Debug [conditional]'
  inputs:
    SearchPattern: '**/bin/**/*.pdb'
    SymbolServerType: 'TeamServices'

- task: DotNetCoreCLI@2
  displayName: 'dotnet pack'
  inputs:
    command: 'pack'
    includesymbols: true
    includesource: true
    versioningScheme: 'byBuildNumber'



- task: PublishBuildArtifacts@1
  inputs:
    PathtoPublish: '$(Build.ArtifactStagingDirectory)'
    ArtifactName: 'drop'
    publishLocation: 'Container'

```
