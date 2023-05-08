import requests
from bs4 import BeautifulSoup
import json

url = "https://cnbc.com/"

response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")
headlines = soup.find_all("a")

filtered_headlines = []

for headline in headlines:
    headline_text = headline.get_text().strip()
    if headline_text and len(headline_text) > 45 and "CNBC" not in headline_text and "cnbc" not in headline_text and "    " not in headline_text:
        filtered_headlines.append(headline_text)
        print(headline_text)

with open("./static/scrap/cnbc.json", "w", encoding="utf-8") as f:
    json.dump(filtered_headlines, f, indent=4, ensure_ascii=False)