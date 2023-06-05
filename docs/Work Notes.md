---
keywords: [work, notes]
---

- https://learn.microsoft.com/en-us/azure/search/search-what-is-azure-search

- Yes, Azure provides a vector database solution called Azure Cognitive Search with its Similarity Search feature. Azure Cognitive Search is a cloud-based search service that allows you to build and deploy search applications.

Similarity Search, introduced in Azure Cognitive Search, enables efficient vector similarity search on large-scale datasets. It is specifically designed for searching and matching vector representations, such as embeddings, in your data. You can create an index of vector data in Azure Cognitive Search and then perform similarity searches to find the most relevant vectors based on cosine similarity or other distance metrics.

To use Similarity Search in Azure Cognitive Search, you need to follow these general steps:

1. Preprocess and extract vector representations from your data, such as text, images, or other sources.

2. Create an Azure Cognitive Search index and define a field of type "Edm.ComplexType" to store the vector data.

3. Upload your data to the index, including the vector representations in the defined field.

4. Perform similarity searches using the Azure Cognitive Search API, specifying the vector query and the similarity metric.

Azure Cognitive Search handles the underlying indexing and search operations, making it easier to build applications that require vector similarity search capabilities.

Note that Similarity Search in Azure Cognitive Search is a newer feature, and its availability and specific capabilities may be subject to change. I recommend checking the Azure Cognitive Search documentation for the most up-to-date information on how to use and integrate vector similarity search in your Azure environment.
