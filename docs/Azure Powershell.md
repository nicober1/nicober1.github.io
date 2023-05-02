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

$mId = (Get-AzWebApp -ResourceGroupName $env:ResourceGroupName  -Name $env:AppServiceName).Identity.PrincipalId
Set-AzKeyVaultAccessPolicy -VaultName $env:KeyVaultName -ObjectId $mId -PermissionsToSecrets Get,List

////////////////////////////////////////////////
$mId = (Get-AzWebApp -ResourceGroupName $env:ResourceGroupNameCode  -Name $env:AppServiceName).Identity.PrincipalId
$Id= (Get-AzStorageAccount -ResourceGroupName $env:ResourceGroupNameData -Name $env:StorageAccountName).Id
if ($null -eq (Get-AzRoleAssignment -scope $Id  -ObjectId  $mId | Where-Object {$_.RoleDefinitionName -eq 'Storage Blob Data Owner'})) {
    New-AzRoleAssignment -ObjectId $mId -RoleDefinitionName "Storage Blob Data Owner" -Scope $Id
}
if ($null -eq (Get-AzRoleAssignment -scope $Id  -ObjectId  $mId | Where-Object {$_.RoleDefinitionName -eq 'Storage Blob Data Contributor'})) {
    New-AzRoleAssignment -ObjectId $mId -RoleDefinitionName "Storage Blob Data Contributor" -Scope $Id
}
if ($null -eq (Get-AzRoleAssignment -scope $Id  -ObjectId  $mId | Where-Object {$_.RoleDefinitionName -eq 'Storage Queue Data Contributor'})) {
    New-AzRoleAssignment -ObjectId $mId -RoleDefinitionName "Storage Queue Data Contributor" -Scope $Id
}
if ($null -eq (Get-AzRoleAssignment -scope $Id  -ObjectId  $mId | Where-Object {$_.RoleDefinitionName -eq 'Storage Table Data Contributor'})) {
    New-AzRoleAssignment -ObjectId $mId -RoleDefinitionName "Storage Table Data Contributor" -Scope $Id
}
if ($null -eq (Get-AzRoleAssignment -scope $Id  -ObjectId  $mId | Where-Object {$_.RoleDefinitionName -eq 'Storage Account Contributor'})) {
    New-AzRoleAssignment -ObjectId $mId -RoleDefinitionName "Storage Account Contributor" -Scope $Id
}

#DataFactory
$Id= (Get-AzDataFactoryV2 -ResourceGroupName $env:ResourceGroupNameData -Name $env:DataFactoryName).DataFactoryId
if ($null -eq (Get-AzRoleAssignment -scope $Id  -ObjectId  $mId | Where-Object {$_.RoleDefinitionName -eq 'Data Factory Contributor'})) {
     New-AzRoleAssignment -ObjectId $mId -RoleDefinitionName "Data Factory Contributor" -Scope $Id
}


////////////////////////

$app = Get-AzADServicePrincipal -DisplayName $env:ServicePrincipalName
$appId = $app.AppId
$AadClientId = $app.AppId
$scope = $app.Oauth2PermissionScope|Where-Object{$_.Value -match "user_impersonation"}
$scopeId = $scope.Id

Write-Host ("##vso[task.setvariable variable=AadClientId;]$AadClientId")


/////////////

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
