---
keywords: [Azure Powershell]
---

```powershell
# Get object ID of service principal
$PrincipalId = (Get-AzADServicePrincipal -DisplayName $env:DataCopyServicePrincipalName).id

# Get resource ID of storage account
$ResourceId = (Get-AzResource -ResourceGroupName $env:ResourceGroupName -ResourceType Microsoft.Storage/storageAccounts -Name $env:StorageAccountName).ResourceId

# Get role definition ID of blob owner role
$RoleDefinitionId = (Get-AzRoleDefinition "Storage Blob Data Owner").Id

# Check if role assignment already exists
$RoleAssignment = Get-AzRoleAssignment -ObjectId $PrincipalId -RoleDefinitionId $RoleDefinitionId -Scope $ResourceId

# If role assignment does not exist, create a new one
if (-not $RoleAssignment) {
    New-AzRoleAssignment -ObjectId $PrincipalId -RoleDefinitionId $RoleDefinitionId -Scope $ResourceId
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Function CreateContainer{
            Param(
            [Parameter(Mandatory=$false)] [String]$ContainerName,
            [Parameter(Mandatory=$false)] [String]$StorageAccountName,
            [Parameter(Mandatory=$false)] [String]$ResourceGroupName,
            [Parameter(Mandatory=$false)] [String]$ContainerPermission)

            Write-Host -ForegroundColor Green "Creating storage container.."
            $storageAcc=Get-AzStorageAccount -ResourceGroupName $ResourceGroupName -Name $StorageAccountName
            $ctx=$storageAcc.Context

            if(Get-AzStorageContainer -Name $ContainerName -Context $ctx -ErrorAction SilentlyContinue)
            {
                Write-Host -ForegroundColor Magenta $ContainerName "- container already exists."
                Set-AzStorageContainerAcl -Name $ContainerName -Context $ctx -Permission $ContainerPermission -PassThru

                $containerObject = Get-AzStorageContainer -Name $ContainerName -Context $ctx
                $containerProperties = $containerObject.BlobContainerClient.GetProperties()
                Write-Host $containerObject.Name "properties:"
                $containerProperties.Value
            }
            else
            {
               Write-Host -ForegroundColor Magenta $ContainerName "- container does not exist."
               New-AzStorageContainer -Name $ContainerName -Context $ctx -Permission $ContainerPermission
            }

            }


            CreateContainer -ContainerName container1 -StorageAccountName $env:StorageAccountName -ResourceGroupName $env:ResourceGroupName -ContainerPermission Blob

            //////////////////////////////////////////////////////////////////


$DeploymentConfig = @{
    DeploymentName        = 'Deployment-{0}' -f (-join (Get-Date -Format 'yyyyMMddTHHMMssffffZ')[0..63])
    StorageAccountAzureLocation     = $env:StorageAccountAzureLocation
    StorageAccountName = $env:StorageAccountName
    StorageAccountSkuName = $env:StorageAccountSkuName
    ResourceGroupName     = $env:ResourceGroupName
    TemplateFile  = $env:StorageAccountTemplateFile

  }
  New-AzResourceGroupDeployment  @DeploymentConfig

  /////////////////////////////////////////////////////////


#Bicep

param StorageAccountName string
param StorageAccountSkuName string = 'Standard_GRS'
param StorageAccountAzureLocation string


resource stg 'Microsoft.Storage/storageAccounts@2021-02-01' = {
  name: StorageAccountName
  location: StorageAccountAzureLocation
  sku: {
    name: StorageAccountSkuName
  }
  kind: 'StorageV2'
  properties: {
     minimumTlsVersion:  'TLS1_0'
     allowBlobPublicAccess : true
     supportsHttpsTrafficOnly : true
     accessTier :  'Hot'
  }
}
```
