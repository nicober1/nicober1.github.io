---
keywords: [GPT-3, GPT-4, OpenAI, Azure OpenAI]
---

- AI Democratization

- Azure Cognitive Search is one of these knowledge mining solutions.

- The following are the six principles of responsible AI: • Fairness • Reliability and safety • Privacy and security • Inclusiveness • Transparency • Accountability

- Azure Cognitive Services are a type of artificial intelligence (AI) service that is hosted in the cloud. With these services, software developers can add cognitive features to their apps without having to be experts in AI or data science. Both client library software development kits (SDKs) and REST application programming interfaces (APIs) make it possible to access them in a wide range of commonly used programming languages. By using cognitive solutions that can see, hear, speak, and analyze data, Chapter 2 Fundamentals of Artificial Intelligence 26 Azure Cognitive Services makes it easy for developers to add cognitive capabilities to their apps. These cognitive solutions can see, hear, speak, and analyze data. The following are the categories of Azure Cognitive Services: • Vision • Computer Vision • Custom Vision • Face • Speech • Speech service • Language • Language Service • Translator • Language Understanding (LUIS) • QnA Maker • Decision • Anomaly detector • Content moderator • Personalizer

- The essentials of machine learning can be found in all the following algorithms: • Linear regression • Logistic regression • CART (Classification and Regression Trees) • Naïve Bayes • KNN (K-Nearest Neighbors) • Apriori • K-means • PCA (Principal Component Analysis) • Bagging with random forests • Boosting with AdaBoost

- Exquisite language models like GPT-3, Codex, and Embeddings are made easily available through REST APIs in OpenAI.

- Cosine similarity is a way of measuring how similar two vectors are. It looks at the angle between two vectors (lines) and compares them. Cosine similarity is the cosine of the angle between the vector. A result is a number between -1 and 1. If the vectors are the same, the result is 1. If the vectors are completely different, the result is -1. If the vectors are at a 90-degree angle, the result is 0.

- A better solution is using a fuzzy search technique. For example, we can use the Levenshtein distance²⁶ technique using Python. In simple words, the Levenshtein distance between two words is the minimum number of single-character edits (insertions, deletions, or substitutions) needed to transform one word into the other. You don’t need to reimplement any algorithm by yourself, as most of them can be found in libraries like textdistance.

- The capability of “few-shot learning” allows GPT-3 to quickly comprehend instructions provided to it, even with minimal data. In other words, GPT-3 can be programmed to complete tasks with only a few examples as input. This opens up a new world of limitless possibilities for AI-driven applications and domains.

- JSONL, also known as newline-delimited JSON, is a useful format for storing structured data that can be processed one record at a time.

```json

{"prompt":"When do I have to start the heater?", "completion":"Every day in the morn\
ing at 7AM. You should stop it at 2PM"}
{"prompt":"Where is the garage remote control?", "completion":"Next to the yellow do\
or, on the key ring"}
{"prompt":"Is it necessary to program the scent diffuser every day?", "completion":"\
The scent diffuser is already programmed, you just need to recharge it when its batt\
ery is low"}


```

### Selective Context

An initial prompt is saved to a text file • The user enters a prompt • The program creates embeddings for all interactions in the file • The program creates embeddings for the user’s prompt • The program calculates the cosine similarity between the user’s prompt and all interactions in the file • The program sorts the file by the cosine similarity • The best n interactions are read from the file and sent with the prompt to the user

Generative Pre-trained Transformer Version 3 (GPT-3)

Artificial Intelligence (AI)

Natural Language Processing (NLP).

In short, GPT-3 is a language model: a statistical model that calculates the probability distribution over a sequence of words. In other words, GPT-3 is a system for guessing which text comes next when text is given as an input.

## What exactly is GPT-3?

Although GPT-3 is a general-purpose NLP system, it really just does one thing: it predicts what comes next based on the text that is provided as input. But it turns out that, with the right architecture and enough data, this one thing can handle a stunning array of language processing tasks. GPT-3 is the third version of the GPT language model from OpenAI. So, although it started to become popular in the summer of 2020, the first version of GPT was announced 2 years earlier, and the following version, GPT-2, was announced in February 2019. But even though GPT-3 is the third version, the general system design and architecture hasn't changed much from GPT-2. There is one big difference, however, and that's the size of the dataset that was used for training. GPT-3 was trained with a massive dataset comprised of text from the internet, books, and other sources, containing roughly 57 billion words and 175 billion parameters. That's 10 times larger than GPT-2 and the next-largest language model. To put the model size into perspective, the average human might read, write, speak, and hear upward of a billion words in an entire lifetime. So, GPT-3 has been trained on an estimated 57 times the number of words most humans will ever process. The GPT-3 language model is massive, so it isn't something you'll be downloading and dabbling with on your laptop. But even if you could (which you can't because it's not available to download), it would cost millions of dollars in computing resources each time you wanted to build the model. This would put GPT-3 out of reach for most small companies and virtually all individuals if you had to rely on your own computer resource to use it. Thankfully, you don't. OpenAI makes GPT-3 available through an API that is both affordable and easy to use. So, anyone can use some of the most advanced AI ever created!

The text you pass in is referred to as a prompt, and the returned text is called a completion. A prompt is used by GPT-3 to determine how best to complete the task. In the simplest case, a prompt can provide a few words to get started with. For example, if the prompt was If today is Monday, tomorrow is, GPT-3 would likely respond with Tuesday, along with some additional text such as If today is Tuesday, tomorrow is Wednesday, and so on. This means that what you get out of GPT-3 depends on what you send to it.

### Different kinds of prompts

• Zero-shot prompts • One-shot prompts • Few-shot prompts

Davinci is the most capable model and can do anything that any other model can do, and much more—often with fewer instructions. Davinci is able to solve logic problems, determine cause and effect, understand the intent of text, produce creative content, explain character motives, and handle complex summarization tasks.

Curie Curie tries to balance power and speed. It can do anything that Ada or Babbage can do but it's also capable of handling more complex classification tasks and more nuanced tasks like summarization, sentiment analysis, chatbot applications, and Question and Answers.

Babbage Babbage is a bit more capable than Ada but not quite as performant. It can perform all the same tasks as Ada, but it can also handle a bit more involved classification tasks, and it's well suited for semantic search tasks that rank how well documents match a search query.

Ada Ada is usually the fastest model and least costly. It's best for less nuanced tasks—for example, parsing text, reformatting text, and simpler classification tasks. The more context you provide Ada, the better it will likely perform.

### Semantic search

A key component of semantic search is the use of embedding, which is the process of representing words or phrases as numerical vectors. These vectors are generated by a neural network that analyzes the context of each word or phrase in a given text corpus. By converting words into vectors, it becomes easier to measure the semantic similarity between words and phrases, which is crucial for accurate search results

### Moderation

- Moderation is a fine-tuned model developed by OpenAI that can detect potentially sensitive or unsafe text content. Moderation uses ML algorithms to classify text as safe or unsafe based on its context and language use. This model can be used to automate content moderation on social media platforms, online communities, and in many other domains. There are multiple categories, such as hate, hate/threatening, self-harm, sexual, sexual/minors, violence, violence/graphic.

- Encoders are layers that transform natural language input into numerical vectors. This is achieved thanks to the process of embedding, an NLP technique that represents words with vectors in such a way that once represented in a vectorial space, the mathematical distance between vectors is representative of the similarity among words they represent.

### Embeddings

Some models can use embeddings. These embeddings involve representing words or sentences in a multi-dimensional space. The mathematical distances between different instances in this space represent their similarity in terms of meaning. As an example, imagine the words queen, woman, king, and man. Ideally, in our multidimensional space, where words are vectors, if the representation is correct, we want to achieve the following: This means that the distance between woman and man should be equal to the distance between queen and king.

Embeddings can be extremely useful in intelligent search scenarios. Indeed, by getting the embedding of the user input and the documents the user wants to search, it is possible to compute distance metrics (namely, cosine similarity) between the input and the documents. By doing so, we can retrieve the documents that are closer, in mathematical distance terms, to the user input.

### Examples of Weak AI

• Google Maps • Apple autocorrect • Chatbots • Smart assistants such as Siri, Alexa, and Cortana
