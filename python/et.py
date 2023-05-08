import requests
from bs4 import BeautifulSoup
import json

url = "https://economictimes.indiatimes.com"

response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")
headlines = soup.find_all("a")

filtered_headlines = []

for headline in headlines:
    headline_text = headline.get_text().strip()
    if headline_text and len(headline_text) > 35 and len(headline_text) < 99 and "    " not in headline_text:
        filtered_headlines.append(headline_text)
        print(headline_text)

with open("./static/scrap/et.json", "w", encoding="utf-8") as f:
    json.dump(filtered_headlines, f, indent=4, ensure_ascii=False)