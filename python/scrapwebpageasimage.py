# pylint: disable-all
from playwright.sync_api import sync_playwright
import time

def launch_browser(url, path):
    with sync_playwright() as playwright:
        # browser = playwright.chromium.launch(headless=False,slow_mo=1000)
        browser = playwright.chromium.launch()
        context = browser.new_context(ignore_https_errors=True)
        page = context.new_page()
        page.goto(url,wait_until='commit',timeout=100000)
        page.wait_for_timeout(30000)
        page.screenshot(path=path, full_page=True)
        browser.close()

launch_browser('https://edition.cnn.com/', './static/scr/cnn.png') 
launch_browser('https://www.bbc.com/', './static/scr/bbc.png') 
launch_browser('https://www.cnbc.com/', './static/scr/cnbc.png')
