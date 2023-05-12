# pylint: disable-all
# pylint: disable=missing-module-docstring
# pylint: disable=W
# pylint: skip-file
import requests
import json


def fetch_data(url, file_name):
    try:
        headers = {
    "Authority": "www.nseindia.com",
    "Method": "GET",
    "Path": "/api/equity-stockIndices?index=NIFTY%2050",
    "Scheme": "https",
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "Referer": "https://www.nseindia.com/market-data/live-equity-market",
    "Sec-Ch-Ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": "\"Windows\"",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    "Cookie": "nsit=bijMa-3yj3lWrJ2DVex7tchU; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTY4Mzg5ODYwMCwiZXhwIjoxNjgzOTA1ODAwfQ.vnpTRhqIjpFnNO9sNHxc2JvKkQo91LTLPlaMrK0o9HI;"
}
        response = requests.get(url, headers=headers)
        print(f"Request to {url} returned status code {response.status_code}")
        print(f"Request to {url} returned content {response.content.capitalize()}")

        if response.status_code == 200:
            data = response.json()
            
            json_string = json.dumps(data, indent=2)
            with open(file_name, "w") as f:
                f.write(json_string)
            print("File written successfully")
        else:
            print("Invalid response or empty data")
    except Exception as e:
        print(e)

fetch_data("https://www.nseindia.com/api/equity-stockIndices?index=SECURITIES%20IN%20F%26O", "./static/data/nse/fo.json")
fetch_data("https://www.nseindia.com/api/equity-stockIndices?index=NIFTY%2050", "./static/data/nse/nifty50.json")

