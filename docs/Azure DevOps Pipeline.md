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
      package: '$(Build.ArtifactStagingDirectory)/**/*.zip'
```
