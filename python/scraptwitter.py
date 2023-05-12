# pylint: disable-all
import json
from playwright.sync_api import sync_playwright

def get_tweets(username, num_tweets=50):
    # Create a list to store the tweets
    tweets = []

    # Use sync_playwright context manager to launch a browser
    with sync_playwright() as p:
        # Launch a Chromium browser in headed mode
        browser = p.chromium.launch()

        # Create a new browser context
        context = browser.new_context()

        # Create a new page
        page = context.new_page()

        # Go to the user's profile page
        page.goto(f"https://twitter.com/{username}")

        # Wait for the tweets to load
        page.wait_for_selector("article")

        # Initialize a counter variable
        count = 0

        # Loop until the counter reaches the num_tweets value or there are no more tweets to load
        while count < num_tweets:
            # Get all the tweet elements
            tweet_elements = page.query_selector_all("article")

            # Loop through each tweet element
            for tweet_element in tweet_elements:
                # Get the tweet content element
                content_element = tweet_element.query_selector("div[lang]")

                # Get the tweet content text
                content_text = content_element.inner_text()

                # Append the tweet content text to the tweets list if it is not already in it
                if content_text not in tweets:
                    tweets.append(content_text)

                    # Increment the counter by one
                    count += 1

                    # Print the tweet and the counter
                    print(f"{count}: {content_text}")

                    # Break the inner loop if the counter reaches the num_tweets value
                    if count == num_tweets:
                        break

            # Scroll down the page to load more tweets
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

            # Wait for a selector that indicates that more tweets have been loaded or that there are no more tweets to show
            page.wait_for_selector("div[role='progressbar'], div[role='alert']", state="detached")

        # Close the browser
        browser.close()
        
    with open(f"./static/scrap/twitter_{username}.json", "w", encoding="utf-8") as f:
     json.dump(tweets, f, indent=4, ensure_ascii=False)

    # Return the tweets list
    return tweets

# Get the first 50 tweets from Elon Musk
get_tweets("elonmusk", 2)
