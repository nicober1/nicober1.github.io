---
keywords: [Azure Bicep]
---

* Infrastructure as Code (IaC), Azure ARM templates, and the Azure CLI

* Azure Resource Manager (ARM) templates

* ARM templates, JavaScript Object Notation (JSON) documents

* Even though ARM templates are great to begin with, it turns out that JSON is not the ideal format to use, especially when the number of resources is high or the deployment model gets complex with time. So, Microsoft started to work on a project called Bicep as a revision to ARM templates to overcome some of the issues people were facing.

* Azure Bicep is a Domain-Specific Language (DSL) that has all the benefits of ARM templates, but instead of using JSON, it uses a new language to overcome its shortcomings. It is designed to simplify the authoring experience of IaC and bring more integration with other tools, such as the Azure CLI and Visual Studio Code.It is worth mentioning that Azure Bicep files will get transpiled to ARM templates very much like how TypeScript files transpile to JavaScript. This means every type, resource, and property that is valid in an ARM template is valid in Bicep as well.

* In Azure Bicep there is no need to manage any state compared to some third-party tools, such as Terraform.

* ARM templates had some issues that were causing many customers to complain about the usage of JSON and its limitations. The first thing that was causing some pain was the way validation worked in ARM templates. Often, the template validation passed but the deployment would fail.

* ARM template does not support commnets, especially if the deployment model was very complex. Lack of commenting, even small comments to deliver a hint to the next maintainer or team member.

*  For Pulumi, there is a barrier of knowing a required programming language and the learning curve that would follow.

*  Bicep extension in VS Code feels like a native experience, with all the bells and whistles of autocorrection, IntelliSense, validation warnings.

*  Azure CLI and Azure PowerShell have built-in support for Bicep. 


