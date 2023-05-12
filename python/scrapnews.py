from bs4 import BeautifulSoup
import json
import requests


def scrape_website(url, filename):
    response = requests.get(url, timeout=(5, 15))
    print(f"Request to {url} returned status code {response.status_code}")
    hs = BeautifulSoup(response.text, "html.parser").find_all("a")
    
    fh = []
    
    for h in hs:
        ht = h.get_text().strip()
        if ht and len(ht) > 25 and len(ht) < 99 and "    " not in ht and ht not in fh:
            fh.append(ht)
    
    
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(fh, f, indent=4, ensure_ascii=False)

    print(f"Successfully written {filename}")


scrape_website("https://timesofindia.indiatimes.com/", "./static/scrap/timesofindia.json")
scrape_website("https://www.aljazeera.com/", "./static/scrap/aljazeera.json")
scrape_website("https://www.thehindu.com/", "./static/scrap/hindu.json")
scrape_website("https://www.nbcnews.com/", "./static/scrap/nbc.json")
scrape_website("https://www.theguardian.com/", "./static/scrap/guardian.json")
scrape_website("https://bbc.com/", "./static/scrap/bbc.json")
scrape_website("https://edition.cnn.com/", "./static/scrap/cnn.json")
scrape_website("https://economictimes.indiatimes.com", "./static/scrap/economictimes.json")
scrape_website("https://moneycontrol.com/", "./static/scrap/moneycontrol.json")
scrape_website("https://cnbc.com/", "./static/scrap/cnbc.json")
scrape_website("https://www.reuters.com/", "./static/scrap/reuters.json")
scrape_website("https://news.sky.com/", "./static/scrap/skynews.json")
scrape_website("https://www.goal.com/", "./static/scrap/goal.json")
scrape_website("https://www.wsj.com/", "./static/scrap/wsj.json")
scrape_website("https://www.nytimes.com/", "./static/scrap/nytimes.json")
scrape_website("https://en.wikinews.org/wiki/Main_Page", "./static/scrap/wikinews.json")
scrape_website("https://www.bbc.com/sport", "./static/scrap/sportsbbc.json")