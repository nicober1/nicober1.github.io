import requests
from bs4 import BeautifulSoup

# Define the URL of the amazon.in site to scrape
url = "https://www.amazon.in/s?k=fire+stick+for+tv&sprefix=fire+stic%2Caps%2C314&ref=nb_sb_ss_ts-doa-p_2_9"

# Get the HTML content of the site
response = requests.get(url)
# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(response.text, "html.parser")
# Find all the elements with the class name "s-card-container" which contain the product details
products = soup.find_all(class_="s-card-container")
# Define an empty list to store the products data
products_data = []

# Loop through each product element
for product in products:
    # Get the link of the product by finding the child element with the class name "a-link-normal a-text-normal" and getting its "href" attribute
    product_link = product.find(class_="a-link-normal")["href"]
    # If the link does not start with "http" or "https", prepend the site domain to it
    if not product_link.startswith("http"):
        product_link = url + product_link
    # Append the tag "fluentblogs-21" to the product link as an affiliate link
    product_link = product_link + "?tag=fluentblogs-21"
    # Get the image of the product by finding the child element with the tag name "img" and getting its "src" attribute
    product_image = product.find("img")["src"]
    # Get the price of the product by finding the child element with the class name "a-price-whole" and getting its text content
    product_price = product.find(class_="a-price-whole").text.strip()
    # Create a dictionary with the product image, price and link as keys and values
    product_data = {"product_image": product_image, "product_price": product_price, "product_link": product_link}
    # Append the dictionary to the products_data list
    products_data.append(product_data)

# Import json library
import json

# Open a file named "amazon_products.json" in write mode
with open("amazon_products.json", "w") as f:
    # Dump the products_data list as a JSON object to the file
    json.dump(products_data, f, indent=4)