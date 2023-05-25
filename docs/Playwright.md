---
keywords: [Playwright]
---

```python

from playwright.sync_api import sync_playwright
import time

def launch_browser():
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=False,slow_mo=1000)
        context = browser.new_context(ignore_https_errors=True)
        page = context.new_page()
        page.goto('https://edition.cnn.com/',wait_until='commit',timeout=100000)
        page.wait_for_timeout(30000)
        page.screenshot(path='./static/scr/cnn.png', full_page=True)
        # page.pdf(path="./static/scr/cnn.pdf",format='a4')
        browser.close()

launch_browser()
```
