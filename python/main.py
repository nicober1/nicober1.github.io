import requests
from bs4 import BeautifulSoup
import json


def fetch_bbc_headlines():
    url = "https://www.bbc.com/news"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    headlines = soup.find("body").find_all("h3")
    for x in headlines:
        print(x.text.strip())
    headliness = []
    for element in headlines:
        headliness.append(element.text.strip())
    return headliness


def write_to_json_file(data):
    with open("bbc_headlines.json", "w") as file:
        json.dump(data, file, indent=4)


# Fetch the headlines
headliness = fetch_bbc_headlines()

# Write the headlines to a JSON file
write_to_json_file(headliness)
