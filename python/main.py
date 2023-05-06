import requests
from bs4 import BeautifulSoup
import json


def fetch_bbc_headlines():
    url = "https://www.bbc.com/news"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    print(soup)
    headline_elements = soup.find_all("h3")
    headlines = [element.text.strip() for element in headline_elements]
    return headlines


def write_to_json_file(data):
    with open("bbc_headlines.json", "w") as file:
        json.dump(data, file, indent=4)


# Fetch the headlines
headlines = fetch_bbc_headlines()

# Write the headlines to a JSON file
write_to_json_file(headlines)
