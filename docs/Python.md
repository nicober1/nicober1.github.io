---
keywords: [Python]
---

```python
python -m pip install --upgrade pip



import requests
from bs4 import BeautifulSoup
import json

url = "https://edition.cnn.com/"

response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")
headlines = soup.find_all("span")

filtered_headlines = []

for headline in headlines:
    headline_text = headline.get_text().strip()
    if headline_text and len(headline_text) > 20 and "CNN" not in headline_text and "cnn" not in headline_text:
        filtered_headlines.append(headline_text)
        print(headline_text)

with open("./static/scrap/cnn.json", "w") as f:
    json.dump(filtered_headlines, f, indent=4)

```