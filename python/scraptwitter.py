# pylint: disable-all
import json
from playwright.sync_api import sync_playwright

def get_tweets(username, num_tweets=50):
    tweets = []

    with sync_playwright() as p:
        # browser = p.chromium.launch(headless=False, slow_mo=50)
        browser = p.chromium.launch()


        page = browser.new_page()

        # Go to the user's profile page
        page.goto(f"https://twitter.com/{username}")

        page.wait_for_load_state('networkidle')

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
                try:
                       content_element = tweet_element.query_selector("div[lang]")

                       content_text = content_element.inner_text()
                except Exception as e:
                       print(f"Error: {e}")
                       continue

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
get_tweets("elonmusk", 30)
get_tweets("nasa", 30)
