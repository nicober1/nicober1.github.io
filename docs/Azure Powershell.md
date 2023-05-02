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
```
